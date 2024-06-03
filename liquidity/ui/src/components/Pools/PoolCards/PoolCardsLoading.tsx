import { Flex, Skeleton, Heading, Divider, SkeletonCircle, Text } from '@chakra-ui/react';
import { NetworkIcon } from '@snx-v3/useBlockchain';

export const PoolCardsLoading = () => {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <Flex
          flexDir="column"
          w="100%"
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          bg="navy.700"
          p="6"
          key={i}
        >
          <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={4}>
            <Flex flexDir="column" gap={1}>
              <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200" borderRadius={4}>
                <Heading fontSize="20px" fontWeight={700} color="white">
                  {/* Used for loading sizing */}
                  USDC Andromeda Yield
                </Heading>
              </Skeleton>
              <Flex alignItems="center" fontSize="12px" color="gray.500" gap={1} fontWeight="bold">
                <Skeleton borderRadius={4} startColor="whiteAlpha.500" endColor="whiteAlpha.200">
                  <NetworkIcon size="14px" networkId={1} mr={1} />
                  Ethirum Network
                </Skeleton>
              </Flex>
            </Flex>
            <Flex flexWrap="wrap">
              <Skeleton
                borderRadius={4}
                startColor="whiteAlpha.500"
                endColor="whiteAlpha.200"
                as={Flex}
              >
                <Flex alignItems="center" mr={6} gap={2}>
                  <Text fontSize="20px" fontWeight="bold" color="gray.500">
                    TVL
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="20px"
                    color="white"
                    display="flex"
                    alignItems="center"
                    lineHeight="36px"
                  >
                    100M
                  </Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="20px" fontWeight="bold" color="gray.500">
                    APR
                  </Text>
                  <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
                    42%
                  </Text>
                </Flex>
              </Skeleton>
            </Flex>
          </Flex>
          <Divider mt="18px" mb="10px" />
          <Flex justifyContent="space-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <Flex key={i} alignItems="center">
                <SkeletonCircle startColor="whiteAlpha.500" endColor="whiteAlpha.200" mr={3} />
                <Skeleton
                  height="25px"
                  width="80px"
                  startColor="whiteAlpha.500"
                  endColor="whiteAlpha.200"
                  borderRadius={4}
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </>
  );
};
