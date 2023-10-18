import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { BigNumber } from 'ethers';
import { useAccountSpecificCollateral } from '@snx-v3/useAccountCollateral';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

export const useWithdraw = ({
  accountId,
  collateralTypeAddress,
}: {
  accountId?: string;
  collateralTypeAddress?: string;
}) => {
  const { data: accountCollateral } = useAccountSpecificCollateral(
    accountId,
    collateralTypeAddress
  );

  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { gasSpeed } = useGasSpeed();
  const signer = useSigner();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer) return;
      if (!(CoreProxy && collateralTypeAddress && accountCollateral?.availableCollateral)) return;
      if (accountCollateral?.availableCollateral.eq(0)) return;

      try {
        dispatch({ type: 'prompting' });

        const gasPricesPromised = getGasPrice({ provider });
        const gasLimitPromised = CoreProxy.estimateGas.withdraw(
          BigNumber.from(accountId),
          collateralTypeAddress,
          accountCollateral?.availableCollateral.toBN()
        );
        const populatedTxnPromised = CoreProxy.populateTransaction.withdraw(
          BigNumber.from(accountId),
          collateralTypeAddress,
          accountCollateral?.availableCollateral.toBN(),
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
  });
  return {
    mutation,
    txnState,
    settle: () => dispatch({ type: 'settled' }),
    isLoading: mutation.isLoading,
    exec: mutation.mutateAsync,
  };
};
