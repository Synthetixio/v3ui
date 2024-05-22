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
import { useState } from 'react';
import { permissionsList } from './AccountPermissions';
import { useGrantPermission } from '@snx-v3/useGrantPermission';
import { utils } from 'ethers';

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
  const { mutateAsync, isPending } = useGrantPermission(address, accountId, selectedPermission);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent border="1px solid" rounded="base" borderColor="gray.900" bg="navy.700">
        <ModalHeader>New Permission</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider />
          <Flex flexDir="column" gap="6">
            <Text fontSize="14px" color="white" mt="6">
              Address
            </Text>
            <Input
              bg="navy.900"
              onChange={(e) => {
                setAddress(e.target.value.trim());
              }}
              value={address}
            />
            <Text color="white" fontSize="14px">
              Select Permissions
            </Text>
            <Flex justifyContent="space-evenly">
              {permissionsList.map((r) => (
                <Badge
                  onClick={() =>
                    setSelectedPermissions((state) => {
                      if (state.includes(r)) {
                        return state.filter((s) => s !== r);
                      }
                      return [...state, r];
                    })
                  }
                  variant="outline"
                  key={r}
                  color={selectedPermission.includes(r) ? 'cyan' : 'gray'}
                  textTransform="capitalize"
                  cursor="pointer"
                  bg="gray.900"
                  colorScheme={selectedPermission.includes(r) ? 'cyan' : 'gray'}
                >
                  {r}
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
                mutateAsync().then(() => {
                  setAddress('');
                  setSelectedPermissions([]);
                  refetch();
                  onClose();
                });
              }}
              isDisabled={!utils.isAddress(address) || selectedPermission.length === 0}
            >
              Add New Permission
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
