import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlocker } from 'react-router/dist/lib/hooks';

export const usePrompt = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');

  const confirmNavigation = () => {
    onClose();
    if (nextLocation) {
      navigate(nextLocation);
    }
  };

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      value !== '' && currentLocation.pathname !== nextLocation.pathname
  );

  return (
    <Modal isOpen={isOpen} onClose={() => setNextLocation(null)}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>hey</ModalBody>
      </ModalContent>
    </Modal>
  );
};
