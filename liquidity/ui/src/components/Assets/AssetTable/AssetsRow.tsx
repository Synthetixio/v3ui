import {
  Flex,
  Td,
  Tr,
  Text,
  Button,
  Fade,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Divider,
  Input,
} from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';
import { formatNumberToUsd, formatNumber } from '@snx-v3/formatters';
import Wei from '@synthetixio/wei';
import { useState } from 'react';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { useWithdrawBaseAndromeda } from '@snx-v3/useWithdrawBaseAndromeda';

interface AssetsRowProps {
  token: string;
  name: string;
  walletBalance: number;
  walletBalance$: number;
  accountBalance: Wei;
  accountBalance$: number;
  delegatedBalance: number;
  delegatedBalance$: number;
  unlockDate?: Date;
  price: Wei;
  usdcCollateral: Wei;
  snxUSDCollateral: Wei;
  accountId?: string;
  isBase: boolean;
  collateralAddress: string;
  final: boolean; // Used for hiding bottom border
}

export const AssetsRow = ({
  token,
  name,
  walletBalance,
  walletBalance$,
  accountBalance,
  accountBalance$,
  delegatedBalance,
  delegatedBalance$,
  price,
  accountId,
  collateralAddress,
  isBase,
  usdcCollateral,
  snxUSDCollateral,
  unlockDate = new Date(),
  final,
}: AssetsRowProps) => {
  const [amount, setAmount] = useState(new Wei(0));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canWithdraw = !unlockDate.getTime() < new Date().getTime();
  const hoursToWithdraw = canWithdraw
    ? ''
    : new Date(unlockDate.getDate() - new Date().getTime()).getHours();

  const withdrawMain = useWithdraw({
    accountId,
    amount,
    collateralTypeAddress: collateralAddress,
  });

  const withdrawAndromeda = useWithdrawBaseAndromeda({
    accountId,
    snxUSDCollateral,
    usdcCollateral,
  });

  const withdraw = () => {
    if (isBase) {
      withdrawMain.mutation.mutate();
    } else {
      withdrawAndromeda.mutation.mutate();
    }
  };
  return (
    <Tr borderBottomWidth={final ? 'none' : '1px'}>
      <Td border="none">
        <Fade in>
          <Flex alignItems="center">
            <TokenIcon symbol={token} />
            <Flex flexDirection="column" ml={3}>
              <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                {token}
              </Text>
              <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
                {name}
              </Text>
            </Flex>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text
              color="white"
              fontWeight={700}
              lineHeight="1.25rem"
              fontFamily="heading"
              data-cy="asset-list-wallet-balance"
            >
              {formatNumberToUsd(walletBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(walletBalance)}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text
              color="white"
              fontWeight={700}
              lineHeight="1.25rem"
              fontFamily="heading"
              data-cy="asset-list-account-balance"
            >
              {formatNumberToUsd(accountBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(accountBalance.toNumber())}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text
              color="white"
              fontWeight={700}
              lineHeight="1.25rem"
              fontFamily="heading"
              data-cy="asset-list-delegated-balance"
            >
              {formatNumberToUsd(delegatedBalance$)}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {formatNumber(delegatedBalance)}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Tooltip label={!canWithdraw ? `Withdraw available in ${hoursToWithdraw} hours` : ''}>
            <Button
              isDisabled={!canWithdraw}
              variant="unstyled"
              fontSize="0.75rem"
              lineHeight="1rem"
              height="1.75rem"
              w="100%"
              fontWeight={700}
              borderWidth="1px"
              borderColor="gray.900"
              borderRadius="4px"
              _hover={{ bg: 'gray.900' }}
              onClick={onOpen}
            >
              Withdraw
              <Modal
                isOpen={isOpen}
                onClose={() => {
                  setAmount(new Wei(0));
                  onClose();
                }}
              >
                <ModalOverlay />
                <ModalContent
                  bg="navy.700"
                  border="1px solid"
                  rounded="base"
                  borderColor="gray.900"
                >
                  <ModalHeader>Withdraw Assets</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex flexDir="column" gap="2">
                      <Divider />
                      <Text fontWeight={700} fontSize="14px">
                        Withdraw Assets
                      </Text>
                      <Flex
                        border="1px solid"
                        borderColor="gray.900"
                        rounded="base"
                        justifyContent="space-between"
                        bg="navy.900"
                      >
                        <Flex p="2" flexDir="column" gap="1" w="100%">
                          <TokenIcon symbol={token} />
                          <Text
                            fontSize="12px"
                            display="flex"
                            color="gray.500"
                            data-cy="manage-input-balance-max-button"
                          >
                            Account Available :&nbsp;
                            {accountBalance.toNumber().toFixed(2)}
                            <Text
                              data-cy="withdraw-modal-max-button"
                              color="cyan.500"
                              fontSize="12px"
                              fontWeight={700}
                              ml="2"
                              cursor="pointer"
                              onClick={() => {
                                setAmount(accountBalance);
                                const node = document.getElementById(
                                  'input-deposit'
                                ) as HTMLInputElement;
                                node.value = accountBalance.toNumber().toFixed(2);
                              }}
                            >
                              Max
                            </Text>
                          </Text>
                        </Flex>
                        <Flex p="2" flexDir="column" alignItems="end" justifyContent="end">
                          <Input
                            id="input-deposit"
                            variant="unstyled"
                            placeholder="0.00"
                            textAlign="end"
                            fontSize="24px"
                            color="white"
                            type="number"
                            overflow="scroll"
                            fontWeight={700}
                            data-cy="manage-input"
                            onChange={(e) => {
                              setAmount(new Wei(e.target.value ? e.target.value : 0, amount.p));
                            }}
                          />
                          <Text fontSize="12px" color="gray.500">
                            $
                            {amount
                              .mul(price)
                              .toNumber()
                              .toLocaleString('en-US', { maximumFractionDigits: 2 })}
                          </Text>
                        </Flex>
                      </Flex>
                      <Button
                        isDisabled={amount.eq(0)}
                        mb="2"
                        onClick={() => {
                          withdraw();
                        }}
                      >
                        {amount.eq(0) ? 'Enter Amount' : 'Withdraw'}
                      </Button>
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Button>
          </Tooltip>
        </Fade>
      </Td>
    </Tr>
  );
};
