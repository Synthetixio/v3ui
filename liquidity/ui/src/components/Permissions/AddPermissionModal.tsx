import {
  Badge,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { permissionsList } from './AccountPermissions';
import { utils } from 'ethers';
import { useManagePermissions } from '@snx-v3/useManagePermissions';
import { useAccountOwner, useAccountPermissions } from '@snx-v3/useAccountPermissions';

export function AddPermissionModal({
  accountId,
  isOpen,
  onClose,
  refetch,
}: {
  accountId: string;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const [address, setAddress] = useState('');
  const [selectedPermission, setSelectedPermissions] = useState<string[]>([]);
  const { mutateAsync: submit, isPending } = useManagePermissions({
    target: address,
    accountId,
    existing: [],
    selected: selectedPermission,
  });

  const { data: permissionData } = useAccountPermissions(accountId);
  const { data: accountOwner } = useAccountOwner(accountId);

  const isAddressValid = useMemo(() => {
    return (
      utils.isAddress(address) &&
      accountOwner?.toLowerCase() !== address.toLowerCase() &&
      permissionData &&
      !permissionData[address.toLowerCase()]
    );
  }, [accountOwner, address, permissionData]);

  const isFormValid = useMemo(() => {
    return selectedPermission.length > 0 && isAddressValid;
  }, [isAddressValid, selectedPermission.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={2} border="1px solid" rounded="base" borderColor="gray.900" bg="navy.700">
        <ModalHeader>New Permission</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider />
          <Flex flexDir="column" gap="5">
            <Text fontSize="14px" color="white" mt="6">
              Address
            </Text>
            <Input
              bg="navy.900"
              onChange={(e) => {
                setAddress(e.target.value.trim());
              }}
              value={address}
              isInvalid={!isAddressValid && !!address}
            />
            <Text color="white" fontSize="14px">
              Select Permissions
            </Text>
            <Flex justifyContent="space-evenly">
              {permissionsList.map((permission) => (
                <Badge
                  onClick={() =>
                    setSelectedPermissions((state) => {
                      if (state.includes(permission)) {
                        return state.filter((s) => s !== permission);
                      }
                      return [...state, permission];
                    })
                  }
                  variant="outline"
                  key={permission}
                  color={selectedPermission.includes(permission) ? 'cyan' : 'gray'}
                  textTransform="capitalize"
                  cursor="pointer"
                  bg="gray.900"
                  colorScheme={selectedPermission.includes(permission) ? 'cyan' : 'gray'}
                >
                  {permission}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="center">
          {isPending ? (
            <Spinner color="cyan" />
          ) : (
            <Button
              w="100%"
              onClick={() => {
                submit().then(() => {
                  setAddress('');
                  setSelectedPermissions([]);
                  refetch();
                  onClose();
                });
              }}
              isDisabled={!isFormValid}
            >
              Add New Permission
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
