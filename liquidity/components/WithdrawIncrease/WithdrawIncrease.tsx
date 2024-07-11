import { Alert, AlertIcon, Text } from '@chakra-ui/react';

export function WithdrawIncrease() {
  return (
    <Alert colorScheme="blue" mb="4">
      <AlertIcon />
      <Text>This action will increase the timeout for withdrawing collateral</Text>
    </Alert>
  );
}
