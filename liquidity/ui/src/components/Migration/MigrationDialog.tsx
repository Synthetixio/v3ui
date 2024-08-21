import {
  CloseButton,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { Network } from '@snx-v3/useBlockchain';
import { StepIntro } from './StepIntro';
import { StepExplain } from './StepExplain';
import { StepSummary } from './StepSummary';

interface Props {
  network: Network;
  onClose: () => void;
  isOpen: boolean;
}

export const MigrationDialog: FC<Props> = ({ network, onClose, isOpen }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
    }
  }, [isOpen]);
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="navy.900" color="white">
        <Flex justifyContent="space-between" p={6} alignItems="center">
          <Heading fontSize="20px">Migrate to Synthetix V3</Heading>
          <CloseButton onClick={onClose} color="gray" />
        </Flex>
        <Flex width="100%" px={6}>
          <Divider mb={4} colorScheme="gray" />
        </Flex>
        <ModalBody>
          {step === 0 && <StepIntro onConfirm={() => setStep(1)} onClose={onClose} />}
          {step === 1 && <StepExplain onConfirm={() => setStep(2)} onClose={() => setStep(0)} />}
          {step === 2 && (
            <StepSummary
              onConfirm={() => {
                //open sUSD migration dialog
                onClose();
              }}
              onClose={onClose}
              network={network}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
