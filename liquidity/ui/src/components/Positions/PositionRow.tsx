import { Badge, Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';

export default function PositionRow({
  symbol,
  token,
  name,
  delegated$,
  delegated,
  apy,
  pnl,
  pnlPercentage,
  borrowed,
  borrowed$,
  debt,
  cRatio,
}: {
  token: string;
  symbol: 'SNX' | 'sUSD' | 'ETH' | 'USDC';
  name: string;
  delegated$: Wei;
  delegated: Wei;
  apy: number;
  pnl: number;
  pnlPercentage: number;
  borrowed: Wei;
  borrowed$: Wei;
  debt: Wei;
  cRatio: number;
}) {
  return (
    <Tr borderBottomWidth="1px">
      <Td border="none">
        <Flex alignItems="center">
          <TokenIcon symbol={symbol} />
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
            ${delegated$.toNumber().toLocaleString()}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {delegated.toNumber()}
            {` ${token}`}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            {apy}%
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            ${pnl.toLocaleString('us-EN')}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {pnlPercentage}%
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            {borrowed$.eq(0) ? 'N/A' : `$${borrowed$.toNumber().toLocaleString()}`}
          </Text>
          <Text color="gray.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {borrowed.toNumber()} - {token}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            {debt.toNumber().toLocaleString()}
          </Text>
          <Text color="cyan.500" fontFamily="heading" fontSize="0.75rem" lineHeight="1rem">
            {debt.gt(0) ? 'Repay Debt' : 'Claim Credit'}
          </Text>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
            {cRatio === Infinity ? 'Infinite' : cRatio}%
          </Text>
          <Badge colorScheme="green" border="1px solid" bg="green.900">
            HEALTHY
          </Badge>
        </Flex>
      </Td>
      <Td border="none">
        <Flex flexDirection="column">
          <Button
            fontSize="0.75rem"
            lineHeight="1rem"
            height="1.75rem"
            fontWeight={700}
            borderWidth="1px"
            borderColor="gray.900"
            borderRadius="4px"
          >
            Manage
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}
