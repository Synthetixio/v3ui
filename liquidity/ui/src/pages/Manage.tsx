import React, { FC } from 'react';
import { Box, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { AccountBanner, ManageAction, TokenIcon } from '../components';
import { ManagePositionProvider } from '@snx-v3/ManagePositionContext';
import { ManageStats } from '../components';
import { HomeLink } from '@snx-v3/HomeLink';
import { Rewards } from '../components';
import { usePoolData } from '@snx-v3/usePoolData';
import { useRewards, RewardsType } from '@snx-v3/useRewards';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Network, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useSystemToken } from '@snx-v3/useSystemToken';

function useNormalisedCollateralSymbol(collateralSymbol?: string) {
  const { network } = useNetwork();

  return React.useMemo(() => {
    if (collateralSymbol !== 'USDC') {
      return collateralSymbol;
    }
    if (!network?.id && network?.preset) {
      return undefined;
    }
    return isBaseAndromeda(network?.id, network?.preset) && collateralSymbol === 'USDC'
      ? 'sUSDC'
      : collateralSymbol;
  }, [network?.id, network?.preset, collateralSymbol]);
}

function useCollateralDisplayName(collateralSymbol?: string) {
  const { network } = useNetwork();

  return React.useMemo(() => {
    if (!network?.id && network?.preset) {
      return undefined;
    }
    return isBaseAndromeda(network?.id, network?.preset) && collateralSymbol === 'sUSDC'
      ? 'USDC'
      : collateralSymbol;
  }, [network?.id, network?.preset, collateralSymbol]);
}

export const ManageUi: FC<{
  collateralType?: CollateralType;
  isLoading: boolean;
  rewards?: RewardsType;
  liquidityPosition?: LiquidityPosition;
  network?: Network | null;
  collateralSymbol?: string;
}> = ({ isLoading, rewards, liquidityPosition, network, collateralSymbol }) => {
  const collateralDisplayName = useCollateralDisplayName(collateralSymbol);
  const { activeWallet } = useWallet();
  const { data: systemToken } = useSystemToken();

  return (
    <Box mb={12} mt={8}>
      <Box mb="4">
        <HomeLink />
      </Box>
      {activeWallet && <AccountBanner mb={8} />}
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
          <TokenIcon
            symbol={collateralSymbol!}
            width={28}
            height={28}
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
          {collateralDisplayName} Liquidity Position
        </Heading>
      </Flex>
      <Text color="gray.500" fontFamily="heading" fontSize="14px" lineHeight="20px" width="80%">
        {isBaseAndromeda(network?.id, network?.preset)
          ? 'Deposit to '
          : `Deposit your collateral to borrow ${systemToken?.symbol} and `}
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
  const { accountId, collateralSymbol: collateralSymbolRaw, poolId } = useParams();
  const collateralSymbol = useNormalisedCollateralSymbol(collateralSymbolRaw);

  const { network } = useNetwork();

  const { isFetching: isCollateralLoading, data: collateralType } =
    useCollateralType(collateralSymbolRaw);

  const { isLoading: isPoolGraphDataLoading, data: poolData } = usePoolData(poolId);

  const { isFetching: isRewardsLoading, data: rewardsData } = useRewards(
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
