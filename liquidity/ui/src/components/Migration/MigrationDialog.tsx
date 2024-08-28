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
import { useQueryClient } from '@tanstack/react-query';
interface Props {
  network: Network;
  onClose: () => void;
  onSuccess: () => void;
  isOpen: boolean;
}

export const MigrationDialog: FC<Props> = ({ network, onClose, isOpen, onSuccess }) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
    }
  }, [isOpen]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent mt="100px" borderWidth="1px" borderColor="gray.900" bg="navy.900" color="white">
        <Flex justifyContent="space-between" p={6} alignItems="center">
          <Heading fontSize="20px">Migrate to Synthetix V3</Heading>
          <CloseButton onClick={onClose} color="gray" />
        </Flex>
        <Flex width="100%" px={6}>
          <Divider borderColor="gray.900" mb={6} colorScheme="gray" />
        </Flex>
        <ModalBody pt={0} pb={6}>
          {step === 0 && <StepIntro onConfirm={() => setStep(1)} onClose={onClose} />}
          {step === 1 && <StepExplain onConfirm={() => setStep(2)} onClose={() => setStep(0)} />}
          {step === 2 && (
            <StepSummary
              onConfirm={() => {
                queryClient.invalidateQueries({
                  queryKey: [`${network?.id}-${network?.preset}`, 'V2Position'],
                });

                onSuccess();
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
