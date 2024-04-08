import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { PositionHeader } from '../PositionHeader';
import { PositionOverview } from '../PositionOverview';
import { ManagePosition } from './ManagePosition';
import { ZEROWEI } from '../../utils/constants';
import { usePool } from '@snx-v3/usePools';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import Wei from '@synthetixio/wei';
import { constants } from 'ethers';
import { useUndelegate } from '@snx-v3/useUndelegate';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

export function Remove({
  liquidityPosition,
  poolId,
  collateralAddress,
  collateralSymbol,
  accountId,
}: {
  liquidityPosition: LiquidityPosition;
  poolId?: string;
  collateralSymbol?: string;
  collateralAddress: string;
  accountId?: string;
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
  const maxUInt = new Wei(constants.MaxUint256);

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
          collateralValue={
            liquidityPosition ? liquidityPosition.collateralValue.toNumber().toFixed(2) : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={liquidityPosition ? liquidityPosition.collateralAmount : ZEROWEI}
          cRatio={amountToDeposit.eq(0) ? 0 : maxUInt.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={liquidityPosition?.collateralPrice || ZEROWEI}
        />
      }
    />
  );
}
