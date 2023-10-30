import { useReducer } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { initialState, reducer } from '@snx-v3/txnReducer';
import { useNetwork } from '@snx-v3/useBlockchain';

export function useClaimRewards(
  poolId?: string,
  collateralAddress?: string,
  accountId?: string,
  distributorAddress?: string,
  amount?: number
) {
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: async function () {
      try {
        if (!amount) return;
        if (!poolId || !collateralAddress || !accountId || !distributorAddress)
          throw new Error('Parameters Undefined');
        if (!CoreProxy) throw new Error('CoreProxy undefined');

        dispatch({ type: 'prompting' });

        const tx = await CoreProxy.claimRewards(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralAddress,
          distributorAddress
        );

        dispatch({ type: 'pending', payload: { txnHash: tx.hash } });

        const res = await tx.wait();

        let claimedAmount: BigNumber | undefined;

        res.logs.forEach((log: any) => {
          if (log.topics[0] === CoreProxy.interface.getEventTopic('RewardsClaimed')) {
            const { amount } = CoreProxy.interface.decodeEventLog(
              'RewardsClaimed',
              log.data,
              log.topics
            );
            claimedAmount = amount;
          }
        });

        dispatch({ type: 'success' });
        client.invalidateQueries({ queryKey: [`${network.id}-${network.preset}`, 'Rewards'] });
        return claimedAmount;
      } catch (error) {
        const err = error as Error;
        dispatch({ type: 'error', payload: { error: err } });

        return 0;
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
}
