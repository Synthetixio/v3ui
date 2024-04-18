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
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useBorrow } from '@snx-v3/useBorrow';

export function Borrow({
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
  networkId?: number;
}) {
  const [amountToDeposit] = useRecoilState(amountState);
  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const { data: collateralType, isLoading: collateralTypesIsLoading } =
    useCollateralType(collateralSymbol);
  const { exec, isLoading: claimIsLoading } = useBorrow({
    debtChange: amountToDeposit.sub(1),
    accountId,
    collateralTypeAddress: collateralAddress,
    poolId,
  });

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
          isBase={false}
          liquidityPostion={liquidityPosition}
          transactions={[
            {
              done: false,
              loading: claimIsLoading,
              exec,
              subline: 'borrow',
              title: 'borrow moah',
            },
          ]}
          issuanceRatio={
            !liquidityPosition.cRatio.eq(0)
              ? liquidityPosition.cRatio.sub(collateralType?.issuanceRatioD18 || ZEROWEI)
              : collateralType?.issuanceRatioD18
          }
        />
      }
      PositionOverview={
        <PositionOverview
          dontUpdate={true}
          collateralType={collateralSymbol || '?'}
          debt={liquidityPosition?.debt || ZEROWEI}
          collateralValue={
            liquidityPosition ? liquidityPosition.collateralValue.toNumber().toFixed(2) : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={liquidityPosition ? liquidityPosition.collateralAmount : ZEROWEI}
          cRatio={amountToDeposit.eq(0) ? 0 : maxUInt.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          price={liquidityPosition?.collateralPrice || ZEROWEI}
        />
      }
    />
  );
}
