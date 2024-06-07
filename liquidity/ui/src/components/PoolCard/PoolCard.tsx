import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Button, Text, Image, Link, Divider, Heading, Skeleton } from '@chakra-ui/react';
import { Tooltip } from '@snx-v3/Tooltip';
import { TokenIcon } from '../TokenIcon';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { ZEROWEI } from '../../utils/constants';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { PoolType } from '@snx-v3/usePools';
import Wei from '@synthetixio/wei';
import { Network, NetworkIcon } from '@snx-v3/useBlockchain';
import { compactInteger } from 'humanize-plus';

interface PoolCardProps {
  isLoading: boolean;
  pool: PoolType;
  apr?: number;
  network: Network;
  vaultDebt?: {
    debt: Wei;
    collateral: {
      value: Wei;
      amount: Wei;
    };
    collateralType: CollateralType;
  }[];
  collateralTypes?: CollateralType[];
}

export const PoolCard = ({
  isLoading,
  pool,
  apr,
  vaultDebt,
  collateralTypes,
  network,
}: PoolCardProps) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const vaultTVL = vaultDebt?.reduce((cur, prev) => {
    return cur.add(prev.collateral.value);
  }, ZEROWEI);

  return (
    <Flex
      key={pool.id}
      flexDir="column"
      w="100%"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      bg="navy.700"
      p="6"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDir="column" gap={1}>
          <Heading fontSize="20px" fontWeight={700} color="white">
            {pool.name}
          </Heading>
          <Flex alignItems="center" fontSize="12px" color="gray.500" gap={1} fontWeight="bold">
            <NetworkIcon size="14px" networkId={network.id} />
            {network.label} Network
          </Flex>
        </Flex>
        <Flex>
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
            <Skeleton isLoaded={!isLoading} startColor="whiteAlpha.500" endColor="whiteAlpha.200">
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
                {isLoading && '100M'}
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
            <Skeleton isLoaded={!isLoading} startColor="whiteAlpha.500" endColor="whiteAlpha.200">
              <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
                {!!apr ? apr.toFixed(2)?.concat('%') : '-'}
                {/* For sizing the skeleton */}
                {isLoading && '42%'}
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>

      <Divider mt="18px" mb="10px" />
      {collateralTypes?.map((type) => (
        <Flex alignItems="center" key={type.tokenAddress} gap={4} mt={3}>
          <Flex alignItems="center">
            <TokenIcon symbol={type.symbol} />
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
              onClick={() => {
                queryParams.set('manageAction', 'deposit');
                navigate({
                  pathname: generatePath('/manage/:collateralSymbol/:collateralAddress/:poolId', {
                    poolId: pool.id,
                    collateralSymbol: type.symbol,
                    collateralAddress: type.tokenAddress,
                  }),
                  search: queryParams.toString(),
                });
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
  );
};

export const BaseInfoCard = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      maxW="397px"
      minH="337px"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      bg="navy.700"
      p={6}
    >
      <Flex flexDirection="column">
        <Image src="/snx.svg" w="66px" height="66px" mb={6} />
        <Text
          fontWeight={700}
          fontSize="18px"
          lineHeight="28px"
          fontFamily="heading"
          color="gray.50"
          width="70%"
        >
          Sell SNX at a Premium and watch it Burn
        </Text>
        <Text fontSize="16px" color="gray.500" lineHeight="24px" mt={1}>
          Sell your SNX at a premium to the Buyback and Burn contract and get USDC on Base
        </Text>
      </Flex>
      <Flex>
        <Link
          href="https://blog.synthetix.io/the-andromeda-release-buyback-and-burn/"
          target="_blank"
          rel="noopener"
        >
          <Button variant="outline" colorScheme="gray" color="white">
            Learn More
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
