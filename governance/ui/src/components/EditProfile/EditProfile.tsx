import { Flex, Hide, Modal, ModalContent, ModalOverlay, Show } from '@chakra-ui/react';
import { UserProfileForm } from '../UserProfileForm';

export default function EditProfile({
  activeCouncil,
  onClose,
}: {
  activeCouncil: string;
  onClose: () => void;
}) {
  return (
    <>
      <Show below="md">
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Flex
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.900"
              rounded="base"
              w="100%"
              bg="navy.700"
            >
              <UserProfileForm activeCouncil={activeCouncil} />
            </Flex>
          </ModalContent>
        </Modal>
      </Show>
      <Hide below="md">
        <Flex
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.900"
          rounded="base"
          w="100%"
          bg="navy.700"
        >
          <UserProfileForm activeCouncil={activeCouncil} />
        </Flex>
      </Hide>
    </>
  );
}
