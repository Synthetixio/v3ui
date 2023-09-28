import { useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { initialState, reducer } from '@snx-v3/txnReducer';

export function useClaimRewards(
  poolId?: string,
  collateralAddress?: string,
  accountId?: string,
  distributorAddress?: string
) {
  const { data: CoreProxy } = useCoreProxy();
  const [txnState, dispatch] = useReducer(reducer, initialState);

  const mutation = useMutation({
    mutationFn: async function () {
      if (!poolId || !collateralAddress || !accountId || !distributorAddress)
        throw new Error('Parameters Undefined');
      if (!CoreProxy) throw new Error('CoreProxy undefined');

      const tx = await CoreProxy.claimRewards(
        BigNumber.from(accountId),
        BigNumber.from(poolId),
        collateralAddress,
        distributorAddress
      );

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

      return claimedAmount;
    },
  });

  return {
    mutation,
    txnState,
    settle: () => dispatch({ type: 'settled' }),
    isLoading: mutation.isLoading,
    exec: mutation.mutateAsync,
  };
}
