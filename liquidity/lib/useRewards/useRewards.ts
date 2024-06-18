import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useQuery } from '@tanstack/react-query';
import { utils, BigNumber } from 'ethers';
import { Wei, wei } from '@synthetixio/wei';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { z } from 'zod';
import { getSubgraphUrl } from '@snx-v3/constants';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { importRewardDistributor } from '@snx-v3/contracts';

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

const erc20Abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
  'function deposit() payable',
  'function decimals() view returns (uint8)',
];

const RewardsDataDocument = `
  query RewardsData($accountId: String!, $distributor: String!) {
    rewardsClaimeds(where: { distributor: $distributor, account: $accountId }) {
      id
      amount
    }
  }
`;

export function useRewards(
  distributors?: RewardsInterface,
  poolId?: string,
  collateralAddress?: string,
  accountId: string = '69',
  customNetwork?: Network
) {
  const { network } = useNetwork();

  const targetNetwork = customNetwork || network;

  const { data: Multicall3 } = useMulticall3(customNetwork);
  const { data: CoreProxy } = useCoreProxy(customNetwork);

  return useQuery({
    enabled: Boolean(
      CoreProxy && Multicall3 && distributors && poolId && collateralAddress && accountId
    ),
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'Rewards',
      { accountId },
      { collateralAddress },
      { distributors: distributors?.map(({ id }) => id).sort() },
    ],
    queryFn: async () => {
      if (
        !Multicall3 ||
        !CoreProxy ||
        !poolId ||
        !collateralAddress ||
        !accountId ||
        !distributors
      ) {
        throw 'useRewards is missing required data';
      }

      if (distributors.length === 0) return [];

      try {
        const { abi } = await importRewardDistributor(targetNetwork?.id, targetNetwork?.preset);

        const ifaceRD = new utils.Interface(abi);
        const ifaceERC20 = new utils.Interface(erc20Abi);

        const [{ returnData: distributorReturnData }, ...historicalData] = await Promise.all([
          Multicall3.callStatic.aggregate(
            distributors.flatMap(({ id: address }) => [
              {
                target: address,
                callData: ifaceRD.encodeFunctionData('name', []),
              },
              {
                target: address,
                callData: ifaceRD.encodeFunctionData('token', []),
              },
              {
                target: address,
                callData: ifaceRD.encodeFunctionData('collateralType', []),
              },
            ])
          ),
          ...distributors.map(({ id: address }) =>
            fetch(getSubgraphUrl(network?.name), {
              method: 'POST',
              body: JSON.stringify({
                query: RewardsDataDocument,
                variables: { accountId, distributor: address },
              }),
            }).then((res) => res.json())
          ),
        ]);

        const distributorResult = distributors.map(({ id: address, rewards_distributions }, i) => {
          const [distributorName] = ifaceRD.decodeFunctionResult(
            'name',
            distributorReturnData[i * 3]
          );
          const [distributorPayoutToken] = ifaceRD.decodeFunctionResult(
            'payoutToken',
            distributorReturnData[i * 3 + 1]
          );
          const [distributorCollateralType] = ifaceRD.decodeFunctionResult(
            'collateralType',
            distributorReturnData[i * 3 + 2]
          );

          if (!rewards_distributions.length) {
            return {
              address,
              name: distributorName,
              token: distributorPayoutToken,
              distributorCollateralType,
              duration: 0,
              total: 0,
              lifetimeClaimed: 0,
            };
          }

          const duration = parseInt(rewards_distributions[0].duration);

          const lifetimeClaimed: number = historicalData[i].data.rewardsClaimeds
            .reduce((acc: Wei, item: { amount: string; id: string }) => {
              return acc.add(wei(item.amount, 18, true));
            }, wei(0))
            .toNumber();

          // See if it is still active (i.e rewards are still being emitted)
          const { duration: distribution_duration, created_at } = rewards_distributions[0];

          const expiry = parseInt(distribution_duration) + parseInt(created_at);

          // const total =
          const hasExpired = new Date().getTime() / 1000 > expiry;

          return {
            address,
            name: distributorName,
            token: distributorPayoutToken,
            distributorCollateralType,
            duration,
            total: hasExpired ? '0' : rewards_distributions[0].amount, // Take the latest amount
            lifetimeClaimed,
          };
        });

        const filteredDistributors = collateralAddress
          ? distributorResult.filter(
              ({ distributorCollateralType }) =>
                `${distributorCollateralType}`.toLowerCase() ===
                `${collateralAddress}`.toLowerCase()
            )
          : distributorResult;

        const { returnData: ercReturnData } = await Multicall3.callStatic.aggregate(
          filteredDistributors.flatMap(({ token }) => [
            {
              target: token,
              callData: ifaceERC20.encodeFunctionData('name', []),
            },
            {
              target: token,
              callData: ifaceERC20.encodeFunctionData('symbol', []),
            },
            {
              target: token,
              callData: ifaceERC20.encodeFunctionData('decimals', []),
            },
          ])
        );

        const result = filteredDistributors.map((item, i) => {
          const [name] = ifaceERC20.decodeFunctionResult('name', ercReturnData[i * 3]);
          const [symbol] = ifaceERC20.decodeFunctionResult('symbol', ercReturnData[i * 3 + 1]);
          const [decimals] = ifaceERC20.decodeFunctionResult('decimals', ercReturnData[i * 3 + 2]);

          const total = wei(item.total, 18, true).toNumber();

          return {
            ...item,
            name,
            symbol,
            decimals,
            total,
          };
        });

        // TODO: Refactor this to use a view function
        const balances: RewardsResponseArray = [];

        for (const item of result) {
          try {
            const response = await CoreProxy.callStatic.claimRewards(
              BigNumber.from(accountId),
              BigNumber.from(poolId),
              collateralAddress,
              item.address
            );

            balances.push({
              ...item,
              claimableAmount: wei(response),
              distributorAddress: item.address,
            });
          } catch (error) {
            balances.push({
              ...item,
              claimableAmount: wei(0),
              distributorAddress: item.address,
            });
          }
        }

        const sortedBalances = [...balances].sort(
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
