import {
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useWallet } from '@snx-v3/useBlockchain';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { SNXUSDBalanceOfBuyBackContract } from '../hooks/SNXUSDBalanceOfBuyBackContract';
import { useApprove } from '@snx-v3/useApprove';
import Wei from '@synthetixio/wei';
import { useState } from 'react';
import { useSellSNX } from '../mutations/useSellSNX';
import { useBurnEvents } from '../hooks/useBurnEvents';
import { useSNXPrice } from '../hooks/useSNXPrice';

export function BurnSNXModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(new Wei(0));
  const [receivingUSDCAmount, setReceivingUSDCAmount] = useState(0);
  const { data: events } = useBurnEvents();
  const { connect, activeWallet } = useWallet();
  const { data: SNXPrice } = useSNXPrice();

  const { data: snxBalance } = useTokenBalance('0x22e6966B799c4D5B13BE962E1D117b56327FDa66');
  const { data: usdcBalance } = useTokenBalance('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');
  const { data: contractBalance } = SNXUSDBalanceOfBuyBackContract(
    '0x632cAa10A56343C5e6C0c066735840c096291B18'
  );

  const { requireApproval, approve, refetchAllowance } = useApprove({
    contractAddress: '0x22e6966B799c4D5B13BE962E1D117b56327FDa66',
    amount: amount.toBN(),
    spender: '0x632cAa10A56343C5e6C0c066735840c096291B18',
  });
  const { mutateAsync, isPending } = useSellSNX();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="navy.700" border="1px solid" borderColor="gray.900" rounded="base">
        <ModalHeader color="white">
          Burn your SNX
          <Divider mt="2" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="4">
            <Text fontWeight={700} color="white">
              Burn
            </Text>
            <Flex border="1px solid" borderColor="gray.900" rounded="base" flexDir="column" p="4">
              <Flex justifyContent="space-between" w="100%">
                <Flex
                  alignItems="center"
                  border="1px solid"
                  borderColor="gray.900"
                  p="2"
                  rounded="base"
                  justifyContent="center"
                  w="90px"
                  gap="2"
                >
                  <Image src="/snx-input.svg" />
                  <Text fontWeight={700} fontSize="16px">
                    SNX
                  </Text>
                </Flex>
                <Input
                  variant="unstyled"
                  placeholder="0.00"
                  textAlign="end"
                  fontSize="24px"
                  color="white"
                  type="number"
                  overflow="scroll"
                  fontWeight={700}
                  value={amount.toNumber()}
                  onChange={(e) => {
                    try {
                      if (SNXPrice) {
                        const snxAmount = new Wei(e.target.value);
                        setAmount(snxAmount);
                        setReceivingUSDCAmount(
                          snxAmount.mul(SNXPrice).add(SNXPrice.mul(0.01)).toNumber()
                        );
                      }
                    } catch (error) {
                      console.error('failed to parse input: ', Error);
                      setAmount(new Wei(0));
                    }
                  }}
                />
              </Flex>
              <Flex w="100%" justifyContent="space-between">
                <Text
                  color="gray.500"
                  fontSize="12px"
                  mt="2"
                  cursor="pointer"
                  onClick={() => {
                    if (SNXPrice && snxBalance) {
                      setAmount(snxBalance);
                      setReceivingUSDCAmount(
                        snxBalance.mul(SNXPrice).add(SNXPrice.mul(0.01)).toNumber()
                      );
                    }
                  }}
                >
                  Balance: {snxBalance ? snxBalance.toNumber().toFixed(2) : '-'}
                </Text>
                <Text color="gray.500" fontSize="12px" mt="2">
                  $
                </Text>
              </Flex>
              <Text color="gray.500" fontSize="12px">
                max burnable:{' '}
                {contractBalance &&
                  events?.SNXPrice &&
                  (
                    new Wei(contractBalance, 18).toNumber() /
                    (events.SNXPrice + events.SNXPrice * 0.01)
                  ).toFixed(2)}
              </Text>
            </Flex>
            <Text fontWeight={700}>Receive</Text>
            <Flex border="1px solid" borderColor="gray.900" rounded="base" flexDir="column" p="4">
              <Flex justifyContent="space-between" w="100%">
                <Flex
                  alignItems="center"
                  border="1px solid"
                  borderColor="gray.900"
                  p="2"
                  rounded="base"
                  justifyContent="center"
                  w="120px"
                  gap="2"
                >
                  <Image src="/usdc.svg" />
                  <Text fontWeight={700} fontSize="16px">
                    USDC
                  </Text>
                </Flex>
                <Input
                  variant="unstyled"
                  placeholder="0.00"
                  textAlign="end"
                  fontSize="24px"
                  color="white"
                  type="number"
                  isDisabled={true}
                  overflow="scroll"
                  fontWeight={700}
                  _disabled={{ color: 'white' }}
                  value={receivingUSDCAmount}
                />
              </Flex>
              <Flex w="100%" justifyContent="space-between" gap="2">
                <Text color="gray.500" fontSize="12px" mt="2">
                  Balance: {usdcBalance ? usdcBalance.toNumber().toFixed(2) : '-'}
                </Text>
              </Flex>
            </Flex>
            <Button
              my="4"
              onClick={async () => {
                if (activeWallet?.address) {
                  if (requireApproval) {
                    await approve(false);
                    await refetchAllowance();
                  }
                  await mutateAsync(amount);
                  onClose();
                } else {
                  onClose();
                  connect();
                }
              }}
            >
              {isPending ? (
                <Spinner colorScheme="black" />
              ) : activeWallet?.address ? (
                requireApproval ? (
                  'Approve SNX'
                ) : (
                  'Burn SNX'
                )
              ) : (
                'Connect Wallet'
              )}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
