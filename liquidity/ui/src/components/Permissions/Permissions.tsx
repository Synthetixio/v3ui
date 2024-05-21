import {
  Badge,
  Button,
  Flex,
  Heading,
  Link,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { PermissionRow } from './PermissionRow';
import { useAccountOwner, useAccountPermissions } from '@snx-v3/useAccountPermissions';
import { prettyString } from '@snx-v3/format';
import { CopyIcon } from '@chakra-ui/icons';
import { useWallet } from '@snx-v3/useBlockchain';
import { useAccounts } from '@snx-v3/useAccounts';
import { AddPermissionModal } from './AddPermissionModal';
import { TransferOwnershipModal } from './TransferOwnershipModal';

export default function Permissions() {
  const [accountId, setAccountId] = useState('');
  const {
    isOpen: isPermissionOpen,
    onClose: onPermissionClose,
    onOpen: onPermissionOpen,
  } = useDisclosure();
  const {
    isOpen: isTransferOpen,
    onClose: onTransferClose,
    onOpen: onTransferOpen,
  } = useDisclosure();
  const { activeWallet } = useWallet();
  const { data: accounts } = useAccounts();
  const { data: permissionData, refetch } = useAccountPermissions(accounts);
  const { isLoading: loadingOwner, data: accountOwners } = useAccountOwner(accounts);

  return (
    <Flex flexDir="column" gap="6">
      <Flex flexDir="column">
        {accounts?.map((account, index) => (
          <TableContainer
            key={account}
            flexGrow="2"
            mt={4}
            borderColor="gray.900"
            borderWidth="1px"
            borderRadius="5px"
            p={6}
            sx={{
              borderCollapse: 'separate',
              borderSpacing: 0,
            }}
            bg="navy.700"
          >
            <Flex mb="2" w="100%" justifyContent="space-between">
              <Heading size="md" mb="1">
                Account #{prettyString(account, 4, 4)}
              </Heading>
              <Button
                size="xs"
                onClick={() => {
                  setAccountId(account);
                  onPermissionOpen();
                }}
              >
                + New Permission
              </Button>
            </Flex>
            {accountOwners && accountOwners[index] ? (
              <Stack>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        py={5}
                        textTransform="unset"
                        color="gray.600"
                        fontFamily="heading"
                        fontSize="12px"
                        lineHeight="16px"
                        borderBottomColor="gray.900"
                      >
                        Address
                      </Th>
                      <Th
                        py={5}
                        textTransform="unset"
                        color="gray.600"
                        fontFamily="heading"
                        fontSize="12px"
                        lineHeight="16px"
                        borderBottomColor="gray.900"
                      >
                        Permissions
                      </Th>
                      <Th
                        py={5}
                        textTransform="unset"
                        color="gray.600"
                        fontFamily="heading"
                        fontSize="12px"
                        lineHeight="16px"
                        borderBottomColor="gray.900"
                      ></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr>
                      <Td py={5} borderBottomColor="gray.900">
                        <Skeleton isLoaded={!loadingOwner}>
                          {accountOwners[index] && (
                            <Text fontWeight={400} color="white" fontSize="16px">
                              {prettyString(accountOwners[index])}{' '}
                              <Tooltip closeOnClick={false}>
                                <CopyIcon
                                  ml="2"
                                  onClick={() => {
                                    navigator.clipboard.writeText(accountOwners[index]);
                                  }}
                                />
                              </Tooltip>
                            </Text>
                          )}
                        </Skeleton>
                      </Td>
                      <Td py={5} borderBottomColor="gray.900">
                        <Badge
                          cursor="pointer"
                          colorScheme="cyan"
                          variant="outline"
                          bg="cyan.900"
                          size="sm"
                          textTransform="capitalize"
                          mx="1"
                        >
                          OWNER
                        </Badge>
                      </Td>
                      <Td py={5} borderBottomColor="gray.900" textAlign="end">
                        {activeWallet?.address.toLowerCase() ==
                          accountOwners[index].toLowerCase() && (
                          <Button
                            size="xs"
                            variant="outline"
                            colorScheme="gray"
                            color="white"
                            onClick={() => {
                              setAccountId(account);
                              onTransferOpen();
                            }}
                          >
                            Transfer Ownership
                          </Button>
                        )}
                      </Td>
                    </Tr>

                    {permissionData &&
                      Object.keys(permissionData[index])
                        .filter((target) => permissionData[index][target]?.length > 0)
                        .map((target) => (
                          <PermissionRow
                            key={target}
                            address={target}
                            currentPermissions={permissionData[index][target]}
                            accountId={account || ''}
                            refetch={() => refetch()}
                          />
                        ))}
                  </Tbody>
                </Table>
              </Stack>
            ) : (
              <Text>No permissions</Text>
            )}
          </TableContainer>
        ))}
      </Flex>
      <Flex
        mt="4"
        flexGrow="1"
        h="fit-content"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        flexDir="column"
        w="375px"
        p="6"
        bg="navy.700"
      >
        <DelegationIcon />
        <Heading fontSize="14px" mt="6">
          Delegate Permissions
        </Heading>
        <Text color="gray.500" fontSize="12px" mb="6">
          Delegation enables a wallet to execute functions on behalf of another wallet/account:
          delegate, borrow, withdraw, claim, but not transfer. Manage addresses and their powers
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
      <AddPermissionModal
        isOpen={isPermissionOpen}
        onClose={onPermissionClose}
        accountId={accountId}
      />
      <TransferOwnershipModal
        isOpen={isTransferOpen}
        onClose={onTransferClose}
        accountId={accountId}
      />
    </Flex>
  );
}

const DelegationIcon = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.3662 7.14593C29.8933 6.89158 30.5156 6.97433 30.9627 7.35822L42.9627 17.6613C43.3047 17.9549 43.5024 18.3898 43.5024 18.8485C43.5024 19.3072 43.3047 19.7421 42.9627 20.0358L30.9627 30.3388C30.5156 30.7227 29.8933 30.8054 29.3662 30.5511C28.8391 30.2967 28.5024 29.7512 28.5024 29.1515V25.5455H18.0024C17.174 25.5455 16.5024 24.8536 16.5024 24C16.5024 23.1465 17.174 22.4546 18.0024 22.4546H30.0024C30.8309 22.4546 31.5024 23.1465 31.5024 24V25.8519L39.6594 18.8485L31.5024 11.8451V13.697C31.5024 14.5505 30.8309 15.2424 30.0024 15.2424H18.0024C17.174 15.2424 16.5024 14.5505 16.5024 13.697C16.5024 12.8435 17.174 12.1515 18.0024 12.1515H28.5024V8.54547C28.5024 7.94581 28.8391 7.40028 29.3662 7.14593Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.6362 40.8541C18.1092 41.1084 17.4868 41.0257 17.0397 40.6418L5.03972 30.3387C4.69774 30.0451 4.5 29.6102 4.5 29.1515C4.5 28.6928 4.69774 28.2579 5.03972 27.9642L17.0397 17.6612C17.4869 17.2773 18.1092 17.1946 18.6362 17.4489C19.1633 17.7033 19.5 18.2488 19.5 18.8485L19.5 22.4545L30 22.4545C30.8284 22.4545 31.5 23.1464 31.5 24C31.5 24.8535 30.8284 25.5454 30 25.5454L18 25.5454C17.1716 25.5454 16.5 24.8535 16.5 24L16.5 22.1481L8.34308 29.1515L16.5 36.1549L16.5 34.303C16.5 33.4495 17.1716 32.7576 18 32.7576L30 32.7576C30.8284 32.7576 31.5 33.4495 31.5 34.303C31.5 35.1565 30.8284 35.8485 30 35.8485L19.5 35.8485L19.5 39.4545C19.5 40.0542 19.1633 40.5997 18.6362 40.8541Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.3584 13.6973C9.3584 12.8438 10.03 12.1519 10.8584 12.1519H12.5727C13.4011 12.1519 14.0727 12.8438 14.0727 13.6973C14.0727 14.5508 13.4011 15.2428 12.5727 15.2428H10.8584C10.03 15.2428 9.3584 14.5508 9.3584 13.6973Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.644 34.3027C38.644 35.1562 37.9725 35.8481 37.144 35.8481L35.4298 35.8481C34.6013 35.8481 33.9298 35.1562 33.9298 34.3027C33.9298 33.4492 34.6013 32.7572 35.4298 32.7572L37.144 32.7572C37.9725 32.7572 38.644 33.4492 38.644 34.3027Z"
        fill="white"
      />
    </svg>
  );
};
