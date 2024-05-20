import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Button, Text, Divider, Heading, Skeleton } from '@chakra-ui/react';
import { Tooltip } from '@snx-v3/Tooltip';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ZEROWEI } from '../../../utils/constants';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { Network, NetworkIcon, useNetwork } from '@snx-v3/useBlockchain';
import { compactInteger } from 'humanize-plus';
import { useApr } from '@snx-v3/useApr';
import { useVaultsData } from '@snx-v3/useVaultsData';
import { usePool } from '@snx-v3/usePools';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { CollateralIcon } from '@snx-v3/icons';
import { useMemo } from 'react';

interface PoolCardProps {
  poolId: number;
  network: Network;
  collaterals: string[];
}

export const PoolCard = ({ poolId, network, collaterals }: PoolCardProps) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { data: apr, isLoading: isAprLoading } = useApr(network);

  const { data: pool } = usePool(poolId.toString(), network);
  const { data: vaultDebt, isLoading: isVaultsLoading } = useVaultsData(poolId, network);
  const { data: collateralTypes } = useCollateralTypes(false, network);
  const { network: currentNetwork, setNetwork } = useNetwork();

  const vaultTVL = vaultDebt?.reduce((cur, prev) => {
    return cur.add(prev.collateral.value);
  }, ZEROWEI);

  const isCollateralFiltered = useMemo(
    () =>
      collateralTypes?.some((collateralType) =>
        collaterals.length
          ? !!collaterals.find((collateral) => {
              if (
                isBaseAndromeda(network.id, network.preset) &&
                collateralType.symbol.toUpperCase() === 'SUSDC'
              ) {
                return collateral.toUpperCase() === 'USDC';
              }
              return collateral.toUpperCase() === collateralType.symbol.toUpperCase();
            })
          : true
      ),
    [collateralTypes, collaterals, network.id, network.preset]
  );

  if (!isCollateralFiltered) {
    return null;
  }

  return (
    <Flex
      flexDir="column"
      w="100%"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      bg="navy.700"
      p="6"
    >
      <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={4}>
        <Flex flexDir="column" gap={1}>
          <Heading fontSize="20px" fontWeight={700} color="white">
            {pool?.name}
          </Heading>
          <Flex alignItems="center" fontSize="12px" color="gray.500" gap={1} fontWeight="bold">
            <NetworkIcon size="14px" networkId={network.id} />
            {network.label} Network
          </Flex>
        </Flex>
        <Flex flexWrap="wrap">
          <Flex alignItems="center" mr={6} gap={2}>
            <Text fontSize="20px" fontWeight="bold" color="gray.500">
              TVL
              <Tooltip
                label={
                  <Flex flexDirection="column" alignItems="start">
                    <Text fontWeight="bold" fontSize="14px">
                      Total Value Locked:
                    </Text>
                    <Text textAlign="left" fontSize="14px">
                      Is the total amount of assets locked as collateral on this Pool.
                    </Text>
                    <Text fontSize="14px">Last 7 days Pool PNL * 52</Text>
                  </Flex>
                }
              >
                <InfoIcon ml={1} mb={0.5} w="10px" h="10px" />
              </Tooltip>
            </Text>
            <Skeleton
              isLoaded={!isVaultsLoading}
              startColor="whiteAlpha.500"
              endColor="whiteAlpha.200"
            >
              <Text
                fontWeight="bold"
                fontSize="20px"
                color="white"
                display="flex"
                alignItems="center"
                lineHeight="36px"
              >
                {(vaultTVL?.toNumber() && `$${compactInteger(vaultTVL.toNumber(), 1)}`) || '-'}
                {/* For sizing the skeleton */}
                {isVaultsLoading && '100M'}
              </Text>
            </Skeleton>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Text fontSize="20px" fontWeight="bold" color="gray.500">
              APR
              <Tooltip
                label={
                  <Flex flexDirection="column" alignItems="start">
                    <Text fontWeight="bold" fontSize="14px">
                      Annual Percentage Yield (APY):
                    </Text>
                    <Text textAlign="left" fontSize="14px">
                      Reflects the Pool PNL. It is calculated as an estimate derived from past week
                      historical PNL, extrapolated as a year average.
                    </Text>
                    <Text fontWeight="bold" mt={2} fontSize="14px">
                      Calculation
                    </Text>
                    <Text fontSize="14px">Last 7 days Pool PNL * 52</Text>
                  </Flex>
                }
              >
                <InfoIcon ml={1} w="10px" h="10px" mb={0.5} />
              </Tooltip>
            </Text>
            <Skeleton
              isLoaded={!isAprLoading}
              startColor="whiteAlpha.500"
              endColor="whiteAlpha.200"
            >
              <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
                {!!apr ? apr.combinedApr.toFixed(2)?.concat('%') : '-'}
                {/* For sizing the skeleton */}
                {isAprLoading && '42%'}
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>

      <Divider mt="18px" mb="10px" />
      <Flex flexWrap="wrap" gap={6}>
        {collateralTypes?.map((type) => (
          <Flex alignItems="center" key={type.tokenAddress} gap={4} mt={3}>
            <Flex alignItems="center">
              <CollateralIcon width="26px" height="26px" symbol={type.symbol} />
              <Flex flexDirection="column" ml={3} mr="auto">
                <Text
                  fontSize="14px"
                  color="white"
                  fontWeight={700}
                  lineHeight="1.25rem"
                  fontFamily="heading"
                >
                  {type.symbol}
                </Text>
                <Text fontSize="12px" color="gray.500" fontFamily="heading" lineHeight="1rem">
                  {type.displaySymbol}
                </Text>
              </Flex>
            </Flex>
            <Tooltip
              label={
                <Flex flexDirection="column" alignItems="start">
                  <Text fontWeight="bold" fontSize="14px">
                    Deposit:
                  </Text>
                  <Text textAlign="left" fontSize="14px">
                    Add assets from your Synthetix Account to this Pool Position.
                  </Text>
                </Flex>
              }
            >
              <Button
                size="sm"
                onClick={async () => {
                  try {
                    if (currentNetwork?.id !== network.id) {
                      if (!(await setNetwork(network.id))) {
                        return;
                      }
                    }
                    queryParams.set('manageAction', 'deposit');
                    navigate({
                      pathname: `/positions/${type.symbol}/${poolId}`,
                      search: queryParams.toString(),
                    });
                  } catch (error) {}
                }}
                variant="unstyled"
                fontSize="0.75rem"
                lineHeight="1rem"
                height="1.75rem"
                px={4}
                fontWeight={700}
                borderWidth="1px"
                borderColor="gray.900"
                borderRadius="4px"
                _hover={{ bg: 'gray.900' }}
              >
                Deposit
              </Button>
            </Tooltip>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
