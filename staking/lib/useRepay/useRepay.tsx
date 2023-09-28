import { useReducer } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { notNil } from '@snx-v3/tsHelpers';
import { withERC7412 } from '@snx-v3/withERC7412';

export const useRepay = ({
  accountId,
  poolId,
  collateralTypeAddress,
  debtChange,
  balance,
  availableUSDCollateral,
}: {
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  balance?: Wei;
  availableUSDCollateral?: Wei;
  debtChange: Wei;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { data: UsdProxy } = useUSDProxy();

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer) return;
      if (!(CoreProxy && poolId && accountId && collateralTypeAddress && UsdProxy)) return;
      if (!balance) return;
      if (!availableUSDCollateral) return;
      if (debtChange.eq(0)) return;
      const debtChangeAbs = debtChange.abs();
      const amountToDeposit = debtChangeAbs.sub(availableUSDCollateral);

      try {
        dispatch({ type: 'prompting' });
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

        const callsPromise = Promise.all([deposit, burn].filter(notNil));
        const [calls, gasPrices] = await Promise.all([callsPromise, getGasPrice({ provider })]);
        const erc7412Tx = await withERC7412(provider, calls);

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
