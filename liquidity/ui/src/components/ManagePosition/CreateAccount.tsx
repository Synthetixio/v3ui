import {
  Button,
  Divider,
  Flex,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

export function CreateLiquidiyAccount({
  createAccountTransactionCost,
  createAccountIsLoading,
  createAccount,
}: {
  createAccountTransactionCost: string | undefined;
  createAccountIsLoading: boolean;
  createAccount: () => void;
}) {
  return (
    <Flex
      flexDir="column"
      gap="6"
      alignItems="center"
      bg="navy.700"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      p="6"
    >
      <Heading color="gray.50" fontSize="20px">
        Create Liquidity Account
      </Heading>
      <Divider />
      <Text color="white" fontSize="14px">
        In order to open a position on Synthetix Liquidity, you need an Account. It’s a one time
        action needed that you won’t have to reproduce for the next positions. Accounts are
        represented as ERC-721 compliant tokens (NFTs). Read more in the Synthetix V3 Documentation.
        <UnorderedList>
          <ListItem my="2">Transferable like any NFT</ListItem>
          <ListItem my="2">Improve security by delegating permissions</ListItem>
          <ListItem my="2">Simplify collaborative liquidity positions management</ListItem>
        </UnorderedList>
      </Text>
      <Flex w="100%" p="3" bg="gray.900" justifyContent="space-between">
        <Text color="white" fontWeight={700} fontSize="12px">
          Transaction Fee
        </Text>
        <Text color="white" fontWeight={700} fontSize="12px">
          ${createAccountTransactionCost}
        </Text>
      </Flex>
      {createAccountIsLoading ? (
        <Spinner colorScheme="cyan" />
      ) : (
        <Button onClick={createAccount} w="100%" data-cy="create-account-button">
          Create Account
        </Button>
      )}
    </Flex>
  );
}
