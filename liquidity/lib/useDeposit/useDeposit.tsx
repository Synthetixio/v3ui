import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber } from 'ethers';

import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { withERC7412 } from '@snx-v3/withERC7412';
import { notNil } from '@snx-v3/tsHelpers';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';

export const useDeposit = ({
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
  const { data: collateralPriceUpdates } = useAllCollateralPriceIds();

  const network = useNetwork();
  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();
  const mutation = useMutation({
    mutationFn: async () => {
      if (
        !(
          signer &&
          CoreProxy &&
          poolId &&
          collateralTypeAddress &&
          availableCollateral &&
          collateralPriceUpdates
        )
      ) {
        return;
      }
      if (collateralChange.eq(0)) return;

      try {
        dispatch({ type: 'prompting' });
        const walletAddress = await signer.getAddress();
        const id = accountId ?? newAccountId;

        // create account only when no account exists
        const createAccount = accountId
          ? undefined
          : CoreProxy.populateTransaction['createAccount(uint128)'](BigNumber.from(id));

        // optionally deposit if available collateral not enough
        const deposit = availableCollateral.gte(collateralChange)
          ? undefined
          : CoreProxy.populateTransaction.deposit(
              BigNumber.from(id),
              collateralTypeAddress,
              collateralChange.sub(availableCollateral).toBN() // only deposit what's needed
            );
        const delegate = CoreProxy.populateTransaction.delegateCollateral(
          BigNumber.from(id),
          BigNumber.from(poolId),
          collateralTypeAddress,
          currentCollateral.add(collateralChange).toBN(),
          wei(1).toBN()
        );
        const callsPromise = Promise.all([createAccount, deposit, delegate].filter(notNil));
        const collateralPriceCallsPromise = fetchPriceUpdates(
          collateralPriceUpdates,
          network.isTestnet
        ).then((signedData) =>
          priceUpdatesToPopulatedTx(walletAddress, collateralPriceUpdates, signedData)
        );
        const [calls, gasPrices, collateralPriceCalls] = await Promise.all([
          callsPromise,
          getGasPrice({ provider }),
          collateralPriceCallsPromise,
        ]);
        const allCalls = collateralPriceCalls.concat(calls);
        const erc7412Tx = await withERC7412(provider, allCalls, 'useDeposit');

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
    isLoading: mutation.isLoading,
    exec: mutation.mutateAsync,
  };
};
