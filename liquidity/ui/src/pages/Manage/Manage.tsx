import { useParams } from '@snx-v3/useParams';
import { ManagePosition } from '../../components/ManagePosition';
import { PositionHeader } from '../../components/PositionHeader';
import { PositionOverview } from '../../components/PositionOverview';
import { usePool } from '@snx-v3/usePools';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import Wei from '@synthetixio/wei';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';

export function Manage() {
  const { collateralSymbol, poolId, collateralAddress, accountId } = useParams();

  const { data: pool, isLoading: poolIsLoading } = usePool(poolId);
  const { data: liquidityPosition, isLoading: liquidityPositionIsLoading } = useLiquidityPosition({
    tokenAddress: collateralAddress,
    accountId,
    poolId,
  });
  const { data: collateralTypes, isLoading: collateralTypesIsLoading } = useCollateralTypes();
  const { data: collateralPrices, isLoading: collateralPricesIsLoading } = useCollateralPrices();

  const zeroWei = new Wei(0);
  const collateralType = collateralTypes?.find(
    (collateral) => collateral.symbol === collateralSymbol
  );
  const priceForCollateral =
    !!collateralPrices && !!collateralType
      ? collateralPrices[collateralType.tokenAddress]!
      : zeroWei;
  const debt = liquidityPosition ? liquidityPosition.debt : zeroWei;

  const isLoading =
    poolIsLoading &&
    liquidityPositionIsLoading &&
    collateralTypesIsLoading &&
    collateralPricesIsLoading;
  return (
    <PositionHeader
      title={`${collateralSymbol} Liquditiy Position`}
      poolName={pool?.name}
      isLoading={isLoading}
      collateralSymbol={collateralSymbol}
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt={liquidityPosition?.debt.mul(priceForCollateral) || zeroWei}
          collateralValue={
            liquidityPosition
              ? liquidityPosition.collateralValue.mul(priceForCollateral).toNumber().toFixed(2)
              : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={liquidityPosition ? liquidityPosition.collateralAmount : zeroWei}
          cRatio={liquidityPosition?.cRatio.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={priceForCollateral}
        />
      }
      ManagePosition={<ManagePosition debt={debt} price={priceForCollateral}></ManagePosition>}
    />
  );
}
