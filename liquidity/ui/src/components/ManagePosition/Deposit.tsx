import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { PositionHeader } from '../PositionHeader';
import { PositionOverview } from '../PositionOverview';
import { ManagePosition } from './ManagePosition';
import { MAXUINT, ZEROWEI } from '../../utils/constants';
import { usePool } from '@snx-v3/usePools';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useApprove } from '@snx-v3/useApprove';
import { useWrapEth } from '@snx-v3/useWrapEth';
import { useDeposit } from '@snx-v3/useDeposit';
import { getUSDCAddress } from '@snx-v3/isBaseAndromeda';

export function Deposit({
  liquidityPosition,
  poolId,
  collateralAddress,
  collateralSymbol,
  accountId,
  networkId,
  isBase,
}: {
  liquidityPosition: LiquidityPosition;
  poolId?: string;
  collateralSymbol?: string;
  collateralAddress: string;
  accountId?: string;
  isBase: boolean;
  networkId?: number;
}) {
  const [amountToDeposit] = useRecoilState(amountState);
  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);
  const collateralAddresses = isBase
    ? [collateralAddress, getUSDCAddress(networkId)]
    : [collateralAddress];
  const { data: collateralType, isLoading: collateralTypesIsLoading } =
    useCollateralType(collateralSymbol);
  const { data: userTokenBalances, isLoading: userTokenBalancesIsLoading } =
    useTokenBalances(collateralAddresses);
  const { data: accountCollateral, isLoading: accountCollateralIsLoading } = useAccountCollateral({
    accountId,
  });
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
      if (prev.displaySymbol === collateralSymbol) return cur.add(prev.totalDeposited);
      return cur;
    }, ZEROWEI) || ZEROWEI;

  const { exec: depositBaseAndromeda, isLoading: depositBaseAndromedaIsLoading } = useDeposit({
    collateralChange: amountToDeposit,
    currentCollateral: liquidityPosition?.collateralAmount || ZEROWEI,
    newAccountId: '1337',
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
  // there is a bug when wrapping weth but the allowance query doenst get updated @TODO dev

  const baseTransactions = [
    {
      done: !requireApproval,
      loading: approveIsLoading,
      title: `Approve ${collateralSymbol} transfer`,
      subline: `You must approve your ${collateralSymbol} transfer before depositing.`,
      exec: approve,
      arg: false,
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
      title={collateralSymbol + ' Liquidity Position'}
      isLoading={isLoading}
      collateralSymbol={collateralSymbol}
      poolName={pool?.name}
      ManagePosition={
        <ManagePosition
          liquidityPostion={liquidityPosition}
          walletBalance={walletBalance}
          accountBalance={accountBalance}
          isBase={false}
          transactions={transactions}
        />
      }
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt={liquidityPosition?.debt || ZEROWEI}
          collateralValue={
            liquidityPosition ? liquidityPosition.collateralValue.toNumber().toFixed(2) : '0.00'
          }
          poolPnl="$0.00"
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
