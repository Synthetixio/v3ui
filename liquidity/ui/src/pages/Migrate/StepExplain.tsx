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

const StepExplain = () => (
  <VStack spacing={6} p={6} align="start">
    <Text>Migrating to Synthetix V3 consists of:</Text>
    <UnorderedList spacing={2}>
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

    <Box display="flex" justifyContent="space-between" width="100%">
      <Button colorScheme="blue">Continue</Button>
      <Button variant="link">Back</Button>
    </Box>
  </VStack>
);

export default StepExplain;
