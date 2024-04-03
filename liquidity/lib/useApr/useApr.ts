import { getSubgraphUrl } from '@snx-v3/constants';
import { useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { useGetPnl } from '@snx-v3/useGetPnl';
import { useQuery } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { addSeconds, isAfter, isBefore, subDays } from 'date-fns';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { Contract } from 'ethers';

const PoolsDistributorDocument = `query GetPoolDistributors {
    pool(id: "1") {
      registered_distributors(where: { isActive:true }) {
        id
        rewards_distributions {
          id
          collateral_type
          amount
          start
          duration
        }
      }
    }
  }`;

interface DistributorInterface {
  id: string;
  rewards_distributions: {
    id: string;
    collateral_type: string;
    amount: string;
    start: string;
    duration: string;
  }[];
}

export function useApr() {
  const { data: pnlData } = useGetPnl();
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();
  const provider = useProvider();

  return useQuery({
    queryKey: ['apr', network?.id],
    queryFn: async () => {
      if (!CoreProxy || !provider || !pnlData) throw 'Missing data required for useApr';
      // Get rewards for the last week
      const { pnls } = pnlData;
      const url = getSubgraphUrl(network?.name);

      const { data: returnData } = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: PoolsDistributorDocument,
        }),
      }).then((res) => res.json());

      const activeRewards: { index: number; amount: number; distributor: string }[] = [];

      // Check if they are active
      returnData.pool.registered_distributors.map((distributor: DistributorInterface) => {
        const { id } = distributor;

        distributor.rewards_distributions.forEach((distribution) => {
          const start = new Date(parseInt(distribution.start) * 1000);
          const duration = parseInt(distribution.duration);
          const end = addSeconds(start, duration);

          const amount = wei(distribution.amount, 18, true);

          // Last 7 days
          const periods = Array.from({ length: 7 }, (_, i) => i).map((i) => subDays(new Date(), i));

          periods.forEach((period, index) => {
            const isAfterStart = isAfter(period, start);
            const isBeforeEnd = isBefore(period, end);

            if (isAfterStart && isBeforeEnd) {
              const amountPerDay = (24 * 60 * 60 * amount.toNumber()) / duration;

              // Calculate the amount distributed
              activeRewards.push({
                index,
                distributor: id,
                amount: amountPerDay,
              });
            }
          });
        });
      });

      // TODO: Get the collateral price by looking up
      // the address from the subgraph
      const snxDistributor = '0x45063dcd92f56138686810eacb1b510c941d6593';
      const abi = ['function latestAnswer() view returns (int256)'];

      // TODO: Move this into a hook for each network
      const snxBaseAggregator = new Contract(
        '0xe3971Ed6F1A5903321479Ef3148B5950c0612075',
        abi,
        provider
      );

      const snxPrice = wei(await snxBaseAggregator.latestAnswer(), 18, true);

      // Sort by index and get average price for non stable collateral
      const rewardsToAmounts = activeRewards
        .map((reward) => {
          return {
            ...reward,
            amountUSD:
              reward.distributor === snxDistributor
                ? reward.amount * snxPrice.div(8).toNumber()
                : reward.amount,
          };
        })
        .sort((a, b) => a.index - b.index);

      const rewardsUSDPerDay: number[] = [];

      rewardsToAmounts.forEach((reward) => {
        if (!rewardsUSDPerDay[reward.index]) {
          rewardsUSDPerDay[reward.index] = 0;
        }

        rewardsUSDPerDay[reward.index] += reward.amountUSD;
      });

      const pnlsPercentWithRewards = pnls.map((pnl, i) => {
        const { pnlValue, collateralAmount } = pnl;
        const rewards = rewardsUSDPerDay[i];
        // Add the amounts from rewards to the pnls from the vault
        // Divide by collateral amount to get the percentage
        const pnlPercent = pnlValue.add(rewards).div(collateralAmount).mul(100);

        return pnlPercent;
      });

      const weeklyAprLP = pnlsPercentWithRewards.reduce((acc, pnl) => acc + pnl.toNumber(), 0);
      const dailyAverageApr = weeklyAprLP / pnlsPercentWithRewards.length;

      return {
        apr: dailyAverageApr * 365,
      };
    },
    enabled: !!pnlData,
  });
}
