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

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export const TeleporterModal: FC<Props> = ({ onClose, isOpen }) => {
  const [_step, setStep] = useState(0);
  // const [amount, setAmount] = useState(ZEROWEI);

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
          <Heading fontSize="20px">Convert your sUSD to V3</Heading>
          <CloseButton onClick={onClose} color="gray" />
        </Flex>
        <Flex width="100%" px={6}>
          <Divider mb={4} colorScheme="gray" />
        </Flex>
        <ModalBody>
          {/* {step === 1 && (
            <TeleporterTransactions  onClose={() => setStep(0)} />
          )} */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
