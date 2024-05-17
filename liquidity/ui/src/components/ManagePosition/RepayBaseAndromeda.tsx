import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { PositionHeader } from '../PositionHeader';
import { PositionOverview } from '../PositionOverview';
import { ManagePosition } from './ManagePosition';
import { MAXUINT, ZEROWEI } from '../../utils/constants';
import { usePool } from '@snx-v3/usePools';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useRepayBaseAndromeda } from '@snx-v3/useRepayBaseAndromeda';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export function RepayBaseAndromeda({
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
  const { data: usdTokens } = useGetUSDTokens();
  const [amountToDeposit] = useRecoilState(amountState);
  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const { data: collateralType, isLoading: collateralTypesIsLoading } =
    useCollateralType(collateralSymbol);
  const { data: USDCBalance } = useTokenBalance(usdTokens?.USDC);
  const { exec, isLoading: repayIsLoading } = useRepayBaseAndromeda({
    debtChange: amountToDeposit,
    accountId,
    availableUSDCollateral: USDCBalance,
    collateralTypeAddress: collateralAddress,
    poolId,
  });
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
          poolPnl="$0.00"
          arithmeticOperations="none"
          currentCollateral={liquidityPosition ? liquidityPosition.collateralAmount : ZEROWEI}
          cRatio={MAXUINT.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          price={liquidityPosition?.collateralPrice || ZEROWEI}
        />
      }
    />
  );
}
