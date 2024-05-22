import {
  Button,
  Divider,
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
import { prettyString } from '@snx-v3/format';
import { useTransferAccountId } from '@snx-v3/useTransferAccountId';
import { utils } from 'ethers';
import { useState } from 'react';

export function TransferOwnershipModal({
  isOpen,
  onClose,
  accountId,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
  refetch: () => void;
}) {
  const [to, setTo] = useState('');
  const { isPending, mutateAsync } = useTransferAccountId(to, accountId);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent border="1px solid" rounded="base" borderColor="gray.900" bg="navy.700">
        <ModalHeader>Transfer Ownership</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider />
          <Text fontSize="14px" fontWeight={700} mt="2">
            Account #{prettyString(accountId, 4, 4)}
          </Text>
          <Text fontSize="14px" color="white" mt="2">
            Enter the wallet address you would like to transfer this account to:
          </Text>
          <Input
            mt="2"
            bg="navy.900"
            onChange={(e) => {
              setTo(e.target.value.trim());
            }}
            value={to}
          />
        </ModalBody>
        <ModalFooter justifyContent="center">
          {isPending ? (
            <Spinner color="cyan" />
          ) : (
            <Button
              w="100%"
              onClick={() =>
                mutateAsync().then(() => {
                  setTo('');
                  refetch();
                  onClose();
                })
              }
              isDisabled={!utils.isAddress(to)}
            >
              Transfer Ownership
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
