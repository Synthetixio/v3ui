import { Flex, Td, Tr, Text, Button } from '@chakra-ui/react';
import { TokenIcon } from '../../TokenIcon';

interface AssetsRowProps {
  token: 'SNX' | 'sUSD' | 'ETH' | 'USDC';
  name: string;
  walletBalance: number;
  walletBalance$: number;
  accountBalance: number;
  accountBalance$: number;
  delegatedBalance: number;
  delegatedBalance$: number;
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
}: AssetsRowProps) => {
  return (
    <Tr borderBottomWidth="1px">
      <Td border="none">
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
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            ${walletBalance$}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {walletBalance}
            {` ${token}`}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            ${accountBalance$}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {accountBalance}
            {` ${token}`}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            ${delegatedBalance$}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {delegatedBalance}
            {` ${token}`}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column">
          <Button
            variant="unstyled"
            fontSize="0.75rem"
            lineHeight="1rem"
            height="1.75rem"
            fontWeight={700}
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
          >
            Withdraw
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};
