import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Td, Tooltip, Tr, Text, Button, Flex, IconButton } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { FC, useCallback, useEffect, useState } from 'react';
import { permissionsList } from './AccountPermissions';
import { useManagePermissions } from '@snx-v3/useManagePermissions';

interface Props {
  address: string;
  currentPermissions: Array<string>;
  accountId: string;
  refetch: () => void;
}

export const PermissionRow: FC<Props> = ({ address, currentPermissions, accountId, refetch }) => {
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
        <Td py="4" width="200px">
          <Text fontWeight={400} color="white" fontSize="16px">
            {prettyString(address)}{' '}
            <Tooltip closeOnClick={false}>
              <CopyIcon
                ml="2"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                }}
              />
            </Tooltip>
          </Text>
        </Td>
        <Td>
          <Flex flexWrap="wrap" gap={2}>
            {permissionsList.map((r) => (
              <Badge
                cursor="pointer"
                onClick={() => selectPermission(r)}
                colorScheme={permissions.includes(r) ? 'cyan' : 'gray'}
                variant="outline"
                bg={permissions.includes(r) ? 'cyan.900' : 'gray.900'}
                size="sm"
                textTransform="capitalize"
                mx="1"
                key={r.concat('permission-row')}
              >
                {r}
              </Badge>
            ))}
          </Flex>
        </Td>
        <Td textAlign="end">
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
      <Td py="4" width="200px">
        <Text fontWeight={400} color="white" fontSize="16px">
          {prettyString(address)}{' '}
          <Tooltip closeOnClick={false}>
            <CopyIcon
              ml="2"
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            />
          </Tooltip>
        </Text>
      </Td>
      <Td>
        {currentPermissions.map((r) => (
          <Badge
            color="cyan"
            variant="outline"
            bg="cyan.900"
            size="sm"
            textTransform="capitalize"
            mx="1"
            key={r.concat('permission-row')}
          >
            {r}
          </Badge>
        ))}
      </Td>
      <Td textAlign="end">
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
          colorScheme="gray"
          onClick={() => {}}
          size="sm"
          aria-label="delete"
          icon={<DeleteIcon />}
        />
      </Td>
    </Tr>
  );
};
