import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { loadPosition } from '@snx-v3/useLiquidityPosition';
import { usePools } from '@snx-v3/usePools';
import Wei, { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { loadPrices } from '@snx-v3/useCollateralPrices';
import { calculateCRatio } from '@snx-v3/calculations';
import { erc7412Call } from '@snx-v3/withERC7412';
import { keyBy, stringToHash } from '@snx-v3/tsHelpers';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { useAllCollateralPriceUpdates } from '../useCollateralPriceUpdates';

export type LiquidityPositionType = {
  id: `${string}-${string}`;
  accountId: string;
  poolId: string;
  isPreferred: boolean;
  poolName: string;
  collateralAmount: Wei;
  collateralPrice: Wei;
  collateralValue: Wei;
  collateralType: CollateralType;
  cRatio: Wei;
  debt: Wei;
};

export type LiquidityPositionsById = {
  [poolIdDashSymbol: `${string}-${string}`]: LiquidityPositionType;
};

function toPairs<T>(array: T[]): [T, T][] {
  return Array.from(
    { length: array.length / 2 },
    (_, i) => [array[i * 2], array[i * 2 + 1]] as [T, T]
  );
}

export const useLiquidityPositions = ({ accountId }: { accountId?: string }) => {
  const { data: CoreProxy } = useCoreProxy();

  const { data: pools } = usePools();
  const { data: collateralTypes } = useCollateralTypes();
  const { data: collateralPriceUpdates } = useAllCollateralPriceIds();
  const { data: priceUpdateTx, isLoading: collateralPriceUpdatesIsLoading } =
    useAllCollateralPriceUpdates();

  const { network } = useNetwork();
  const provider = useProviderForChain(network!);

  const query = useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'LiquidityPositions',
      { accountId },
      {
        pools: pools ? pools.map((pool) => pool.id).sort() : [],
        tokens: collateralTypes ? collateralTypes.map((x) => x.tokenAddress).sort() : [],
        collateralPriceUpdatesLength: collateralPriceUpdates?.length,
        priceUpdateTx: stringToHash(priceUpdateTx?.data),
        CoreProxy: !!CoreProxy,
      },
    ],
    staleTime: 60000 * 5,
    queryFn: async () => {
      if (
        !pools ||
        !collateralTypes ||
        !CoreProxy ||
        !accountId ||
        !collateralPriceUpdates ||
        !network ||
        !provider
      ) {
        throw Error('Query should not be enabled');
      }

      const positionCallsAndDataNested = await Promise.all(
        pools.map(async ({ id: poolId, name: poolName, isPreferred }) =>
          Promise.all(
            collateralTypes.map(async (collateralType) => {
              const { calls, decoder } = await loadPosition({
                CoreProxy,
                accountId,
                poolId,
                tokenAddress: collateralType.tokenAddress,
              });
              return { calls, decoder, poolName, collateralType, poolId, isPreferred };
            })
          )
        )
      );

      const positionCallsAndData = positionCallsAndDataNested.flat();

      const { calls: priceCalls, decoder: priceDecoder } = await loadPrices({
        collateralAddresses: collateralTypes.map((x) => x.tokenAddress),
        CoreProxy,
      });

      const positionCalls = positionCallsAndData.map((x) => x.calls).flat();

      const collateralPriceCalls = await fetchPriceUpdates(
        collateralPriceUpdates,
        network.isTestnet
      ).then((signedData) => priceUpdatesToPopulatedTx('0x', collateralPriceUpdates, signedData));

      const allCalls = collateralPriceCalls.concat(priceCalls.concat(positionCalls));
      const singlePositionDecoder = positionCallsAndData.at(0)?.decoder;

      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }

      return await erc7412Call(
        network,
        provider!,
        allCalls,
        (encoded) => {
          if (!Array.isArray(encoded)) throw Error('Expected array');
          if (!singlePositionDecoder) return {};
          const prices = priceDecoder(encoded.slice(0, priceCalls.length));
          const pricesByAddress = keyBy(
            'address',
            Array.isArray(prices)
              ? prices.map((price, i) => ({
                  price,
                  address: collateralTypes[i].tokenAddress,
                }))
              : [{ price: prices, address: collateralTypes[0].tokenAddress }]
          );

          const pairedPositionsEncoded = toPairs(encoded.slice(priceCalls.length));
          const positionData = pairedPositionsEncoded.map((x) => singlePositionDecoder(x));
          const positions = positionData.map(({ debt, collateral }, index) => {
            const { poolName, collateralType, poolId, isPreferred } = positionCallsAndData[index];
            // Value will be removed from the collateral call in next release, so to prepare for that calculate it manually
            const collateralAmount = collateral.amount;
            const collateralPrice = pricesByAddress?.[collateralType.tokenAddress].price;
            const collateralValue = collateralPrice
              ? collateralAmount.mul(collateralPrice)
              : wei(0);
            const cRatio = calculateCRatio(debt, collateralValue);

            return {
              id: `${poolId}-${collateralType.symbol}` as const,
              accountId,
              poolId,
              poolName,
              collateralPrice,
              collateralAmount,
              collateralValue,
              collateralType,
              cRatio,
              debt,
              isPreferred,
            };
          });
          return keyBy('id', positions);
        },
        'useLiquidityPositions'
      );
    },
  });

  return {
    ...query,
    isLoading: query.isLoading || collateralPriceUpdatesIsLoading,
  };
};
