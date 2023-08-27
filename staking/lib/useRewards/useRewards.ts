import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';
import { Wei } from '@synthetixio/wei';
import { BigNumber } from 'ethers';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { z } from 'zod';

const RewardsResponseSchema = z.object({
  address: z.string(),
  name: z.string(),
  symbol: z.string(),
});

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
  distributors?: RewardsInterface,
  poolId?: string,
  collateralAddress?: string,
  accountId?: string
) {
  const addresses = distributors?.map((x) => x.id) || [];

  const { data: Multicall3 } = useMulticall3();
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    queryKey: [
      'Rewards',
      {
        addresses,
      },
    ],
    queryFn: async () => {
      if (addresses.length === 0) return [];

      if (!Multicall3 || !CoreProxy || !poolId || !collateralAddress || !accountId) throw 'OMFG';

      const { abi } = await import(
        '@synthetixio/v3-contracts/build/optimism-mainnet/RewardDistributor'
      );
      const ifaceRD = new utils.Interface(abi);
      const ifaceERC20 = new utils.Interface(erc20Abi);

      const { returnData: distributorReturnData } = await Multicall3.callStatic.aggregate(
        addresses.flatMap((address) => [
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

      const distributorResult = addresses.map((address, i) => {
        const name = ifaceRD.decodeFunctionResult('name', distributorReturnData[i * 2])[0];
        const token = ifaceRD.decodeFunctionResult('token', distributorReturnData[i * 2 + 1])[0];

        return {
          address,
          name,
          token,
        };
      });

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

      const result = distributorResult.map(({ token }, i) => {
        const name = ifaceERC20.decodeFunctionResult('name', ercReturnData[i * 2])[0];
        const symbol = ifaceERC20.decodeFunctionResult('symbol', ercReturnData[i * 2 + 1])[0];

        return {
          address: token,
          name,
          symbol,
        };
      });

      // Single call version
      const response = await CoreProxy.callStatic.claimRewards(
        BigNumber.from(accountId),
        BigNumber.from(poolId),
        collateralAddress,
        addresses[0]
      );

      // Multicall version
      const calls = distributorResult.map(({ address }) =>
        CoreProxy.interface.encodeFunctionData('claimRewards', [
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralAddress,
          address,
        ])
      );

      const response2 = await CoreProxy.callStatic.multicall(calls);

      console.log('Response', response);
      console.log('Return data', response2);

      return RewardsResponseSchema.parse(result);
    },
  });
}
