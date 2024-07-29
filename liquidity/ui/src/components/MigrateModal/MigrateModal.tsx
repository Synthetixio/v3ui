import { FC } from 'react';
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

  const StepComponent = (Object.values(step.meta)[0] as any).component;

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="navy.900" borderColor="yellow" color="white">
        <ModalHeader>Migrate to Synthetix V3</ModalHeader>
        <ModalCloseButton color="gray" />
        <ModalBody>
          {StepComponent && <StepComponent onClose={onClose} step={step} send={send} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
