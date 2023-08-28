import {
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Flex,
  Td,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { RewardsRow } from './RewardsRow';
import { RewardsType } from '@snx-v3/useRewards';

// interface RewardsItem {
//   symbol: string;
//   amount: number;
//   frequency: string;
//   earnings: number;
//   lifetimeEarned: number;
//   hasClaimed: boolean;
// }

interface RewardsDistributorsInterface {
  rewards?: RewardsType;
  isLoading: boolean;
}

export const Rewards = ({ rewards, isLoading }: RewardsDistributorsInterface) => {
  const empty = rewards && rewards.length === 0;

  return (
    <BorderBox bg="navy.700" py={4} px={6} flexDir="column">
      <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs" mb="8px">
        REWARDS
      </Text>
      {/* TODO Map Over rewards and  */}
      <TableContainer width="100%" mb="8px">
        {empty ? (
          <Flex mt="20px" mb="8px" justifyContent="center">
            <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs">
              No Rewards Available
            </Text>
          </Flex>
        ) : (
          <Table>
            <Thead>
              <Tr borderBottom="1px solid #2D2D38">
                <Th
                  textTransform="unset"
                  color="gray.600"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  Estimated Rate
                </Th>
                <Th
                  textTransform="unset"
                  color="gray.600"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  Earnings
                </Th>
                <Th
                  textTransform="unset"
                  color="transparent"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  Claim{' '}
                </Th>
              </Tr>
            </Thead>
            {isLoading ? (
              <LoadingRewards />
            ) : (
              <Tbody>
                {rewards?.map((item) => (
                  <RewardsRow
                    key={item.address}
                    symbol={item.symbol}
                    amount={200}
                    frequency="Weekly"
                    earnings={400}
                    lifetimeEarned={2000}
                    hasClaimed={true}
                  />
                ))}
              </Tbody>
            )}
          </Table>
        )}
      </TableContainer>
    </BorderBox>
  );
};

const LoadingRewards = () => (
  <Tbody width="100%">
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
  </Tbody>
);
