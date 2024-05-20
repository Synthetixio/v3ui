import { Badge, Button, Flex, Td, Tr } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AddressInput } from './AddressInput';
import { permissionsList } from './AccountPermissions';
import { utils } from 'ethers';
import { useAccountOwner, useAccountPermissions } from '../../../../lib/useAccountInfo';
import { useManagePermissions } from '../../../../lib/useManagePermissions/useManagePermissions';

interface Props {
  accountId: string;
  refetch: () => void;
}

export const NewPermissionRow: FC<Props> = ({ accountId, refetch }) => {
  const [address, setAddress] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const {
    mutate: submit,
    isPending,
    isSuccess,
  } = useManagePermissions({
    accountId,
    target: address,
    selected: permissions,
    existing: [],
  });
  const { data: permissionData } = useAccountPermissions(accountId);
  const { data: accountOwner } = useAccountOwner(accountId);

  useEffect(() => {
    if (isSuccess) {
      refetch();
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

  const isAddressValid = useMemo(() => {
    return (
      utils.isAddress(address) &&
      accountOwner?.toLowerCase() !== address.toLowerCase() &&
      !permissionData[address.toLowerCase()]
    );
  }, [accountOwner, address, permissionData]);

  const isFormValid = useMemo(() => {
    return permissions.length > 0 && isAddressValid;
  }, [isAddressValid, permissions.length]);

  return (
    <Tr>
      <Td py="4" width="200px">
        <AddressInput address={address} onChange={setAddress} isValidAddress={isAddressValid} />
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
        <Button onClick={() => submit()} isLoading={isPending} isDisabled={!isFormValid} size="sm">
          Save
        </Button>
      </Td>
    </Tr>
  );
};
