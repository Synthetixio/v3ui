import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';
import { subDays, getUnixTime } from 'date-fns';

export function useApr(
  poolId = '1',
  collateralType = '0xC74EA762CF06C9151CE074E6A569A5945B6302E7'
) {
  const { network } = useNetwork();

  return useQuery({
    queryKey: ['apr', network?.id],
    queryFn: async () => {
      try {
        const utcZero = new Date().setUTCHours(0, 0, 0, 0);

        const now = getUnixTime(utcZero);
        const weekAgo = getUnixTime(subDays(utcZero, 7));

        const params = new URLSearchParams({
          poolId,
          collateralType,
          frame: 'day',
          fromTimestamp: weekAgo.toString(),
          toTimestamp: now.toString(),
        });

        const response = await fetch(
          `https://api.synthetix.gateway.fm/api/v1/rewards/yield?${params.toString()}`
        );

        const data = await response.json();

        const combinedApr =
          data.rollingAverages.reduce(
            (acc: number, currentValue: number) => acc + currentValue,
            0
          ) / data.rollingAverages.length;

        return {
          combinedApr: combinedApr * 365,
        };
      } catch (error) {
        return;
      }
    },
    enabled: isBaseAndromeda(network?.id, network?.preset),
    staleTime: 60000,
  });
}
