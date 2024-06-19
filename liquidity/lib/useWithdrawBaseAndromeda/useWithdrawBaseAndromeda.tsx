import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { BigNumber, constants, utils } from 'ethers';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { USDC_BASE_MARKET } from '@snx-v3/isBaseAndromeda';
import { notNil } from '@snx-v3/tsHelpers';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { Wei } from '@synthetixio/wei';
import { useCollateralPriceUpdates } from '@snx-v3/useCollateralPriceUpdates';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { ZEROWEI } from '../../ui/src/utils/constants';

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
  const { data: priceUpdateTx } = useCollateralPriceUpdates();
  const { network } = useNetwork();
  const { data: usdTokens } = useGetUSDTokens();

  const { gasSpeed } = useGasSpeed();
  const signer = useSigner();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !network || !provider) throw new Error('No signer or network');
      if (!(CoreProxy && SpotProxy && accountId && usdTokens?.sUSD && usdTokens.snxUSD)) return;

      const total = snxUSDCollateral.add(sUSDCCollateral);

      if (total.lt(amountToWithdraw)) {
        return;
      }

      const sUSDCAmount = amountToWithdraw.gt(sUSDCCollateral) ? sUSDCCollateral : amountToWithdraw;
      const snxUSDAmount = amountToWithdraw.sub(sUSDCAmount).gt(0)
        ? amountToWithdraw.sub(sUSDCAmount)
        : ZEROWEI;

      try {
        dispatch({ type: 'prompting' });

        const gasPricesPromised = getGasPrice({ provider });

        const withdraw_sUSDC = sUSDCAmount.gt(0)
          ? CoreProxy.populateTransaction.withdraw(
              BigNumber.from(accountId),
              usdTokens?.sUSD,
              sUSDCAmount.toBN()
            )
          : undefined;

        const withdraw_snxUSD = snxUSDAmount.gt(0)
          ? CoreProxy.populateTransaction.withdraw(
              BigNumber.from(accountId),
              usdTokens?.snxUSD,
              snxUSDAmount.toBN()
            )
          : undefined;

        const snxUSDApproval = snxUSDAmount.gt(0)
          ? UsdProxy?.populateTransaction.approve(SpotProxy.address, snxUSDAmount.toBN())
          : undefined;

        const buy_sUSDC = snxUSDAmount.gt(0)
          ? SpotProxy.populateTransaction.buy(
              USDC_BASE_MARKET,
              snxUSDAmount.toBN(),
              0,
              constants.AddressZero
            )
          : undefined;

        const unwrapTxnPromised = SpotProxy.populateTransaction.unwrap(
          USDC_BASE_MARKET,
          amountToWithdraw.toBN(),
          //2% slippage
          Number(
            utils.formatUnits(amountToWithdraw.toBN().mul(98).div(100).toString(), 12).toString()
          ).toFixed()
        );

        const [
          gasPrices,
          withdraw_sUSDC_Txn,
          withdraw_snxUSD_Txn,
          snxUSDCApproval_Txn,
          buy_sUSDC_Txn,
          unwrapTxn,
        ] = await Promise.all([
          gasPricesPromised,
          withdraw_sUSDC,
          withdraw_snxUSD,
          snxUSDApproval,
          buy_sUSDC,
          unwrapTxnPromised,
        ]);

        const allCalls = [
          withdraw_sUSDC_Txn,
          withdraw_snxUSD_Txn,
          snxUSDCApproval_Txn,
          buy_sUSDC_Txn,
          unwrapTxn,
        ].filter(notNil);

        if (priceUpdateTx) {
          allCalls.unshift(priceUpdateTx as any);
        }

        const erc7412Tx = await withERC7412(network, allCalls, 'useWithdrawBase');

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
