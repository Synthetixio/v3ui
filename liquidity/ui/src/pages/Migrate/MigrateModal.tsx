import { FC, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMachine } from '@xstate/react';

import { MigrateMachine, Events } from './MigrateMachine';

export const MigrateModal: FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({
  isOpen,
  setIsOpen,
}) => {
  const [step, send] = useMachine(MigrateMachine);

  const onClose = () => {
    setIsOpen(false);
    send({ type: Events.RESET });
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Migrate to Synthetix V3</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{step.meta.component({ onClose, step, send })}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
