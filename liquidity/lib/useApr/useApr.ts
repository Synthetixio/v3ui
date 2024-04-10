import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useGetPnl } from '@snx-v3/useGetPnl';
import { useRewardsApr } from '@snx-v3/useRewardsApr';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';

export function useApr() {
  const { network } = useNetwork();

  const { data: pnlData } = useGetPnl();
  const { data: rewardsAprData } = useRewardsApr();

  return useQuery({
    queryKey: ['apr', network?.id],
    queryFn: async () => {
      if (!pnlData || !rewardsAprData) throw 'Missing data required for useApr';
      // PNLS for the last week
      const { pnls } = pnlData;

      const pnlsPercentWithRewards = pnls.map((pnl, i) => {
        const { pnlValue, collateralAmount } = pnl;
        // const rewards = rewardsUSDPerDay[i];
        const rewardsOnDay = rewardsAprData[i];

        // Add the amounts from rewards to the pnls from the vault
        // Divide by collateral amount to get the percentage
        const pnlPercent = pnlValue.div(collateralAmount).mul(100);
        const rewardsPercent = wei(rewardsOnDay).div(collateralAmount).mul(100);

        return {
          pnl: pnlPercent.toNumber(),
          rewards: rewardsPercent.toNumber(),
        };
      });

      const weeklyAverageAprLP = pnlsPercentWithRewards.reduce((acc, { pnl }) => acc + pnl, 0);
      const weeklyAverageAprRewards = pnlsPercentWithRewards.reduce(
        (acc, { rewards }) => acc + rewards,
        0
      );

      const dailyAverageAprLp = weeklyAverageAprLP / pnlsPercentWithRewards.length;
      const dailyAverageAprRewards = weeklyAverageAprRewards / pnlsPercentWithRewards.length;

      const aprPnl = dailyAverageAprLp * 365;
      const aprRewards = dailyAverageAprRewards * 365;
      const combinedApr = (dailyAverageAprLp + dailyAverageAprRewards) * 365;

      return {
        aprPnl,
        aprRewards,
        combinedApr,
      };
    },
    enabled: !!pnlData && !!rewardsAprData && isBaseAndromeda(network?.id, network?.preset),
    staleTime: 60000,
  });
}
