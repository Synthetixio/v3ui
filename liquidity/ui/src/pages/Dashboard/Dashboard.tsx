import { Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import Wei from '@synthetixio/wei';
import { useSearchParams } from 'react-router-dom';

export function Dashboard() {
  const [params] = useSearchParams();
  const { data: positions, isLoading } = useLiquidityPositions({
    accountId: params.get('accountId') || '',
  });

  const debt =
    positions && Object.values(positions).reduce((prev, cur) => prev.add(cur.debt), new Wei(0));

  return (
    <Flex flexDir="column">
      <Heading>Dashboard</Heading>
      <Flex w="100%" gap="4">
        <Flex
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="297px"
          height="88px"
        >
          <Text fontSize="14px" color="gray.500">
            Total Assets
          </Text>
          <Text fontSize="24px" fontWeight={800}>
            TODO
          </Text>
        </Flex>
        <Flex
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="297px"
          height="88px"
        >
          <Text fontSize="14px" color="gray.500">
            Total Delegated
          </Text>
          <Text fontSize="24px" fontWeight={800}>
            TODO
          </Text>
        </Flex>
        <Flex
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="297px"
          height="88px"
        >
          <Text fontSize="14px" color="gray.500">
            Total Debt
          </Text>
          <Skeleton isLoaded={!isLoading}>
            <Text fontSize="24px" fontWeight={800}>
              ${debt && debt.toNumber().toFixed(2)}
            </Text>
          </Skeleton>
        </Flex>
        <Flex
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="297px"
          height="88px"
        >
          <Text fontSize="14px" color="gray.500">
            APY
          </Text>
          <Text fontSize="24px" fontWeight={800}>
            TODO
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
