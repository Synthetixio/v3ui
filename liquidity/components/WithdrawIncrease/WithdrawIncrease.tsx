import { Alert, AlertIcon, Text } from '@chakra-ui/react';

export function WithdrawIncrease() {
  return (
    <Alert borderRadius="6px" status="warning" mb="6">
      <AlertIcon />
      <Text>This action will reset the withdrawal waiting period to 24 hours</Text>
    </Alert>
  );
}
