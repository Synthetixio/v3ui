import React from 'react';
import {
  Box,
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
    <VStack spacing={6} p={6} align="start">
      <Heading size="md">Synthetix V3 is now live!</Heading>

      <Text>Migrate to Synthetix V3 to earn fees from both V2 and V3 markets and much more:</Text>

      <UnorderedList spacing={2}>
        <ListItem>V2 Legacy Market Fees</ListItem>
        <ListItem>V3 SC Pool Fees</ListItem>
        <ListItem>LP Incentives</ListItem>
        <ListItem>Improved LP experience</ListItem>
      </UnorderedList>

      <Image src="/images/synthetix-rocket.png" alt="Synthetix V3 Launch" maxW="200px" />

      <Text fontSize="sm">Learn more about Synthetix V3 migration process</Text>

      <Box display="flex" justifyContent="space-between" width="100%">
        <Button colorScheme="blue" onClick={() => send({ type: Events.CONFIRM })}>
          Start Migration
        </Button>
        <Button variant="link" onClick={onClose}>
          Later
        </Button>
      </Box>
    </VStack>
  );
};

export default StepIntro;
