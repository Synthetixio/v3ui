import { InfoIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Alert,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';
import { useRecoilState } from 'recoil';
import { depositState } from '../../state/deposit';
import { useState } from 'react';

export function LiquidityPositionInput({
  title,
  collateralSymbol,
  balance,
  price,
  userHasAccounts,
  currentCRatio,
  nextCRatio,
  deposited = new Wei(0),
  onButtonClick,
  depositIsLoading,
  approveIsLoading,
  requireApprove,
  completedAllSteps,
}: {
  title: string;
  collateralSymbol: string;
  balance: { deposited: Wei; wallet: Wei };
  price: Wei;
  userHasAccounts: boolean;
  currentCRatio: string;
  nextCRatio: string;
  deposited?: Wei;
  onButtonClick: (action: 'createPosition' | 'createAccount') => void;
  depositIsLoading: boolean;
  approveIsLoading: boolean;
  requireApprove: boolean;
  completedAllSteps: boolean;
}) {
  const [amountToDeposit, setAmountToDeposit] = useRecoilState(depositState);
  const [txs, setTxs] = useState<'account' | 'position' | null>(null);
  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      w="100%"
      p="6"
      gap="6"
    >
      <Heading color="gray.50" fontSize="20px">
        {title}
      </Heading>
      <Divider />
      {completedAllSteps ? (
        <Flex flexDir="column" gap="6">
          <Text color="white" fontSize="14px">
            Your position has been successfully opened, read more about it in the Synthetix V3
            Documentation.
          </Text>
          <Alert colorScheme="green" rounded="base">
            <Flex bg="green.500" p="1" rounded="full" mr="2">
              <CheckIcon w="12px" h="12px" color="green.900" />
            </Flex>
            Position successfully Opened
          </Alert>
          <Flex w="100%" p="3" bg="gray.900" flexDir="column">
            <Flex justifyContent="space-between">
              <Text color="white" fontWeight={700} fontSize="12px">
                Total {collateralSymbol}
              </Text>
              <Text color="white" fontWeight={700} fontSize="12px">
                {deposited.toNumber().toFixed(2)} &rarr;
                {deposited.add(amountToDeposit).toNumber().toFixed(2)}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="white" fontWeight={700} fontSize="12px">
                C-ratio
              </Text>
              <Text color="white" fontWeight={700} fontSize="12px">
                {currentCRatio === '0.0' ? 'N/A' : currentCRatio} &rarr; {nextCRatio}
              </Text>
            </Flex>
          </Flex>
          <Link href="/">
            <Button w="100%">Continue</Button>
          </Link>
        </Flex>
      ) : !txs ? (
        <>
          <Text fontSize="14px" color="gray.50">
            Deposit Collateral{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Text>
          <Flex
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            justifyContent="space-between"
          >
            <Flex p="2" flexDir="column" gap="1" w="100%">
              <TokenIcon symbol={collateralSymbol} />
              <Text fontSize="12px" display="flex" color="gray.500">
                <Tooltip
                  label={
                    <>
                      <Text>Account Available: {balance.deposited.toNumber().toFixed(2)}</Text>
                      <Text>Wallet Balance: {balance.wallet.toNumber().toFixed(2)}</Text>
                    </>
                  }
                >
                  Balance:&nbsp;
                </Tooltip>
                {balance.deposited.add(balance.wallet).toNumber().toFixed(2)}
                <Text
                  color="cyan.500"
                  fontSize="12px"
                  fontWeight={700}
                  ml="2"
                  cursor="pointer"
                  onClick={() => {
                    const sumedUp = balance.deposited.add(balance.wallet);
                    setAmountToDeposit(sumedUp);
                    const node = document.getElementById('input-deposit') as HTMLInputElement;
                    node.value = sumedUp.toNumber().toFixed(2);
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
                placeholder="00.00"
                textAlign="end"
                fontSize="24px"
                color="white"
                type="number"
                overflow="scroll"
                fontWeight={700}
                onChange={(e) => {
                  setAmountToDeposit(
                    new Wei(e.target.value ? e.target.value : 0, balance.deposited.p)
                  );
                }}
              />
              <Text fontSize="12px" color="gray.500">
                ${amountToDeposit.mul(price).toNumber().toFixed(2)}
              </Text>
            </Flex>
          </Flex>
          {!amountToDeposit.eq(0) && (
            <>
              <Alert colorScheme="blue" rounded="base">
                <Flex alignItems="center" gap="3">
                  <InfoIcon w="20px" h="20px" color="cyan.500" />
                  <Text color="white" fontSize="16px">
                    This action will incur timeout for withdrawing collateral
                  </Text>
                </Flex>
              </Alert>
              <Flex w="100%" p="3" bg="gray.900" flexDir="column">
                <Flex justifyContent="space-between">
                  <Text color="white" fontWeight={700} fontSize="12px">
                    Total {collateralSymbol}
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="12px">
                    {deposited.toNumber().toFixed(2)} &rarr;
                    {deposited.add(amountToDeposit).toNumber().toFixed(2)}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text color="white" fontWeight={700} fontSize="12px">
                    C-ratio
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="12px">
                    {currentCRatio === '0.0' ? 'N/A' : currentCRatio} &rarr; {nextCRatio}
                  </Text>
                </Flex>
              </Flex>
            </>
          )}
          <Button
            isDisabled={amountToDeposit.eq(0)}
            onClick={() => {
              if (userHasAccounts) setTxs('position');
              else setTxs('account');
            }}
          >
            {amountToDeposit.eq(0)
              ? 'Enter Amount'
              : userHasAccounts
                ? 'Create Liquidity Position'
                : 'Create Account 1/2'}
          </Button>
        </>
      ) : txs === 'position' ? (
        <>
          <Flex flexDir="column" gap="6">
            <Flex
              bg="rgba(0,0,0,0.3)"
              border="1px solid"
              borderColor={requireApprove ? 'gray.900' : 'green.500'}
              rounded="base"
              px="3"
              py="4"
              gap="2"
              alignItems="center"
            >
              <Flex
                rounded="50%"
                minW="40px"
                minH="40px"
                bg={requireApprove ? 'gray.900' : 'green.500'}
                justifyContent="center"
                alignItems="center"
                fontWeight={700}
                color="white"
              >
                {approveIsLoading ? <Spinner colorScheme="cyan" /> : 1}
              </Flex>
              <Flex flexDir="column">
                <Text color="white" fontWeight={700}>
                  Approve {collateralSymbol} transfer
                </Text>
                <Text fontSize="12px" color="gray.500">
                  You must approve your {collateralSymbol} transfer before depositing.
                </Text>
              </Flex>
            </Flex>
            <Flex
              bg="rgba(0,0,0,0.3)"
              border="1px solid"
              borderColor="gray.900"
              rounded="base"
              px="3"
              py="4"
              gap="2"
              alignItems="center"
            >
              <Flex
                rounded="50%"
                minW="40px"
                minH="40px"
                bg="gray.900"
                justifyContent="center"
                alignItems="center"
                fontWeight={700}
                color="white"
              >
                {depositIsLoading ? <Spinner colorScheme="cyan" /> : 2}
              </Flex>
              <Flex flexDir="column">
                <Text color="white" fontWeight={700}>
                  Delegate {collateralSymbol}
                </Text>
                <Text fontSize="12px" color="gray.500">
                  This step will transfer your {collateralSymbol} to Synthetix as well as delegating
                  to the selected Pool.
                </Text>
              </Flex>
            </Flex>
            <Button
              onClick={() => {
                onButtonClick('createPosition');
              }}
            >
              Execute Transactions
            </Button>
          </Flex>
        </>
      ) : (
        <>TODO</>
      )}
    </Flex>
  );
}
