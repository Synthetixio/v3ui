import { useReducer } from 'react';
import { useAllowance } from '@snx-v3/useAllowance';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { useMutation } from '@tanstack/react-query';
import { useProvider, useSigner, useWallet } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { STATA_BASE_ADDRESS, USDC_BASE_ADDRESS, stataAbi, usdcAbi } from '@snx-v3/isBaseAndromeda';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { wei } from '@synthetixio/wei';

export const approveAbi = ['function approve(address spender, uint256 amount) returns (bool)'];

export const useApprove = (
  {
    contractAddress,
    amount,
    spender,
  }: {
    contractAddress?: string;
    amount: BigNumberish;
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
        refetchAllowance();
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

export const useApproveStata = () => {
  console.log('Hello!!');
  const amount = BigNumber.from(211553395);
  console.log('Amount', amount.toString());
  const { activeWallet } = useWallet();
  const [txnState, dispatch] = useReducer(reducer, initialState);

  const signer = useSigner();
  const provider = useProvider();
  const { data: Multicall3 } = useMulticall3();

  const { data: allowanceStata, refetch: refetchAllowanceStata } = useAllowance({
    contractAddress: STATA_BASE_ADDRESS,
    spender: activeWallet?.address,
  });

  const { data: allowanceUSDC, refetch: refetchAllowanceUSDC } = useAllowance({
    contractAddress: USDC_BASE_ADDRESS,
    spender: STATA_BASE_ADDRESS,
  });

  const stataAllowance = wei(allowanceStata || 0).mul(10 ** 12);
  const usdcAllowance = wei(allowanceUSDC || 0).mul(10 ** 12);
  const amountToApprove = wei(amount || 1, 6, true);

  // TODO: Multiply USDC amount by stata exchange rate
  const stataNeedsApproval = stataAllowance?.lt(amountToApprove);
  const usdcNeedsApproval = usdcAllowance?.lt(amountToApprove);

  const requireApproval = stataNeedsApproval || usdcNeedsApproval;
  console.log('Requires approval', requireApproval);

  const mutation = useMutation({
    mutationFn: async (infiniteApproval: boolean) => {
      if (
        !signer ||
        !provider ||
        !Multicall3 ||
        !activeWallet?.address ||
        !allowanceStata ||
        !allowanceUSDC
      )
        throw new Error('Insufficient data to approve');

      try {
        console.log('Made it here');
        dispatch({ type: 'prompting' });

        const usdcContract = new ethers.Contract(USDC_BASE_ADDRESS, usdcAbi, signer);
        const stataContract = new ethers.Contract(STATA_BASE_ADDRESS, stataAbi, signer);

        const totalApprovalAmount = infiniteApproval
          ? ethers.constants.MaxUint256
          : amountToApprove;

        const usdcTx = usdcContract.populateTransaction.approve(
          STATA_BASE_ADDRESS,
          totalApprovalAmount
        );

        const stataTx = stataContract.populateTransaction.approve(
          activeWallet?.address,
          totalApprovalAmount
        );

        const calls: any = [];

        // This will me mul by exchange rate
        if (stataNeedsApproval) {
          calls.concat(stataTx);
        }

        if (usdcNeedsApproval) {
          calls.concat(usdcTx);
        }

        if (calls.length === 0) {
          dispatch({ type: 'success' });
          return;
        }

        const txn = await Multicall3?.callStatic.aggregate(calls);
        console.log('Txn', txn);

        dispatch({ type: 'pending', payload: { txnHash: '123' } });

        // await txn.wait();
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
    isLoading: mutation.isPending,
    approve: mutation.mutateAsync,
    refetchAllowance: () => {
      refetchAllowanceStata();
      refetchAllowanceUSDC();
    },
    requireApproval,
  };
};
