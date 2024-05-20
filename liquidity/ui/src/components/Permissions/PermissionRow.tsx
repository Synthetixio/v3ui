import { CopyIcon } from '@chakra-ui/icons';
import { Badge, Td, Tooltip, Tr, Text, Button, Flex } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { FC, useCallback, useEffect, useState } from 'react';
import { permissionsList } from './AccountPermissions';
import { useManagePermissions } from '../../../../lib/useManagePermissions/useManagePermissions';

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
                onClick={() => selectPermission(r)}
                variant="outline"
                key={r}
                color={permissions.includes(r) ? 'cyan' : 'gray'}
                textTransform="capitalize"
                cursor="pointer"
              >
                {r}
              </Badge>
            ))}
          </Flex>
        </Td>
        <Td>
          <Button onClick={() => submit()} isLoading={isPending} size="sm">
            save
          </Button>
          <Button onClick={() => setIsEdit(false)} size="sm">
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
            key={r}
            size="sm"
            mr="1"
            my="1"
            color="cyan"
            variant="outline"
            textTransform="capitalize"
          >
            {r}
          </Badge>
        ))}
      </Td>
      <Td>
        <Button
          onClick={() => {
            setPermissions([...currentPermissions]);
            setIsEdit(true);
          }}
          size="sm"
        >
          Edit
        </Button>
      </Td>
    </Tr>
  );
};
