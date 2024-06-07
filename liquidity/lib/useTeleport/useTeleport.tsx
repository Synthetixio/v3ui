import { useReducer } from 'react';
import { ethers } from 'ethers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMutation } from '@tanstack/react-query';
import { useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

/**
 * This is the function that estimates the fee for the teleport.
 * value is used to pay for the chainlink + destination fee.
 * We don't know how much that is, so we use a static call with a lot of eth
 * Then call will return the fee we need to pay.
 * This can also be called from the component to show the fee before the user clicks on the button.
 */
export const estimateTeleport = async ({
  CoreProxy,
  toNetworkId,
  amount,
  ethBalance,
}: {
  CoreProxy: ethers.Contract;
  toNetworkId: number;
  amount: Wei;
  ethBalance: Wei;
}) => {
  const fee = await CoreProxy.callStatic.transferCrossChain(toNetworkId, amount.toBN(), {
    value: ethBalance.mul(0.9).toBN(),
  });
  return fee;
};
export const useTeleport = ({
  toNetworkId,
  amount,
  ethBalance,
}: {
  toNetworkId: number;
  amount: Wei;
  ethBalance?: Wei;
}) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!signer || !CoreProxy || !provider) throw new Error('No signer or CoreProxy');

      if (!ethBalance) return;
      if (ethBalance.eq(0)) return;
      if (amount.eq(0)) return;

      try {
        dispatch({ type: 'prompting' });
        const fee = await estimateTeleport({
          CoreProxy,
          toNetworkId,
          amount,
          ethBalance,
        });
        const gasPricesPromised = getGasPrice({ provider });
        const gasLimitPromised = CoreProxy.estimateGas.transferCrossChain(
          toNetworkId,
          amount.toBN(),
          { value: fee }
        );

        const populatedTxnPromised = CoreProxy.populateTransaction.transferCrossChain(
          toNetworkId,
          amount.toBN(),
          {
            gasLimit: gasLimitPromised,
            value: fee,
          }
        );
        const [gasPrices, gasLimit, populatedTxn] = await Promise.all([
          gasPricesPromised,
          gasLimitPromised,
          populatedTxnPromised,
        ]);

        const gasOptionsForTransaction = formatGasPriceForTransaction({
          gasLimit,
          gasPrices,
          gasSpeed,
        });

        const txn = await signer.sendTransaction({ ...populatedTxn, ...gasOptionsForTransaction });
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
