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
import { FC, useCallback, useEffect, useState } from 'react';
import { StepIntro } from './StepIntro';
import { ZEROWEI } from '../../utils/constants';
import { MigrateUSDTransaction } from './MigrateUSDTransaction';
import { Network } from '@snx-v3/useBlockchain';
import { StepSuccessFinal } from '../Migration/StepSuccessFinal';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  network: Network;
  type: 'migration' | 'convert';
  accountId?: string;
}

export const MigrateUSDModal: FC<Props> = ({ onClose, isOpen, network, type, accountId }) => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(ZEROWEI);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setAmount(ZEROWEI);
    }
  }, [isOpen]);

  const handleConfirm = useCallback(() => {
    if (accountId) {
      const queryParams = new URLSearchParams(location.search);

      queryParams.set('accountId', accountId);

      navigate(
        {
          pathname: generatePath('/dashboard'),
          search: queryParams.toString(),
        },
        { replace: true }
      );
    }
    onClose();
  }, [accountId, location.search, navigate, onClose]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent mt="100px" borderWidth="1px" borderColor="gray.900" bg="navy.900" color="white">
        <Flex justifyContent="space-between" p={6} alignItems="center">
          <Heading fontSize="20px">
            {step === 2 ? 'Migration successful' : 'Convert your sUSD to V3'}
          </Heading>
          <CloseButton onClick={onClose} color="gray" />
        </Flex>
        <Flex width="100%" px={6}>
          <Divider colorScheme="gray" />
        </Flex>
        <ModalBody p={6} pt={2}>
          {isOpen && (
            <>
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
                  onSuccess={() => {
                    if (type === 'migration') {
                      setStep(2);
                    } else {
                      onClose();
                    }
                  }}
                  onBack={() => setStep(0)}
                  amount={amount}
                />
              )}
              {step === 2 && <StepSuccessFinal network={network} onConfirm={handleConfirm} />}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
