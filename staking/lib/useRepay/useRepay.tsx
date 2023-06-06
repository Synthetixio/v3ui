import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

export const useRepay = (
  {
    accountId,
    poolId,
    collateralTypeAddress,
    debtChange,
  }: {
    accountId?: string;
    poolId?: string;
    collateralTypeAddress?: string;
    debtChange: Wei;
  },
  eventHandlers?: {
    onSuccess?: () => void;
    onMutate?: () => void;
    onError?: (e: Error) => void;
  }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const { name: networkName, id: networkId } = useNetwork();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer) return;
      if (!(CoreProxy && poolId && accountId && collateralTypeAddress)) return;
      if (debtChange.eq(0)) return;

      try {
        dispatch({ type: 'prompting' });

        const gasPricesPromised = getGasPrice({ networkName, networkId });

        const gasLimitPromised = CoreProxy.estimateGas.burnUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          debtChange.abs().toBN()
        );

        const populatedTxnPromised = CoreProxy.populateTransaction.burnUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          debtChange.abs().toBN(),
          { gasLimit: gasLimitPromised }
        );

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
