import { Button, Divider, Flex, Heading, Image, Text, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { usePools } from '@snx-v3/usePools';
import { TokenIcon } from '../../components/TokenIcon';
import { Link } from 'react-router-dom';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';

export function Pools() {
  const { data: pools, isLoading: poolsIsLoading } = usePools();
  const { data: collateralTypes, isLoading: collateralTypesIsLoading } = useCollateralTypes();

  const isLoading = collateralTypesIsLoading && poolsIsLoading;

  return (
    <Flex flexDir="column">
      <Heading>All Pools</Heading>
      <Flex gap="4" flexWrap={pools && pools.length > 1 ? 'wrap' : 'nowrap'}>
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
            <Flex w="100%" alignItems="center" justifyContent="space-between" mb={4}>
              <Text fontSize="16px" fontWeight={700} color="white">
                {pool.name}
              </Text>
              <Button variant="outline" colorScheme="gray" color="white">
                Pool Details
              </Button>
            </Flex>
            <Divider />
            <Flex w="100%" h="164px" alignItems="center" gap="4">
              <Flex flexDir="column">
                <Text fontSize="12px" color="gray.600">
                  TVL{' '}
                  <Tooltip label="???">
                    <InfoIcon w="12px" h="12px" />
                  </Tooltip>
                </Text>
                <Text fontWeight={700} fontSize="30px" color="white">
                  TODO
                </Text>
              </Flex>
              <Flex flexDir="column" mr="auto">
                <Text fontSize="12px" color="gray.600">
                  APY{' '}
                  <Tooltip label="???">
                    <InfoIcon w="12px" h="12px" />
                  </Tooltip>
                </Text>
                <Text fontWeight={700} fontSize="30px" color="white">
                  TODO
                </Text>
              </Flex>
              <Image src="/pools.svg" mr="50%" mb={4} />
            </Flex>
            <Divider />
            <Flex mt={4} flexDir="column" gap="3">
              {collateralTypes?.map((type) => (
                <Flex key={type.tokenAddress.concat(type.symbol)}>
                  <TokenIcon symbol={type.symbol} />
                  <Flex flexDirection="column" ml={3} mr="auto">
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      {type.displaySymbol}
                    </Text>
                    <Text
                      color="gray.500"
                      fontFamily="heading"
                      fontSize="0.75rem"
                      lineHeight="1rem"
                    >
                      {type.name}
                    </Text>
                  </Flex>
                  <Link to={`/deposit/${type.symbol}/${type.tokenAddress}/${pool.id}`}>
                    <Button>Deposit</Button>
                  </Link>
                </Flex>
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
          <Image src="/op.svg" w="66px" height="66px" mb={6} />
          <Text fontWeight={700} fontSize="14px" color="white">
            10x Cost Effective on Gas Fees
          </Text>
          <Text fontSize="12px" color="gray.600" mb="auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>
          <Flex justifyContent="flex-end" gap={4} my={6}>
            <Button variant="outline" colorScheme="gray" color="white">
              Bridge Asset
            </Button>
            <Button variant="outline" colorScheme="gray" color="white">
              Switch to Optimism
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
