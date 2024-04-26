import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';

export function CurrentSupplyStats() {
  const { data: events, isLoading } = useBurnEvents();

  return (
    <Flex
      w="369px"
      h="184px"
      p="4"
      border="1px solid"
      borderColor="gray.900"
      flexDir="column"
      rounded="base"
      bg="navy.700"
      gap="3"
    >
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : (
        <>
          <Flex justifyContent="space-between">
            <Text fontSize="18px" fontWeight={700}>
              Curren tSupply
            </Text>
            <Text
              bg="whiteAlpha.400"
              rounded="30"
              w="40px"
              pt="1"
              textAlign="center"
              fontWeight={700}
              fontSize="12px"
            >
              ALL
            </Text>
          </Flex>
          <Text fontWeight={700} fontSize="24px" color="white">
            {events.totalSupply} SNX
          </Text>
        </>
      )}
    </Flex>
  );
}
