import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber, BytesLike } from 'ethers';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

export const useDeposit = (
  {
    accountId,
    newAccountId,
    poolId,
    collateralTypeAddress,
    collateralChange,
    currentCollateral,
  }: {
    accountId?: string;
    newAccountId: string;
    poolId?: string;
    collateralTypeAddress?: string;
    currentCollateral: Wei;
    collateralChange: Wei;
  },
  eventHandlers?: {
    onSuccess?: () => void;
    onMutate?: () => void;
    onError?: (e: Error) => void;
  }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();

  const accountCollaterals = useAccountCollateral({ accountId });
  const accountCollateral = accountCollaterals.data?.find(
    (coll) => coll.tokenAddress === collateralTypeAddress
  );

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const { name: networkName, id: networkId } = useNetwork();

  const mutation = useMutation({
    mutationFn: async () => {
      if (
        !(
          signer &&
          CoreProxy &&
          poolId &&
          collateralTypeAddress &&
          (!accountId || accountCollateral?.availableCollateral)
        )
      )
        return;
      if (collateralChange.eq(0)) return;

      try {
        dispatch({ type: 'prompting' });

        const id = accountId ?? newAccountId;

        // create account only when no account exists
        const createAccount = accountId
          ? undefined
          : CoreProxy.interface.encodeFunctionData('createAccount(uint128)', [BigNumber.from(id)]);

        const availableCollateral = accountCollateral?.availableCollateral || wei(0);

        // optionally deposit if available collateral not enough
        const deposit = availableCollateral.gte(collateralChange)
          ? undefined
          : CoreProxy.interface.encodeFunctionData('deposit', [
              BigNumber.from(id),
              collateralTypeAddress,
              collateralChange.sub(availableCollateral).toBN(), // only deposit what's needed
            ]);

        const delegate = CoreProxy.interface.encodeFunctionData('delegateCollateral', [
          BigNumber.from(id),
          BigNumber.from(poolId),
          collateralTypeAddress,
          currentCollateral.add(collateralChange).toBN(),
          wei(1).toBN(),
        ]);

        const calls = [createAccount, deposit, delegate].filter(Boolean) as BytesLike[];

        const gasPricesPromised = getGasPrice({ networkName, networkId });
        const gasLimitPromised = CoreProxy.estimateGas.multicall(calls);
        const populatedTxnPromised = CoreProxy.populateTransaction.multicall(calls, {
          gasLimit: gasLimitPromised,
        });
        const [gasPrices, gasLimit, populatedTxn] = await Promise.all([
          gasPricesPromised,
          gasLimitPromised,
          populatedTxnPromised,
        ]);

        const gasOptionsForTransaction = formatGasPriceForTransaction({
          gasLimit,
          gasPrices,
          gasSpeed,
        });

        const txn = await signer.sendTransaction({ ...populatedTxn, ...gasOptionsForTransaction });
        dispatch({ type: 'pending', payload: { txnHash: txn.hash } });

        await txn.wait();
        dispatch({ type: 'success' });
      } catch (error: any) {
        dispatch({ type: 'error', payload: { error } });
        throw error;
      }
    },
    ...eventHandlers,
  });
  return {
    mutation,
    txnState,
    settle: () => dispatch({ type: 'settled' }),
    isLoading: mutation.isLoading,
    exec: mutation.mutateAsync,
  };
};
