import { Alert, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';

export function LiquidityAccountCreated({ setStep }: { setStep: () => void }) {
  return (
    <Flex
      flexDir="column"
      gap="6"
      border="1px solid"
      borderColor="gray.900"
      p="6"
      bg="navy.700"
      rounded="base"
      height="fit-content"
    >
      <Heading color="gray.50" fontSize="20px">
        Create Liquidity Account
      </Heading>
      <Divider />
      <Text color="white" fontSize="14px">
        Your account position has been successfully created, read more about it in the Synthetix V3
        Documentation.
      </Text>
      <Alert colorScheme="green" rounded="base">
        Account successfully Created
      </Alert>
      <Button onClick={setStep}>Continue</Button>
    </Flex>
  );
}
