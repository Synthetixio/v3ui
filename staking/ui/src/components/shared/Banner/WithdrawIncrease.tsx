import { Alert, Flex, Text } from '@chakra-ui/react';

export default function WithdrawIncrease() {
  return (
    <Alert colorScheme="orange" mb="4">
      <Text fontWeight="bold">
        This action will increase the timeout for withdrawing collateral
      </Text>
    </Alert>
  );
}
