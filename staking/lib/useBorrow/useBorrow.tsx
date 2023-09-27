import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber } from 'ethers';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { withERC7412 } from '@snx-v3/withERC7412';

export const useBorrow = ({
  accountId,
  poolId,
  collateralTypeAddress,
  debtChange,
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  debtChange: Wei;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!(signer && CoreProxy && poolId && accountId && collateralTypeAddress)) return;
      if (debtChange.eq(0)) return;

      try {
        dispatch({ type: 'prompting' });

        const populatedTxnPromised = CoreProxy.populateTransaction.mintUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          debtChange.toBN()
        );

        const [calls, gasPrices] = await Promise.all([
          populatedTxnPromised,
          getGasPrice({ provider }),
        ]);

        const erc7412Tx = await withERC7412(CoreProxy.provider, calls);

        const gasOptionsForTransaction = formatGasPriceForTransaction({
          gasLimit: erc7412Tx.gasLimit,
          gasPrices,
          gasSpeed,
        });

        const txn = await signer.sendTransaction({ ...erc7412Tx, ...gasOptionsForTransaction });
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
