import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Td, Tr, Text, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useManagePermissions } from '@snx-v3/useManagePermissions';
import { Address } from '../Address';
import { PermissionModal } from './PermissionModal';
import { permissionsList } from './AccountPermissions';

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
  const {
    isOpen: isPermissionOpen,
    onClose: onPermissionClose,
    onOpen: onPermissionOpen,
  } = useDisclosure();

  const {
    mutate: removePermissions,
    isPending,
    isSuccess,
  } = useManagePermissions({
    accountId,
    target: address,
    selected: [],
    existing: currentPermissions,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      onPermissionClose();
    }
  }, [isSuccess, onPermissionClose, refetch]);

  return (
    <Tr>
      <Td width={240} borderBottomColor="gray.900" py="4">
        <Text fontWeight={400} color="white" fontSize="16px">
          <Address address={address} />
        </Text>
      </Td>
      <Td borderBottomColor="gray.900">
        <Flex py={2} flexWrap="wrap" gap={3}>
          {permissionsList.map((permission) => {
            const isActive =
              currentPermissions.includes(permission) || currentPermissions.includes('ADMIN');
            return (
              <Badge
                color={isActive ? 'cyan' : 'gray'}
                colorScheme={isActive ? 'cyan' : 'gray'}
                variant="outline"
                bg={isActive ? 'cyan.900' : 'gray.900'}
                size="sm"
                textTransform="capitalize"
                key={permission.concat('permission-row')}
              >
                {permission}
              </Badge>
            );
          })}
        </Flex>
      </Td>

      <Td borderBottomColor="gray.900" textAlign="end">
        {isOwner && (
          <>
            <PermissionModal
              isOpen={isPermissionOpen}
              onClose={onPermissionClose}
              accountId={accountId}
              refetch={refetch}
              existingPermissions={currentPermissions}
              target={address}
            />
            <IconButton
              onClick={onPermissionOpen}
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
                removePermissions();
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
