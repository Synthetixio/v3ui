import { getAprUrl } from '@snx-v3/constants';
import { ARBITRUM, BASE_ANDROMEDA, MAINNET, Network, useNetwork } from '@snx-v3/useBlockchain';
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

const supportedAprNetworks = [BASE_ANDROMEDA.id, ARBITRUM.id, MAINNET.id];

export async function fetchApr(networkId?: number) {
  try {
    const isSupported = networkId && supportedAprNetworks.includes(networkId);
    if (!isSupported) throw new Error('Apr endpoint not supported for this network');

    const response = await fetch(getAprUrl(networkId));

    const data = await response.json();

    const highestAprCollateral = data?.sort(
      (a: { apr28d: number }, b: { apr28d: number }) => b.apr28d - a.apr28d
    )[0];

    return {
      combinedApr: highestAprCollateral.apr28d * 100,
      cumulativePnl: isSupported ? highestAprCollateral.cumulativePnl : 0,
      collateralAprs: data,
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
