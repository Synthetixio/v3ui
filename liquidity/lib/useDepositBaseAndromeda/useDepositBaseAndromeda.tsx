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
import { getSpotMarketId } from '@snx-v3/isBaseAndromeda';
import { approveAbi } from '@snx-v3/useApprove';
import { useCollateralPriceUpdates } from '../useCollateralPriceUpdates';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

export const useDepositBaseAndromeda = ({
  accountId,
  newAccountId,
  poolId,
  collateralTypeAddress,
  collateralChange,
  currentCollateral,
  availableCollateral,
  collateralSymbol,
}: {
  accountId?: string;
  newAccountId: string;
  poolId?: string;
  collateralTypeAddress?: string;
  currentCollateral: Wei;
  availableCollateral?: Wei;
  collateralChange: Wei;
  collateralSymbol?: string;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const { data: priceUpdateTx } = useCollateralPriceUpdates();
  const { data: usdTokens } = useGetUSDTokens();
  const { data: collateralType } = useCollateralType(collateralSymbol);

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
          usdTokens?.sUSD
        )
      ) {
        return;
      }
      if (collateralChange.eq(0)) return;

      try {
        // Steps:
        // 1. Create an account if not exists
        // 2. Wrap USDC or stataUSDC to sUSDC or sStataUSDC
        // 3. Approve sUSDC or sStataUSDC
        // 4. Deposit sUSDC or sStataUSDC
        // 5. Delegate collateral

        dispatch({ type: 'prompting' });
        const id = accountId ?? newAccountId;

        // create account only when no account exists
        const createAccount = accountId
          ? undefined
          : CoreProxy.populateTransaction['createAccount(uint128)'](BigNumber.from(id));

        const amount = collateralChange.sub(availableCollateral);

        const collateralAmount = amount.gt(0)
          ? parseUnits(amount.toString(), 6)
          : BigNumber.from(0);

        const spotMarketId = getSpotMarketId(collateralSymbol);
        const amountD18 = amount.gt(0) ? parseUnits(amount.toString(), 18) : BigNumber.from(0);

        // Wrap
        const wrap = collateralAmount.gt(0)
          ? SpotMarketProxy.populateTransaction.wrap(spotMarketId, collateralAmount, amountD18)
          : undefined;

        // Synth
        const synthAddress = collateralType?.tokenAddress;
        if (!synthAddress) {
          throw 'synth not found';
        }
        const synthContract = new ethers.Contract(synthAddress, approveAbi, signer);

        const synthApproval = amountD18.gt(0)
          ? synthContract.populateTransaction.approve(CoreProxy.address, amountD18)
          : undefined;

        // optionally deposit if available collateral not enough
        const deposit = amountD18.gt(0)
          ? CoreProxy.populateTransaction.deposit(
              BigNumber.from(id),
              synthAddress,
              amountD18 // only deposit what's needed
            )
          : undefined;

        const delegate = CoreProxy.populateTransaction.delegateCollateral(
          BigNumber.from(id),
          BigNumber.from(poolId),
          synthAddress,
          currentCollateral.toBN().add(parseUnits(collateralChange.toString(), 18)).toString(),
          wei(1).toBN()
        );

        const callsPromise = Promise.all(
          [wrap, synthApproval, createAccount, deposit, delegate].filter(notNil)
        );

        const [calls, gasPrices] = await Promise.all([callsPromise, getGasPrice({ provider })]);

        if (priceUpdateTx) {
          calls.unshift(priceUpdateTx as any);
        }

        const walletAddress = await signer.getAddress();

        const erc7412Tx = await withERC7412(
          network,
          calls,
          'useDepositBaseAndromeda',
          walletAddress
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
