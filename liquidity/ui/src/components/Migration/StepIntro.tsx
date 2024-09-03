import React from 'react';
import {
  Flex,
  Spacer,
  VStack,
  Heading,
  Text,
  ListItem,
  Button,
  Image,
  ListIcon,
  List,
  Link,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export const StepIntro = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <VStack spacing={2} align="start">
      <Flex>
        <VStack gap={6} flex={1} align="start" fontWeight="400" fontSize="14px">
          <Heading size="sm">Synthetix V3 is now live!</Heading>

          <Text>
            Migrate to Synthetix V3 to <b>earn fees from both V2 and V3 </b>markets and much more:
          </Text>

          <List spacing={2}>
            <ListItem>
              <ListIcon as={CheckIcon} color="cyan.500" />
              V2 Legacy Market Fees
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="cyan.500" />
              V3 SC Pool Fees
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="cyan.500" />
              LP Incentives
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="cyan.500" />
              Improved LP experience
            </ListItem>
          </List>
          <Text fontSize="sm">
            Learn more about{' '}
            <Link
              target="_blank"
              color="cyan.500"
              href="https://docs.synthetix.io/v/synthetix-v3-user-documentation/liquidity-providers-aka-staking/providing-liquidity-and-earning-rewards/staking-snx-on-eth-mainnet-v3-via-migration-to-legacy-market"
            >
              Synthetix V3 migration process
            </Link>
          </Text>
        </VStack>
        <Flex alignItems="center" justifyContent="center" flex={1}>
          <Image width="165px" src="/synthetix-rocket.png" alt="Synthetix V3 Launch" />
        </Flex>
      </Flex>

      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />

      <Button width="100%" onClick={onConfirm}>
        Start Migration
      </Button>
      <Button variant="outline" colorScheme="gray" width="100%" onClick={onClose}>
        Later
      </Button>
    </VStack>
  );
};
