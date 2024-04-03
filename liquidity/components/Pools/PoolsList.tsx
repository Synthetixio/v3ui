import { CollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';
import { PoolType } from '@snx-v3/usePools';
import { PoolCard, PoolsLoading } from '.';

interface PoolsListProps {
  pools?: PoolType[];
  collateralTypes?: CollateralType[];
  liquidityPositionsById?: LiquidityPositionsById;
  apr: number;
  isLoading: boolean;
}

export const PoolsList = ({
  pools,
  collateralTypes,
  liquidityPositionsById,
  isLoading,
  apr,
}: PoolsListProps) => {
  return (
    <>
      {isLoading ? (
        <PoolsLoading />
      ) : (
        <>
          {pools?.map((pool) => (
            <PoolCard
              key={pool.id}
              pool={pool}
              collateralTypes={collateralTypes}
              liquidityPositionsById={liquidityPositionsById}
              apr={apr}
            />
          ))}
        </>
      )}
    </>
  );
};
