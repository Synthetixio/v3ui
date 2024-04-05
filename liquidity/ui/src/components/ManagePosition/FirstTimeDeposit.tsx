import { usePool } from '@snx-v3/usePools';
import { PositionOverview } from '../../components/PositionOverview';
import Wei from '@synthetixio/wei';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { constants } from 'ethers';
import { PositionHeader } from '../../components/PositionHeader';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { ManagePosition } from './ManagePosition';
import { ZEROWEI } from '../../utils/constants';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { getUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { useApprove } from '@snx-v3/useApprove';
import { useDeposit } from '@snx-v3/useDeposit';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useWrapEth } from '@snx-v3/useWrapEth';

export function FirstTimeDeposit({
  liquidityPosition,
  poolId,
  collateralSymbol,
  collateralAddress,
  networkId,
  accountId,
}: {
  liquidityPosition?: LiquidityPosition;
  poolId?: string;
  collateralSymbol?: string;
  collateralAddress: string;
  networkId?: number;
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
  const { data: CoreProxy } = useCoreProxy();
  const {
    approve,
    requireApproval,
    isLoading: approveIsLoading,
  } = useApprove({
    amount: amountToDeposit.toBN(),
    contractAddress: getUSDCAddress(networkId),
    spender: CoreProxy?.address,
  });
  const { exec: wrapEth, isLoading: wrapEthIsLoading, ethBalance } = useWrapEth();
  const walletBalance =
    userTokenBalances?.reduce((cur, prev) => cur.add(prev), ZEROWEI).add(ethBalance) || ZEROWEI;
  const accountBalance =
    accountCollateral?.reduce((cur, prev) => {
      if (prev.displaySymbol === collateralSymbol) return cur.add(prev.totalDeposited);
      return cur;
    }, ZEROWEI) || ZEROWEI;
  const maxUInt = new Wei(constants.MaxUint256);

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
          transactions={[
            {
              done: false,
              loading: wrapEthIsLoading,
              title: 'Wrap your Eth',
              subline: 'Wrap your Eth so Synthetix can use it.',
              exec: wrapEth,
              var: amountToDeposit,
            },
            {
              done: !requireApproval,
              loading: approveIsLoading,
              title: `Approve ${collateralSymbol} transfer`,
              subline: `You must approve your ${collateralSymbol} transfer before depositing.`,
              exec: approve,
              var: false,
            },
            {
              done: false,
              loading: depositBaseAndromedaIsLoading,
              title: `Delegate ${collateralSymbol}`,
              subline: `This step will transfer your ${collateralSymbol} to Synthetix as well as delegating to the selected Pool.`,
              exec: depositBaseAndromeda,
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
