import { Button, Flex, Image, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';
import { BurnSNXModal } from './BurnSNXModal';

export function BurnSNX() {
  const { data: events, isLoading } = useBurnEvents();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      flexDir="column"
      bg="navy.700"
      w="415px"
    >
      <Image src="/burn-snx.svg" h="284px" />
      <Flex flexDir="column" gap="6" p="4">
        <Text fontWeight={700} fontSize="18px" color="white">
          Sell SNX at premium and watch it burn
        </Text>
        <Text fontSize="16px">
          Sell your SNX at a <b>premium</b> price to the Buyback and Burn contract and get USDC on
          Base
        </Text>
        {isLoading ? (
          <Spinner colorScheme="cyan" />
        ) : (
          <Text fontWeight={700} fontSize="20px">
            Buyback Price: <s>$ {events?.SNXPrice}</s> $
            {events && events?.SNXPrice ? (events.SNXPrice + events.SNXPrice * 0.01).toFixed(2) : 0}
          </Text>
        )}
        <Flex gap="4">
          <Button onClick={() => onOpen()}>Burn SNX</Button>
          <Button variant="outline" colorScheme="gray">
            Lean More
          </Button>
        </Flex>
      </Flex>
      <BurnSNXModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
