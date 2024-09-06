import { Fade, Flex, Spinner, Td, Text, Th, Tr } from '@chakra-ui/react';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { CustomTable } from '../CustomTable';
import { useRewards } from '@snx-v3/useRewards';
import { TokenIcon } from '../TokenIcon';
import { prettyString } from '@snx-v3/format';
import { convertSecondsToDisplayString } from '@snx-v3/formatters';

const TableHeader = [
  <Th
    key="asset-header"
    py={5}
    textTransform="unset"
    color="gray.600"
    border="none"
    fontFamily="heading"
    fontSize="12px"
    lineHeight="16px"
  >
    Estimated Rate
  </Th>,
  <Th key="tvl-header" border="none" textTransform="unset" py={5}>
    <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
      Distributor
    </Text>
  </Th>,
  <Th key="pnl-header" border="none" textTransform="unset" py={5}>
    <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
      Total Distributed
    </Text>
  </Th>,
  <Th
    key="button-placeholder-header"
    py={5}
    textTransform="unset"
    color="gray.600"
    border="none"
    fontFamily="heading"
    fontSize="12px"
    lineHeight="16px"
  >
    <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
      Status
    </Text>
  </Th>,
];

function RewardsTableUi({
  collateralTypes,
  isLoading,
  accountId,
  poolId,
}: {
  collateralTypes?: CollateralType[];
  isLoading: boolean;
  accountId?: string;
  poolId: string;
}) {
  return (
    <CustomTable
      loadingState={{ isLoading: isLoading, headerLength: TableHeader.length, numberOfRows: 1 }}
      headerColumns={TableHeader}
      rows={
        !collateralTypes
          ? []
          : collateralTypes.map((types) => (
              <RewardsRow
                key={types.tokenAddress.concat('rewards')}
                collateralType={types}
                accountId={accountId}
                poolId={poolId}
                isLoading={isLoading}
              />
            ))
      }
    />
  );
}

function RewardsRow({
  collateralType,
  accountId,
  poolId,
}: {
  collateralType?: CollateralType;
  isLoading: boolean;
  accountId?: string;
  poolId: string;
}) {
  const { isLoading: isRewardsLoading, data: rewardsData } = useRewards({
    poolId,
    collateralSymbol: collateralType?.symbol,
    accountId,
  });

  return isRewardsLoading && !rewardsData ? (
    <Spinner />
  ) : (
    rewardsData?.map((data, index) => (
      <Tr
        key={data.distributorAddress.concat('rewards-table')}
        borderBottomWidth={index === rewardsData.length - 1 ? 'none' : '1px'}
      >
        <Td border="none">
          <Fade in>
            <Flex alignItems="center">
              <TokenIcon symbol={data.symbol} />
              <Flex flexDirection="column" ml={3}>
                <Text color="white" lineHeight="1.25rem" fontFamily="heading">
                  {/* Comment out until for now */}
                  {/* {data.rate} */}
                </Text>
                <Text>{convertSecondsToDisplayString(data.duration)}</Text>
              </Flex>
            </Flex>
          </Fade>
        </Td>
        <Td border="none">
          <Fade in>
            <Text color="white" lineHeight="1.25rem" fontFamily="heading" ml={3}>
              {prettyString(data.distributorAddress, 6, 6)}
            </Text>
          </Fade>
        </Td>
        <Td border="none">
          <Fade in>
            <Text color="white" lineHeight="1.25rem" fontFamily="heading" ml={3}>
              {data.total.toLocaleString('en-US', { maximumFractionDigits: 2 })} {data.symbol}
            </Text>
          </Fade>
        </Td>
        <Td border="none">
          <Fade in>
            <Text color="white" lineHeight="1.25rem" fontFamily="heading" ml={3}>
              {data.duration}
            </Text>
          </Fade>
        </Td>
      </Tr>
    ))
  );
}

export function RewardsTable({ accountId, poolId }: { accountId?: string; poolId: string }) {
  const { data: collateralTypes, isLoading: collateralTypesAreLoading } = useCollateralTypes();

  return (
    <RewardsTableUi
      collateralTypes={collateralTypes}
      accountId={accountId}
      poolId={poolId}
      isLoading={collateralTypesAreLoading}
    />
  );
}
