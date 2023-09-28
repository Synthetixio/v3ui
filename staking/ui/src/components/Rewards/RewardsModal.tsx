import { CloseIcon } from '@chakra-ui/icons';
import {
  ModalContent,
  ModalBody,
  ModalHeader,
  Modal,
  Text,
  Flex,
  ModalOverlay,
  CircularProgress,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { etherscanLink } from '../../../../lib/etherscanLink';
import { useNetwork } from '@snx-v3/useBlockchain';

interface RewardsModalInterface {
  collateralSymbol?: string;
  amount?: number;
  txnStatus?: string;
  txnHash: string | null;
}

export const RewardsModal = ({
  collateralSymbol,
  amount,
  txnStatus,
  txnHash,
}: RewardsModalInterface) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentNetwork = useNetwork();

  useEffect(() => {
    if (txnStatus === 'prompting') {
      setIsOpen(true);
    }
    if (txnStatus === 'error') {
      setIsOpen(false);
    }
    if (txnStatus === 'success') {
      setTimeout(() => {
        setIsOpen(false);
      }, 1200);
    }
  }, [txnStatus]);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay bg="#06061B80" />
      <ModalContent
        bg="navy.700"
        mt="10%"
        borderWidth="1px"
        borderColor="gray.900"
        maxWidth="384px"
      >
        <ModalBody p={4}>
          <Flex
            onClick={() => setIsOpen(false)}
            justifyContent="flex-end"
            border="none"
            boxShadow="none"
            _focus={{ outline: 'none' }}
          >
            <CloseIcon _hover={{ cursor: 'pointer' }} />
          </Flex>
          <ModalHeader
            pl={0}
            py={1}
            color="whiteAlpha.900"
            fontSize="20px"
            fontWeight={700}
            lineHeight="120%"
            textAlign="left"
          >
            Transaction Pending
          </ModalHeader>
          <Text
            p={3}
            pl={0}
            color="gray.600"
            fontFamily="heading"
            fontSize="12px"
            lineHeight="150%"
            mb={2}
          >
            Follow the Metamask prompts to execute the following transactions.
          </Text>
          <Flex px={3} py={3} borderRadius="5px" border="1px solid" borderColor="gray.900">
            <Flex
              justifyContent="center"
              alignItems="center"
              borderRadius="100px"
              color="gray.700"
              bg="gray.900"
              width="40px"
              height="40px"
              p={3}
            >
              <CircularProgress size="25px" isIndeterminate color="gray.700" />
            </Flex>
            <Flex
              flexDirection="column"
              alignItems="space-between"
              justifyContent="space-between"
              ml={2}
            >
              <Text fontSize="14px" fontWeight={700} lineHeight="20px" color="white">
                Claiming {amount ? amount : ''} {collateralSymbol ? collateralSymbol : ''}
              </Text>
              <Text fontSize="12px" lineHeight="16px" color="gray.500">
                Claim your rewards
              </Text>
            </Flex>
          </Flex>
          {txnHash && (
            <Flex px={3} py={3} borderRadius="5px" border="1px solid" borderColor="gray.900" mt={2}>
              <Link href={etherscanLink({ chain: currentNetwork.name, address: txnHash })}>
                View on Etherscan
              </Link>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
