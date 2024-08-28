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
import { StepIntro } from './StepIntro';
import { ZEROWEI } from '../../utils/constants';
import { MigrateUSDTransaction } from './MigrateUSDTransaction';
import { Network } from '@snx-v3/useBlockchain';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  network: Network;
}

export const MigrateUSDModal: FC<Props> = ({ onClose, isOpen, network }) => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(ZEROWEI);

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
          <Heading fontSize="20px">Convert your sUSD to V3</Heading>
          <CloseButton onClick={onClose} color="gray" />
        </Flex>
        <Flex width="100%" px={6}>
          <Divider colorScheme="gray" />
        </Flex>
        <ModalBody p={6} pt={2}>
          {step === 0 && (
            <StepIntro
              amount={amount}
              setAmount={setAmount}
              onClose={onClose}
              onConfirm={() => setStep(1)}
              network={network}
            />
          )}
          {step === 1 && (
            <MigrateUSDTransaction
              network={network}
              onClose={() => onClose()}
              onBack={() => setStep(0)}
              amount={amount}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
