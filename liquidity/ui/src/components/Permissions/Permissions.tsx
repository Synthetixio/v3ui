import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useAccounts } from '@snx-v3/useAccounts';
import PermissionTable from './PermissionTable';
import { DelegationIcon } from './DelegationIcon';

export default function Permissions() {
  const { data: accounts, refetch: refetchAccounts } = useAccounts();

  return (
    <Flex flexDir="column" gap="7">
      <Flex flexDir="column" gap={7}>
        {accounts?.map((account) => (
          <PermissionTable key={account} accountId={account} refetchAccounts={refetchAccounts} />
        ))}
      </Flex>
      <Flex
        flexGrow="1"
        h="fit-content"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        flexDir="column"
        width="100%"
        p="6"
        bg="navy.700"
      >
        <DelegationIcon />
        <Heading fontSize="14px" mt="6">
          Delegate Permissions
        </Heading>
        <Text color="gray.500" fontSize="12px" mb="6">
          Delegation enables a wallet to execute functions on behalf of another wallet/account:
          lock, borrow, withdraw, claim, but not transfer. Manage addresses and their powers
          below.
        </Text>
        <Link
          href="https://docs.synthetix.io/v/synthetix-v3-user-documentation/protocol-design/vaults#account-permissions"
          rel="noopener"
          target="_blank"
        >
          <Button variant="outline" color="white" colorScheme="gray" size="xs">
            Learn More
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
