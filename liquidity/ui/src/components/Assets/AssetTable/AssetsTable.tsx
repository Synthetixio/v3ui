import { InfoIcon } from '@chakra-ui/icons';
import { TableContainer, Table, Heading, Tooltip, Flex, Tbody, Td, Tr } from '@chakra-ui/react';
import { AssetsRow } from './AssetsRow';
import { AssetTableHeader } from './AssetTableHeader';
import { useNetwork } from '@snx-v3/useBlockchain';
import { AssetRowLoading } from '.';

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

interface AssetsTableProps {
  isLoading: boolean;
}

export const AssetsTable = ({ isLoading }: AssetsTableProps) => {
  const { network } = useNetwork();

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
        <Tooltip label={network?.name && `Collateral types configured for ${network?.name}`}>
          <InfoIcon w="12px" h="12px" ml={2} />
        </Tooltip>
      </Flex>
      <Table variant="simple">
        <AssetTableHeader />
        <Tbody>
          <Tr border="none" borderTop="1px" borderTopColor="gray.900" width="100%" height="0px">
            <Td height="0px" border="none" px={0} pt={0} pb={5} />
            <Td height="0px" border="none" px={0} pt={0} pb={5} />
            <Td height="0px" border="none" px={0} pt={0} pb={5} />
            <Td height="0px" border="none" px={0} pt={0} pb={5} />
            <Td height="0px" border="none" px={0} pt={0} pb={5} />
          </Tr>
          {isLoading ? (
            <>
              <AssetRowLoading />
              <AssetRowLoading />
            </>
          ) : (
            <>
              {mockAssets.map(
                (
                  {
                    token,
                    name,
                    accountBalance,
                    accountBalance$,
                    delegatedBalance,
                    delegatedBalance$,
                    walletBalance,
                    walletBalance$,
                  },
                  index
                ) => {
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
                      final={index === mockAssets.length - 1}
                    />
                  );
                }
              )}
            </>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
