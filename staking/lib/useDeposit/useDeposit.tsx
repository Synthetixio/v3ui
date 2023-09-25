import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber, BytesLike } from 'ethers';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { withERC7412 } from '@snx-v3/withERC7412';

export const useDeposit = ({
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
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();

  const accountCollaterals = useAccountCollateral({ accountId });
  const accountCollateral = accountCollaterals.data?.find(
    (coll) => coll.tokenAddress === collateralTypeAddress
  );

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();

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

        const gasPricesPromised = getGasPrice({ provider });
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

        const txn = await signer.sendTransaction(
          await withERC7412(CoreProxy.provider, {
            ...populatedTxn,
            ...gasOptionsForTransaction,
          })
        );
        dispatch({ type: 'pending', payload: { txnHash: txn.hash } });

        await txn.wait();
        dispatch({ type: 'success' });
      } catch (error: any) {
        dispatch({ type: 'error', payload: { error } });
        throw error;
      }
    },
  });
  return {
    mutation,
    txnState,
    settle: () => dispatch({ type: 'settled' }),
    isLoading: mutation.isLoading,
    exec: mutation.mutateAsync,
  };
};
