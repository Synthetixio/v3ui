import { FC } from 'react';
import {
  Flex,
  Table,
  TableCellProps,
  TableContainer,
  Text,
  Th,
  Td,
  Thead,
  Tr,
  Tbody,
  Skeleton,
} from '@chakra-ui/react';
import { formatPercent } from '@snx-v3/formatters';
import { useParams } from '@snx-v3/useParams';
import { useMarketNamesById } from '@snx-v3/useMarketNamesById';
import { BorderBox } from '@snx-v3/BorderBox';
import { NETWORKS } from '@snx-v3/useBlockchain';
import { usePool } from '@snx-v3/usePoolsList';
import { wei } from '@synthetixio/wei';

const StyledTh: FC<TableCellProps> = (props) => (
  <Th
    textTransform="none"
    sx={{
      paddingBottom: 1,
      paddingTop: 4,
      borderColor: 'gray.900',
      borderTop: 'none',
      paddingLeft: 2,
      paddingRight: 2,
    }}
    {...props}
  />
);

const StyledTd: FC<TableCellProps & { isLastItem?: boolean }> = ({ isLastItem, ...props }) => (
  <Td
    sx={{
      borderBottom: isLastItem ? 'none' : '1px',
      borderBottomColor: 'gray.900',
      paddingLeft: 2,
      paddingRight: 2,
    }}
    {...props}
  />
);

const LoadingRow = () => (
  <Tr>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
    <StyledTd>
      <Skeleton w="full" height={8} />
    </StyledTd>
  </Tr>
);

export function MarketSectionUi({
  marketNamesById,
  isLoading,
  configurations,
  total_weight,
}: {
  marketNamesById?: Record<string, string | undefined>;
  isLoading: boolean;
  total_weight?: number;
  configurations?: any[];
}) {
  if (!isLoading && !total_weight) {
    return (
      <BorderBox padding={4}>
        <Text>No markets found for this pool</Text>
      </BorderBox>
    );
  }
  return (
    <BorderBox bg="navy.700" padding={4} flexDirection="column" data-testid="pool markets">
      <Text fontSize="xl" fontWeight={700}>
        Markets
      </Text>
      <Flex>
        <TableContainer w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <StyledTh>Market</StyledTh>
                <StyledTh>Pool Allocation</StyledTh>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <LoadingRow />
              ) : (
                <>
                  {configurations?.length === 0 ? (
                    <Tr w="full">
                      <Td colSpan={4} border="none">
                        <Text textAlign="center" mt={4}>
                          No markets configured for the pool
                        </Text>
                      </Td>
                    </Tr>
                  ) : (
                    configurations?.map(({ id, market, weight }, i) => {
                      const isLastItem = i + 1 === configurations.length;

                      return (
                        <Tr key={id} data-testid="pool market" data-market={id}>
                          <StyledTd isLastItem={isLastItem}>
                            <Text fontSize="sm" display="block" data-testid="market name">
                              {marketNamesById?.[market.id] ? marketNamesById[market.id] : '-'}
                            </Text>
                            <Text fontSize="xs" color="gray.500" data-testid="market id">
                              ID: {market.id}
                            </Text>
                          </StyledTd>
                          <StyledTd
                            isLastItem={isLastItem}
                            fontSize="sm"
                            data-testid="pool allocation"
                          >
                            {total_weight ? (
                              <>
                                <Text display="block">
                                  {formatPercent(wei(weight).div(total_weight).toNumber())}
                                </Text>
                              </>
                            ) : (
                              '-'
                            )}
                          </StyledTd>
                        </Tr>
                      );
                    })
                  )}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </BorderBox>
  );
}

export const MarketSection = () => {
  const { poolId, networkId } = useParams();

  const network = NETWORKS.find((n) => n.id === Number(networkId));
  const { data, isLoading } = usePool(Number(networkId), String(poolId));

  const poolData = data?.poolInfo[0].pool;

  const marketIdsAndAddresses = poolData?.configurations.map(({ market }) => ({
    marketId: market.id,
    address: market.address,
  }));

  const { data: marketNamesById } = useMarketNamesById(marketIdsAndAddresses, network);

  return (
    <MarketSectionUi
      total_weight={poolData?.total_weight ? Number(poolData.total_weight) : 0}
      marketNamesById={marketNamesById}
      isLoading={isLoading}
      configurations={poolData?.configurations || []}
    />
  );
};
