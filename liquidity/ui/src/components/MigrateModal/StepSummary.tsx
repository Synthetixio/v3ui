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
    <VStack spacing={6} align="start">
      <Heading size="sm">Summary of your migration</Heading>

      <Box p={4} bg="gray" borderWidth="1px" borderRadius="md" width="100%">
        <HStack justifyContent="space-between">
          <Tag colorScheme="green">420% HEALTHY</Tag>
        </HStack>
      </Box>

      <Text>
        Warning: if your c-ratio is below V3 liquidation ratio (300%), your account will be
        liquidated during the migration. We recommend to commence this migration only if you have a
        healthy c-ratio.
      </Text>

      <Box>
        <VStack align="stretch" spacing={4} mt={4}>
          <HStack justifyContent="space-between">
            <VStack align="start">
              <Text>SNX Collateral</Text>
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

      <Button width="100%" onClick={() => {}}>
        Migrate
      </Button>
      <Button variant="outline" colorScheme="gray" onClick={onClose} width="100%">
        Cancel
      </Button>
    </VStack>
  );
}

export default StepSummary;
