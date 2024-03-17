import { useParams } from '@snx-v3/useParams';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { Fade, Flex, Heading, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { usePool } from '@snx-v3/usePools';
import { TokenIcon } from '../../components/TokenIcon';
import { InfoIcon } from '@chakra-ui/icons';
import { PositionOverview } from '../../components/PositionOverview';
import { ReactNode } from 'react';
import Wei from '@synthetixio/wei';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionInput } from '../../components/LiquidityPositionInput';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useAccounts } from '@snx-v3/useAccounts';

function DepositUi({
  isFirstDeposit,
  isLoading,
  collateralSymbol,
  poolName,
  PositionOverview,
  LiquidityPositionInput,
}: {
  isFirstDeposit: boolean;
  isLoading: boolean;
  collateralSymbol?: string;
  poolName?: string;
  PositionOverview: ReactNode;
  LiquidityPositionInput: ReactNode;
}) {
  return (
    <Flex flexDir="column" gap="6">
      <Flex height="100%" flexDirection="column" w="100%" p="6">
        <Flex gap="4" alignItems="center" mb="6">
          <TokenIcon symbol={collateralSymbol || ''} width={42} height={42} />
          <Flex justifyContent="space-between" w="100%">
            <Skeleton
              isLoaded={!isLoading}
              height="48px"
              minWidth={isLoading ? '40%' : 'initial'}
              startColor="gray.700"
              endColor="navy.800"
            >
              <Fade in>
                <Heading fontSize="24px" color="white">
                  {isFirstDeposit
                    ? 'Open ' + collateralSymbol + ' Liquidity Position'
                    : collateralSymbol + ' Liquidity Position'}
                </Heading>
                <Text fontWeight={700} color="white">
                  {poolName}
                </Text>
              </Fade>
            </Skeleton>
            <Flex flexDir="column" alignItems="flex-end">
              <Text fontSize="14px" color="gray.500" fontWeight={500}>
                Estimated APY{' '}
                <Tooltip label="TODO" p="3">
                  <InfoIcon w="12px" h="12px" />
                </Tooltip>
              </Text>
              <Text fontSize="24px" fontWeight={800}>
                TODO%
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" gap="6">
          {PositionOverview}
          {LiquidityPositionInput}
        </Flex>
      </Flex>
      <Heading>REWARDS</Heading>
    </Flex>
  );
}

export function Deposit() {
  const { poolId, accountId, collateralSymbol } = useParams();

  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);

  const { data: userAccounts, isLoading: userAccountsIsLoading } = useAccounts();

  const { data: liquidityPosition, isLoading: liquidityPositionsIsLoading } = useLiquidityPositions(
    { accountId }
  );

  const { data: accountCollaterals, isLoading: accountCollateralIsLoading } = useAccountCollateral({
    accountId,
  });

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } = useTokenBalances(
    accountCollaterals
      ?.filter((collateral) => collateral.symbol === collateralSymbol)
      .map((collateral) => collateral.tokenAddress) || []
  );

  const { data: collateralTypes, isLoading: collateralTypesIsLoading } = useCollateralTypes();

  const { data: collateralPrices, isLoading: collateralPricesIsLoading } = useCollateralPrices();

  const isLoading =
    isPoolLoading &&
    liquidityPositionsIsLoading &&
    collateralPricesIsLoading &&
    collateralTypesIsLoading &&
    accountCollateralIsLoading &&
    tokenBalancesIsLoading &&
    userAccountsIsLoading;

  const collateralTypeAddress = collateralTypes?.find(
    (collateral) => collateral.symbol === collateralSymbol
  )?.tokenAddress;

  const parsedColalteralSymbol = collateralSymbol === 'USDC' ? 'sUSDC' : collateralSymbol;
  const zeroWei = new Wei(0);
  const isFirstTimeDepositing = !liquidityPosition;

  const cRatio = liquidityPosition
    ? liquidityPosition[`${poolId}-${parsedColalteralSymbol}`]?.cRatio
    : zeroWei;

  const priceForCollateral =
    !!collateralPrices && !!collateralTypeAddress
      ? collateralPrices[collateralTypeAddress]!
      : zeroWei;

  const debt = liquidityPosition
    ? liquidityPosition[`${poolId}-${parsedColalteralSymbol}`].debt
    : zeroWei;
  const debt$ = debt.mul(priceForCollateral);
  const balance$ = accountCollaterals
    ? {
        deposited:
          accountCollaterals.find((collateral) => collateral.symbol === collateralSymbol)
            ?.availableCollateral || zeroWei,
        // TODO fix it
        wallet: userTokenBalances ? userTokenBalances[0] : zeroWei,
      }
    : { deposited: zeroWei, wallet: zeroWei };
  const collateralValue = liquidityPosition
    ? liquidityPosition[`${poolId}-${parsedColalteralSymbol}`].collateralValue
    : zeroWei;
  const collateralAmount = liquidityPosition
    ? liquidityPosition[`${poolId}-${parsedColalteralSymbol}`].collateralAmount
    : zeroWei;

  return (
    <DepositUi
      isLoading={isLoading}
      isFirstDeposit={isFirstTimeDepositing}
      collateralSymbol={collateralSymbol}
      poolName={pool?.name}
      LiquidityPositionInput={
        <LiquidityPositionInput
          title={isFirstTimeDepositing ? 'Open LiquidityPosition' : 'Manage Debt'}
          collateralSymbol={collateralSymbol || ''}
          balance={balance$}
          price={priceForCollateral}
          userHasAccounts={!!userAccounts?.length}
        />
      }
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt$={debt$.toNumber().toFixed(2)}
          borrowed="TODO"
          collateralValue={collateralValue.toNumber().toFixed(2)}
          poolPnl="TODO"
          currentCollateral={collateralAmount.toNumber().toFixed(2)}
          cRatio={cRatio.toNumber().toFixed(2)}
          isLoading={isLoading}
        />
      }
    />
  );
}
