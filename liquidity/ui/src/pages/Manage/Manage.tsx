import { FC } from 'react';
import { Box, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { CollateralIcon } from '@snx-v3/icons';
import { ManageAction } from './ManageActions';
import { ManagePositionProvider } from '@snx-v3/ManagePositionContext';
import { ManageStats } from './ManageStats';
import { HomeLink } from '@snx-v3/HomeLink';
import { Rewards } from '../../components/Rewards';
import { usePoolData } from '@snx-v3/usePoolData';
import { useRewards, RewardsType } from '@snx-v3/useRewards';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';

export const ManageUi: FC<{
  collateralType?: CollateralType;
  isLoading: boolean;
  rewards?: RewardsType;
  liquidityPosition?: LiquidityPosition;
}> = ({ collateralType, isLoading, rewards, liquidityPosition }) => {
  return (
    <Box mb={12}>
      <WithdrawIncrease />
      <Box mb="4">
        <HomeLink />
      </Box>
      <Flex alignItems="center" mb="8px">
        <Flex
          bg="linear-gradient(180deg, #08021E 0%, #1F0777 100%)"
          height="34px"
          width="34px"
          justifyContent="center"
          alignItems="center"
          borderRadius="100%"
          display="flex"
        >
          <CollateralIcon
            symbol={collateralType?.symbol}
            width="28px"
            height="28px"
            fill="#0B0B22"
            color="#00D1FF"
          />
        </Flex>
        <Heading
          ml={4}
          fontWeight={700}
          fontSize="3xl"
          color="gray.50"
          display="flex"
          alignItems="center"
        >
          {collateralType?.symbol} Liquidity Position
        </Heading>
      </Flex>
      <Text color="gray.500" fontFamily="heading" fontSize="14px" lineHeight="20px" width="80%">
        Deposit your collateral to borrow snxUSD and contribute to the network collateral. If
        you&apos;ve never staked on Synthetix V3 before, please read through this{' '}
        <Link
          fontWeight="600"
          color="cyan.500"
          href="https://docs.synthetix.io/v/v3/for-liquidity-providers/delegating-collateral"
          target="_blank"
        >
          quick introduction
        </Link>{' '}
        first.
      </Text>
      <Divider mt="31px" mb="24px" color="gray.900" />
      <Flex gap={4}>
        <BorderBox p={6} flexDirection="column" bg="navy.700" height="fit-content">
          <Text fontWeight="700" fontSize="xl" color="gray.50" mb="1" fontFamily="heading">
            Manage C-Ratio
          </Text>
          <Text color="gray.400" fontSize="sm" mb="2">
            The Collateralization Ratio (C-Ratio) is calculated by dividing the value of the
            position’s collateral by the value of the position’s debt.{' '}
            <Text as="span" fontWeight="700" display="inline" color="white">
              This position will be liquidated if the C-Ratio drops below the Liquidation C-Ratio.
            </Text>
          </Text>
          <ManageAction liquidityPosition={liquidityPosition} />
        </BorderBox>
        <Box minW="450px">
          <ManageStats liquidityPosition={liquidityPosition} />
          <Rewards isLoading={isLoading} rewards={rewards} />
        </Box>
      </Flex>
    </Box>
  );
};

export const Manage = () => {
  const { accountId, collateralSymbol, poolId } = useParams();

  const { isLoading: isCollateralLoading, data: collateralType } =
    useCollateralType(collateralSymbol);

  const { isLoading: isPoolGraphDataLoading, data: poolData } = usePoolData(poolId);

  const { isLoading: isRewardsLoading, data: rewardsData } = useRewards(
    poolData?.registered_distributors,
    poolId,
    collateralType?.tokenAddress,
    accountId
  );

  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId,
    poolId,
  });

  const isLoading = isRewardsLoading || isCollateralLoading || isPoolGraphDataLoading;

  return (
    <ManagePositionProvider>
      <ManageUi
        isLoading={isLoading}
        collateralType={collateralType}
        rewards={rewardsData}
        liquidityPosition={liquidityPosition}
      />
    </ManagePositionProvider>
  );
};
