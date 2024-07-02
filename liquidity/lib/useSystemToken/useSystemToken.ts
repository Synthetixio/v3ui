import { importSystemToken } from '@snx-v3/contracts';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export function useSystemToken(customNetwork?: Network | null) {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'SystemToken'],
    enabled: Boolean(targetNetwork),
    queryFn: async function () {
      if (!targetNetwork) {
        throw new Error('OMFG');
      }
      return await importSystemToken(targetNetwork.id, targetNetwork.preset);
    },
    staleTime: Infinity,
  });
}
