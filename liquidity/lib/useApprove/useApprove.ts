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
import { utils } from 'ethers';
import { useTokenPrice } from '../useTokenPrice';
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

export const useApproveStata = ({ amount }: { amount: BigNumberish }) => {
  const { activeWallet } = useWallet();
  const price = useTokenPrice('stataUSDC');

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

  // useApproval returns decimals 18
  const stataAllowance = allowanceStata && utils.parseUnits(allowanceStata?.toString(), 18);
  const usdcAllowance = allowanceUSDC && utils.parseUnits(allowanceUSDC?.toString(), 18);

  const amountToApproveUSDC = wei(amount, 6, true).mul(price).toBN();
  const amountToApproveStata = BigNumber.from(amount);

  // TODO: Multiply USDC amount by stata exchange rate
  const stataNeedsApproval = stataAllowance?.lt(amountToApproveStata);
  const usdcNeedsApproval = usdcAllowance?.lt(1);

  const requireApproval = stataNeedsApproval || usdcNeedsApproval;

  console.log('Stata needs approval:', stataNeedsApproval);
  console.log('USDC needs approval:', usdcNeedsApproval);

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
        dispatch({ type: 'prompting' });

        const usdcContract = new ethers.Contract(USDC_BASE_ADDRESS, usdcAbi, signer);
        const stataContract = new ethers.Contract(STATA_BASE_ADDRESS, stataAbi, signer);

        let txn: ethers.ContractTransaction;

        if (stataNeedsApproval) {
          txn = await stataContract.approve(
            activeWallet?.address,
            infiniteApproval ? ethers.constants.MaxUint256 : amountToApproveStata
          );
          dispatch({ type: 'pending', payload: { txnHash: txn?.hash } });
          await txn?.wait();
        }

        if (usdcNeedsApproval) {
          txn = await usdcContract.approve(
            STATA_BASE_ADDRESS,
            infiniteApproval ? ethers.constants.MaxUint256 : amountToApproveUSDC
          );
          dispatch({ type: 'pending', payload: { txnHash: txn?.hash } });
          await txn?.wait();
        }

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
