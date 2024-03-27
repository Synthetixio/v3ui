import { useParams } from '@snx-v3/useParams';
import { ManagePositionHeader } from '../../components/ManagePositionHeader';
import { usePool } from '@snx-v3/usePools';
import { PositionOverview } from '../../components/PositionOverview';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import Wei from '@synthetixio/wei';
import { constants } from 'ethers';

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
  const debt = position ? position.debt : zeroWei;
  const priceForCollateral =
    !!collateralPrices && !!collateralType
      ? collateralPrices[collateralType.tokenAddress]!
      : zeroWei;

  const debt$ = debt.mul(priceForCollateral);
  const maxUInt = new Wei(constants.MaxUint256);
  const isLoading =
    isPoolLoading &&
    collateralPricesIsLoading &&
    collateralTypesIsLoading &&
    liquidityPositionsIsLoading;
  return (
    <ManagePositionHeader
      title={`${collateralSymbol} Liquditiy Position`}
      poolName={pool?.name}
      isLoading={isLoading}
      collateralSymbol={collateralSymbol}
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt={debt$.toNumber().toFixed(2)}
          collateralValue={
            position ? position.debt.mul(priceForCollateral).toNumber().toFixed(2) : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={position ? position.debt : zeroWei}
          cRatio={maxUInt.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={priceForCollateral}
        />
      }
      ManagePosition={<></>}
    />
  );
};
