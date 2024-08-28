import React from 'react';
import { VStack, Text, Button, Alert, Flex, Image } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { Network } from '@snx-v3/useBlockchain';

export const StepSuccess = ({
  onConfirm,
  network,
}: {
  onConfirm: () => void;
  network: Network;
}) => {
  return (
    <VStack spacing={6}>
      <Text width="100%" textAlign="left" fontSize="14px">
        Your migration to Synthetix V3 on {network.name} has been successfully Completed.
      </Text>

      <Flex width="100%" alignItems="center" justifyContent="center" flex={1}>
        <Image maxWidth="455px" width="100%" src="/Migrate Launch.png" alt="Synthetix V3 Launch" />
      </Flex>

      <Alert borderRadius="6px" colorScheme="green">
        <Flex bg="green.500" p="1" rounded="full" mr="3.5">
          <CheckIcon w="12px" h="12px" color="green.900" />
        </Flex>
        <Text fontSize="16px">Migration successfully Completed</Text>
      </Alert>

      <VStack width="100%" spacing={4}>
        <Button width="100%" onClick={onConfirm}>
          Done
        </Button>
        <Button variant="outline" colorScheme="gray" width="100%">
          Deposit sUSD to Curve
        </Button>
      </VStack>
    </VStack>
  );
};
