import { CloseIcon } from '@chakra-ui/icons';
import {
  ModalContent,
  ModalBody,
  ModalHeader,
  Modal,
  Text,
  Flex,
  Box,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';

interface RewardsModalInterface {
  collateralSymbol: string;
  amount: string;
}

export const RewardsModal = ({ collateralSymbol, amount, txStatus }: RewardsModalInterface) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay bg="tomato" />
      <ModalContent bg="navy.700" borderWidth="1px" borderColor="gray.900">
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
          >
            Follow the Metamask prompts to execute the following transactions.
          </Text>
          <Box px={3} py={2} borderRadius="5px" border="1px solid" borderColor="gray.900">
            {}
            <Text>
              Claiming {amount} {collateralSymbol}
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
