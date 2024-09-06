import { getSubgraphUrl } from '@snx-v3/constants';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useRewardsDistributors } from '@snx-v3/useRewardsDistributors';
import { Wei, wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { z } from 'zod';

const RewardsResponseSchema = z.array(
  z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
    distributorAddress: z.string(),
    decimals: z.number(),
    claimableAmount: z.instanceof(Wei),
    lifetimeClaimed: z.number(),
  })
);

export type RewardsResponseType = z.infer<typeof RewardsResponseSchema>;

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

export function useRewards({
  poolId,
  collateralSymbol,
  accountId,
}: {
  poolId?: string;
  collateralSymbol?: string;
  accountId?: string;
}) {
  const { data: collateralType } = useCollateralType(collateralSymbol);
  const collateralAddress = collateralType?.tokenAddress;
  const { network } = useNetwork();

  const { data: Multicall3 } = useMulticall3(network);
  const { data: CoreProxy } = useCoreProxy({ customNetwork: network });
  const { data: rewardsDistributors } = useRewardsDistributors(network);

  // We need to filter the distributors, so we only query for this particular collateral type
  // Also include all pool level distributors
  const filteredDistributors =
    rewardsDistributors && collateralAddress
      ? rewardsDistributors
          .filter((distributor) => distributor.isRegistered)
          .filter(
            (distributor) =>
              !distributor.collateralType ||
              (distributor.collateralType &&
                distributor.collateralType.address.toLowerCase() ===
                  collateralAddress.toLowerCase())
          )
      : [];

  const distributorsCacheKey = filteredDistributors.map((distributor) =>
    distributor.address.slice(2, 6)
  );

  return useQuery({
    enabled: Boolean(
      network &&
        CoreProxy &&
        Multicall3 &&
        rewardsDistributors &&
        poolId &&
        collateralAddress &&
        accountId
    ),
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'Rewards',
      { accountId },
      { collateralAddress },
      { distributors: distributorsCacheKey },
    ],
    queryFn: async () => {
      if (
        !(
          network &&
          CoreProxy &&
          Multicall3 &&
          filteredDistributors &&
          poolId &&
          collateralAddress &&
          accountId
        )
      ) {
        throw new Error('OMG');
      }

      if (filteredDistributors.length === 0) return [];

      try {
        const returnData = await Promise.all([
          // Historical data for account id / distributor address pair
          ...filteredDistributors.map((distributor) =>
            fetch(getSubgraphUrl(network?.name), {
              method: 'POST',
              body: JSON.stringify({
                query: RewardsDataDocument,
                variables: { accountId, distributor: distributor.address.toLowerCase() },
              }),
            }).then((res) => res.json())
          ),
          // Metadata for each distributor
          ...filteredDistributors.map((distributor) =>
            fetch(getSubgraphUrl(network?.name), {
              method: 'POST',
              body: JSON.stringify({
                query: RewardsDistributionsDocument,
                variables: { distributor: distributor.address.toLowerCase() },
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

        const results: RewardsResponseType = filteredDistributors.map((item: any, i: number) => {
          // Amount claimable for this distributor
          const claimableAmount = amounts[i];
          const historicalClaims = historicalData[i]?.data?.rewardsClaimeds;
          const distributions = metaData[i]?.data?.rewardsDistributions;

          if (!distributions || !distributions.length) {
            return {
              address: item.address,
              name: item.name,
              symbol: item.payoutToken.symbol,
              distributorAddress: item.address,
              decimals: item.payoutToken.decimals,
              claimableAmount: wei(0),
              lifetimeClaimed: historicalClaims
                .reduce(
                  (acc: Wei, item: { amount: string }) => acc.add(wei(item.amount, 18, true)),
                  wei(0)
                )
                .toNumber(),
            };
          }

          return {
            address: item.address,
            name: item.name,
            symbol: item.payoutToken.symbol,
            distributorAddress: item.address,
            decimals: item.payoutToken.decimals,
            claimableAmount,
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
