import { useReducer } from 'react';
import { useAllowance } from '@snx-v3/useAllowance';
import { BigNumber, ethers } from 'ethers';
import { useMutation } from '@tanstack/react-query';
import { useProvider, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

const approveAbi = ['function approve(address spender, uint256 amount) returns (bool)'];

export const useApprove = (
  {
    contractAddress,
    amount,
    spender,
  }: {
    contractAddress?: string;
    amount: BigNumber;
    spender?: string;
  },
  eventHandlers?: {
    onSuccess?: () => void;
    onMutate?: () => void;
    onError?: (e: Error) => void;
  }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: allowance, refetch: refetchAllowance } = useAllowance({ contractAddress, spender });

  const sufficientAllowance = Boolean(allowance?.gte(amount));

  const signer = useSigner();
  const { gasSpeed } = useGasSpeed();
  const provider = useProvider();

  const mutation = useMutation({
    mutationFn: async (infiniteApproval: boolean) => {
      if (!signer || !contractAddress || !spender || !provider)
        throw new Error('Signer, contract address or spender is not defined');
      if (sufficientAllowance) return;

      try {
        dispatch({ type: 'prompting' });

        const contract = new ethers.Contract(contractAddress, approveAbi, signer);
        const amountToAppove = infiniteApproval ? ethers.constants.MaxUint256 : amount;

        const gasPricesPromised = getGasPrice({ provider });
        const gasLimitPromised = contract.estimateGas.approve(spender, amountToAppove);

        const populatedTxnPromised = contract.populateTransaction.approve(spender, amountToAppove, {
          gasLimit: gasLimitPromised,
        });

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
    ...eventHandlers,
  });
  return {
    mutation,
    txnState,
    isLoading: mutation.isPending,
    approve: mutation.mutateAsync,
    refetchAllowance,
    requireApproval: !sufficientAllowance,
  };
};
