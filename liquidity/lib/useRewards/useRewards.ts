import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useQuery } from '@tanstack/react-query';
import { utils, BigNumber } from 'ethers';
import { Wei, wei } from '@synthetixio/wei';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { z } from 'zod';
import { getSubgraphUrl } from '@snx-v3/constants';
import { useNetwork } from '@snx-v3/useBlockchain';

import type { RewardDistributor as RewardDistributor1 } from '@synthetixio/v3-contracts/build/1/RewardDistributor';
import type { RewardDistributor as RewardDistributor5 } from '@synthetixio/v3-contracts/build/5/RewardDistributor';
import type { RewardDistributor as RewardDistributor10 } from '@synthetixio/v3-contracts/build/10/RewardDistributor';
import type { RewardDistributor as RewardDistributor420 } from '@synthetixio/v3-contracts/build/420/RewardDistributor';
import type { RewardDistributor as RewardDistributor11155111 } from '@synthetixio/v3-contracts/build/11155111/RewardDistributor';
import type { RewardDistributor as RewardDistributor84531Competition } from '@synthetixio/v3-contracts/build/84531-competition/RewardDistributor';
import type { RewardDistributor as RewardDistributor13370 } from '@synthetixio/v3-contracts/build/420/RewardDistributor';

export type RewardDistributorType =
  | RewardDistributor1
  | RewardDistributor5
  | RewardDistributor10
  | RewardDistributor420
  | RewardDistributor11155111
  | RewardDistributor84531Competition
  | RewardDistributor13370;

export async function importRewardDistributor(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/420/RewardDistributor'); // TODO: Make local cannon 13370 work
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/1/RewardDistributor');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/5/RewardDistributor');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/11155111/RewardDistributor');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/10/RewardDistributor');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/420/RewardDistributor');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/84531-competition/RewardDistributor');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

const RewardsResponseSchema = z.array(
  z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
    claimableAmount: z.instanceof(Wei),
    distributorAddress: z.string(),
    rate: z.number(),
    duration: z.number(),
    lifetimeClaimed: z.number(),
    total: z.number(),
    decimals: z.number(),
  })
);

type RewardsResponseArray = typeof RewardsResponseSchema._type;

export type RewardsType = z.infer<typeof RewardsResponseSchema>;

type RewardsInterface = {
  id: string;
  total_distributed: string;
  rewards_distributions: {
    amount: string;
    duration: string;
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
  accountId?: string
) {
  const network = useNetwork();
  const { data: Multicall3 } = useMulticall3();
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    enabled: Boolean(
      Multicall3 && CoreProxy && distributors && poolId && collateralAddress && accountId
    ),
    queryKey: [
      'Rewards',
      network.name,
      {
        distributors,
        accountId,
        collateralAddress,
      },
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

      const { abi } = await importRewardDistributor(network.name);

      const ifaceRD = new utils.Interface(abi);
      const ifaceERC20 = new utils.Interface(erc20Abi);

      const [{ returnData: distributorReturnData }, ...historicalData] = await Promise.all([
        await Multicall3.callStatic.aggregate(
          distributors.flatMap(({ id: address }) => [
            {
              target: address,
              callData: ifaceRD.encodeFunctionData('name', []),
            },
            {
              target: address,
              callData: ifaceRD.encodeFunctionData('token', []),
            },
          ])
        ),
        ...distributors.map(async ({ id: address }) => {
          return await fetch(getSubgraphUrl(network.name), {
            method: 'POST',
            body: JSON.stringify({
              query: RewardsDataDocument,
              variables: { accountId, distributor: address },
            }),
          }).then((res) => res.json());
        }),
      ]);

      const distributorResult = distributors.map(
        ({ id: address, total_distributed, rewards_distributions }, i) => {
          const name = ifaceRD.decodeFunctionResult(
            'name',
            distributorReturnData[i * 2]
          )[0] as string;
          const token = ifaceRD.decodeFunctionResult(
            'token',
            distributorReturnData[i * 2 + 1]
          )[0] as string;

          let duration = 0;
          if (rewards_distributions.length > 0) {
            duration = parseInt(rewards_distributions[0].duration);
          }

          const lifetimeClaimed = historicalData[i].data.rewardsClaimeds.reduce(
            (acc: number, item: { amount: string; id: string }) => {
              return (acc += parseInt(item.amount));
            },
            0
          );

          return {
            address,
            name: name,
            token: token,
            duration,
            total: total_distributed,
            lifetimeClaimed,
          };
        }
      );

      const { returnData: ercReturnData } = await Multicall3.callStatic.aggregate(
        distributorResult.flatMap(({ token }) => [
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

      const rewardRates = await Promise.all(
        distributorResult.map(async ({ address }) => {
          const response = await CoreProxy.callStatic.getRewardRate(
            BigNumber.from(poolId),
            collateralAddress,
            address
          );

          return response;
        })
      );

      const result = distributorResult.map((item, i) => {
        const name = ifaceERC20.decodeFunctionResult('name', ercReturnData[i * 3])[0] as string;
        const symbol = ifaceERC20.decodeFunctionResult(
          'symbol',
          ercReturnData[i * 3 + 1]
        )[0] as string;
        const decimals = ifaceERC20.decodeFunctionResult(
          'decimals',
          ercReturnData[i * 3 + 2]
        )[0] as number;

        const total = parseInt(item.total);

        return {
          ...item,
          name,
          symbol,
          decimals,
          // Reward rate is the amount of rewards per second
          rewardRate: wei(rewardRates[i]),
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
            rate: item.rewardRate.toNumber(),
          });
        } catch (error) {
          balances.push({
            ...item,
            claimableAmount: wei(0),
            distributorAddress: item.address,
            rate: item.rewardRate.toNumber(),
          });
        }
      }

      const sortedBalances = [...balances].sort(
        (a, b) => b.claimableAmount.toNumber() - a.claimableAmount.toNumber()
      );

      // TODO: Fix issue with multicall
      // const calls = distributorResult
      //   .filter((item) => item.amount.gt(0))
      //   .map(({ address }) => ({
      //     target: CoreProxy.address,
      //     callData: CoreProxy.interface.encodeFunctionData('claimRewards', [
      //       BigNumber.from(accountId),
      //       BigNumber.from(poolId),
      //       collateralAddress,
      //       address,
      //     ]),
      //   }));
      // const response = await Multicall3.callStatic.aggregate(calls);
      // const decoded = response.map(
      //   (bytes: BytesLike) => CoreProxy.interface.decodeFunctionResult('claimRewards', bytes)[0]
      // );

      return RewardsResponseSchema.parse(sortedBalances);
    },
  });
}
