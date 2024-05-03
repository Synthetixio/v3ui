import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { usePools } from '@snx-v3/usePools';
import { TokenIcon } from '../../components/TokenIcon';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import { useApr } from '@snx-v3/useApr';
import { Fragment } from 'react';
import { useVaultsData } from '@snx-v3/useVaultsData';
import { ZEROWEI } from '../../utils/constants';
import opSvg from './op.svg';
import poolsSvg from './pools.svg';

export function Pools() {
  const { data: pools } = usePools();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { data: apr } = useApr();
  const { data: vaultDebt, isLoading: vaultIsLoading } = useVaultsData(1);
  const vaultTVL = vaultDebt?.reduce((cur, prev) => {
    return cur.add(prev.collateral.value);
  }, ZEROWEI);
  const { data: collateralType, isLoading: collateralTypeIsLoading } = useCollateralTypes();
  return (
    <Flex flexDir="column">
      <Heading color="gray.50" fontSize="1.5rem" data-cy="liquidity-dashboard">
        All Pools
      </Heading>
      <Flex gap="4" flexWrap={pools && pools.length > 1 ? 'wrap' : 'nowrap'} mt="6">
        {pools?.map((pool) => (
          <Flex
            key={pool.id}
            flexDir="column"
            w="100%"
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            bg="navy.700"
            p="6"
            maxW={pools.length > 1 ? '488px' : 'unset'}
          >
            <Flex justifyContent="space-between" alignItems="baseline">
              <Heading fontSize="16px" fontWeight={700} color="white" mb="4">
                {pool.name}
              </Heading>

              <Button
                mt={{ base: 2, md: 0 }}
                size="sm"
                variant="outline"
                colorScheme="gray"
                color="white"
                onClick={() => {
                  navigate({
                    pathname: generatePath('/pools/:poolId', { poolId: '1' }),
                    search: location.search,
                  });
                }}
              >
                Pool Info
              </Button>
            </Flex>
            <Divider />
            <Flex w="100%" h="194px" alignItems="center" gap="4">
              <Flex flexDir="column">
                <Text fontSize="12px" color="gray.600">
                  TVL{' '}
                  <Tooltip
                    label={
                      <Flex p={3} flexDirection="column" alignItems="start">
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
                    <InfoIcon w="12px" h="12px" />
                  </Tooltip>
                </Text>
                <Text
                  fontWeight={700}
                  fontSize="30px"
                  color="white"
                  display="flex"
                  alignItems="center"
                >
                  $
                  {vaultIsLoading ? (
                    <Skeleton ml="2" height="30px" width="100px" />
                  ) : (
                    vaultTVL?.toNumber().toLocaleString()
                  )}
                </Text>
              </Flex>
              <Flex flexDir="column" mr="auto">
                <Text fontSize="12px" color="gray.600">
                  APR{' '}
                  <Tooltip
                    label={
                      <Flex p={3} flexDirection="column" alignItems="start">
                        <Text fontWeight="bold" fontSize="14px">
                          Annual Percentage Yield (APY):
                        </Text>
                        <Text textAlign="left" fontSize="14px">
                          Reflects the Pool PNL. It is calculated as an estimate derived from past
                          week historical PNL, extrapolated as a year average.
                        </Text>
                        <Text fontWeight="bold" mt={2} fontSize="14px">
                          Calculation
                        </Text>
                        <Text fontSize="14px">Last 7 days Pool PNL * 52</Text>
                      </Flex>
                    }
                  >
                    <InfoIcon w="12px" h="12px" />
                  </Tooltip>
                </Text>
                <Text fontWeight={700} fontSize="30px" color="white">
                  {apr?.combinedApr.toFixed(2).concat('%') || '-'}
                </Text>
              </Flex>
              <Image src={poolsSvg} mr="50%" mb={4} />
            </Flex>
            <Divider />
            <Flex mt={4}>
              {collateralTypeIsLoading && <Spinner colorScheme="cyan" />}
              {collateralType?.map((type) => (
                <Fragment key={type.tokenAddress.concat('pool-list')}>
                  <TokenIcon symbol={type.symbol} />
                  <Flex flexDirection="column" ml={3} mr="auto">
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      {type.symbol}
                    </Text>
                    <Text
                      color="gray.500"
                      fontFamily="heading"
                      fontSize="0.75rem"
                      lineHeight="1rem"
                    >
                      {type.displaySymbol}
                    </Text>
                  </Flex>

                  <Tooltip
                    label={
                      <Flex p={3} flexDirection="column" alignItems="start">
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
                      onClick={() => {
                        queryParams.set('manageAction', 'deposit');
                        navigate({
                          pathname: `/positions/${type.symbol}/${pool.id}`,
                          search: queryParams.toString(),
                        });
                      }}
                    >
                      Deposit
                    </Button>
                  </Tooltip>
                </Fragment>
              ))}
            </Flex>
          </Flex>
        ))}
        <Flex
          flexDir="column"
          w="100%"
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          bg="navy.700"
          p={6}
          shrink={2}
        >
          <Image src={opSvg} w="66px" height="66px" mb={6} />
          <Text fontWeight={700} fontSize="14px" color="white">
            10x Cost Effective on Gas Fees
          </Text>
          <Text fontSize="16px" color="gray.600" mb="auto">
            Sell your SNX at a premium to the Buyback and Burn contract and get USDC on Base
          </Text>
          <Flex gap={4}>
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
      </Flex>
    </Flex>
  );
}
