import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useQuery } from '@tanstack/react-query';
import { utils, BigNumber } from 'ethers';
import { Wei, wei } from '@synthetixio/wei';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { z } from 'zod';

const RewardsResponseSchema = z.array(
  z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
    claimableAmount: z.instanceof(Wei),
    distributorAddress: z.string(),
    rate: z.number(),
    duration: z.number(),
  })
);

type RewardsResponseArray = typeof RewardsResponseSchema._type;

export type RewardsType = z.infer<typeof RewardsResponseSchema>;

type RewardsInterface =
  | {
      id: string;
      total_distributed: Wei;
      rewards_distributions: {
        amount: Wei;
        duration: string;
      }[];
    }[]
  | undefined;

const erc20Abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
  'function deposit() payable',
];

const RewardsDataDocument = `
  query RewardsData($id: String!) {
    rewardDistributions(where: {rewardPool: $id}) {
      id
      amount
      duration
    }
  }
`;

export function useRewards(
  distributors: RewardsInterface,
  poolId: string | undefined,
  collateralAddress: string | undefined,
  accountId: string | undefined,
  enabled: boolean
) {
  const { data: Multicall3 } = useMulticall3();
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    enabled,
    queryKey: [
      'Rewards',
      {
        distributors,
        accountId,
        collateralAddress,
      },
    ],
    queryFn: async () => {
      if (!Multicall3 || !CoreProxy || !poolId || !collateralAddress || !accountId) throw 'OMFG';
      if (!distributors || distributors?.length === 0) return [];

      const { abi } = await import(
        '@synthetixio/v3-contracts/build/optimism-mainnet/RewardDistributor'
      );

      const ifaceRD = new utils.Interface(abi);
      const ifaceERC20 = new utils.Interface(erc20Abi);

      // const res = await fetch(getSubgraphUrl(chainName), {
      //   method: 'POST',
      //   body: JSON.stringify({ query: RewardsDataDocument, variables: { accountId } }),
      // });

      const { returnData: distributorReturnData } = await Multicall3.callStatic.aggregate(
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
      );

      const distributorResult = distributors.map(
        ({ id: address, total_distributed: amount, rewards_distributions }, i) => {
          const name = ifaceRD.decodeFunctionResult('name', distributorReturnData[i * 2])[0];
          const token = ifaceRD.decodeFunctionResult('token', distributorReturnData[i * 2 + 1])[0];

          let duration = 0;
          if (rewards_distributions.length > 0) {
            duration = parseInt(rewards_distributions[0].duration);
          }

          return {
            amount,
            address,
            name,
            token,
            duration,
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
        ])
      );

      const rewardRates = await Promise.all([
        ...distributorResult.map(async ({ address }) => {
          const response = await CoreProxy.callStatic.getRewardRate(
            BigNumber.from(poolId),
            collateralAddress,
            address
          );

          return response;
        }),
      ]);

      const result = distributorResult.map((item, i) => {
        const name = ifaceERC20.decodeFunctionResult('name', ercReturnData[i * 2])[0];
        const symbol = ifaceERC20.decodeFunctionResult('symbol', ercReturnData[i * 2 + 1])[0];

        return {
          ...item,
          name,
          symbol,
          // Reward rate is the amount of rewards per second
          rewardRate: wei(rewardRates[i]),
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
            name: item.name,
            symbol: item.symbol,
            address: item.address,
            claimableAmount: wei(response),
            distributorAddress: item.address,
            rate: item.rewardRate.toNumber(),
            duration: item.duration,
          });
        } catch (error) {
          balances.push({
            name: item.name,
            symbol: item.symbol,
            address: item.address,
            claimableAmount: wei(0),
            distributorAddress: item.address,
            rate: item.rewardRate.toNumber(),
            duration: item.duration,
          });
        }
      }

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

      return RewardsResponseSchema.parse(balances);
    },
  });
}
