import { Flex, Heading, Text } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';

export function Positions() {
  const { accountId } = useParams();

  return (
    <Flex flexDir="column">
      <Heading>Dashboard</Heading>
      <Flex gap="4" mt={{ base: 7 }}>
        <Flex flexDir="column">
          <Text fontSize={{ base: '12px' }} color="gray.500">
            Total Assets
          </Text>
          <Text fontSize={{ base: '24px' }} fontWeight={800} color="gray.50">
            TODO
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text fontSize={{ base: '12px' }} color="gray.500">
            Total Delegated
          </Text>
          <Text fontSize={{ base: '24px' }} fontWeight={800} color="gray.50">
            TODO
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text fontSize={{ base: '12px' }} color="gray.500">
            Total Debt
          </Text>
          <Text fontSize={{ base: '24px' }} fontWeight={800} color="gray.50">
            TODO
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
