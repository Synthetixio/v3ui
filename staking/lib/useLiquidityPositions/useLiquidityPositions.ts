import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { loadPosition } from '@snx-v3/useLiquidityPosition';
import { usePools } from '@snx-v3/usePools';
import Wei, { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { calculateCRatio } from '@snx-v3/calculations';
import { erc7412Call } from '@snx-v3/withERC7412';

export type LiquidityPositionType = {
  id: `${string}-${string}`;
  accountId: string;
  poolId: string;
  poolName: string;
  collateralAmount: Wei;
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
  const { data: collateralPriceByAddress } = useCollateralPrices();

  const network = useNetwork();

  return useQuery({
    queryKey: [
      network.name,
      { accountId },
      'LiquidityPositions',
      {
        pools: pools ? pools.map((pool) => pool.id).sort() : [],
        tokens: collateralTypes ? collateralTypes.map((x) => x.tokenAddress).sort() : [],
        pricesFetched: Boolean(collateralPriceByAddress),
      },
    ],
    queryFn: async () => {
      if (!pools || !collateralTypes || !CoreProxy || !accountId) {
        throw Error('Query should not be enabled');
      }

      const callsDecoderAndDataNested = await Promise.all(
        pools.map(async ({ id: poolId, name: poolName }) =>
          Promise.all(
            collateralTypes.map(async (collateralType) => {
              const { calls, decoder } = await loadPosition({
                CoreProxy,
                accountId,
                poolId,
                tokenAddress: collateralType.tokenAddress,
              });
              return { calls, decoder, poolName, collateralType, poolId };
            })
          )
        )
      );
      const callsDecoderAndData = callsDecoderAndDataNested.flat();

      const allCalls = callsDecoderAndData.map((x) => x.calls).flat();
      const singlePositionDecoder = callsDecoderAndData.at(0)?.decoder;
      return await erc7412Call(
        CoreProxy.provider,
        allCalls,
        (encoded) => {
          if (!Array.isArray(encoded)) throw Error('Expected array ');
          if (!singlePositionDecoder) return {};
          const positionData = toPairs(encoded).map((x) => singlePositionDecoder(x));

          const positions = positionData.map(({ debt, collateral }, index) => {
            const { poolName, collateralType, poolId } = callsDecoderAndData[index];
            // Value will be removed from the collateral call in next release, so to prepare for that calculate it manually
            const collateralAmount = collateral.amount;
            const collateralPrice = collateralPriceByAddress?.[collateralType.tokenAddress];
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
            };
          });
          return Object.fromEntries(positions.map((position) => [position.id, position]));
        },
        'liquidityPositions'
      );
    },
    // select: selectPositions,
    enabled: Boolean(
      CoreProxy &&
        collateralTypes?.length &&
        accountId &&
        pools?.length &&
        Boolean(collateralPriceByAddress)
    ),
  });
};
