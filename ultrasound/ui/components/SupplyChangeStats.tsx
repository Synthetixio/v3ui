import { Flex, Image, Link, Spinner, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';
import burnSvg from './svgs/burn.svg';
import mintedSvg from './svgs/minted.svg';
import { useState } from 'react';

export function SupplyChangeStats() {
  const { data: events, isLoading } = useBurnEvents();
  const [selectedTime, setSelectedTime] = useState<'totalBurned' | 'supplyChange7Days'>(
    'totalBurned'
  );

  return (
    <Flex
      alignItems={isLoading ? 'center' : ''}
      justifyContent={isLoading ? 'center' : ''}
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
              Supply Change
            </Text>
            <Tabs variant="soft-rounded" size="sm" defaultIndex={1}>
              <TabList>
                <Tab
                  color="gray.500"
                  _selected={{ color: 'white', bg: 'whiteAlpha.400' }}
                  onClick={() => setSelectedTime('supplyChange7Days')}
                >
                  7D
                </Tab>
                <Tab
                  color="gray.500"
                  _selected={{ color: 'white', bg: 'whiteAlpha.400' }}
                  onClick={() => setSelectedTime('totalBurned')}
                >
                  All
                </Tab>
              </TabList>
            </Tabs>
          </Flex>
          <Text fontWeight={700} fontSize="24px">
            -{events ? events[selectedTime] : 0} SNX
          </Text>
          <Flex gap="2" alignItems="center">
            <Image src={burnSvg} />
            <Text fontSize="16px" color="gray.500" fontWeight={400}>
              Burnt
            </Text>
            <Text fontSize="18px" color="gray.500" fontWeight={700}>
              {events ? events[selectedTime] : 0} SNX
            </Text>
          </Flex>
          <Flex gap="2" alignItems="center">
            <Image src={mintedSvg} />
            <Text fontSize="16px" color="gray.500" fontWeight={400}>
              Minted
            </Text>
            <Text fontSize="18px" color="gray.500" fontWeight={700}>
              0.00 SNX
            </Text>

            <Link
              href="https://sips.synthetix.io/sips/sip-2043/?ref=blog.synthetix.io"
              rel="noopener"
              target="_blank"
              _hover={{ textDecoration: 'none' }}
            >
              <Text color="gray.500" fontWeight="bold" _hover={{ color: 'white' }}>
                Why?
              </Text>
            </Link>
          </Flex>
        </>
      )}
    </Flex>
  );
}
