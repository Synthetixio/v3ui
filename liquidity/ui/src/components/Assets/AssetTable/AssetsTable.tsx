import { InfoIcon } from '@chakra-ui/icons';
import {
  TableContainer,
  Table,
  Heading,
  Tooltip,
  Flex,
  Tbody,
  Td,
  Tr,
  Text,
  Button,
} from '@chakra-ui/react';
import { AssetsRow } from './AssetsRow';
import { AssetTableHeader } from './AssetTableHeader';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { AssetRowLoading } from '.';
import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { useTokenBalances } from '@snx-v3/useTokenBalance';

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

interface AssetsTableProps {
  isLoading: boolean;
  accountCollaterals?: AccountCollateralType[];
}

export const AssetsTable = ({ isLoading, accountCollaterals }: AssetsTableProps) => {
  const { network } = useNetwork();
  const { activeWallet, connect } = useWallet();
  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } = useTokenBalances(
    accountCollaterals?.map((collateral) => collateral.tokenAddress) || []
  );
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
      {!activeWallet?.address ? (
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.500" fontWeight={500} fontSize="14px" mt="4" pl="3">
            Please connect wallet to view assets
          </Text>
          <Button
            size="sm"
            onClick={() => {
              connect();
            }}
          >
            Connect Wallet
          </Button>
        </Flex>
      ) : (
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
            {isLoading && tokenBalancesIsLoading ? (
              <>
                <AssetRowLoading />
                <AssetRowLoading />
              </>
            ) : (
              <>
                {accountCollaterals &&
                  userTokenBalances &&
                  accountCollaterals.map((collateral, index) => {
                    return (
                      <AssetsRow
                        key={collateral.tokenAddress.concat(collateral?.symbol || index.toString())}
                        token={collateral.symbol || ''}
                        name={collateral.displaySymbol || ''}
                        walletBalance={userTokenBalances[index]!.toNumber()}
                        // TODO @dev fetch prices
                        walletBalance$={userTokenBalances[index]!.toNumber()}
                        accountBalance={collateral.availableCollateral.toNumber()}
                        accountBalance$={collateral.availableCollateral.toNumber()}
                        delegatedBalance={collateral.totalAssigned.toNumber()}
                        delegatedBalance$={collateral.totalAssigned.toNumber()}
                        final={index === accountCollaterals.length - 1}
                      />
                    );
                  })}
              </>
            )}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};
