import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';
import { importRewardsDistributors } from '@snx-v3/contracts';

export function useRewardsDistributors(customNetwork?: Network) {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'RewardsDistributors'],
    queryFn: async function () {
      if (!targetNetwork) throw new Error('useRewardsDistributors should be disabled');

      return importRewardsDistributors(targetNetwork?.id, targetNetwork?.preset);
    },
    enabled: Boolean(targetNetwork),
    staleTime: Infinity,
  });
}
