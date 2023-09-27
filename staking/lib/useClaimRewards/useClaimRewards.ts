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
  })
);

export type RewardsType = z.infer<typeof RewardsResponseSchema>;

type RewardsInterface =
  | {
      id: string;
      total_distributed: Wei;
    }[]
  | undefined;

const erc20Abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
  'function deposit() payable',
];

export function useRewards(
  distributors: RewardsInterface,
  poolId: string | undefined,
  collateralAddress: string | undefined,
  accountId: string | undefined,
  enabled: boolean
) {
  // const addresses = distributors?.map((x) => x.id) || [];

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
        ({ id: address, total_distributed: amount }, i) => {
          const name = ifaceRD.decodeFunctionResult('name', distributorReturnData[i * 2])[0];
          const token = ifaceRD.decodeFunctionResult('token', distributorReturnData[i * 2 + 1])[0];

          return {
            amount,
            address,
            name,
            token,
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

      const result = distributorResult.map(({ token, address }, i) => {
        const name = ifaceERC20.decodeFunctionResult('name', ercReturnData[i * 2])[0];
        const symbol = ifaceERC20.decodeFunctionResult('symbol', ercReturnData[i * 2 + 1])[0];

        return {
          distributorAddress: address,
          address: token,
          name,
          symbol,
        };
      });

      // Balances
      // We only want to fetch claimable amount for distributors with total_distributed > 0
      const distributorsToQuery = distributorResult.filter((item) => item.amount.gt(0));

      const claimResponse = await Promise.all([
        ...distributorsToQuery.map(({ address }) => {
          return CoreProxy.callStatic.claimRewards(
            BigNumber.from(accountId),
            BigNumber.from(poolId),
            collateralAddress,
            address
          );
        }),
      ]);

      const hydratedResponse = claimResponse.map((amount, index) => {
        const distributor = distributorsToQuery[index];
        return {
          address: distributor.address,
          amount,
        };
      });

      const balances = result.map(({ distributorAddress, address, name, symbol }) => {
        const claimableAmount =
          hydratedResponse.find((x) => x.address === distributorAddress)?.amount || wei(0);
        return {
          address,
          name,
          symbol,
          distributorAddress,
          claimableAmount,
        };
      });

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
