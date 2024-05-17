import { usePool } from '@snx-v3/usePools';
import { PositionOverview } from '../../components/PositionOverview';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { PositionHeader } from '../../components/PositionHeader';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { ManagePosition } from './ManagePosition';
import { ZEROWEI } from '../../utils/constants';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { useApprove } from '@snx-v3/useApprove';
import { useDepositBaseAndromeda } from '@snx-v3/useDepositBaseAndromeda';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';

export function FirstTimeDepositBaseAndromeda({
  liquidityPosition,
  poolId,
  collateralSymbol,
  collateralAddress,
  accountId,
}: {
  liquidityPosition?: LiquidityPosition;
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
  const { data: userTokenBalances, isLoading: userTokenBalancesIsLoading } = useTokenBalances([
    collateralAddress,
    usdTokens?.USDC || '',
  ]);
  const { data: accountCollateral, isLoading: accountCollateralIsLoading } = useAccountCollateral({
    accountId,
  });
  const { data: SpotMarket } = useSpotMarketProxy();
  const {
    approve,
    requireApproval,
    isLoading: approveIsLoading,
  } = useApprove({
    amount: amountToDeposit.toBN(),
    contractAddress: usdTokens?.USDC,
    spender: SpotMarket?.address,
  });
  const { data: collateralPrices } = useCollateralPrices();
  const walletBalance = userTokenBalances?.reduce((cur, prev) => cur.add(prev), ZEROWEI) || ZEROWEI;
  const accountBalance =
    accountCollateral?.reduce((cur, prev) => {
      if (prev.displaySymbol === collateralSymbol) return cur.add(prev.totalDeposited);
      return cur;
    }, ZEROWEI) || ZEROWEI;

  const sUSDCBalance = userTokenBalances ? userTokenBalances[0] : ZEROWEI;
  const { exec: depositBaseAndromeda, isLoading: depositBaseAndromedaIsLoading } =
    useDepositBaseAndromeda({
      collateralChange: amountToDeposit,
      currentCollateral: liquidityPosition?.collateralAmount || ZEROWEI,
      newAccountId: '1337',
      accountId,
      poolId,
      availableCollateral: accountBalance,
      sUSDCBalance: sUSDCBalance,
      collateralTypeAddress: collateralAddress,
    });

  const baseTransaction = [
    {
      done: false,
      loading: depositBaseAndromedaIsLoading,
      title: `Delegate ${collateralSymbol}`,
      subline: `This step will transfer your ${collateralSymbol} to Synthetix as well as delegating to the selected Pool.`,
      exec: depositBaseAndromeda,
    },
  ];

  const transactions = sUSDCBalance.lt(amountToDeposit)
    ? requireApproval
      ? [
          {
            done: !requireApproval,
            loading: approveIsLoading,
            title: `Approve ${collateralSymbol} transfer`,
            subline: `You must approve your ${collateralSymbol} transfer before depositing.`,
            exec: approve,
            arg: false,
          },
          ...baseTransaction,
        ]
      : baseTransaction
    : baseTransaction;

  const isLoading =
    isPoolLoading &&
    collateralTypesIsLoading &&
    userTokenBalancesIsLoading &&
    accountCollateralIsLoading;
  return (
    <PositionHeader
      title={'Open ' + collateralSymbol + ' Liquidity Position'}
      isLoading={isLoading}
      collateralSymbol={collateralSymbol}
      poolName={pool?.name}
      ManagePosition={
        <ManagePosition
          liquidityPostion={liquidityPosition}
          walletBalance={walletBalance}
          isBase={true}
          accountBalance={accountBalance}
          transactions={transactions}
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
          cRatio={0}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          price={collateralPrices && collateralPrices[collateralAddress]}
        />
      }
    />
  );
}
