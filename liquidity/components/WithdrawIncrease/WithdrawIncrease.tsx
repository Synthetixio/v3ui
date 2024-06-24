import { Alert, Text } from '@chakra-ui/react';

export function WithdrawIncrease() {
  return (
    <Alert colorScheme="blue" mb="4">
      <Text fontWeight="bold">
        This action will increase the timeout for withdrawing collateral
      </Text>
    </Alert>
  );
}
