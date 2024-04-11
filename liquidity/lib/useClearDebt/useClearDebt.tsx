import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber, Contract, constants } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { notNil } from '@snx-v3/tsHelpers';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { getRepayerContract } from '@snx-v3/isBaseAndromeda';

const DEBT_REPAYER_ABI = [
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
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  availableUSDCollateral?: Wei;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: UsdProxy } = useUSDProxy();
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const { data: collateralPriceIds } = useAllCollateralPriceIds();

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
          UsdProxy &&
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

        // USDC => sUSDC
        const depositDebtToRepay = repayer.populateTransaction.depositDebtToRepay(
          CoreProxy.address,
          SpotMarketProxy.address,
          accountId,
          poolId,
          collateralTypeAddress
        );

        const burn = CoreProxy.populateTransaction.burnUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          constants.MaxUint256
        );

        const callsPromise = Promise.all([depositDebtToRepay, burn].filter(notNil));

        const walletAddress = await signer.getAddress();

        const collateralPriceCallsPromise = fetchPriceUpdates(
          collateralPriceIds,
          network.isTestnet
        ).then((signedData) =>
          priceUpdatesToPopulatedTx(walletAddress, collateralPriceIds, signedData)
        );

        const [calls, gasPrices, collateralPriceCalls] = await Promise.all([
          callsPromise,
          getGasPrice({ provider }),
          collateralPriceCallsPromise,
        ]);

        const allCalls = collateralPriceCalls.concat(calls);

        const erc7412Tx = await withERC7412(network, allCalls, 'useRepay', CoreProxy.interface);

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
