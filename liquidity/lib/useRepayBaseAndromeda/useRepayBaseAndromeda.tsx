import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber, ethers } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { notNil } from '@snx-v3/tsHelpers';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { USDC_BASE_MARKET, getsUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { parseUnits } from '@snx-v3/format';
import { approveAbi } from '@snx-v3/useApprove';

export const useRepayBaseAndromeda = ({
  accountId,
  poolId,
  collateralTypeAddress,
  debtChange,
  availableUSDCollateral,
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  availableUSDCollateral?: Wei;
  debtChange: Wei;
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

      if (!availableUSDCollateral) return;
      if (debtChange.eq(0)) return;
      const debtChangeAbs = debtChange.abs();
      const amountToDeposit = debtChangeAbs.sub(availableUSDCollateral);
      const usdcAmount = amountToDeposit.gt(0)
        ? parseUnits(amountToDeposit.toString(), 6)
        : BigNumber.from(0);

      try {
        dispatch({ type: 'prompting' });

        // USDC => sUSDC
        const wrap = amountToDeposit.gt(0)
          ? SpotMarketProxy.populateTransaction.wrap(USDC_BASE_MARKET, usdcAmount, 0)
          : undefined;

        const sUSDC_ADDRESS = getsUSDCAddress(network.id);
        const sUSDC_Contract = new ethers.Contract(sUSDC_ADDRESS, approveAbi, signer);

        const sUSDC_Approval = amountToDeposit.gt(0)
          ? sUSDC_Contract.populateTransaction.approve(
              SpotMarketProxy.address,
              amountToDeposit.toBN()
            )
          : undefined;

        // sell sUSDC => sUSD
        const sell = amountToDeposit.gt(0)
          ? SpotMarketProxy.populateTransaction.sell(
              USDC_BASE_MARKET,
              amountToDeposit.toBN(),
              0,
              ethers.constants.AddressZero
            )
          : undefined;

        // approve sUSD to Core
        const sUSD_Contract = new ethers.Contract(UsdProxy.address, approveAbi, signer);

        const sUSD_Approval = amountToDeposit.gt(0)
          ? sUSD_Contract.populateTransaction.approve(CoreProxy.address, amountToDeposit.toBN())
          : undefined;

        // Only deposit if user doesn't have enough sUSD collateral
        const deposit = amountToDeposit.lte(0)
          ? undefined
          : CoreProxy.populateTransaction.deposit(
              BigNumber.from(accountId),
              UsdProxy.address,
              amountToDeposit.toBN() // only deposit what's needed
            );

        const burn = CoreProxy.populateTransaction.burnUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          debtChangeAbs.toBN()
        );
        const callsPromise = Promise.all(
          [wrap, sUSDC_Approval, sell, sUSD_Approval, deposit, burn].filter(notNil)
        );

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
