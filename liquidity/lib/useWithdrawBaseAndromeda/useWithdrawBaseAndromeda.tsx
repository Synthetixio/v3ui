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
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { USDC_BASE_MARKET } from '@snx-v3/isBaseAndromeda';
import { utils } from 'ethers';

export const useWithdrawBaseAndromeda = ({
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
  const { data: SpotProxy } = useSpotMarketProxy();
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
          SpotProxy &&
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

        const amount = accountCollateral?.availableCollateral.toBN();
        const populatedTxnPromised = CoreProxy.populateTransaction.withdraw(
          BigNumber.from(accountId),
          collateralTypeAddress,
          amount
        );

        const unwrapTxnPromised = SpotProxy.populateTransaction.unwrap(
          USDC_BASE_MARKET,
          amount,
          //2% slippage
          Number(utils.formatUnits(amount.mul(98).div(100).toString(), 12).toString())
        );

        const collateralPriceCallsPromise = fetchPriceUpdates(
          collateralPriceIds,
          network.isTestnet
        ).then((signedData) =>
          priceUpdatesToPopulatedTx(walletAddress, collateralPriceIds, signedData)
        );
        const [gasPrices, populatedTxn, withdrawTxn, collateralPriceCalls] = await Promise.all([
          gasPricesPromised,
          populatedTxnPromised,
          unwrapTxnPromised,
          collateralPriceCallsPromise,
        ]);
        const allCalls = collateralPriceCalls.concat([populatedTxn, withdrawTxn]);

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
