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
import { useSystemToken } from '@snx-v3/useSystemToken';
import { notNil } from '@snx-v3/tsHelpers';
import { withERC7412 } from '@snx-v3/withERC7412';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { getSpotMarketId } from '@snx-v3/isBaseAndromeda';
import { parseUnits } from '@snx-v3/format';
import { approveAbi } from '@snx-v3/useApprove';
import { useCollateralPriceUpdates } from '../useCollateralPriceUpdates';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export const useRepayBaseAndromeda = ({
  accountId,
  poolId,
  collateralTypeAddress,
  debtChange,
  availableUSDCollateral,
  collateralSymbol,
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  availableUSDCollateral?: Wei;
  debtChange: Wei;
  collateralSymbol?: string;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: systemToken } = useSystemToken();
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const { data: priceUpdateTx } = useCollateralPriceUpdates();
  const { data: usdTokens } = useGetUSDTokens();

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
          systemToken &&
          SpotMarketProxy &&
          usdTokens?.sUSD
        )
      ) {
        return;
      }

      if (!availableUSDCollateral) return;
      if (debtChange.eq(0)) return;
      const debtChangeAbs = debtChange.abs();
      const amountToDeposit = debtChangeAbs.sub(availableUSDCollateral);
      const collateralAmount = amountToDeposit.gt(0)
        ? parseUnits(amountToDeposit.toString(), 6)
        : BigNumber.from(0);

      try {
        dispatch({ type: 'prompting' });

        const spotMarketId = getSpotMarketId(collateralSymbol);

        // USDC or stataUSDC to sUSDC or sStataUSDC
        const wrap = collateralAmount.gt(0)
          ? SpotMarketProxy.populateTransaction.wrap(spotMarketId, collateralAmount, 0)
          : undefined;

        const Synth_Contract = new ethers.Contract(collateralTypeAddress, approveAbi, signer);
        const synth_approval = amountToDeposit.gt(0)
          ? Synth_Contract.populateTransaction.approve(
              SpotMarketProxy.address,
              amountToDeposit.toBN()
            )
          : undefined;

        // sUSDC or sStataUSDC => snxUSD
        const sell_synth = amountToDeposit.gt(0)
          ? SpotMarketProxy.populateTransaction.sell(
              spotMarketId,
              amountToDeposit.toBN(),
              0,
              ethers.constants.AddressZero
            )
          : undefined;

        // approve sUSD to Core
        const sUSD_Contract = new ethers.Contract(systemToken.address, approveAbi, signer);
        const sUSD_Approval = amountToDeposit.gt(0)
          ? sUSD_Contract.populateTransaction.approve(CoreProxy.address, amountToDeposit.toBN())
          : undefined;

        // Only deposit if user doesn't have enough sUSD collateral
        const deposit = amountToDeposit.lte(0)
          ? undefined
          : CoreProxy.populateTransaction.deposit(
              BigNumber.from(accountId),
              systemToken.address,
              amountToDeposit.toBN() // only deposit what's needed
            );

        const burn = CoreProxy.populateTransaction.burnUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          debtChangeAbs.toBN()
        );

        const callsPromise = Promise.all(
          [wrap, synth_approval, sell_synth, sUSD_Approval, deposit, burn].filter(notNil)
        );

        const [calls, gasPrices] = await Promise.all([callsPromise, getGasPrice({ provider })]);
        if (priceUpdateTx) {
          calls.push(priceUpdateTx as any);
        }

        const walletAddress = await signer.getAddress();
        const erc7412Tx = await withERC7412(network, calls, 'useRepay', walletAddress);

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
