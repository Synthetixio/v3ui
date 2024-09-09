import { Skeleton, SkeletonCircle, Td, Text, Tr } from '@chakra-ui/react';

export const RewardsLoading = () => (
  <>
    <Tr borderBottom="1px solid #2D2D38">
      <Td pl="16px" border="none">
        <SkeletonCircle startColor="whiteAlpha.500" endColor="whiteAlpha.200" h="30px" w="30px" />
      </Td>
      <Td pl="16px" border="none">
        <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200" height="30px">
          <Text mr={4}>Loading</Text>
        </Skeleton>
      </Td>
      <Td textAlign="end" pr="0px" border="none">
        <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200" height="30px">
          <Text>Loading</Text>
        </Skeleton>
      </Td>
    </Tr>
    <Tr borderBottom="1px solid #2D2D38">
      <Td pl="16px" border="none">
        <SkeletonCircle startColor="whiteAlpha.200" endColor="whiteAlpha.500" h="30px" w="30px" />
      </Td>
      <Td pl="16px" border="none">
        <Skeleton startColor="whiteAlpha.200" endColor="whiteAlpha.500" height="30px">
          <Text mr={4}>Loading</Text>
        </Skeleton>
      </Td>
      <Td textAlign="end" pr="0px" border="none">
        <Skeleton startColor="whiteAlpha.200" endColor="whiteAlpha.500" height="30px">
          <Text>Loading</Text>
        </Skeleton>
      </Td>
    </Tr>
    <Tr borderBottom="1px solid #2D2D38">
      <Td pl="16px" border="none">
        <SkeletonCircle startColor="whiteAlpha.500" endColor="whiteAlpha.200" h="30px" w="30px" />
      </Td>
      <Td pl="16px" border="none">
        <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200" height="30px">
          <Text mr={4}>Loading</Text>
        </Skeleton>
      </Td>
      <Td textAlign="end" pr="0px" border="none">
        <Skeleton startColor="whiteAlpha.500" endColor="whiteAlpha.200" height="30px">
          <Text>Loading</Text>
        </Skeleton>
      </Td>
    </Tr>
  </>
);
