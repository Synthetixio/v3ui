import { Flex, Spinner } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';

export function Chart() {
  const { data: events, isLoading } = useBurnEvents();
  if (isLoading) return <Spinner colorScheme="cyan" />;

  return (
    <Flex
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      w="761px"
      h="400px"
      bg="navy.700"
      mb="4"
    ></Flex>
  );
}
