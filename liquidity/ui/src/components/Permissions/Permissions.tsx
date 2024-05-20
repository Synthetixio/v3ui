import {
  Badge,
  Flex,
  Heading,
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from '@snx-v3/useParams';
import { PermissionRow } from './PermissionRow';
import { useAccountOwner, useAccountPermissions } from '../../../../lib/useAccountInfo';
import { prettyString } from '@snx-v3/format';
import { CopyIcon } from '@chakra-ui/icons';
import { NewPermissionRow } from './NewPermissionRow';

export default function Permissions() {
  const [accountPermissions, setAccountPermissions] = useState<Record<string, Array<string>>>({});

  // Only show edit icon if current account is owner or modify permissions
  const params = useParams();

  const {
    isLoading: loadingAccountPermissions,
    data: permissionData,
    refetch,
  } = useAccountPermissions(params.accountId);
  const { isLoading: loadingOwner, data: accountOwner } = useAccountOwner(params.accountId);

  useEffect(() => {
    if (permissionData && !loadingAccountPermissions) {
      setAccountPermissions(permissionData);
    }
  }, [loadingAccountPermissions, permissionData]);

  return (
    <TableContainer
      maxW="100%"
      mt={4}
      borderColor="gray.900"
      borderWidth="1px"
      borderRadius="5px"
      p={6}
      sx={{
        borderCollapse: 'separate !important',
        borderSpacing: 0,
      }}
      bg="navy.700"
    >
      <Flex mb="2">
        <Heading size="md" mb="1">
          Permissions
        </Heading>
      </Flex>
      {Boolean(accountOwner) ? (
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
                    {accountOwner && (
                      <Text fontWeight={400} color="white" fontSize="16px">
                        {prettyString(accountOwner)}{' '}
                        <Tooltip closeOnClick={false}>
                          <CopyIcon
                            ml="2"
                            onClick={() => {
                              navigator.clipboard.writeText(accountOwner);
                            }}
                          />
                        </Tooltip>
                      </Text>
                    )}
                  </Skeleton>
                </Td>
                <Td py={5} borderBottomColor="gray.900">
                  <Badge color="cyan" variant="outline">
                    Owner
                  </Badge>
                </Td>
                <Td py={5} borderBottomColor="gray.900">
                  {/* {account?.address == accountOwner && <TransferOwnership />} */}
                </Td>
              </Tr>

              {Object.keys(accountPermissions)
                .filter((target) => accountPermissions[target].length > 0)
                .map((target) => {
                  return (
                    <PermissionRow
                      key={target}
                      address={target}
                      currentPermissions={accountPermissions[target]}
                      accountId={params.accountId || ''}
                      refetch={() => refetch()}
                    />
                  );
                })}

              {params.accountId && (
                <NewPermissionRow accountId={params.accountId} refetch={() => refetch()} />
              )}
            </Tbody>
          </Table>
        </Stack>
      ) : (
        <Text>No permissions</Text>
      )}
    </TableContainer>
  );
}
