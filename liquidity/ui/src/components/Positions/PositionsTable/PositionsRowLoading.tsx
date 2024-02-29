import { Badge, Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { SynthSkeleton as Skeleton, SynthCircle as SkeletonCircle } from '../../Shared';
import { TokenIcon } from '../../TokenIcon';

export default function PositionsRowLoading() {
  return (
    <Tr borderBottomWidth="1px">
      <Td border="none">
        <Flex alignItems="center">
          <SkeletonCircle>
            <TokenIcon symbol="SNX" />
          </SkeletonCircle>
          <Flex flexDirection="column" ml={3}>
            <Skeleton>
              <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                SNX
              </Text>
            </Skeleton>
            <Skeleton>
              <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                Synthetix Network Token
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              $100,000,00
            </Text>
          </Skeleton>
          <Skeleton>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              100,000 SNX
            </Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              15%
            </Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              $50,000
            </Text>
          </Skeleton>
          <Skeleton>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              22%
            </Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              $100,000,000
            </Text>
          </Skeleton>
          <Skeleton>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              200,000 SNX
            </Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              $20,000,000
            </Text>
          </Skeleton>
          <Text color="cyan.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            Claim Credit
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              5000%
            </Text>
          </Skeleton>
          <Skeleton>
            <Badge colorScheme="green" border="1px solid" bg="green.900">
              HEALTHY
            </Badge>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column">
          <Button
            fontSize="0.75rem"
            lineHeight="1rem"
            height="1.75rem"
            fontWeight={700}
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
          >
            Manage
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}
