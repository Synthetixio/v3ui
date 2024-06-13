import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

export function useApr(customNetwork?: Network) {
  const { network } = useNetwork();
  const chain = customNetwork || network;

  return useQuery({
    queryKey: ['apr', chain?.id],
    queryFn: async () => {
      try {
        return await fetchApr(chain?.id);
      } catch (error) {
        return;
      }
    },
    staleTime: 60000,
  });
}

export async function fetchApr(networkId?: number) {
  const response = await fetch('https://api.synthetix.io/v3/base/sc-pool-apy');

  const data = await response.json();

  return {
    // 0 meaning not the right network
    combinedApr: networkId === 8453 || networkId === 84532 ? data.aprCombined * 100 : 0,
    cumulativePnl: networkId === 8453 || networkId === 84532 ? data.cumulativePnl : 0,
  };
}
