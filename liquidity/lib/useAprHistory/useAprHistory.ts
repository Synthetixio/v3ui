import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

interface PoolData {
  apr7d: number;
  apr7dPnl: number;
  apr7dRewards: number;
  apr24h: number;
  apr24hPnl: number;
  apr24hRewards: number;
  apr28d: number;
  apr28dPnl: number;
  apr28dRewards: number;
  aprCombined: number;
  aprPnl: number;
  aprRewards: number;
  apy7d: number;
  apy7dPnl: number;
  apy7dRewards: number;
  apy24h: number;
  apy24hPnl: number;
  apy24hRewards: number;
  apy28d: number;
  apy28dPnl: number;
  apy28dRewards: number;
  collateralType: string;
  collateralValue: number;
  cumulativeIssuance: number;
  cumulativePnl: number;
  debtAmount: number;
  hourlyIssuance: number;
  hourlyPnl: number;
  hourlyPnlPct: number;
  hourlyRewardsPct: number;
  poolId: number;
  rewardsUSD: number;
  timestamp: string;
}

const sevenDays = new Date();
sevenDays.setDate(sevenDays.getDate() - 7);
const sevenWeeks = new Date();
sevenWeeks.setDate(sevenWeeks.getDate() - 7 * 7);
const sevenMonth = new Date();
sevenMonth.setDate(sevenMonth.getDate() - 7 * 4 * 7);
const oneYear = new Date();
oneYear.setDate(oneYear.getDate() - 365);

export function useAprHistory(customNetwork?: Network) {
  const { network } = useNetwork();
  const chain = network || customNetwork;

  return useQuery({
    queryKey: ['apr-history', chain?.id],
    queryFn: async () => {
      if (!chain?.id) return {};
      try {
        const response = await fetch('https://api.synthetix.io/v3/base/sc-pool-apy-history');

        const data: PoolData[] = await response.json();

        const sevenDaysAPR = data
          .filter((d) => new Date(d.timestamp).getTime() >= sevenDays.getTime())
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.apr24h * 100,
            pnl: d.apr24hPnl * 100,
            rewards: d.apr24hRewards * 100,
            combined: d.aprCombined * 100,
          }))
          .reverse();

        const sevenWeeksAPR = data
          .filter((d) => new Date(d.timestamp).getTime() >= sevenWeeks.getTime())
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.apr7d * 100,
            pnl: d.apr7dPnl * 100,
            rewards: d.apr7dRewards * 100,
            combined: d.aprCombined * 100,
          }))
          .filter((_, index) => index % 7 === 0)
          .reverse();
        const sevenMonthAPR = data
          .filter((d) => new Date(d.timestamp).getTime() >= sevenMonth.getTime())
          .filter((_, index) => index % 30 === 0)
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.apr28d * 100,
            pnl: d.apr28dPnl * 100,
            rewards: d.apr28dRewards * 100,
            combined: d.aprCombined * 100,
          }))
          .reverse();
        const oneYearAPR = data
          .filter((d) => new Date(d.timestamp).getTime() >= oneYear.getTime())
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.apr28d * 100,
            pnl: d.apr28dPnl * 100,
            rewards: d.apr28dRewards * 100,
            combined: d.aprCombined * 100,
          }))
          .reverse();

        const sevenDaysTVL = data
          .filter((d) => new Date(d.timestamp).getTime() >= sevenDays.getTime())
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.collateralValue,
          }))
          .reverse();
        const sevenWeeksTVL = data
          .filter((d) => new Date(d.timestamp).getTime() >= sevenWeeks.getTime())
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.collateralValue,
          }))
          .filter((_, index) => index % 7 === 0)
          .reverse();
        const sevenMonthTVL = data
          .filter((d) => new Date(d.timestamp).getTime() >= sevenMonth.getTime())
          .filter((_, index) => index % 30 === 0)
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.collateralValue,
          }))
          .reverse();
        const oneYearTVL = data
          .filter((d) => new Date(d.timestamp).getTime() >= oneYear.getTime())
          .map((d) => ({
            timestamp: d.timestamp,
            value: d.collateralValue,
          }))
          .reverse();
        return {
          sevenDaysTVL,
          sevenWeeksTVL,
          sevenMonthTVL,
          oneYearTVL,
          allTVL: data
            .map((d) => ({
              timestamp: d.timestamp,
              value: d.collateralValue,
            }))
            .reverse(),
          allAPR: data
            .map((d) => ({
              timestamp: d.timestamp,
              value: d.apr24h * 100,
              pnl: d.apr24hPnl * 100,
              rewards: d.apr24hRewards * 100,
              combined: d.aprCombined * 100,
            }))
            .reverse(),
          sevenDaysAPR,
          sevenWeeksAPR,
          sevenMonthAPR,
          oneYearAPR,
        };
      } catch (error) {
        return;
      }
    },
  });
}
