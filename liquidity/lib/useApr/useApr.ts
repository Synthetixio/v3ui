import { getSubgraphUrl } from '@snx-v3/constants';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useGetPNL } from '@snx-v3/useGetPNL';
import { useQuery } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { addSeconds, isAfter, isBefore, subDays } from 'date-fns';
import { loadPrices } from '@snx-v3/useCollateralPrices';
import { useCoreProxy } from '@snx-v3/useCoreProxy';

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
  const { data: pnlData } = useGetPNL();
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: ['apr', network?.id],
    queryFn: async () => {
      if (!CoreProxy) throw 'Missing data required for useApr';
      // Get rewards for the last week
      const url = getSubgraphUrl(network?.name);

      const { data: returnData } = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: PoolsDistributorDocument,
        }),
      }).then((res) => res.json());

      const activeRewards: { index: number; amount: number; distributor: string }[] = [];

      //  Check if they are active
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
      const usdcDistributor = '0xe92bcd40849be5a5eb90065402e508af4b28263b';

      const snxContract = '0x22e6966B799c4D5B13BE962E1D117b56327FDa66';
      console.log('SNX Contract', snxContract);
      try {
        const snxPrice = await CoreProxy.getCollateralPrice(snxContract);
      } catch (error) {
        console.log('Error getting SNX price', error);
      }

      console.log('SNX Price', snxPrice);
      // Sort by index and get average price for non stable collateral

      console.log('Active rewards', activeRewards);

      return pnlData;
    },
    enabled: !!pnlData,
  });
}
