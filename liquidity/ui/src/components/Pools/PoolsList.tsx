import { CollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';
import { PoolType } from '@snx-v3/usePools';
import { PoolCard } from '.';

interface PoolsListProps {
  pools?: PoolType[];
  collateralTypes?: CollateralType[];
  liquidityPositionsById?: LiquidityPositionsById;
  isLoading: boolean;
}

export const PoolsList = ({
  pools,
  collateralTypes,
  liquidityPositionsById,
  isLoading,
}: PoolsListProps) => {
  return (
    <>
      {pools?.map((pool) => (
        <PoolCard
          key={pool.id}
          pool={pool}
          collateralTypes={collateralTypes}
          liquidityPositionsById={liquidityPositionsById}
        />
      ))}
    </>
  );
};
