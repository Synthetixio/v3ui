import { useParams } from '@snx-v3/useParams';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { Fade, Flex, Heading, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { usePool } from '@snx-v3/usePools';
import { TokenIcon } from '../../components/TokenIcon';
import { InfoIcon } from '@chakra-ui/icons';
import { PositionOverview } from '../../components/PositionOverview';
import { ReactNode, useState } from 'react';
import Wei from '@synthetixio/wei';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionInput } from '../../components/LiquidityPositionInput';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useAccounts } from '@snx-v3/useAccounts';
import { useRecoilState } from 'recoil';
import { depositState } from '../../state/deposit';
import { constants, utils } from 'ethers';
import { useDepositBaseAndromeda } from '@snx-v3/useDepositBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { getUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { useApprove } from '@snx-v3/useApprove';

export function DepositUi({
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
      <Flex height="100%" flexDirection="column" w="100%">
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
        <Flex w="100%" gap="6" justifyContent="center">
          {PositionOverview}
          {LiquidityPositionInput}
        </Flex>
      </Flex>
      <Heading>REWARDS</Heading>
    </Flex>
  );
}

export function DepositBaseAndromeda() {
  const [positionCreated, setPositionCreated] = useState(false);
  const { poolId, accountId, collateralSymbol, collateralAddress } = useParams();
  const [amountToDeposit] = useRecoilState(depositState);
  const { network } = useNetwork();

  const { data: pool, isLoading: isPoolLoading } = usePool(poolId);

  const { data: userAccounts, isLoading: userAccountsIsLoading } = useAccounts();

  const { data: liquidityPosition, isLoading: liquidityPositionsIsLoading } = useLiquidityPositions(
    { accountId }
  );

  const { data: accountCollaterals, isLoading: accountCollateralIsLoading } = useAccountCollateral({
    accountId,
  });

  const userTokenAddresses = accountCollaterals
    ?.filter((collateral) => collateral.symbol === collateralSymbol)
    .map((collateral) => collateral.tokenAddress)
    .concat(getUSDCAddress(network?.id)) || [''];

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } =
    useTokenBalances(userTokenAddresses);

  const { data: SpotProxy } = useSpotMarketProxy();

  const { data: collateralTypes, isLoading: collateralTypesIsLoading } = useCollateralTypes();

  const { data: collateralPrices, isLoading: collateralPricesIsLoading } = useCollateralPrices();

  const collateralType = collateralTypes?.find(
    (collateral) => collateral.symbol === collateralSymbol
  );

  const zeroWei = new Wei(0);
  const isFirstTimeDepositing = !liquidityPosition;

  const position = liquidityPosition && liquidityPosition[`${poolId}-${collateralSymbol}`];

  const priceForCollateral =
    !!collateralPrices && !!collateralType
      ? collateralPrices[collateralType.tokenAddress]!
      : zeroWei;

  const maxUInt = new Wei(constants.MaxUint256);

  const debt = position ? position.debt : zeroWei;

  const debt$ = debt.mul(priceForCollateral);

  const userTokeBalance = userTokenBalances ? userTokenBalances[0] : zeroWei;

  const balance$ = accountCollaterals
    ? {
        deposited:
          accountCollaterals.find((collateral) => collateral.symbol === collateralSymbol)
            ?.availableCollateral || zeroWei,
        wallet: userTokeBalance,
      }
    : { deposited: userTokeBalance, wallet: zeroWei };

  const {
    approve,
    requireApproval,
    isLoading: approveIsLoading,
  } = useApprove({
    contractAddress: collateralAddress,
    amount: amountToDeposit.gt(0)
      ? //Base USDC is 6 decimals
        utils.parseUnits(amountToDeposit.toNumber().toFixed(2), 6)
      : 0,
    spender: SpotProxy?.address,
  });
  const { exec: depositBaseAndromeda, isLoading: depositBaseAndromedaIsLoading } =
    useDepositBaseAndromeda({
      accountId,
      newAccountId: '1337',
      poolId: poolId,
      collateralTypeAddress: collateralAddress,
      collateralChange: amountToDeposit,
      currentCollateral: position ? position.collateralAmount : zeroWei,
      availableCollateral: zeroWei,
    });

  const handleButtonClick = async (action: 'createPosition' | 'createAccount') => {
    if (action === 'createPosition') {
      if (requireApproval) {
        await approve(false);
      }
      try {
        await depositBaseAndromeda();
        setPositionCreated(true);
      } catch {
        setPositionCreated(false);
      }
    }
  };

  const isLoading =
    isPoolLoading &&
    liquidityPositionsIsLoading &&
    collateralPricesIsLoading &&
    collateralTypesIsLoading &&
    accountCollateralIsLoading &&
    tokenBalancesIsLoading &&
    userAccountsIsLoading;

  return (
    <DepositUi
      isLoading={isLoading}
      isFirstDeposit={isFirstTimeDepositing}
      collateralSymbol={collateralSymbol}
      poolName={pool?.name}
      LiquidityPositionInput={
        <LiquidityPositionInput
          title={
            positionCreated
              ? 'Position successfully Opened'
              : isFirstTimeDepositing
                ? 'Open LiquidityPosition'
                : 'Manage Debt'
          }
          collateralSymbol={collateralSymbol || ''}
          balance={balance$}
          price={priceForCollateral}
          userHasAccounts={!!userAccounts?.length}
          currentCRatio="Infinite"
          nextCRatio="Infinite"
          deposited={position?.debt}
          onButtonClick={handleButtonClick}
          depositIsLoading={depositBaseAndromedaIsLoading}
          approveIsLoading={approveIsLoading}
          requireApprove={requireApproval}
          completedAllSteps={positionCreated}
        />
      }
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt$={debt$.toNumber().toFixed(2)}
          collateralValue={
            position ? position.debt.mul(priceForCollateral).toNumber().toFixed(2) : '0.00'
          }
          poolPnl="$00.00"
          currentCollateral={position ? position.debt.toNumber().toFixed(2) : '0.00'}
          cRatio={maxUInt.toNumber()}
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={priceForCollateral}
        />
      }
    />
  );
}
