import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  CircularProgress,
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { etherscanLink } from '@snx-v3/etherscanLink';
import { useNetwork } from '@snx-v3/useBlockchain';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';
import { wei } from '@synthetixio/wei';
import { useEffect, useState } from 'react';

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

  const { network } = useNetwork();

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
        minWidth="384px"
      >
        <ModalBody p={6}>
          <Text color="gray.50" fontSize="20px" fontWeight={700}>
            Claiming Rewards
          </Text>

          <Divider my={4} />

          <Flex
            position="relative"
            alignItems="center"
            gap={4}
            mb={6}
            rounded="lg"
            mt="6"
            p="4"
            border="2px solid"
            transitionProperty="border-color"
            transitionDuration="normal"
            borderColor={txnStatus === 'success' ? 'green.500' : 'gray.900'}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              borderRadius="100px"
              bg={txnStatus === 'success' ? 'green.600' : 'gray.900'}
              width="40px"
              height="40px"
              p={3}
            >
              {txnStatus === 'success' ? (
                <CheckIcon color="white" />
              ) : (
                <CircularProgress size="25px" isIndeterminate color="gray.700" />
              )}
            </Flex>
            <Flex
              flexDirection="column"
              alignItems="space-between"
              justifyContent="space-between"
              ml={2}
            >
              <Text fontSize="14px" fontWeight={700} lineHeight="20px" color="white">
                <Amount
                  value={wei(amount)}
                  prefix="Claiming "
                  suffix={collateralSymbol ? ` ${collateralSymbol}` : undefined}
                />
              </Text>
              <Text fontSize="12px" lineHeight="16px" color="gray.500">
                Claim your rewards
              </Text>
            </Flex>
          </Flex>
          <WithdrawIncrease />
          {txnStatus === 'success' && (
            <Button
              mt={5}
              variant="solid"
              justifyContent="center"
              px={3}
              py={3}
              width="100%"
              textAlign="center"
            >
              Done
            </Button>
          )}
          {txnHash && (
            <Flex
              justifyContent="center"
              px={3}
              py={3}
              mt={6}
              mb={1}
              borderTop="1px solid"
              borderTopColor="gray.900"
            >
              <Link
                variant="outline"
                href={etherscanLink({ chain: network?.name || '', address: txnHash, isTx: true })}
                fontFamily="heading"
                color="cyan.500"
                fontWeight={700}
                lineHeight="20px"
                fontSize="14px"
                target="_blank"
                mt={3}
              >
                View Transaction
              </Link>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
