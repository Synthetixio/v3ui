import { FC, useMemo } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { CollateralIcon } from '@snx-v3/icons';
import {
  ManageAction,
  NoAccount,
  UnsupportedCollateralAlert,
  Rewards,
  ManageStats,
} from '../components';
import { ManagePositionProvider } from '@snx-v3/ManagePositionContext';
import { usePoolData } from '@snx-v3/usePoolData';
import { useRewards, RewardsType } from '@snx-v3/useRewards';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ARBITRUM, Network, NetworkIcon, useNetwork } from '@snx-v3/useBlockchain';
import { usePool } from '@snx-v3/usePoolsList';
import { WatchAccountBanner } from '../components/WatchAccountBanner/WatchAccountBanner';
import { useNavigate } from 'react-router-dom';
import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@snx-v3/Tooltip';

function useNormalisedCollateralSymbol(collateralSymbol?: string) {
  const { network } = useNetwork();

  return useMemo(() => {
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

export function useCollateralDisplayName(collateralSymbol?: string) {
  const { network } = useNetwork();

  return useMemo(() => {
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
  poolName?: string;
  poolId?: string;
}> = ({ isLoading, rewards, liquidityPosition, network, collateralSymbol, poolName, poolId }) => {
  const collateralDisplayName = useCollateralDisplayName(collateralSymbol);

  const { data: poolData } = usePool(Number(network?.id), String(poolId));
  const { data: CollateralTypes } = useCollateralTypes();

  const navigate = useNavigate();

  const notSupported =
    poolData &&
    CollateralTypes &&
    collateralDisplayName &&
    !CollateralTypes.some((item) => item.symbol === collateralDisplayName);

  return (
    <>
      <UnsupportedCollateralAlert isOpen={Boolean(notSupported)} />
      <Box mb={12} mt={8}>
        <Flex flexWrap="wrap" px={6} alignItems="center" justifyContent="space-between" mb="8px">
          <Flex alignItems="center">
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
                width="42px"
                height="42px"
                fill="#0B0B22"
                color="#00D1FF"
              />
            </Flex>
            <Flex direction="column" gap={0.5}>
              <Heading
                ml={4}
                fontWeight={700}
                fontSize="24px"
                color="gray.50"
                display="flex"
                alignItems="center"
                data-cy="manage-position-title"
              >
                {collateralDisplayName} Liquidity Position
              </Heading>
              <Heading
                ml={4}
                fontWeight={700}
                fontSize="16px"
                color="gray.50"
                display="flex"
                alignItems="center"
                data-cy="manage-position-subtitle"
                _hover={{ cursor: 'pointer' }}
                onClick={() => navigate(`/pools/${network?.id}/${poolId}`)}
              >
                {poolName}
                <Flex
                  ml={2}
                  alignItems="center"
                  fontSize="12px"
                  color="gray.500"
                  gap={1}
                  fontWeight="bold"
                >
                  <NetworkIcon size="14px" networkId={network?.id} />
                  <Text mt="1px" ml="1px">
                    {network?.label} Network
                  </Text>
                </Flex>
              </Heading>
            </Flex>
          </Flex>
          {poolData && (
            <Flex alignItems="flex-end" direction="column">
              <Tooltip label="Apr is averaged over the trailing 28 days and is comprised of both performance and rewards.">
                <Text
                  fontFamily="heading"
                  fontSize="sm"
                  lineHeight={5}
                  fontWeight="medium"
                  color="gray.500"
                >
                  Estimated APR
                  <InfoIcon ml={1} w="10px" h="10px" />
                </Text>
              </Tooltip>
              <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
                {poolData.apr.combinedApr > 0
                  ? `${network?.id === ARBITRUM.id ? 'Up to ' : ''}${poolData.apr.combinedApr
                      .toFixed(2)
                      ?.concat('%')}`
                  : '-'}
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex mt={6} flexDirection={['column', 'column', 'row']} gap={4}>
          <BorderBox
            gap={4}
            flex={1}
            p={6}
            flexDirection="column"
            bg="navy.700"
            height="fit-content"
          >
            <ManageStats liquidityPosition={liquidityPosition} />
            <Rewards isLoading={isLoading} rewards={rewards} />
          </BorderBox>
          <BorderBox
            flex={1}
            maxW={['100%', '100%', '501px']}
            p={6}
            flexDirection="column"
            bg="navy.700"
            height="fit-content"
          >
            <ManageAction liquidityPosition={liquidityPosition} />
          </BorderBox>
        </Flex>
      </Box>
    </>
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
      <WatchAccountBanner />
      {!accountId && (
        <NoAccount collateralSymbol={collateralSymbol} collateralType={collateralType} />
      )}
      {accountId && (
        <ManageUi
          isLoading={isLoading}
          rewards={rewardsData}
          poolName={poolData?.name}
          poolId={poolId}
          liquidityPosition={liquidityPosition}
          network={network}
          collateralSymbol={collateralSymbol}
        />
      )}
    </ManagePositionProvider>
  );
};
