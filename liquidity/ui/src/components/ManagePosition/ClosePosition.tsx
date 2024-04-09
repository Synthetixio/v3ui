import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { PositionHeader } from '../PositionHeader';
import { PositionOverview } from '../PositionOverview';
import { ManagePosition } from './ManagePosition';
import { MAXUINT, ZEROWEI } from '../../utils/constants';
import { usePool } from '@snx-v3/usePools';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useClosePosition } from '@snx-v3/useClosePosition';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { getUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { Transaction } from './SignTransaction';

export function ClosePosition({
  liquidityPosition,
  poolId = '',
  collateralAddress = '',
  collateralSymbol,
  accountId,
  isBase,
  networkId,
}: {
  liquidityPosition: LiquidityPosition;
  poolId?: string;
  collateralSymbol?: string;
  collateralAddress?: string;
  accountId?: string;
  networkId?: number;
  isBase: boolean;
}) {
  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const { data: collateralType, isLoading: collateralTypesIsLoading } =
    useCollateralType(collateralSymbol);
  const collateralAddresses = isBase
    ? [collateralAddress, getUSDCAddress(networkId)]
    : [collateralAddress];
  const { data: userTokenBalances } = useTokenBalances(collateralAddresses);
  const { data: accountBalances } = useAccountCollateral({ accountId });

  const accountCollateral = userTokenBalances
    ?.concat(accountBalances ? accountBalances?.map((balance) => balance.totalDeposited) : ZEROWEI)
    .reduce((cur, prev) => cur.add(prev), ZEROWEI);

  const { exec, isLoading: closePositionIsLoading } = useClosePosition({
    poolId: poolId,
    accountId,
    liquidityPosition,
    accountCollateral,
    collateralTypeAddress: collateralAddress,
  });

  const isLoading = isPoolLoading && collateralTypesIsLoading;

  const baseTransaction: Transaction[] = [
    {
      done: false,
      loading: closePositionIsLoading,
      exec,
      subline: 'lets see',
      title: 'close position',
    },
  ];

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
          transactions={baseTransaction}
        />
      }
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt={
            isBase
              ? liquidityPosition.debt.mul(liquidityPosition.collateralPrice)
              : liquidityPosition.debt
          }
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
          priceOfToDeposit={liquidityPosition?.collateralPrice || ZEROWEI}
        />
      }
    />
  );
}
