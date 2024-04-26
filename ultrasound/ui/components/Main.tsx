import { Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { Chart } from './Chart';
import { SupplyChangeStats } from './SupplyChangeStats';
import { CurrentSupplyStats } from './CurrentSupplyStats';
import { BurnSNX } from './BurnSNX';
import { useBurnEvents } from '../hooks/useBurnEvents';

export function Main() {
  const { data: events, isLoading } = useBurnEvents();

  return (
    <Flex flexDir="column" mt="10" width="100%" maxW="1200px">
      <Flex justifyContent="space-between">
        <Flex flexDir="column">
          <Heading fontSize="72px" fontWeight={700} color="white">
            ultrasound.homes
          </Heading>
          <Heading fontSize="30px" fontWeight={700} color="white">
            burning SNX for Kain's mansions
          </Heading>
        </Flex>
        <Flex alignItems="center">
          <Image src="/kain.svg" />
          <Flex flexDir="column">
            <Text fontSize="16px" fontWeight={700} color="white">
              Mansion counter
            </Text>
            <Text fontSize="24px" fontWeight={700} color="white">
              {isLoading ? <Spinner colorScheme="cyan" /> : events.totalBurns}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="4" mt="4">
        <Flex flexDir="column">
          <Chart />
          <Flex gap="6">
            <SupplyChangeStats />
            <CurrentSupplyStats />
          </Flex>
        </Flex>
        <BurnSNX />
      </Flex>
    </Flex>
  );
}
