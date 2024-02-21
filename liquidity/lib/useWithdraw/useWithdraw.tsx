import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { BigNumber } from 'ethers';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { AccountCollateralWithSymbol } from '@snx-v3/useAccountCollateral';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { withERC7412 } from '@snx-v3/withERC7412';

export const useWithdraw = ({
  accountId,
  collateralTypeAddress,
  accountCollateral,
}: {
  accountId?: string;
  collateralTypeAddress?: string;
  accountCollateral: AccountCollateralWithSymbol;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: collateralPriceIds } = useAllCollateralPriceIds();
  const { network } = useNetwork();

  const { gasSpeed } = useGasSpeed();
  const signer = useSigner();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !network || !provider) throw new Error('No signer or network');

      if (
        !(
          CoreProxy &&
          collateralTypeAddress &&
          accountCollateral?.availableCollateral &&
          collateralPriceIds
        )
      )
        return;
      if (accountCollateral?.availableCollateral.eq(0)) return;
      const walletAddress = await signer.getAddress();

      try {
        dispatch({ type: 'prompting' });

        const gasPricesPromised = getGasPrice({ provider });

        const populatedTxnPromised = CoreProxy.populateTransaction.withdraw(
          BigNumber.from(accountId),
          collateralTypeAddress,
          accountCollateral?.availableCollateral.toBN()
        );

        const collateralPriceCallsPromise = fetchPriceUpdates(
          collateralPriceIds,
          network.isTestnet
        ).then((signedData) =>
          priceUpdatesToPopulatedTx(walletAddress, collateralPriceIds, signedData)
        );
        const [gasPrices, populatedTxn, collateralPriceCalls] = await Promise.all([
          gasPricesPromised,
          populatedTxnPromised,
          collateralPriceCallsPromise,
        ]);
        const allCalls = collateralPriceCalls.concat(populatedTxn);

        const erc7412Tx = await withERC7412(network, allCalls, 'useWithdraw');

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
    isLoading: mutation.isPending,
    exec: mutation.mutateAsync,
  };
};
