import { getSubgraphUrl } from '@snx-v3/constants';
import { useBlockNumber } from '@snx-v3/useBlockNumber';
import { useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { addSeconds, isAfter, isBefore, subDays } from 'date-fns';
import { Contract, providers } from 'ethers';

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

interface ActiveRewards {
  index: number;
  amount: number;
  distributor: string;
  amountUSD: number;
}

interface ReducedRewards {
  index: number;
  amountUSD: number;
}

export function useRewardsApr() {
  const { data: block } = useBlockNumber();
  const { network } = useNetwork();
  const provider = useProvider();

  return useQuery({
    queryKey: ['rewards-apr', network?.id],
    queryFn: async () => {
      if (!block || !provider) throw 'Missing data required for useRewardsApr';

      try {
        const blocks = block.lastPeriodBlocks;

        // TODO: Get the collateral address by looking up
        // the address from the subgraph (needs to be updated)
        const snxDistributor = '0x45063dcd92f56138686810eacb1b510c941d6593';
        const abi = ['function latestAnswer() view returns (int256)'];

        // TODO: Move this into a hook for each network
        const snxBaseAggregator = new Contract(
          '0xe3971Ed6F1A5903321479Ef3148B5950c0612075',
          abi,
          new providers.JsonRpcBatchProvider(network?.rpcUrl())
        );

        const url = getSubgraphUrl(network?.name);

        const [returnData, ...snxPrices] = await Promise.all([
          fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              query: PoolsDistributorDocument,
            }),
          }).then((res) => res.json()),
          ...blocks.map((blockNumber) => snxBaseAggregator.latestAnswer({ blockTag: blockNumber })),
        ]);

        const activeRewards: ActiveRewards[] = [];

        // Check if they are active
        returnData.data.pool.registered_distributors.forEach(
          (distributor: DistributorInterface) => {
            const { id } = distributor;

            distributor.rewards_distributions.forEach((distribution) => {
              const start = new Date(parseInt(distribution.start) * 1000);
              const duration = parseInt(distribution.duration);
              const end = addSeconds(start, duration);

              const amount = wei(distribution.amount, 18, true);

              // Last 7 days, for the moment use the index to sub days
              const periods = blocks.map((_blockNumber, i) => subDays(new Date(), i));

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
                    amountUSD:
                      id === snxDistributor
                        ? amountPerDay * wei(snxPrices[index], 8, true).toNumber()
                        : amountPerDay,
                  });
                }
              });
            });
          }
        );

        // Final step is to take active rewards and combine all into single day totals
        const finalRewards: ReducedRewards[] = Object.values(
          activeRewards.reduce(
            (acc, reward) => {
              const { index, amountUSD } = reward;
              if (acc[index]) {
                acc[index].amountUSD += amountUSD;
              } else {
                acc[index] = { index, amountUSD };
              }
              return acc;
            },
            {} as { [index: number]: ReducedRewards }
          )
        ).map(({ index, amountUSD }) => ({ index, amountUSD }));

        // Remove first entry
        return finalRewards.slice(1, blocks.length).map(({ amountUSD }) => amountUSD);
      } catch (error) {
        console.error('Error fetching rewards', error);
        return [];
      }
    },
    enabled: !!block && !!provider && network?.id === 8453,
  });
}
