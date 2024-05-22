import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Td, Tr, Text, Button, Flex, IconButton } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { permissionsList } from './AccountPermissions';
import { useManagePermissions } from '@snx-v3/useManagePermissions';
import { Address } from '../Address';

interface Props {
  address: string;
  currentPermissions: Array<string>;
  accountId: string;
  refetch: () => void;
  isOwner: boolean;
}

export const PermissionRow: FC<Props> = ({
  address,
  currentPermissions,
  accountId,
  refetch,
  isOwner,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([...currentPermissions]);

  const {
    mutate: submit,
    isPending,
    isSuccess,
  } = useManagePermissions({
    accountId,
    target: address,
    selected: permissions,
    existing: currentPermissions,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setIsEdit(false);
    }
  }, [isSuccess, refetch]);

  const selectPermission = useCallback(
    (permission: string) => {
      const index = permissions.findIndex((p) => p === permission);
      if (index < 0) {
        setPermissions([...permissions, permission]);
      } else {
        const list = [...permissions];
        list.splice(index, 1);
        setPermissions(list);
      }
    },
    [permissions]
  );

  if (isEdit) {
    return (
      <Tr>
        <Td borderBottomColor="gray.900" py="4" width="200px">
          <Text fontWeight={400} color="white" fontSize="16px">
            <Address address={address} />
          </Text>
        </Td>
        <Td borderBottomColor="gray.900">
          <Flex py={2} flexWrap="wrap" gap={3}>
            {permissionsList.map((permission) => (
              <Badge
                cursor="pointer"
                onClick={() => selectPermission(permission)}
                colorScheme={permissions.includes(permission) ? 'cyan' : 'gray'}
                color={permissions.includes(permission) ? 'cyan' : 'gray'}
                variant="outline"
                bg={permissions.includes(permission) ? 'cyan.900' : 'gray.900'}
                size="md"
                textTransform="capitalize"
                key={permission.concat('permission-row')}
              >
                {permission}
              </Badge>
            ))}
          </Flex>
        </Td>
        <Td borderBottomColor="gray.900" textAlign="end">
          <Button
            onClick={() => submit()}
            isLoading={isPending}
            size="xs"
            variant="outline"
            colorScheme="gray"
            color="white"
            mr="2"
          >
            Save
          </Button>
          <Button
            onClick={() => setIsEdit(false)}
            size="xs"
            variant="outline"
            colorScheme="gray"
            color="white"
          >
            Cancel
          </Button>
        </Td>
      </Tr>
    );
  }

  return (
    <Tr>
      <Td borderBottomColor="gray.900" py="4" width="200px">
        <Text fontWeight={400} color="white" fontSize="16px">
          <Address address={address} />
        </Text>
      </Td>
      <Td borderBottomColor="gray.900">
        <Flex py={2} flexWrap="wrap" gap={3}>
          {currentPermissions.map((r) => (
            <Badge
              color="cyan"
              variant="outline"
              bg="cyan.900"
              size="sm"
              textTransform="capitalize"
              key={r.concat('permission-row')}
            >
              {r}
            </Badge>
          ))}
        </Flex>
      </Td>
      <Td borderBottomColor="gray.900" textAlign="end">
        {isOwner && (
          <>
            <IconButton
              onClick={() => {
                setPermissions([...currentPermissions]);
                setIsEdit(true);
              }}
              size="sm"
              aria-label="edit"
              variant="outline"
              colorScheme="gray"
              icon={<EditIcon />}
              mr="2"
            />
            <IconButton
              variant="outline"
              isLoading={isPending}
              colorScheme="gray"
              onClick={() => {
                setPermissions([]);
                submit();
              }}
              size="sm"
              aria-label="delete"
              icon={<DeleteIcon />}
            />
          </>
        )}
      </Td>
    </Tr>
  );
};
