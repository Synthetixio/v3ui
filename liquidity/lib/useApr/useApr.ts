import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
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
          combinedApr: data.aprCombined * 100,
        };
      } catch (error) {
        return;
      }
    },
    enabled: isBaseAndromeda(network?.id, network?.preset),
    staleTime: 60000,
  });
}
