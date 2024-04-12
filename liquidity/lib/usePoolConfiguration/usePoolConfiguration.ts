import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
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
  const { network } = useNetwork();
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    enabled: Boolean(CoreProxy && poolId),
    queryKey: [`${network?.id}-${network?.preset}`, 'PoolConfiguration', { poolId }],
    queryFn: async () => {
      if (!CoreProxy || !poolId || !network) {
        throw Error('usePoolConfiguration should not be enabled');
      }
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
        network,
        CoreProxy.provider,
        calls,
        (encoded) => {
          if (!Array.isArray(encoded)) throw Error('Expected array');
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
