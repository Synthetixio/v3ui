import { getAprUrl } from '@snx-v3/constants';
import { ARBITRUM, BASE_ANDROMEDA, BASE_SEPOLIA, Network, useNetwork } from '@snx-v3/useBlockchain';
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
    enabled: Boolean(chain?.id),
  });
}

const supportedAprNetworks = [BASE_ANDROMEDA.id, BASE_SEPOLIA.id, ARBITRUM.id];

export async function fetchApr(networkId?: number) {
  try {
    const isSupported = networkId && supportedAprNetworks.includes(networkId);
    if (!isSupported) throw new Error('Apr endpoint not supported for this network');

    const response = await fetch(getAprUrl(networkId));

    const data = await response.json();

    // Arbitrum has multiple collateral types
    const highestAprCollateral =
      networkId === BASE_ANDROMEDA.id
        ? data
        : data?.sort((a: { apr24h: number }, b: { apr24h: number }) => b.apr24h - a.apr24h)[0];

    return {
      combinedApr: isSupported
        ? networkId === ARBITRUM.id
          ? highestAprCollateral.apr24h * 100
          : highestAprCollateral.apr28d * 100
        : 0,
      cumulativePnl: isSupported ? highestAprCollateral.cumulativePnl : 0,
      collateralAprs: networkId === BASE_ANDROMEDA.id ? [data] : data,
    };
  } catch (error) {
    console.error(error);
    return {
      combinedApr: 0,
      cumulativePnl: 0,
      collateralAprs: [],
    };
  }
}
