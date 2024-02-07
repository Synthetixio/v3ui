import { useMutation } from '@tanstack/react-query';
import { useReducer } from 'react';
import { useMulticall } from '../hooks/useMulticall';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { useGetUserVotingPower } from '../queries';
import { useProvider } from '@snx-v3/useBlockchain';

export function useCastVotes() {
  const { makeMulticall } = useMulticall();
  const provider = useProvider();

  const thing = useGetUserVotingPower('spartan');

  console.log({ thing });

  const [txnState, dispatch] = useReducer(reducer, initialState);

  return {
    ...useMutation({
      mutationFn: async () => {
        // (await getCouncilContract(council).connect(motherShipProvider).getCouncilMembers()) as
        //   | string[]
        //   | undefined;

        try {
          dispatch({ type: 'prompting' });
          // const txn = await Synthetix.signer.sendTransaction({
          //   ...populatedTransaction,
          //   ...gasOptionsForTransaction,
          // });
          dispatch({ type: 'pending', payload: { txnHash: '123' } });
          // await txn.wait();
          dispatch({ type: 'success' });
        } catch (error: any) {
          dispatch({ type: 'error', payload: { error } });
          throw error;
        }
      },
    }),
    // transactionFee: transactionPrice,
    // isGasEnabledAndNotFetched: gasFetching && !isGasFetched,
    // gasError: gasError as Error | null,
    settle: () => dispatch({ type: 'settled' }),
    ...txnState,
  };
}
