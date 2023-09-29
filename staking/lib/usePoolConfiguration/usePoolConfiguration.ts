import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useNetwork } from '@snx-v3/useBlockchain';
import { z } from 'zod';
import { SmallIntSchema, WeiSchema } from '@snx-v3/zod';
import { ethers } from 'ethers';
import { erc7412Call } from '@snx-v3/withERC7412';

export const MarketConfigurationSchema = z.object({
  id: SmallIntSchema,
  weight: WeiSchema,
  maxDebtShareValue: WeiSchema,
  isLocked: z.boolean(),
});

export const PoolConfigurationSchema = z.object({
  id: z.number(),
  markets: MarketConfigurationSchema.array(),
  isAnyMarketLocked: z.boolean(),
});
const isLockedSchema = z.boolean();
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

      const calls = await Promise.all(
        markets.map((m) => CoreProxy.populateTransaction.isMarketCapacityLocked(m.id))
      );
      const decoded = await erc7412Call(
        CoreProxy.provider,
        calls,
        (encoded) => {
          if (!Array.isArray(encoded)) throw Error('Expected array ');
          return encoded.map((x) =>
            isLockedSchema.parse(
              CoreProxy.interface.decodeFunctionResult('isMarketCapacityLocked', x)[0]
            )
          );
        },
        'isMarketCapacityLocked'
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
