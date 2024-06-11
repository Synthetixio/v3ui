/* eslint-disable react/no-unescaped-entities */
import {
  Badge,
  Button,
  Flex,
  Heading,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { PermissionRow } from './PermissionRow';
import { useAccountOwner, useAccountPermissions } from '@snx-v3/useAccountPermissions';
import { prettyString } from '@snx-v3/format';
import { useWallet } from '@snx-v3/useBlockchain';
import { PermissionModal } from './PermissionModal';
import { TransferOwnershipModal } from './TransferOwnershipModal';
import { PermissionTableLoading } from './PermissionTableLoading';
import { useMemo } from 'react';
import { Address } from '../Address';
import PermissionsInfo from './PermissionsInfo';

export default function PermissionTable({
  accountId,
  refetchAccounts,
}: {
  accountId: string;
  refetchAccounts: () => void;
}) {
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
  const { data: permissions, isLoading, refetch } = useAccountPermissions(accountId);
  const {
    data: accountOwner,
    isLoading: loadingOwner,
    refetch: refetchAccountOwner,
  } = useAccountOwner(accountId);

  const isOwner = useMemo(
    () => !!(accountOwner && accountOwner?.toLowerCase() === activeWallet?.address.toLowerCase()),
    [accountOwner, activeWallet?.address]
  );
  return (
    <>
      <TableContainer
        flexGrow="2"
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
            Account #{prettyString(accountId, 4, 4)}
          </Heading>
          {isOwner && (
            <Button
              size="xs"
              onClick={() => {
                onPermissionOpen();
              }}
            >
              + New Permission
            </Button>
          )}
        </Flex>
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
                <PermissionsInfo />
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
              <Td width={240} py={5} borderBottomColor="gray.900">
                <Skeleton isLoaded={!loadingOwner}>
                  {accountOwner && (
                    <Text fontWeight={400} color="white" fontSize="16px">
                      <Address address={accountOwner} />
                    </Text>
                  )}
                </Skeleton>
              </Td>
              <Td py={5} borderBottomColor="gray.900">
                <Badge
                  color="cyan"
                  variant="outline"
                  bg="cyan.900"
                  size="sm"
                  textTransform="capitalize"
                >
                  OWNER
                </Badge>
              </Td>
              <Td py={5} borderBottomColor="gray.900" textAlign="end">
                {isOwner && (
                  <Button
                    size="xs"
                    variant="outline"
                    colorScheme="gray"
                    color="white"
                    onClick={() => {
                      onTransferOpen();
                    }}
                  >
                    Transfer Ownership
                  </Button>
                )}
              </Td>
            </Tr>

            {isLoading && <PermissionTableLoading />}

            {!isLoading &&
              permissions &&
              Object.keys(permissions)
                .filter((target) => permissions[target]?.length > 0)
                .map((target) => (
                  <PermissionRow
                    key={target}
                    address={target}
                    currentPermissions={permissions[target]}
                    accountId={accountId}
                    refetch={refetch}
                    isOwner={isOwner}
                  />
                ))}
          </Tbody>
        </Table>
      </TableContainer>

      <PermissionModal
        isOpen={isPermissionOpen}
        onClose={onPermissionClose}
        accountId={accountId}
        refetch={refetch}
      />
      {accountOwner && (
        <TransferOwnershipModal
          isOpen={isTransferOpen}
          onClose={onTransferClose}
          accountId={accountId}
          owner={accountOwner}
          refetch={() => {
            refetch();
            refetchAccountOwner();
            refetchAccounts();
          }}
        />
      )}
    </>
  );
}
