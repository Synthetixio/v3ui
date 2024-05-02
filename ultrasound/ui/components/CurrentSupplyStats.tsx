import { Flex, Spinner, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';

export function CurrentSupplyStats() {
  const { data: events, isLoading } = useBurnEvents();

  return (
    <Flex
      w={{ base: '100%', xl: '369px' }}
      h="200px"
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
              Current Supply
            </Text>
            <Tabs variant="soft-rounded">
              <TabList>
                <Tab color="gray.500" _selected={{ color: 'white', bg: 'whiteAlpha.400' }}>
                  ALL
                </Tab>
              </TabList>
            </Tabs>
          </Flex>
          <Text fontWeight={700} fontSize="24px" color="white">
            {events?.totalSupply} SNX
          </Text>
        </>
      )}
    </Flex>
  );
}
