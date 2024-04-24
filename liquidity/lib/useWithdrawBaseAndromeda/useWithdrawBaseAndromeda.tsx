import { useReducer } from 'react';
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
import { USDC_BASE_MARKET, getSNXUSDAddress, getsUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { notNil } from '@snx-v3/tsHelpers';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { Wei } from '@synthetixio/wei';

export const useWithdrawBaseAndromeda = ({
  accountId,
  sUSDCCollateral,
  snxUSDCollateral,
  amountToWithdraw,
}: {
  sUSDCCollateral: Wei;
  snxUSDCollateral: Wei;
  amountToWithdraw: Wei;
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

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !network || !provider) throw new Error('No signer or network');

      if (!(CoreProxy && SpotProxy && amountToWithdraw.gt(0) && collateralPriceIds && accountId))
        return;

      const sUSDCAmount = amountToWithdraw.sub(sUSDCCollateral);
      const snxUSDAmount = amountToWithdraw.add(sUSDCAmount);

      const walletAddress = await signer.getAddress();

      try {
        dispatch({ type: 'prompting' });

        const gasPricesPromised = getGasPrice({ provider });

        const withdraw_sUSDC = sUSDCCollateral?.gt(0)
          ? CoreProxy.populateTransaction.withdraw(
              BigNumber.from(accountId),
              getsUSDCAddress(network.id),
              sUSDCAmount.gt(0) ? sUSDCAmount.toBN() : sUSDCCollateral.toBN()
            )
          : undefined;

        const withdraw_snxUSD = sUSDCAmount?.lt(0)
          ? CoreProxy.populateTransaction.withdraw(
              BigNumber.from(accountId),
              getSNXUSDAddress(network.id),
              snxUSDAmount.toBN()
            )
          : undefined;

        const snxUSDCApproval = snxUSDCollateral.gt(0)
          ? UsdProxy?.populateTransaction.approve(SpotProxy.address, snxUSDAmount.toBN())
          : undefined;

        const buy_USDC = snxUSDCollateral.gt(0)
          ? SpotProxy.populateTransaction.buy(
              USDC_BASE_MARKET,
              snxUSDAmount.toBN(),
              1,
              constants.AddressZero
            )
          : undefined;

        const unwrapTxnPromised = SpotProxy.populateTransaction.unwrap(
          USDC_BASE_MARKET,
          snxUSDAmount.toBN(),
          //2% slippage
          Number(
            utils.formatUnits(snxUSDAmount.toBN().mul(98).div(100).toString(), 12).toString()
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
          withdraw_snxUSD_TX,
          snxUSDCApproval_TX,
          buy_USDC_TX,
          unwrapTxnPromised_TX,
          withdraw_sUSDC_TX,
          collateralPriceCalls,
        ] = await Promise.all([
          gasPricesPromised,
          withdraw_snxUSD,
          snxUSDCApproval,
          buy_USDC,
          unwrapTxnPromised,
          withdraw_sUSDC,
          collateralPriceCallsPromise,
        ]);
        const allCalls = collateralPriceCalls.concat(
          [
            withdraw_snxUSD_TX,
            snxUSDCApproval_TX,
            buy_USDC_TX,
            unwrapTxnPromised_TX,
            withdraw_sUSDC_TX,
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
