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
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Network, useNetwork } from '@snx-v3/useBlockchain';

export const ManageUi: FC<{
  collateralType?: CollateralType;
  isLoading: boolean;
  rewards?: RewardsType;
  liquidityPosition?: LiquidityPosition;
  network?: Network | null;
  collateralSymbol?: string;
}> = ({ isLoading, rewards, liquidityPosition, network, collateralSymbol }) => {
  return (
    <Box mb={12} mt={8}>
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
            symbol={collateralSymbol}
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
          data-cy="manage-position-title"
        >
          {collateralSymbol} Liquidity Position
        </Heading>
      </Flex>
      <Text color="gray.500" fontFamily="heading" fontSize="14px" lineHeight="20px" width="80%">
        {isBaseAndromeda(network?.id, network?.preset)
          ? 'Deposit to '
          : 'Deposit your collateral to borrow snxUSD and '}
        contribute to the network collateral. If you&apos;ve never staked on Synthetix V3 before,
        please read through this{' '}
        <Link
          fontWeight="600"
          color="cyan.500"
          href={
            isBaseAndromeda(network?.id, network?.preset)
              ? 'https://docs.synthetix.io/v/v3/for-liquidity-providers/base-lp-guide'
              : 'https://docs.synthetix.io/v/v3/for-liquidity-providers/delegating-collateral'
          }
          target="_blank"
        >
          quick introduction
        </Link>{' '}
        first.
      </Text>
      <Divider mt="31px" mb="24px" color="gray.900" />
      <Flex gap={4}>
        <BorderBox p={6} flexDirection="column" bg="navy.700" height="fit-content">
          <WithdrawIncrease />
          <Text fontWeight="700" fontSize="xl" color="gray.50" mb="1" fontFamily="heading">
            Manage Position
          </Text>
          <Text as="span" fontWeight="700" display="inline" color="white">
            Manage your position so your debt never equals your collateral else your position might
            get liquidated.
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
  const { network } = useNetwork();

  const baseCompatibleSymbol =
    isBaseAndromeda(network?.id, network?.preset) && collateralSymbol === 'USDC'
      ? 'sUSDC'
      : collateralSymbol;

  const { isLoading: isCollateralLoading, data: collateralType } =
    useCollateralType(baseCompatibleSymbol);

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
        rewards={rewardsData}
        liquidityPosition={liquidityPosition}
        network={network}
        collateralSymbol={collateralSymbol}
      />
    </ManagePositionProvider>
  );
};
