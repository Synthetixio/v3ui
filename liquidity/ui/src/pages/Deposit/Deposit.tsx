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
import { useRecoilState } from 'recoil';
import { depositState } from '../../state/deposit';
import { constants, utils } from 'ethers';
import { useDepositBaseAndromeda } from '@snx-v3/useDepositBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { useApprove } from '@snx-v3/useApprove';
import { useCoreProxy } from '@snx-v3/useCoreProxy';

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

export function Deposit() {
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

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } = useTokenBalances(
    accountCollaterals
      ?.filter((collateral) => collateral.symbol === collateralSymbol)
      .map((collateral) => collateral.tokenAddress) || [collateralAddress || '']
  );

  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotProxy } = useSpotMarketProxy();

  const { data: collateralTypes, isLoading: collateralTypesIsLoading } = useCollateralTypes();

  const { data: collateralPrices, isLoading: collateralPricesIsLoading } = useCollateralPrices();

  const collateralType = collateralTypes?.find(
    (collateral) => collateral.symbol === collateralSymbol || collateral.symbol === 'sUSDC'
  );

  const isLoading =
    isPoolLoading &&
    liquidityPositionsIsLoading &&
    collateralPricesIsLoading &&
    collateralTypesIsLoading &&
    accountCollateralIsLoading &&
    tokenBalancesIsLoading &&
    userAccountsIsLoading;

  const parsedCollateralSymbol =
    collateralSymbol === 'USDC' || collateralSymbol === 'fUSD' ? 'sUSDC' : collateralSymbol;
  const position = liquidityPosition
    ? liquidityPosition[`${poolId}-${parsedCollateralSymbol}`]
    : undefined;

  const zeroWei = new Wei(0);
  const isFirstTimeDepositing = !liquidityPosition;

  const cRatio = position ? position?.cRatio : zeroWei;

  const priceForCollateral =
    !!collateralPrices && !!collateralType
      ? collateralPrices[collateralType.tokenAddress]!
      : zeroWei;

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

  const collateralValue = position ? position.collateralValue : zeroWei;

  const collateralAmount = position ? position.collateralAmount : zeroWei;

  const { approve, requireApproval } = useApprove({
    contractAddress: collateralAddress,
    amount: amountToDeposit.gt(0)
      ? isBaseAndromeda(network?.id, network?.preset)
        ? //Base USDC is 6 decimals
          utils.parseUnits(amountToDeposit.toString(), 6)
        : amountToDeposit.toBN()
      : 0,
    spender: isBaseAndromeda(network?.id, network?.preset)
      ? SpotProxy?.address
      : CoreProxy?.address,
  });

  // const depositMutation = useDeposit({
  //   accountId,
  //   newAccountId: (Math.floor(Math.random() * 1_000_000) + 1).toString(),
  //   collateralChange: amountToDeposit,
  //   currentCollateral: balance$.deposited,
  //   availableCollateral: balance$.deposited,
  //   collateralTypeAddress: collateralAddress,
  //   poolId,
  // });
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
      if (isBaseAndromeda(network?.id, network?.preset)) {
        await depositBaseAndromeda();
      }
    }
  };

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
          currentCRatio={cRatio.eq(0) ? 'N/A' : cRatio.toNumber().toFixed(2)}
          nextCRatio={cRatio.eq(0) && amountToDeposit.gt(0) ? 'Infinite' : cRatio.toString()}
          deposited={collateralValue.toNumber().toFixed(2)}
          onButtonClick={handleButtonClick}
          depositIsLoading={depositBaseAndromedaIsLoading}
        />
      }
      PositionOverview={
        <PositionOverview
          collateralType={collateralSymbol || '?'}
          debt$={debt$.toNumber().toFixed(2)}
          borrowed="TODO"
          collateralValue={collateralValue.toNumber().toFixed(2)}
          poolPnl="$00.00"
          currentCollateral={collateralAmount.toNumber().toFixed(2)}
          cRatio={
            cRatio.eq(0) && amountToDeposit.gt(0)
              ? new Wei(constants.MaxUint256).toNumber()
              : cRatio.toNumber()
          }
          liquidationCratioPercentage={collateralType?.liquidationRatioD18.toNumber()}
          targetCratioPercentage={collateralType?.issuanceRatioD18.toNumber()}
          isLoading={isLoading}
          priceOfToDeposit={priceForCollateral}
        />
      }
    />
  );
}
