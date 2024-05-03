import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Image, Link, Spinner, Tab, TabList, Tabs, Text, Tooltip } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';
import burnSvg from './svgs/burn.svg';
import mintedSvg from './svgs/minted.svg';

export function SupplyChangeStats() {
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
              Supply Change
            </Text>
            <Tabs variant="soft-rounded" size="sm">
              <TabList>
                <Tab color="gray.500" _selected={{ color: 'white', bg: 'whiteAlpha.400' }}>
                  7D
                </Tab>
              </TabList>
            </Tabs>
          </Flex>
          <Text fontWeight={700} fontSize="24px">
            -{events?.supplyChange7Days} SNX
          </Text>
          <Flex gap="2" alignItems="center">
            <Image src={burnSvg} />
            <Text fontSize="16px" color="gray.500" fontWeight={400}>
              Burnt
            </Text>
            <Text fontSize="18px" color="gray.500" fontWeight={700}>
              {events?.supplyChange7Days} SNX
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