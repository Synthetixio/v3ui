import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useDefaultProvider, useNetwork } from '@snx-v3/useBlockchain';
import { z } from 'zod';
import { SmallIntSchema, WeiSchema } from '@snx-v3/zod';
import { ethers } from 'ethers';
import { erc7412Call } from '@snx-v3/withERC7412';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { useAllCollateralPriceUpdates } from '@snx-v3/useCollateralPriceUpdates';

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
  const { data: collateralPriceUpdates } = useAllCollateralPriceIds();
  const provider = useDefaultProvider();
  const { data: priceUpdateTx } = useAllCollateralPriceUpdates();

  return useQuery({
    enabled: Boolean(CoreProxy && poolId && collateralPriceUpdates),
    queryKey: [`${network?.id}-${network?.preset}`, 'PoolConfiguration', { poolId }],
    queryFn: async () => {
      if (!CoreProxy || !poolId || !collateralPriceUpdates || !network || !provider) {
        throw Error('usePoolConfiguration should not be enabled');
      }
      const marketsData: {
        marketId: ethers.BigNumber;
        maxDebtShareValueD18: ethers.BigNumber;
        weightD18: ethers.BigNumber;
      }[] = await CoreProxy.getPoolConfiguration(ethers.BigNumber.from(poolId));
      const markets = marketsData.map(({ marketId, maxDebtShareValueD18, weightD18 }) => ({
        id: marketId,
        weight: maxDebtShareValueD18,
        maxDebtShareValue: weightD18,
      }));

      const collateralPriceCalls = await fetchPriceUpdates(
        collateralPriceUpdates,
        network.isTestnet
      ).then((signedData) => priceUpdatesToPopulatedTx('0x', collateralPriceUpdates, signedData));

      const calls = await Promise.all(
        markets.map((m) => CoreProxy.populateTransaction.isMarketCapacityLocked(m.id))
      );

      const allCalls = collateralPriceCalls.concat(calls);
      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }

      const decoded = await erc7412Call(
        network,
        provider,
        allCalls,
        (encoded) => {
          const result = Array.isArray(encoded) ? encoded : [encoded];
          return result.map((x) =>
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
