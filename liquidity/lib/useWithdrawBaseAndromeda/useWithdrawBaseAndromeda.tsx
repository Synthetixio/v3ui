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
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { getSpotMarketId } from '@snx-v3/isBaseAndromeda';
import { notNil } from '@snx-v3/tsHelpers';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { Wei } from '@synthetixio/wei';
import { useCollateralPriceUpdates } from '@snx-v3/useCollateralPriceUpdates';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { ZEROWEI } from '@snx-v3/constants';
import { AccountCollateralType } from '@snx-v3/useAccountCollateral';

export const useWithdrawBaseAndromeda = ({
  accountId,
  availableCollateral,
  snxUSDCollateral,
  amountToWithdraw,
  accountCollateral,
  collateralSymbol,
}: {
  availableCollateral: Wei;
  snxUSDCollateral: Wei;
  amountToWithdraw: Wei;
  accountId?: string;
  collateralSymbol?: string;
  accountCollateral: AccountCollateralType | undefined;
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
      if (!(CoreProxy && SpotProxy && accountId && usdTokens?.sUSD && usdTokens.snxUSD)) {
        throw new Error('Not ready');
      }

      const total = snxUSDCollateral.add(availableCollateral);

      if (total.lt(amountToWithdraw)) {
        throw new Error('Exceeds balance');
      }

      const wrappedCollateralAmount = amountToWithdraw.gt(availableCollateral)
        ? availableCollateral
        : amountToWithdraw;

      const snxUSDAmount = amountToWithdraw.sub(wrappedCollateralAmount).gt(0)
        ? amountToWithdraw.sub(wrappedCollateralAmount)
        : ZEROWEI;

      try {
        const spotMarketId = getSpotMarketId(collateralSymbol);

        dispatch({ type: 'prompting' });

        const gasPricesPromised = getGasPrice({ provider });

        const withdraw_collateral = wrappedCollateralAmount.gt(0)
          ? CoreProxy.populateTransaction.withdraw(
              BigNumber.from(accountId),
              accountCollateral?.tokenAddress,
              wrappedCollateralAmount.toBN()
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
        const buy_wrappedCollateral = snxUSDAmount.gt(0)
          ? SpotProxy.populateTransaction.buy(
              spotMarketId,
              snxUSDAmount.toBN(),
              0,
              constants.AddressZero
            )
          : undefined;

        const synthAmount = snxUSDAmount.gt(0)
          ? (await SpotProxy.callStatic.quoteBuyExactIn(spotMarketId, snxUSDAmount.toBN(), 0))
              .synthAmount
          : ZEROWEI;
        const withdrawAmount = availableCollateral.add(synthAmount);

        const unwrapTxnPromised = SpotProxy.populateTransaction.unwrap(
          spotMarketId,
          withdrawAmount.toBN(),
          // 2% slippage
          Number(
            utils.formatUnits(withdrawAmount.toBN().mul(98).div(100).toString(), 12).toString()
          ).toFixed()
        );

        const [
          gasPrices,
          withdraw_collateral_txn,
          withdraw_snxUSD_txn,
          snxUSDApproval_txn,
          buy_wrappedCollateral_txn,
          unwrapTxnPromised_txn,
        ] = await Promise.all([
          gasPricesPromised,
          withdraw_collateral,
          withdraw_snxUSD,
          snxUSDApproval,
          buy_wrappedCollateral,
          unwrapTxnPromised,
        ]);

        const allCalls = [
          withdraw_collateral_txn,
          withdraw_snxUSD_txn,
          snxUSDApproval_txn,
          buy_wrappedCollateral_txn,
          unwrapTxnPromised_txn,
        ].filter(notNil);

        if (priceUpdateTx) {
          allCalls.unshift(priceUpdateTx as any);
        }

        const walletAddress = await signer.getAddress();
        const erc7412Tx = await withERC7412(network, allCalls, 'useWithdrawBase', walletAddress);

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
