import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';
import { importRewardsDistributors } from '@snx-v3/contracts';

export function useRewardsDistributors(customNetwork?: Network) {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;

  return useQuery({
    enabled: Boolean(targetNetwork),
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'RewardsDistributors'],
    queryFn: async function () {
      if (!targetNetwork) {
        throw new Error('OMG');
      }
      const rewardDistributors = await importRewardsDistributors(
        targetNetwork?.id,
        targetNetwork?.preset
      );
      return rewardDistributors;
    },
    staleTime: Infinity,
  });
}
