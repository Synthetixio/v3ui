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
import { PoolType, usePoolData } from '@snx-v3/usePoolData';
import { formatPercent } from '@snx-v3/formatters';
import { useParams } from '@snx-v3/useParams';
import { useMarketNamesById } from '@snx-v3/useMarketNamesById';
import { BorderBox } from '@snx-v3/BorderBox';

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
  poolData,
  marketNamesById,
  poolId,
  poolDataFetched,
}: {
  poolData?: PoolType;
  marketNamesById?: Record<string, string | undefined>;
  poolId?: string;
  poolDataFetched: boolean;
}) {
  if (poolDataFetched && !poolData) {
    return (
      <BorderBox padding={4}>
        <Text>Pool with id: {poolId} does not exist</Text>
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
                {/* <StyledTh>Total Deposited</StyledTh>
                <StyledTh>Total Withdrawn</StyledTh> */}
              </Tr>
            </Thead>
            <Tbody>
              {!poolData && <LoadingRow />}
              {poolData?.configurations.length === 0 ? (
                <Tr w="full">
                  <Td colSpan={4} border="none">
                    <Text textAlign="center" mt={4}>
                      No markets configured for the pool
                    </Text>
                  </Td>
                </Tr>
              ) : (
                poolData?.configurations.map(({ id, market, weight }, i) => {
                  const isLastItem = i + 1 === poolData.configurations.length;

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
                      <StyledTd isLastItem={isLastItem} fontSize="sm" data-testid="pool allocation">
                        {poolData.total_weight ? (
                          <>
                            <Text display="block">
                              {formatPercent(weight.div(poolData.total_weight).toNumber())}
                            </Text>
                          </>
                        ) : (
                          '-'
                        )}
                      </StyledTd>
                      {/* Total Deposited */}
                      {/* <StyledTd isLastItem={isLastItem} data-testid="market growth">
                        <Text fontSize="sm" display="block" color="gray.50">
                          {formatNumberToUsd(market.usd_deposited.toNumber())}
                        </Text>
                      </StyledTd> */}
                      {/* Total Withdrawn */}
                      {/* <StyledTd isLastItem={isLastItem}>
                        <Text fontSize="sm" display="block" color="gray.50">
                          {formatNumberToUsd(market.usd_withdrawn.toNumber())}
                        </Text>
                      </StyledTd> */}
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </BorderBox>
  );
}

export const MarketSection = () => {
  const params = useParams();
  const { data: poolData, isFetched: poolDataFetched } = usePoolData(params.poolId);

  const marketIdsAndAddresses = poolData?.configurations.map(({ market }) => ({
    marketId: market.id,
    address: market.address,
  }));

  const { data: marketNamesById } = useMarketNamesById(marketIdsAndAddresses);

  return (
    <MarketSectionUi
      poolId={params.poolId}
      poolDataFetched={poolDataFetched}
      poolData={poolData}
      marketNamesById={marketNamesById}
    />
  );
};
