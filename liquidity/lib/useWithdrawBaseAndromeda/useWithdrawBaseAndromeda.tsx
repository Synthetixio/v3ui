import { useMemo, useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { BigNumber, constants, utils } from 'ethers';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { USDC_BASE_MARKET, getSNXUSDAddress, getUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { notNil } from '@snx-v3/tsHelpers';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { Wei } from '@synthetixio/wei';

export const useWithdrawBaseAndromeda = ({
  accountId,
  usdcCollateral,
  snxUSDCollateral,
}: {
  usdcCollateral: Wei;
  snxUSDCollateral: Wei;
  accountId?: string;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotProxy } = useSpotMarketProxy();
  const { data: UsdProxy } = useUSDProxy();
  const { data: collateralPriceIds } = useAllCollateralPriceIds();
  const { network } = useNetwork();

  const { gasSpeed } = useGasSpeed();
  const signer = useSigner();
  const provider = useProvider();

  const amount = useMemo(
    () => snxUSDCollateral.add(usdcCollateral),
    [snxUSDCollateral, usdcCollateral]
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !network || !provider) throw new Error('No signer or network');

      if (!(CoreProxy && SpotProxy && amount.gt(0) && collateralPriceIds && accountId)) return;

      const walletAddress = await signer.getAddress();

      try {
        dispatch({ type: 'prompting' });

        const gasPricesPromised = getGasPrice({ provider });

        const withdraw_sUSDC = usdcCollateral?.gt(0)
          ? CoreProxy.populateTransaction.withdraw(
              BigNumber.from(accountId),
              getUSDCAddress(network.id),
              usdcCollateral.toBN()
            )
          : undefined;

        const withdraw_sUSD = snxUSDCollateral?.gt(0)
          ? CoreProxy.populateTransaction.withdraw(
              BigNumber.from(accountId),
              getSNXUSDAddress(network.id),
              snxUSDCollateral.toBN()
            )
          : undefined;

        const sUSDCApproval = snxUSDCollateral.gt(0)
          ? UsdProxy?.populateTransaction.approve(SpotProxy.address, snxUSDCollateral.toBN())
          : undefined;

        const buy_SUSD = snxUSDCollateral.gt(0)
          ? SpotProxy.populateTransaction.buy(
              USDC_BASE_MARKET,
              snxUSDCollateral.toBN(),
              0,
              constants.AddressZero
            )
          : undefined;

        const unwrapTxnPromised = SpotProxy.populateTransaction.unwrap(
          USDC_BASE_MARKET,
          amount.toBN(),
          //2% slippage
          Number(
            utils.formatUnits(amount.toBN().mul(98).div(100).toString(), 12).toString()
          ).toFixed()
        );

        const collateralPriceCallsPromise = fetchPriceUpdates(
          collateralPriceIds,
          network.isTestnet
        ).then((signedData) =>
          priceUpdatesToPopulatedTx(walletAddress, collateralPriceIds, signedData)
        );
        const [
          gasPrices,
          withdraw_sUSDC_Txn,
          withdraw_SUSD_Txn,
          sUSDCApproval_Txn,
          buy_SUSD_Txn,
          unwrapTxn,
          collateralPriceCalls,
        ] = await Promise.all([
          gasPricesPromised,
          withdraw_sUSDC,
          withdraw_sUSD,
          sUSDCApproval,
          buy_SUSD,
          unwrapTxnPromised,
          collateralPriceCallsPromise,
        ]);
        const allCalls = collateralPriceCalls.concat(
          [
            withdraw_sUSDC_Txn,
            withdraw_SUSD_Txn,
            sUSDCApproval_Txn,
            buy_SUSD_Txn,
            unwrapTxn,
          ].filter(notNil)
        );

        const erc7412Tx = await withERC7412(network, allCalls, 'useWithdraw', CoreProxy.interface);

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
