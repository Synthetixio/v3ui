import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber, ethers } from 'ethers';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { withERC7412 } from '@snx-v3/withERC7412';
import { notNil } from '@snx-v3/tsHelpers';
import { useSpotMarketProxy } from '../useSpotMarketProxy';
import { parseUnits } from '@snx-v3/format';
import { USDC_BASE_MARKET } from '@snx-v3/isBaseAndromeda';
import { approveAbi } from '@snx-v3/useApprove';
import { useCollateralPriceUpdates } from '../useCollateralPriceUpdates';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export const useDepositBaseAndromeda = ({
  accountId,
  newAccountId,
  poolId,
  collateralTypeAddress,
  collateralChange,
  currentCollateral,
  availableCollateral,
}: {
  accountId?: string;
  newAccountId: string;
  poolId?: string;
  collateralTypeAddress?: string;
  currentCollateral: Wei;
  availableCollateral?: Wei;
  collateralChange: Wei;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const { data: priceUpdateTx } = useCollateralPriceUpdates();
  const { data: usdTokens } = useGetUSDTokens();

  const { gasSpeed } = useGasSpeed();

  const { network } = useNetwork();
  const signer = useSigner();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (
        !(
          network &&
          provider &&
          signer &&
          CoreProxy &&
          SpotMarketProxy &&
          poolId &&
          collateralTypeAddress &&
          availableCollateral &&
          usdTokens?.USDC
        )
      ) {
        return;
      }
      if (collateralChange.eq(0)) return;

      try {
        dispatch({ type: 'prompting' });
        const id = accountId ?? newAccountId;

        // create account only when no account exists
        const createAccount = accountId
          ? undefined
          : CoreProxy.populateTransaction['createAccount(uint128)'](BigNumber.from(id));

        const amount = collateralChange.sub(availableCollateral);
        const usdcAmount = amount.gt(0) ? parseUnits(amount.toString(), 6) : BigNumber.from(0);
        const amountD18 = amount.gt(0) ? parseUnits(amount.toString(), 18) : BigNumber.from(0);

        // Wrap USDC to sUSDC
        const sUSDC_ADDRESS = usdTokens.USDC;
        const wrap = usdcAmount.gt(0)
          ? SpotMarketProxy.populateTransaction.wrap(USDC_BASE_MARKET, usdcAmount, amountD18)
          : undefined;

        const sUSDC_Contract = new ethers.Contract(sUSDC_ADDRESS, approveAbi, signer);
        const sUSDCApproval = amountD18.gt(0)
          ? sUSDC_Contract.populateTransaction.approve(CoreProxy.address, amountD18)
          : undefined;

        // optionally deposit if available collateral not enough
        const deposit = amountD18.gt(0)
          ? CoreProxy.populateTransaction.deposit(
              BigNumber.from(id),
              sUSDC_ADDRESS,
              amountD18 // only deposit what's needed
            )
          : undefined;

        const delegate = CoreProxy.populateTransaction.delegateCollateral(
          BigNumber.from(id),
          BigNumber.from(poolId),
          sUSDC_ADDRESS,
          currentCollateral.toBN().add(parseUnits(collateralChange.toString(), 18)).toString(),
          wei(1).toBN()
        );

        const callsPromise = Promise.all(
          [wrap, sUSDCApproval, createAccount, deposit, delegate].filter(notNil)
        );

        const [calls, gasPrices] = await Promise.all([callsPromise, getGasPrice({ provider })]);

        if (priceUpdateTx) {
          calls.unshift(priceUpdateTx as any);
        }

        const erc7412Tx = await withERC7412(
          network,
          calls,
          'useDepositBaseAndromeda',
          CoreProxy.interface
        );

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
