import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber, Contract } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { notNil } from '@snx-v3/tsHelpers';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { USDC_BASE_MARKET, getRepayerContract } from '@snx-v3/isBaseAndromeda';
import { useCollateralPriceUpdates } from '../useCollateralPriceUpdates';

export const DEBT_REPAYER_ABI = [
  {
    inputs: [
      { internalType: 'contract ISynthetixCore', name: 'synthetixCore', type: 'address' },
      { internalType: 'contract ISpotMarket', name: 'spotMarket', type: 'address' },
      { internalType: 'uint128', name: 'accountId', type: 'uint128' },
      { internalType: 'uint128', name: 'poolId', type: 'uint128' },
      { internalType: 'address', name: 'collateralType', type: 'address' },
      { internalType: 'uint128', name: 'spotMarketId', type: 'uint128' },
    ],
    name: 'depositDebtToRepay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const useClearDebt = ({
  accountId,
  poolId,
  collateralTypeAddress,
  availableUSDCollateral,
  debt,
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  availableUSDCollateral?: Wei;
  debt?: Wei;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const { data: collateralPriceIds } = useAllCollateralPriceIds();
  const { data: priceUpdateTx } = useCollateralPriceUpdates();

  const signer = useSigner();
  const { network } = useNetwork();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !network || !provider) throw new Error('No signer or network');

      if (
        !(
          CoreProxy &&
          poolId &&
          accountId &&
          collateralTypeAddress &&
          SpotMarketProxy &&
          collateralPriceIds
        )
      ) {
        return;
      }

      const repayer = new Contract(getRepayerContract(network.id), DEBT_REPAYER_ABI, signer);

      if (!availableUSDCollateral) return;

      try {
        dispatch({ type: 'prompting' });

        const depositDebtToRepay = repayer.populateTransaction.depositDebtToRepay(
          CoreProxy.address,
          SpotMarketProxy.address,
          accountId,
          poolId,
          collateralTypeAddress,
          USDC_BASE_MARKET
        );

        const burn = CoreProxy.populateTransaction.burnUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          debt?.mul(110).div(100).toBN().toString() || '0'
        );

        const callsPromise = Promise.all([depositDebtToRepay, burn].filter(notNil));

        const [calls, gasPrices] = await Promise.all([callsPromise, getGasPrice({ provider })]);

        if (priceUpdateTx) {
          calls.unshift(priceUpdateTx as any);
        }

        const erc7412Tx = await withERC7412(network, calls, 'useRepay', CoreProxy.interface);

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
