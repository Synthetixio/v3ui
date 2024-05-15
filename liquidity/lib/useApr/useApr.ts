import { useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export function useApr() {
  const { network } = useNetwork();

  return useQuery({
    queryKey: ['apr', network?.id],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.synthetix.io/v3/base/sc-pool-apy');

        const data = await response.json();

        return {
          // 0 meaning not the right network
          combinedApr: network?.id === 8453 || network?.id === 84532 ? data.aprCombined * 100 : 0,
        };
      } catch (error) {
        return;
      }
    },
    staleTime: 60000,
  });
}
