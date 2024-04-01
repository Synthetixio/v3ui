import { useParams } from '@snx-v3/useParams';
import { PositionHeader } from '../../components/PositionHeader';
import { usePool } from '@snx-v3/usePools';
import { PositionOverview } from '../../components/PositionOverview';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import Wei from '@synthetixio/wei';
import { constants } from 'ethers';
import { ManagePosition } from '../../components/ManagePosition';

export const RepayBaseAndromeda = () => {
  const { poolId, accountId, collateralSymbol } = useParams();
  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const { data: collateralTypes, isLoading: collateralTypesIsLoading } = useCollateralTypes();
  const { data: liquidityPosition, isLoading: liquidityPositionsIsLoading } = useLiquidityPositions(
    { accountId }
  );
  const { data: collateralPrices, isLoading: collateralPricesIsLoading } = useCollateralPrices();

  const collateralType = collateralTypes?.find(
    (collateral) => collateral.symbol === collateralSymbol
  );

  const zeroWei = new Wei(0);
  const position = liquidityPosition && liquidityPosition[`${poolId}-${collateralSymbol}`];
  const debt = position?.debt || zeroWei;
  const priceForCollateral =
    !!collateralPrices && !!collateralType
      ? collateralPrices[collateralType.tokenAddress]!
      : zeroWei;

  const maxUInt = new Wei(constants.MaxUint256);
  const isLoading =
    isPoolLoading &&
    collateralPricesIsLoading &&
    collateralTypesIsLoading &&
    liquidityPositionsIsLoading;

  return (
    <PositionHeader
      title={`${collateralSymbol} Liquditiy Position`}
      poolName={pool?.name}
      isLoading={isLoading}
      collateralSymbol={collateralSymbol}
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt={position?.debt.mul(priceForCollateral) || zeroWei}
          collateralValue={
            position
              ? position.collateralValue.mul(priceForCollateral).toNumber().toFixed(2)
              : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={position ? position.collateralAmount : zeroWei}
          cRatio={maxUInt.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={priceForCollateral}
        />
      }
      ManagePosition={<ManagePosition debt={debt} price={priceForCollateral}></ManagePosition>}
    />
  );
};
