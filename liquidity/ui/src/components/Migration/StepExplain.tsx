import React from 'react';
import {
  VStack,
  Alert,
  Text,
  UnorderedList,
  ListItem,
  Button,
  AlertIcon,
  Link,
} from '@chakra-ui/react';

export const StepExplain = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <VStack spacing={2} align="start">
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

      <Alert my={6} status="info">
        <AlertIcon />
        <Text>
          Migration to V3 is currently only available on Ethereum Mainnet. Learn more about &nbsp;
          <Link color="cyan.500" href="#" isExternal>
            migrating to V3.
          </Link>
        </Text>
      </Alert>

      <Button width="100%" onClick={onConfirm}>
        Continue
      </Button>
      <Button width="100%" variant="outline" colorScheme="gray" onClick={onClose}>
        Back
      </Button>
    </VStack>
  );
};
