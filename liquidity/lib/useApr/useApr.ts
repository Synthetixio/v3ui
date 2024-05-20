import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export function useApr(customNetwork?: Network) {
  const { network } = useNetwork();
  const chain = network || customNetwork;

  return useQuery({
    queryKey: ['apr', chain?.id],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.synthetix.io/v3/base/sc-pool-apy');

        const data = await response.json();

        return {
          // 0 meaning not the right network
          combinedApr: chain?.id === 8453 || chain?.id === 84532 ? data.aprCombined * 100 : 0,
        };
      } catch (error) {
        return;
      }
    },
    staleTime: 60000,
  });
}
