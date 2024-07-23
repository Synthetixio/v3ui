import { Badge, Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { SynthSkeleton as Skeleton, SynthCircle as SkeletonCircle } from '../../';
import { TokenIcon } from '../../';

export function PositionsRowLoading() {
  const rows = Array.from({ length: 2 }, (_, i) => i);
  return (
    <>
      {rows.map((row) => {
        return (
          <Tr borderBottomWidth={row === 1 ? 'none' : '1px'} key={row}>
            <Td border="none">
              <Flex alignItems="center">
                <SkeletonCircle>
                  <TokenIcon symbol="SNX" />
                </SkeletonCircle>
                <Flex flexDirection="column" ml={3}>
                  <Skeleton height="1rem" mb={1} width="70%">
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      sUSDC
                    </Text>
                  </Skeleton>
                  <Skeleton height="0.75rem">
                    <Text
                      color="gray.500"
                      fontFamily="heading"
                      fontSize="0.75rem"
                      lineHeight="1rem"
                    >
                      Synthetic USDC
                    </Text>
                  </Skeleton>
                </Flex>
              </Flex>
            </Td>

            <Td border="none">
              <Flex flexDirection="column" alignItems="flex-end">
                <Skeleton height="1rem" mb={1}>
                  <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                    $100,000
                  </Text>
                </Skeleton>
                <Skeleton height="0.75rem">
                  <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                    200 SNX
                  </Text>
                </Skeleton>
              </Flex>
            </Td>

            <Td border="none">
              <Flex flexDirection="column" alignItems="flex-end">
                <Skeleton height="1rem" mb={1}>
                  <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                    $100,000
                  </Text>
                </Skeleton>
                <Skeleton height="0.75rem">
                  <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                    200 SNX
                  </Text>
                </Skeleton>
              </Flex>
            </Td>
            <Td border="none">
              <Flex flexDirection="column" alignItems="flex-end">
                <Skeleton height="1rem" mb={1} width="70%">
                  <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                    $20,000
                  </Text>
                </Skeleton>
                <Skeleton height="0.75rem">
                  <Text color="cyan.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                    Claim Credit
                  </Text>
                </Skeleton>
              </Flex>
            </Td>
            <Td border="none">
              <Flex flexDirection="column" alignItems="flex-end">
                <Skeleton height="1rem" mb={1}>
                  <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                    5000%
                  </Text>
                </Skeleton>
                <Skeleton height="0.75rem">
                  <Badge colorScheme="green" border="1px solid" bg="green.900">
                    HEALTHY
                  </Badge>
                </Skeleton>
              </Flex>
            </Td>
            <Td border="none">
              <Flex flexDirection="column">
                <Skeleton height="1.75rem">
                  <Button
                    fontSize="0.75rem"
                    lineHeight="1rem"
                    height="1.75rem"
                    fontWeight={700}
                    borderWidth="1px"
                    borderColor="gray.900"
                    borderRadius="4px"
                    disabled
                  >
                    Manage
                  </Button>
                </Skeleton>
              </Flex>
            </Td>
          </Tr>
        );
      })}
    </>
  );
}
