import React from 'react';
import {
  Flex,
  Spacer,
  VStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Button,
  Image,
} from '@chakra-ui/react';

import { MigrateEvents, Events } from './MigrateMachine';

const StepIntro = ({
  onClose,
  send,
}: {
  onClose: () => void;
  send: (event: MigrateEvents) => void;
}) => {
  return (
    <VStack spacing={6} align="start">
      <Flex>
        <VStack flex={1} align="start" fontWeight="400" fontSize="14px">
          <Heading size="md">Synthetix V3 is now live!</Heading>

          <Text>
            Migrate to Synthetix V3 to earn fees from both V2 and V3 markets and much more:
          </Text>

          <UnorderedList spacing={2}>
            <ListItem>V2 Legacy Market Fees</ListItem>
            <ListItem>V3 SC Pool Fees</ListItem>
            <ListItem>LP Incentives</ListItem>
            <ListItem>Improved LP experience</ListItem>
          </UnorderedList>
          <Text fontSize="sm">Learn more about Synthetix V3 migration process</Text>
        </VStack>
        <Image flex={1} src="/synthetix-rocket.svg" alt="Synthetix V3 Launch" />
      </Flex>

      <Spacer />

      <Button width="100%" onClick={() => send({ type: Events.CONFIRM })}>
        Start Migration
      </Button>
      <Button variant="outline" colorScheme="gray" width="100%" onClick={onClose}>
        Later
      </Button>
    </VStack>
  );
};

export default StepIntro;
