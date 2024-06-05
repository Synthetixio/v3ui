import React from 'react';
import { VStack, Heading, Text, HStack, Box, Tag, Checkbox, Link, Button } from '@chakra-ui/react';

import type { MigrateEvents } from './MigrateMachine';

function StepSummary({
  onClose,
  send,
}: {
  onClose: () => void;
  send: (event: MigrateEvents) => void;
}) {
  return (
    <VStack spacing={6} p={6} align="start">
      <Heading size="md">Migrate to Synthetix V3</Heading>

      <Heading size="sm">Summary of your migration</Heading>

      <Box p={4} borderWidth="1px" borderRadius="md" borderColor={BORDER_COLOR} width="100%">
        <HStack justifyContent="space-between">
          <Text>
            Your SNX Collateral will not appear on your wallet anymore as it will be deposited in
            your atio (300%), your account will Account. You can see the details on your Dashboard.
          </Text>
          <Tag colorScheme="green">420% HEALTHY</Tag>
        </HStack>

        <VStack align="stretch" spacing={4} mt={4}>
          <HStack justifyContent="space-between">
            <Text>SNX Collateral</Text>
            <HStack>
              <Text>Balance</Text>
              <Text>10,000.00 ($20,000.00)</Text>
            </HStack>
            <HStack>
              <Text>Escrowed</Text>
              <Text>00</Text>
            </HStack>
          </HStack>

          <Text fontSize="sm">
            Escrowed SNX will be locked in the V3 system until the escrowed date. It can still be
            delegated but not withdrawn.
          </Text>

          <HStack justifyContent="space-between">
            <VStack align="start">
              <Text>Debt</Text>
              <Text>
                Your debt amount will be the same on V3. Debt is however now determined by the
                collateral deposited.
                <Link href="#" isExternal>
                  Learn more about the V3 system.
                </Link>
              </Text>
            </VStack>
            <Text>00</Text>
          </HStack>
        </VStack>

        <Checkbox defaultChecked mt={4}>
          I understand that this action cannot be undone
        </Checkbox>

        <HStack justifyContent="space-between" mt={4}>
          <Text>Estimated Gas</Text>
          <Text>0.0035 ETH ($20.00)</Text>
        </HStack>
      </Box>

      <Box display="flex" justifyContent="space-between" width="100%">
        <Button colorScheme="blue">Migrate</Button>
        <Button variant="link" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </VStack>
  );
}

export default StepSummary;
