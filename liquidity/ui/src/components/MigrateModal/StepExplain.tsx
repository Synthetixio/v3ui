import React from 'react';
import {
  Box,
  VStack,
  UnorderedList,
  ListItem,
  Text,
  Alert,
  AlertIcon,
  Link,
  Button,
} from '@chakra-ui/react';

import { MigrateEvents, Events } from './MigrateMachine';

const StepExplain = ({
  onClose,
  send,
}: {
  onClose: () => void;
  send: (event: MigrateEvents) => void;
}) => {
  return (
    <VStack spacing={6} p={6} align="start">
      <Text fontWeight="700">Migrating to Synthetix V3 consists of:</Text>
      <UnorderedList spacing={5} fontSize="14px" fontWeight="400">
        <ListItem>Creation of an Account on Synthetix V3</ListItem>
        <ListItem>
          Migration of your SNX Collateral (including escrowed SNX) and your debt to a New Liquidity
          Position on the Liquidity App
        </ListItem>
        <ListItem>
          (optional) Conversion of your sUSD into V3 compatible sUSD. You can convert your sUSD at
          anytime
        </ListItem>
      </UnorderedList>

      <Alert status="info">
        <AlertIcon />
        <Text>
          Migration to V3 is currently only available on Ethereum Mainnet.
          <Link href="#" isExternal>
            Learn more about migrating to V3.
          </Link>
        </Text>
      </Alert>

      <Button width="100%" onClick={() => send({ type: Events.CONFIRM })}>
        Continue
      </Button>
      <Button
        width="100%"
        variant="outline"
        colorScheme="gray"
        onClick={() => send({ type: Events.RESET })}
      >
        Back
      </Button>
    </VStack>
  );
};

export default StepExplain;
