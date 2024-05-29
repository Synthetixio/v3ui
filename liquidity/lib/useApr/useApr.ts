import { useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export function useApr() {
  const { network } = useNetwork();

  return useQuery({
    queryKey: ['apr', network?.id],
    queryFn: async () => {
      // 0 meaning not the right network
      if (network?.id === 8453 || network?.id === 84532) return { combinedApr: 0 };
      try {
        const response = await fetch('https://api.synthetix.io/v3/base/sc-pool-apy');

        const data = await response.json();
        if (Array.isArray(data)) {
          return {
            // 0 meaning not the right network
            combinedApr: data[0].aprCombined * 100,
          };
        }
        return {
          data.aprCombined * 100
        };
      } catch (error) {
        return;
      }
    },
    staleTime: 60000,
  });
}
