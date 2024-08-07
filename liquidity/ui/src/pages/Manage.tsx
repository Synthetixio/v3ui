import { FC, useMemo, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import {
  ManageAction,
  NoPosition,
  UnsupportedCollateralAlert,
  Rewards,
  ManageStats,
} from '../components';
import { ManagePositionProvider } from '@snx-v3/ManagePositionContext';
import { usePoolData } from '@snx-v3/usePoolData';
import { useRewards, RewardsType } from '@snx-v3/useRewards';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Network, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { usePool } from '@snx-v3/usePoolsList';
import { WatchAccountBanner } from '../components/WatchAccountBanner/WatchAccountBanner';
import { ClosePosition } from '../components/ClosePosition/ClosePosition';
import { ManageLoading } from '../components/Manage/ManageLoading';
import { PositionTitle } from '../components/Manage/PositionTitle';
import { Tooltip } from '@snx-v3/Tooltip';
import { InfoIcon } from '@chakra-ui/icons';

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
}> = ({
  collateralType,
  isLoading,
  rewards,
  liquidityPosition,
  network,
  collateralSymbol,
  poolName,
  poolId,
}) => {
  const [closePosition, setClosePosition] = useState(false);

  const { data: poolData } = usePool(Number(network?.id), String(poolId));

  const positionApr = poolData?.apr?.collateralAprs?.find(
    (item: any) => item.collateralType.toLowerCase() === collateralType?.tokenAddress.toLowerCase()
  );

  return (
    <Box mb={12} mt={8}>
      <Flex
        flexDir={['column', 'row']}
        flexWrap="wrap"
        px={[0, 6]}
        alignItems="center"
        justifyContent="space-between"
        mb="8px"
        gap={4}
      >
        <PositionTitle
          collateralSymbol={collateralSymbol}
          poolName={poolName}
          isOpen={false}
          poolId={poolId}
        />
        {poolData && (
          <Flex alignItems={['center', 'flex-end']} direction="column">
            <Tooltip label="APR is averaged over the trailing 28 days and is comprised of both performance and rewards">
              <Text
                fontFamily="heading"
                fontSize="sm"
                lineHeight={5}
                fontWeight="medium"
                color="gray.500"
              >
                Estimated APR
                <InfoIcon ml={1} mb="2px" w="10px" h="10px" />
              </Text>
            </Tooltip>
            <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
              {poolData && positionApr?.apr28d > 0
                ? `${(positionApr.apr28d * 100).toFixed(2)?.concat('%')}`
                : '-'}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex mt={6} flexDirection={['column', 'column', 'row']} gap={4}>
        <BorderBox gap={4} flex={1} p={6} flexDirection="column" bg="navy.700" height="fit-content">
          <ManageStats liquidityPosition={liquidityPosition} />
          <Rewards isLoading={isLoading} rewards={rewards} />
        </BorderBox>
        {!closePosition && (
          <Flex
            maxW={['100%', '100%', '501px']}
            flex={1}
            alignSelf="flex-start"
            flexDirection="column"
          >
            <BorderBox flex={1} p={6} flexDirection="column" bg="navy.700" height="fit-content">
              <ManageAction liquidityPosition={liquidityPosition} />
            </BorderBox>
            {liquidityPosition?.collateralAmount.gt(0) && (
              <Text
                textAlign="center"
                cursor="pointer"
                onClick={() => setClosePosition(true)}
                color="cyan.500"
                fontWeight={700}
                mt="5"
              >
                Close Position
              </Text>
            )}
          </Flex>
        )}

        {closePosition && (
          <BorderBox
            flex={1}
            maxW={['100%', '100%', '501px']}
            p={6}
            flexDirection="column"
            bg="navy.700"
            height="fit-content"
          >
            <ClosePosition
              liquidityPosition={liquidityPosition}
              onClose={() => setClosePosition(false)}
            />
          </BorderBox>
        )}
      </Flex>
    </Box>
  );
};

export const Manage = () => {
  const { accountId, collateralSymbol: collateralSymbolRaw, poolId } = useParams();
  const collateralSymbol = useNormalisedCollateralSymbol(collateralSymbolRaw);

  const { network } = useNetwork();
  const { activeWallet } = useWallet();

  const { isFetching: isCollateralLoading, data: collateralType } =
    useCollateralType(collateralSymbolRaw);

  const { isLoading: isPoolGraphDataLoading, data: poolData } = usePoolData(poolId);

  const { isFetching: isRewardsLoading, data: rewardsData } = useRewards(
    poolId,
    collateralType?.tokenAddress,
    accountId
  );

  const { data: liquidityPosition, isLoading: isLoadingPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId,
    poolId,
  });

  const isLoading = isRewardsLoading || isCollateralLoading || isPoolGraphDataLoading;

  const collateralDisplayName = useCollateralDisplayName(collateralSymbol);
  const { data: collateralTypes, isLoading: isLoadingCollaterals } = useCollateralTypes();

  const notSupported =
    !isLoadingCollaterals &&
    poolData &&
    collateralTypes?.length &&
    collateralDisplayName &&
    !collateralTypes.some(
      (item) => item.symbol.toUpperCase() === collateralDisplayName.toUpperCase()
    );

  return (
    <ManagePositionProvider>
      <WatchAccountBanner />
      {!!activeWallet && (
        <>
          <UnsupportedCollateralAlert isOpen={Boolean(notSupported)} />
          {(!accountId ||
            (!isLoadingPosition &&
              liquidityPosition &&
              liquidityPosition.collateralAmount.eq(0) &&
              liquidityPosition.accountCollateral.availableCollateral.eq(0))) && (
            <NoPosition
              collateralSymbol={collateralSymbol}
              collateralType={collateralType}
              accountId={accountId}
              rewards={rewardsData}
              liquidityPosition={liquidityPosition}
            />
          )}
          {accountId &&
            ((!isLoadingPosition && liquidityPosition?.collateralAmount.gt(0)) ||
              liquidityPosition?.accountCollateral?.availableCollateral.gt(0)) && (
              <ManageUi
                isLoading={isLoading}
                rewards={rewardsData}
                poolName={poolData?.name}
                poolId={poolId}
                liquidityPosition={liquidityPosition}
                network={network}
                collateralSymbol={collateralSymbol}
                collateralType={collateralType}
              />
            )}
          {isLoadingPosition && !!accountId && (
            <ManageLoading poolName={poolData?.name} collateralSymbol={collateralSymbol} />
          )}
        </>
      )}
    </ManagePositionProvider>
  );
};
