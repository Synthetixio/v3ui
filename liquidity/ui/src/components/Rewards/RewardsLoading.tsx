import { Tbody, Tr, Td, SkeletonCircle, Skeleton, Text, Flex } from '@chakra-ui/react';

export const RewardsLoading = () => (
  <Tbody width="100%">
    <Tr borderBottom="1px solid #2D2D38">
      <Td pl="16px" border="none">
        <Flex>
          <SkeletonCircle startColor="whiteAlpha.500" endColor="whiteAlpha.200" h="30px" w="30px" />
          <Skeleton
            ml={2}
            startColor="whiteAlpha.500"
            endColor="whiteAlpha.200"
            height="30px"
            w="100px"
          >
            <Text mr={4}>usdc</Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td pl="16px" border="none">
        <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200" height="30px">
          <Text mr={4}>Loading</Text>
        </Skeleton>
      </Td>
    </Tr>
    <Tr borderBottom="1px solid #2D2D38">
      <Td pl="16px" border="none">
        <Flex>
          <SkeletonCircle startColor="whiteAlpha.500" endColor="whiteAlpha.200" h="30px" w="30px" />
          <Skeleton
            ml={2}
            startColor="whiteAlpha.500"
            endColor="whiteAlpha.200"
            height="30px"
            w="100px"
          >
            <Text mr={4}>usdc</Text>
          </Skeleton>
        </Flex>
      </Td>
      <Td pl="16px" border="none">
        <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200" height="30px">
          <Text mr={4}>Loading</Text>
        </Skeleton>
      </Td>
    </Tr>
  </Tbody>
);
