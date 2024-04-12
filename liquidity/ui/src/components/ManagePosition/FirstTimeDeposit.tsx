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
import { useApprove } from '@snx-v3/useApprove';
import { useDeposit } from '@snx-v3/useDeposit';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useWrapEth } from '@snx-v3/useWrapEth';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';

export function FirstTimeDeposit({
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
  const [amountToDeposit] = useRecoilState(amountState);
  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const { data: collateralType, isLoading: collateralTypesIsLoading } =
    useCollateralType(collateralSymbol);
  const { data: userTokenBalances, isLoading: userTokenBalancesIsLoading } = useTokenBalances([
    collateralAddress,
  ]);
  const { data: accountCollateral, isLoading: accountCollateralIsLoading } = useAccountCollateral({
    accountId,
  });
  const { data: collateralPrices } = useCollateralPrices();
  const { data: CoreProxy } = useCoreProxy();
  const {
    approve,
    requireApproval,
    isLoading: approveIsLoading,
  } = useApprove({
    amount: amountToDeposit.toBN(),
    contractAddress: collateralAddress,
    spender: CoreProxy?.address,
  });

  const { exec: wrapEth, isLoading: wrapEthIsLoading, ethBalance, wethBalance } = useWrapEth();
  const walletBalance =
    userTokenBalances?.reduce((cur, prev) => cur.add(prev), ZEROWEI).add(ethBalance || ZEROWEI) ||
    ZEROWEI;
  const accountBalance =
    accountCollateral?.reduce((cur, prev) => {
      if (prev.symbol?.toLowerCase() === collateralSymbol?.toLowerCase())
        return cur.add(prev.totalDeposited);
      return cur;
    }, ZEROWEI) || ZEROWEI;
  const { exec: depositBaseAndromeda, isLoading: depositBaseAndromedaIsLoading } = useDeposit({
    collateralChange: amountToDeposit,
    currentCollateral: ZEROWEI,
    newAccountId: (Math.floor(Math.random() * (10_000_000 - 10_000 + 1)) + 10_000).toString(),
    accountId,
    poolId,
    availableCollateral: accountBalance,
    collateralTypeAddress: collateralAddress,
  });
  const isLoading =
    isPoolLoading &&
    collateralTypesIsLoading &&
    userTokenBalancesIsLoading &&
    accountCollateralIsLoading;

  const baseTransactions = [
    {
      done: !requireApproval,
      loading: approveIsLoading,
      title: `Approve ${collateralSymbol} transfer`,
      subline: `You must approve your ${collateralSymbol} transfer before depositing.`,
      exec: approve,
      arg: true,
    },
    {
      done: false,
      loading: depositBaseAndromedaIsLoading,
      title: `Delegate ${collateralSymbol}`,
      subline: `This step will transfer your ${collateralSymbol} to Synthetix as well as delegating to the selected Pool.`,
      exec: depositBaseAndromeda,
    },
  ];

  const transactions =
    collateralSymbol === 'WETH'
      ? [
          {
            done: amountToDeposit.lte(wethBalance || ZEROWEI),
            loading: wrapEthIsLoading,
            title: 'Wrap your Eth',
            subline: 'Wrap your Eth so Synthetix can use it.',
            exec: wrapEth,
            arg: amountToDeposit,
          },
          ...baseTransactions,
        ]
      : baseTransactions;

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
          accountBalance={accountBalance}
          transactions={transactions}
          isBase={false}
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
