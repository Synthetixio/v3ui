import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber, Contract, PopulatedTransaction } from 'ethers';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useApprove } from '@snx-v3/useApprove';
import { USDC_BASE_MARKET, getRepayerContract } from '@snx-v3/isBaseAndromeda';
import { parseUnits } from '@snx-v3/format';
import { DEBT_REPAYER_ABI } from '../useClearDebt';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { notNil } from '@snx-v3/tsHelpers';
import { useCollateralPriceUpdates } from '../useCollateralPriceUpdates';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export const useUndelegateBaseAndromeda = ({
  accountId,
  poolId,
  collateralTypeAddress,
  collateralChange,
  currentCollateral,
  liquidityPosition,
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  currentCollateral: Wei;
  collateralChange: Wei;
  liquidityPosition?: LiquidityPosition;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const { data: priceUpdateTx } = useCollateralPriceUpdates();

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();
  const { data: collateralPriceUpdates } = useAllCollateralPriceIds();
  const { network } = useNetwork();
  const { data: usdTokens } = useGetUSDTokens();

  const debtExists = liquidityPosition?.debt.gt(0);
  const currentDebt = debtExists && liquidityPosition ? liquidityPosition.debt : wei(0);

  const { approve, requireApproval } = useApprove({
    contractAddress: usdTokens?.USDC,
    //slippage for approval
    amount: parseUnits(currentDebt.toString(), 6).mul(110).div(100),
    spender: getRepayerContract(network?.id),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !network || !provider) throw new Error('No signer or network');
      if (
        !(CoreProxy && poolId && collateralTypeAddress && collateralPriceUpdates && SpotMarketProxy)
      )
        return;
      if (collateralChange.eq(0)) return;
      if (currentCollateral.eq(0)) return;
      try {
        dispatch({ type: 'prompting' });

        if (debtExists && requireApproval) {
          await approve(false);
        }

        const transactions: Promise<PopulatedTransaction>[] = [];

        if (debtExists) {
          const repayer = new Contract(getRepayerContract(network.id), DEBT_REPAYER_ABI, signer);

          const depositDebtToRepay = repayer.populateTransaction.depositDebtToRepay(
            CoreProxy.address,
            SpotMarketProxy.address,
            accountId,
            poolId,
            collateralTypeAddress,
            USDC_BASE_MARKET
          );
          transactions.push(depositDebtToRepay);

          const burn = CoreProxy.populateTransaction.burnUsd(
            BigNumber.from(accountId),
            BigNumber.from(poolId),
            collateralTypeAddress,
            currentDebt?.mul(110).div(100).toBN().toString() || '0'
          );
          transactions.push(burn);
        }

        const populatedTxnPromised = CoreProxy.populateTransaction.delegateCollateral(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          currentCollateral.add(collateralChange).toBN(),
          wei(1).toBN()
        );

        const callsPromise = Promise.all([...transactions, populatedTxnPromised].filter(notNil));

        const [calls, gasPrices] = await Promise.all([callsPromise, getGasPrice({ provider })]);

        if (priceUpdateTx) {
          calls.unshift(priceUpdateTx as any);
        }

        const erc7412Tx = await withERC7412(network, calls, 'useUndelegate');

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
