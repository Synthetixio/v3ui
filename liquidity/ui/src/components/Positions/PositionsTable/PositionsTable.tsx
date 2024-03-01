import {
  Button,
  Fade,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import Wei from '@synthetixio/wei';
import PositionRow from './PositionsRow';
import PositionTableHeader from './PositionTableHeader';
import PositionsRowLoading from './PositionsRowLoading';
import { Link, generatePath } from 'react-router-dom';

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

interface PositionsTableInterface {
  isLoading: boolean;
}

export const PositionsTable = ({ isLoading }: PositionsTableInterface) => {
  return (
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
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="18px" fontWeight={700} lineHeight="28px" color="gray.50">
          Spartan Council Pool
        </Heading>
        <Fade in>
          <Button
            as={Link}
            mt={{ base: 2, md: 0 }}
            size="sm"
            to={{
              pathname: generatePath('/pools/:poolId', { poolId: '1' }),
              search: location.search,
            }}
            variant="outline"
          >
            Pool Info
          </Button>
        </Fade>
      </Flex>
      <Table variant="simple">
        <PositionTableHeader />
        <Tbody>
          <Tr border="none" borderTop="1px" borderTopColor="gray.900" width="100%" height="0px">
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
            <Td height="0px" border="none" px={0} pt={0} pb={4} />
          </Tr>
          {isLoading ? (
            <>
              <PositionsRowLoading />
              <PositionsRowLoading />
            </>
          ) : (
            <>
              {mockPositions.map((position, index) => (
                <PositionRow
                  key={position.token.concat(index.toString())}
                  {...position}
                  final={index === mockPositions.length - 1}
                />
              ))}
            </>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
