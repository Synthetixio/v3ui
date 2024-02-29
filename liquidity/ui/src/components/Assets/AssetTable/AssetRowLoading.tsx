import { Tr, Td, Flex, Button, Text } from '@chakra-ui/react';
import { SynthSkeleton as Skeleton, SynthCircle as SkeletonCircle } from '../../Shared';
import { TokenIcon } from '../../TokenIcon';

export const AssetRowLoading = () => {
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
              $1,500.00
            </Text>
          </Skeleton>
          <Skeleton>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              750.00 SNX
            </Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              $2,000.00
            </Text>
          </Skeleton>
          <Skeleton>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              1,000.00 SNX
            </Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Skeleton>
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              $2,000.00
            </Text>
          </Skeleton>
          <Skeleton>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              1,000.00 SNX
            </Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column">
          <Button
            variant="unstyled"
            fontSize="0.75rem"
            lineHeight="1rem"
            height="1.75rem"
            fontWeight={700}
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
          >
            Withdraw
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};
