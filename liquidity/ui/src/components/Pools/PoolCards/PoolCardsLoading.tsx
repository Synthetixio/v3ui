import { Flex, Skeleton } from '@chakra-ui/react';

export const PoolCardsLoading = () => (
  <>
    {Array.from(Array(6).keys()).map((i) => (
      <Flex
        w="100%"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        bg="navy.700"
        gap={4}
        py={6}
        px={4}
        key={i}
      >
        <Flex alignItems="center" justifyContent="flex-start" width="190px" gap={3}>
          <Skeleton width="40px" height="40px" rounded="full" />
          <Flex flex={1} flexDirection="column" gap={1}>
            <Skeleton height={6} />
            <Skeleton height={3.5} />
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" width="220px">
          <Skeleton height={6} width="92px" />
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" width="189px">
          <Skeleton height={6} width="92px" />
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" width="144px">
          <Skeleton height={6} width="92px" />
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" width="144px">
          <Skeleton height={6} width="92px" />
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" width="121px">
          <Skeleton height={6} width="53px" />
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" minW="159px" flex="1">
          <Skeleton height={6} width="139px" />
        </Flex>
      </Flex>
    ))}
  </>
);
