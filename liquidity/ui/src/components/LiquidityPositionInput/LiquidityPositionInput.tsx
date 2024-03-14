import { InfoIcon } from '@chakra-ui/icons';
import { Button, Divider, Flex, Heading, Input, Text, Tooltip } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';
import { useState } from 'react';

export function LiquidityPositionInput({
  title,
  collateralSymbol,
  balance,
  price,
  userHasAccounts,
}: {
  title: string;
  collateralSymbol: string;
  balance: { deposited: Wei; wallet: Wei };
  price: Wei;
  userHasAccounts: boolean;
}) {
  const [balanceToDeposit, setBalanceToDeposit] = useState(new Wei(0));
  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      w="100%"
      maxW="400px"
      p="6"
      gap="6"
    >
      <Heading color="gray.50" fontSize="20px">
        {title}
      </Heading>
      <Divider />
      <Text fontSize="14px" color="gray.50">
        Deposit Collateral{' '}
        <Tooltip label="TODO" p="3">
          <InfoIcon w="12px" h="12px" />
        </Tooltip>
      </Text>
      <Flex border="1px solid" borderColor="gray.900" rounded="base" justifyContent="space-between">
        <Flex p="2" flexDir="column" gap="1" w="100%">
          <TokenIcon symbol={collateralSymbol} />
          <Text fontSize="12px" display="flex" color="gray.500">
            Balance: {balance.deposited.add(balance.wallet).toNumber().toFixed(2)}{' '}
            <Text
              color="cyan.500"
              fontSize="12px"
              fontWeight={700}
              ml="2"
              cursor="pointer"
              onClick={() => {
                const node = document.getElementById('input-deposit') as HTMLInputElement;
                node.value = balance.deposited.add(balance.wallet).toNumber().toFixed(2);
                setBalanceToDeposit(balance.deposited.add(balance.wallet));
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
              setBalanceToDeposit(
                new Wei(e.target.value ? e.target.value : 0, balance.deposited.p)
              );
            }}
          />
          <Text fontSize="12px" color="gray.500">
            ${balanceToDeposit.mul(price).toNumber().toFixed(2)}
          </Text>
        </Flex>
      </Flex>
      <Button isDisabled={balanceToDeposit.eq(0)}>
        {balanceToDeposit.eq(0) ? 'Enter Amount' : userHasAccounts ? 'TODO' : 'Create Account'}
      </Button>
    </Flex>
  );
}
