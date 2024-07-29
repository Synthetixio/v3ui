import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { Wei, wei } from '@synthetixio/wei';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { z } from 'zod';
import { getSubgraphUrl } from '@snx-v3/constants';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useRewardsDistributors } from '@snx-v3/useRewardsDistributors';

const RewardsResponseSchema = z.array(
  z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
    claimableAmount: z.instanceof(Wei),
    distributorAddress: z.string(),
    duration: z.number(),
    lifetimeClaimed: z.number(),
    total: z.number(),
    decimals: z.number(),
  })
);

type RewardsResponseArray = typeof RewardsResponseSchema._type;

export type RewardsType = z.infer<typeof RewardsResponseSchema>;

export type RewardsInterface = {
  id: string;
  total_distributed: string;
  rewards_distributions: {
    amount: string;
    duration: string;
    created_at: string;
  }[];
}[];

const RewardsDataDocument = `
  query RewardsData($accountId: String!, $distributor: String!) {
    rewardsClaimeds(where: { distributor: $distributor, account: $accountId }) {
      id
      amount
    }
  }
`;

const RewardsDistributionsDocument = `
  query RewardsDistributions($distributor: String!) {
    rewardsDistributions(where: { distributor: $distributor}) {
      collateral_type
      amount
      duration
      start
      created_at
    }
  }
`;

export function useRewards(
  poolId?: string,
  collateralAddress?: string,
  accountId: string = '69',
  customNetwork?: Network
) {
  const { network } = useNetwork();

  const targetNetwork = customNetwork || network;

  const { data: Multicall3 } = useMulticall3(customNetwork);
  const { data: CoreProxy } = useCoreProxy({ customNetwork });
  const { data: RewardsDistributors } = useRewardsDistributors(customNetwork);

  return useQuery({
    enabled: Boolean(CoreProxy && Multicall3 && RewardsDistributors && poolId && accountId),
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'Rewards',
      { accountId },
      { collateralAddress },
    ],
    queryFn: async () => {
      if (
        !Multicall3 ||
        !CoreProxy ||
        !poolId ||
        !accountId ||
        !RewardsDistributors ||
        !collateralAddress
      ) {
        throw 'useRewards is missing required data';
      }

      if (RewardsDistributors.length === 0) return [];

      // We need to filter the distributors, so we only query for this particular collateral type
      const filteredDistributors = RewardsDistributors.filter(
        (distributor: any) =>
          distributor.collateralType.address.toLowerCase() === collateralAddress.toLowerCase()
      );

      try {
        const returnData = await Promise.all([
          // Historical data for account id / distributor address pair
          ...filteredDistributors.map(({ address }: { address: string }) =>
            fetch(getSubgraphUrl(targetNetwork?.name), {
              method: 'POST',
              body: JSON.stringify({
                query: RewardsDataDocument,
                variables: { accountId, distributor: address.toLowerCase() },
              }),
            }).then((res) => res.json())
          ),
          // Metadata for each distributor
          ...filteredDistributors.map(({ address: distributor }: { address: string }) =>
            fetch(getSubgraphUrl(network?.name), {
              method: 'POST',
              body: JSON.stringify({
                query: RewardsDistributionsDocument,
                variables: {
                  distributor: distributor.toLowerCase(),
                },
              }),
            }).then((res) => res.json())
          ),
        ]);

        const historicalData = returnData.slice(0, filteredDistributors.length);
        const metaData = returnData.slice(filteredDistributors.length);

        // Get claimable amount for each distributor
        const calls = filteredDistributors.map(({ address }: { address: string }) =>
          CoreProxy.populateTransaction.getAvailableRewards(
            BigNumber.from(accountId),
            BigNumber.from(poolId),
            collateralAddress.toLowerCase(),
            address.toLowerCase()
          )
        );

        const txs = await Promise.all(calls);

        const multicallData = txs.map((tx) => ({
          target: CoreProxy.address,
          callData: tx.data,
        }));

        const data = await Multicall3.callStatic.aggregate(multicallData);

        const amounts = data.returnData.map((data: string) => {
          const amount = CoreProxy.interface.decodeFunctionResult('getAvailableRewards', data)[0];
          return wei(amount);
        });

        const results: RewardsResponseArray = filteredDistributors.map((item: any, i: number) => {
          // Amount claimable for this distributor
          const claimableAmount = amounts[i];
          const historicalClaims = historicalData[i]?.data?.rewardsClaimeds;
          const distributions = metaData[i]?.data?.rewardsDistributions;

          if (!distributions || !distributions.length) {
            return {
              address: item.collateralType.address,
              name: item.name,
              symbol: item.payoutToken.symbol,
              claimableAmount: wei(0),
              distributorAddress: item.address,
              duration: 0,
              total: 0,
              lifetimeClaimed: historicalClaims
                .reduce(
                  (acc: Wei, item: { amount: string }) => acc.add(wei(item.amount, 18, true)),
                  wei(0)
                )
                .toNumber(),
              decimals: item.payoutToken.decimals,
            };
          }

          const latestDistribution = distributions[distributions.length - 1];
          const expiry =
            parseInt(latestDistribution.duration) + parseInt(latestDistribution.created_at);

          const hasExpired = new Date().getTime() / 1000 > expiry;

          return {
            address: item.address,
            name: item.name,
            symbol: item.payoutToken.symbol,
            claimableAmount,
            distributorAddress: item.address,
            decimals: item.payoutToken.decimals,
            duration: parseInt(latestDistribution.duration),
            total: hasExpired ? 0 : wei(latestDistribution.amount, 18, true).toNumber(),
            lifetimeClaimed: historicalClaims
              .reduce(
                (acc: Wei, item: { amount: string }) => acc.add(wei(item.amount, 18, true)),
                wei(0)
              )
              .toNumber(),
          };
        });

        const sortedBalances = results.sort(
          (a, b) => b.claimableAmount.toNumber() - a.claimableAmount.toNumber()
        );

        return RewardsResponseSchema.parse(sortedBalances);
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });
}
