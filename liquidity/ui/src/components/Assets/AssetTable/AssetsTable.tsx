import { InfoIcon } from '@chakra-ui/icons';
import { TableContainer, Table, Heading, Tooltip, Flex, Tbody } from '@chakra-ui/react';
import { AssetsRow } from './AssetsRow';
import { TableHeader } from './TableHeader';

interface Asset {
  token: 'SNX' | 'sUSD' | 'ETH' | 'USDC';
  name: string;
  walletBalance: number;
  walletBalance$: number;
  accountBalance: number;
  accountBalance$: number;
  delegatedBalance: number;
  delegatedBalance$: number;
}

const mockAssets: Asset[] = [
  {
    token: 'SNX',
    name: 'Synthetix',
    walletBalance: 2000,
    walletBalance$: 8000,
    accountBalance: 500,
    accountBalance$: 2000,
    delegatedBalance: 10,
    delegatedBalance$: 40,
  },
  {
    token: 'ETH',
    name: 'Ethirium',
    walletBalance: 0.5,
    walletBalance$: 500,
    accountBalance: 1,
    accountBalance$: 1000,
    delegatedBalance: 0.1,
    delegatedBalance$: 100,
  },
  {
    token: 'sUSD',
    name: 'Synthetic USD',
    walletBalance: 4000,
    walletBalance$: 4000,
    accountBalance: 2000,
    accountBalance$: 2000,
    delegatedBalance: 1000,
    delegatedBalance$: 1000,
  },
  {
    token: 'USDC', // TODO: add token icon for synth usdc
    name: 'sUSDC',
    walletBalance: 10000,
    walletBalance$: 10000,
    accountBalance: 6000,
    accountBalance$: 6000,
    delegatedBalance: 1000,
    delegatedBalance$: 1000,
  },
];

export const AssetsTable = () => {
  const activeNetwork = 'mainnet';
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
      <Flex alignItems="center">
        <Heading fontSize="18px" fontWeight={700} lineHeight="28px" color="gray.50">
          Assets
        </Heading>
        <Tooltip label={`Collateral types configured for ${activeNetwork}`}>
          <InfoIcon w="12px" h="12px" ml={2} />
        </Tooltip>
      </Flex>
      <Table variant="simple">
        <TableHeader />
        <Tbody>
          {mockAssets.map(
            ({
              token,
              name,
              accountBalance,
              accountBalance$,
              delegatedBalance,
              delegatedBalance$,
              walletBalance,
              walletBalance$,
            }) => {
              return (
                <AssetsRow
                  key={token}
                  token={token}
                  name={name}
                  walletBalance={walletBalance}
                  walletBalance$={walletBalance$}
                  accountBalance={accountBalance}
                  accountBalance$={accountBalance$}
                  delegatedBalance={delegatedBalance}
                  delegatedBalance$={delegatedBalance$}
                />
              );
            }
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
