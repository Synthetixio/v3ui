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
  const { data: CoreProxy } = useCoreProxy(customNetwork);
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

      try {
        const returnData = await Promise.all([
          // Historical data for account id / distributor address pair
          ...RewardsDistributors.map(({ address }: { address: string }) =>
            fetch(getSubgraphUrl(network?.name), {
              method: 'POST',
              body: JSON.stringify({
                query: RewardsDataDocument,
                variables: { accountId, distributor: address.toLowerCase() },
              }),
            }).then((res) => res.json())
          ),
          // Metadata for each distributor
          ...RewardsDistributors.map(({ address: distributor }: { address: string }) =>
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

        const historicalData = returnData.slice(0, RewardsDistributors.length);
        const metaData = returnData.slice(RewardsDistributors.length);

        console.log('Historical Data', historicalData);
        console.log('Meta Data', metaData);

        // Get claimable amount for each distributor
        const calls = RewardsDistributors.map(({ address }: { address: string }) =>
          CoreProxy.populateTransaction.getAvailableRewards(
            BigNumber.from(accountId),
            BigNumber.from(poolId),
            collateralAddress,
            address
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
          return wei(amount).toString();
        });

        console.log('Decoded', amounts);

        // const { returnData: claimableReturnData } = await Multicall3.callStatic.aggregate(
        //   RewardsDistributors.flatMap(({ address }: { address: string }) => [
        //     {
        //       target: address,
        //       callData: CoreProxy.populateTransaction.getAvailableRewards(
        //         BigNumber.from(accountId),
        //         BigNumber.from(poolId),
        //         collateralAddress?.toLowerCase(),
        //         address.toLowerCase()
        //       ),
        //     },
        //   ])
        // );

        // console.log('Claimable Return Data', claimableReturnData);

        // // Decoded
        // const claimableAmounts = claimableReturnData.map((data: string) =>
        //   CoreProxy.interface.decodeFunctionResult('getAvailableRewards', data)
        // );

        // console.log('Claimable Amounts', claimableAmounts);

        // const distributorResult = distributors.map(({ id: address, rewards_distributions }, i) => {
        //   const [distributorName] = ifaceRD.decodeFunctionResult(
        //     'name',
        //     distributorReturnData[i * 3]
        //   );
        //   const [distributorPayoutToken] = ifaceRD.decodeFunctionResult(
        //     'payoutToken',
        //     distributorReturnData[i * 3 + 1]
        //   );
        //   const [distributorCollateralType] = ifaceRD.decodeFunctionResult(
        //     'collateralType',
        //     distributorReturnData[i * 3 + 2]
        //   );

        //   if (!rewards_distributions.length) {
        //     return {
        //       address,
        //       name: distributorName,
        //       token: distributorPayoutToken,
        //       distributorCollateralType,
        //       duration: 0,
        //       total: 0,
        //       lifetimeClaimed: 0,
        //     };
        //   }

        //   const duration = parseInt(rewards_distributions[0].duration);

        //   const lifetimeClaimed: number = historicalData[i].data.rewardsClaimeds
        //     .reduce((acc: Wei, item: { amount: string; id: string }) => {
        //       return acc.add(wei(item.amount, 18, true));
        //     }, wei(0))
        //     .toNumber();

        //   // See if it is still active (i.e rewards are still being emitted)
        //   const { duration: distribution_duration, created_at } = rewards_distributions[0];

        //   const expiry = parseInt(distribution_duration) + parseInt(created_at);

        //   // const total =
        //   const hasExpired = new Date().getTime() / 1000 > expiry;

        //   return {
        //     address,
        //     name: distributorName,
        //     token: distributorPayoutToken,
        //     distributorCollateralType,
        //     duration,
        //     total: hasExpired ? '0' : rewards_distributions[0].amount, // Take the latest amount
        //     lifetimeClaimed,
        //   };
        // });

        // const filteredDistributors = collateralAddress
        //   ? distributorResult.filter(
        //       ({ distributorCollateralType }) =>
        //         `${distributorCollateralType}`.toLowerCase() ===
        //         `${collateralAddress}`.toLowerCase()
        //     )
        //   : distributorResult;

        // const result = filteredDistributors.map((item, i) => {
        //   const [name] = ifaceERC20.decodeFunctionResult('name', ercReturnData[i * 3]);
        //   const [symbol] = ifaceERC20.decodeFunctionResult('symbol', ercReturnData[i * 3 + 1]);
        //   const [decimals] = ifaceERC20.decodeFunctionResult('decimals', ercReturnData[i * 3 + 2]);

        //   const total = wei(item.total, 18, true).toNumber();

        //   return {
        //     ...item,
        //     name,
        //     symbol,
        //     decimals,
        //     total,
        //   };
        // });

        // const sortedBalances = [...balances].sort(
        //   (a, b) => b.claimableAmount.toNumber() - a.claimableAmount.toNumber()
        // );

        // return RewardsResponseSchema.parse(sortedBalances);
        return [];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });
}
