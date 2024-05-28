import { Flex, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useGetHistoricalTVL } from '@snx-v3/useGetHistoricalTVL';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export function HistoricalTVL({ poolId }: { poolId: string }) {
  const { data: collateralTypes, isLoading: collateralTypesAreLoading } = useCollateralTypes();
  const { data: tvl } = useGetHistoricalTVL({
    poolId,
    collateralTypeAddresses: !!collateralTypes?.length
      ? collateralTypes?.map((types) => types.tokenAddress)
      : [],
  });
  console.log(tvl);
  return (
    <Flex
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      w="100%"
      p="6"
      bg="navy.700"
      flexDir="column"
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Text>TVL</Text>
        <Tabs variant="soft-rounded" colorScheme="gray">
          <TabList>
            <Tab>1D</Tab>
            <Tab>1W</Tab>
            <Tab>1M</Tab>
            <Tab>1Y</Tab>
            <Tab>ALL</Tab>
          </TabList>
        </Tabs>
      </Flex>
      <LineChart
        width={445}
        height={200}
        data={[
          { name: '1', value: 12 },
          { name: '1', value: 12 },
          { name: '1', value: 120 },
        ]}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="red" />
      </LineChart>
    </Flex>
  );
}
