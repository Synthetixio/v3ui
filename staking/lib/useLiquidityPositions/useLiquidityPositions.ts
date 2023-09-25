import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { loadPosition, selectPosition } from '@snx-v3/useLiquidityPosition';
import { usePools } from '@snx-v3/usePools';
import Wei, { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralPrices } from '../useCollateralPrices';

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

const selectPositions = (positions: LiquidityPositionType[]) =>
  Object.fromEntries(positions.map((position) => [position.id, position]));

export const useLiquidityPositions = ({ accountId }: { accountId?: string }) => {
  const { data: CoreProxy } = useCoreProxy();
  const { data: pools } = usePools();
  const { data: collateralTypes } = useCollateralTypes();
  const { data: collateralPriceByAddress } = useCollateralPrices(
    collateralTypes?.map(({ tokenAddress }) => tokenAddress)
  );

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

      const nestedResult = await Promise.all(
        pools.map(async ({ id: poolId, name: poolName }) =>
          Promise.all(
            collateralTypes.map(async (collateralType) => {
              const posRaw = await loadPosition({
                CoreProxy,
                accountId,
                poolId,
                tokenAddress: collateralType.tokenAddress,
              });
              const { cRatio, collateralAmount, debt } = selectPosition(posRaw);
              // Value will be removed from the collateral call in next release, so to prepare for that calculate it manually
              const price = collateralPriceByAddress?.[collateralType.tokenAddress];
              const collateralValue = price ? collateralAmount.mul(price) : wei(0);
              return {
                id: `${poolId}-${collateralType.symbol}` as const,
                accountId,
                poolId,
                poolName,
                collateralAmount,
                collateralValue,
                collateralType,
                cRatio,
                debt,
              };
            })
          )
        )
      );
      return nestedResult.flat();
    },
    select: selectPositions,
    enabled: Boolean(
      CoreProxy &&
        collateralTypes?.length &&
        accountId &&
        pools?.length &&
        Boolean(collateralPriceByAddress)
    ),
  });
};
