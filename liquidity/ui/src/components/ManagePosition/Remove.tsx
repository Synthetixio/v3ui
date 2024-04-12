import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { PositionHeader } from '../PositionHeader';
import { PositionOverview } from '../PositionOverview';
import { ManagePosition } from './ManagePosition';
import { MAXUINT, ZEROWEI } from '../../utils/constants';
import { usePool } from '@snx-v3/usePools';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { useUndelegate } from '@snx-v3/useUndelegate';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

export function Remove({
  liquidityPosition,
  poolId,
  collateralAddress,
  collateralSymbol,
  accountId,
  isBase,
}: {
  liquidityPosition: LiquidityPosition;
  poolId?: string;
  collateralSymbol?: string;
  collateralAddress: string;
  accountId?: string;
  isBase: boolean;
}) {
  const [amountToDeposit] = useRecoilState(amountState);
  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const { exec: undelegate, isLoading: undelegateIsLoading } = useUndelegate({
    accountId,
    poolId,
    collateralTypeAddress: collateralAddress,
    collateralChange: amountToDeposit.mul(-1),
    currentCollateral: liquidityPosition.collateralAmount,
  });
  const { data: collateralType, isLoading: collateralTypesIsLoading } =
    useCollateralType(collateralSymbol);

  const isLoading = isPoolLoading && collateralTypesIsLoading;

  return (
    <PositionHeader
      title={collateralSymbol + ' Liquidity Position'}
      isLoading={isLoading}
      collateralSymbol={collateralSymbol}
      poolName={pool?.name}
      ManagePosition={
        <ManagePosition
          liquidityPostion={liquidityPosition}
          isBase={false}
          transactions={[
            {
              done: false,
              loading: undelegateIsLoading,
              exec: undelegate,
              subline: 'test',
              title: 'dunno',
            },
          ]}
        />
      }
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt={liquidityPosition?.debt.mul(liquidityPosition?.collateralPrice) || ZEROWEI}
          arithmeticOperations="sub"
          collateralValue={
            liquidityPosition ? liquidityPosition.collateralValue.toNumber().toFixed(2) : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={liquidityPosition ? liquidityPosition.collateralAmount : ZEROWEI}
          cRatio={isBase ? MAXUINT.toNumber() : liquidityPosition.cRatio.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          price={liquidityPosition?.collateralPrice || ZEROWEI}
        />
      }
    />
  );
}
