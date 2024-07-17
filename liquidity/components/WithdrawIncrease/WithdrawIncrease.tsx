import { Alert, AlertIcon, Text } from '@chakra-ui/react';

export function WithdrawIncrease() {
  return (
    <Alert status="warning" mb="4">
      <AlertIcon />
      <Text>This action will reset the withdrawal waiting period to 24 hours</Text>
    </Alert>
  );
}
