import { Flex, Td, Tr, Text, Button, Fade } from '@chakra-ui/react';
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
  final,
}: AssetsRowProps) => {
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
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              ${walletBalance$}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {walletBalance}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              ${accountBalance$}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {accountBalance}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
              ${delegatedBalance$}
            </Text>
            <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
              {delegatedBalance}
              {` ${token}`}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td border="none">
        <Fade in>
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
              _hover={{ bg: 'gray.900' }}
            >
              Withdraw
            </Button>
          </Flex>
        </Fade>
      </Td>
    </Tr>
  );
};
