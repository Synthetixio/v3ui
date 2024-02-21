import { Flex, Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import Wei from '@synthetixio/wei';
import PositionRow from './PositionRow';
import PositionTableHeader from './PositionTableHeader';

const mockPositions: {
  symbol: 'SNX' | 'sUSD' | 'ETH' | 'USDC';
  token: string;
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
}[] = [
  {
    token: 'sUSDC',
    symbol: 'USDC',
    name: 'Synthetic USDC',
    delegated$: new Wei(1000),
    delegated: new Wei(1000),
    apy: 16.4,
    pnl: 500,
    pnlPercentage: -25.04,
    borrowed: new Wei(0),
    borrowed$: new Wei(0),
    debt: new Wei(2000),
    cRatio: Infinity,
  },
  {
    token: 'ETH',
    symbol: 'ETH',
    name: 'Synthetic ETH',
    delegated$: new Wei(10),
    delegated: new Wei(12),
    apy: 19.4,
    pnl: 1500,
    pnlPercentage: 25.04,
    borrowed: new Wei(100),
    borrowed$: new Wei(1002),
    debt: new Wei(-420),
    cRatio: 200,
  },
];

export default function Positions() {
  return (
    <Flex flexDir="column">
      <Heading>Positions</Heading>
      <TableContainer
        maxW="100%"
        mt={4}
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="5px"
        p={6}
        sx={{
          borderCollapse: 'separate !important',
          borderSpacing: 0,
        }}
        bg="navy.700"
      >
        <Flex alignItems="center">
          <Heading fontSize="18px" fontWeight={700} lineHeight="28px" color="gray.50">
            Spartan Council Pool
          </Heading>
        </Flex>
        <Table variant="simple">
          <PositionTableHeader />
          <Tbody>
            {mockPositions.map((position, index) => (
              <PositionRow key={position.token.concat(index.toString())} {...position} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
