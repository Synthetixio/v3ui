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
import { useRepayBaseAndromeda } from '@snx-v3/useRepayBaseAndromeda';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { getUSDCAddress } from '@snx-v3/isBaseAndromeda';

export function RepayBaseAndromeda({
  liquidityPosition,
  poolId,
  collateralAddress,
  collateralSymbol,
  accountId,
  networkId,
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
  const { data: USDCBalance } = useTokenBalance(getUSDCAddress(networkId));
  const { exec, isLoading: repayIsLoading } = useRepayBaseAndromeda({
    debtChange: amountToDeposit,
    accountId,
    availableUSDCollateral: USDCBalance,
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
          isBase={true}
          liquidityPostion={liquidityPosition}
          transactions={[
            {
              done: false,
              loading: repayIsLoading,
              exec,
              subline: 'Repay Debt',
              title: 'Repay Debt',
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
