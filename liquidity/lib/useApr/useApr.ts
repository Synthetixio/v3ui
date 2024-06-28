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
  try {
    const isSupported = networkId && supportedAprNetworks.includes(networkId);
    const response = await fetch(getAprUrl(networkId));

    const data = await response.json();

    // Arbitrum has multiple collateral types

    const highestAprCollateral = Array.isArray(data)
      ? data?.sort((a: { apr28d: number }, b: { apr28d: number }) => b.apr28d - a.apr28d)[0]
      : data;

    return {
      combinedApr: isSupported
        ? networkId === 42161
          ? highestAprCollateral.apr24h * 100
          : highestAprCollateral.apr28d * 100
        : 0,
      cumulativePnl: isSupported ? highestAprCollateral.cumulativePnl : 0,
      collateralAprs: networkId === 8453 ? [data] : data,
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
