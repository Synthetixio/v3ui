import { getAprUrl } from '@snx-v3/constants';
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

const supportedAprNetworks = [8453, 84532, 42161];

export async function fetchApr(networkId?: number) {
  const response = await fetch(getAprUrl(networkId));

  const data = await response.json();

  return {
    // 0 meaning not the right network
    combinedApr: networkId && supportedAprNetworks.includes(networkId) ? data.apr28d * 100 : 0,
    cumulativePnl: networkId && supportedAprNetworks.includes(networkId) ? data.cumulativePnl : 0,
  };
}
