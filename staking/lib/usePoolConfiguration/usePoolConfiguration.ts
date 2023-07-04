import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useNetwork } from '@snx-v3/useBlockchain';
import { z } from 'zod';
import { NumberSchema, WeiSchema } from '@snx-v3/zod';
import { ethers } from 'ethers';

export const MarketConfigurationSchema = z.object({
  id: NumberSchema,
  weight: WeiSchema,
  maxDebtShareValue: WeiSchema,
  isLocked: z.boolean(),
});

export const PoolConfigurationSchema = z.object({
  id: z.number(),
  markets: MarketConfigurationSchema.array(),
  isAnyMarketLocked: z.boolean(),
});

export const usePoolConfiguration = (poolId?: string) => {
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  const { data: MultiCall3 } = useMulticall3();

  return useQuery({
    enabled: Boolean(CoreProxy && MultiCall3 && poolId),
    queryKey: [network.name, 'PoolConfiguration', { poolId }],
    queryFn: async () => {
      if (!CoreProxy || !MultiCall3 || !poolId) throw 'OMG';
      const marketsData = await CoreProxy.getPoolConfiguration(ethers.BigNumber.from(poolId));
      const markets = marketsData.map(({ marketId, maxDebtShareValueD18, weightD18 }) => ({
        id: marketId,
        weight: maxDebtShareValueD18,
        maxDebtShareValue: weightD18,
      }));

      const calls = markets.map((m) => ({
        target: CoreProxy.address,
        callData: CoreProxy.interface.encodeFunctionData('isMarketCapacityLocked', [m.id]),
      }));
      const result = await MultiCall3.callStatic.aggregate(calls);
      const decoded = result.returnData.map(
        (bytes) => CoreProxy.interface.decodeFunctionResult('isMarketCapacityLocked', bytes)[0]
      );

      return PoolConfigurationSchema.parse({
        id: parseInt(poolId),
        markets: markets.map((market, i) => ({
          ...market,
          isLocked: decoded[i],
        })),
        isAnyMarketLocked: decoded.some(Boolean),
      });
    },
  });
};
