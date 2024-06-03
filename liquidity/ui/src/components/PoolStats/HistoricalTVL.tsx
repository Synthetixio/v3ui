import { Divider, Flex, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v3/formatters';
import { useAprHistory } from '@snx-v3/useAprHistory';
import { useState } from 'react';
import { Legend, Area, AreaChart, Tooltip, XAxis } from 'recharts';
import { TokenIcon } from '../TokenIcon';

type ActiveTabs = 'sevenDaysTVL' | 'sevenWeeksTVL' | 'sevenMonthTVL' | 'oneYearTVL' | 'allTVL';

export function HistoricalTVL() {
  const [activeTab, setActiveTab] = useState<ActiveTabs>('sevenDaysTVL');
  const { data } = useAprHistory();
  const totalTVL = data?.allTVL && data.allTVL[data.allTVL?.length - 1].value;

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
        <Text fontWeight={700} fontSize="20px" color="white">
          TVL
        </Text>
        <Tabs
          variant="soft-rounded"
          colorScheme="gray"
          onChange={(e) => {
            setActiveTab(() => {
              switch (e) {
                case 0:
                  return 'sevenDaysTVL';
                case 1:
                  return 'sevenWeeksTVL';
                case 2:
                  return 'sevenMonthTVL';
                case 3:
                  return 'oneYearTVL';
                default:
                  return 'allTVL';
              }
            });
          }}
        >
          <TabList>
            <Tab _selected={{ color: 'white', background: `gray.900` }} color="gray.500">
              1D
            </Tab>
            <Tab _selected={{ color: 'white', background: `gray.900` }} color="gray.500">
              1W
            </Tab>
            <Tab _selected={{ color: 'white', background: `gray.900` }} color="gray.500">
              1M
            </Tab>
            <Tab _selected={{ color: 'white', background: `gray.900` }} color="gray.500">
              1Y
            </Tab>
            <Tab _selected={{ color: 'white', background: `gray.900` }} color="gray.500">
              ALL
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
      {data && data[activeTab]?.length && (
        <AreaChart width={445} height={300} data={data[activeTab]}>
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={(key) => {
              const now = new Date(key.timestamp);
              return `${now.getDate()}/${now.getMonth() + 1}`;
            }}
            color="#9999AC"
            fontSize="12px"
          />
          <Tooltip content={<CustomizedToolTip activeTab={activeTab} totalTVL={totalTVL} />} />
          <Legend
            verticalAlign="top"
            align="left"
            iconType="circle"
            content={<CustomizedLegend />}
          />
          <Area type="basis" dataKey="value" fillOpacity={1} fill="#319795" />
        </AreaChart>
      )}
    </Flex>
  );
}

const CustomizedLegend = () => {
  return (
    <Flex alignItems="center" gap="2">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="#319795" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="4" fill="#319795" />
      </svg>
      <Text fontSize="12px" color="gray.500">
        Total Value Locked
      </Text>
    </Flex>
  );
};

const CustomizedToolTip = (props: any) => {
  const currentTVLLabel = () => {
    switch (props.activeTab) {
      case 'sevenDaysTVL':
        return 'Daily';
      case 'sevenWeeksTVL':
        return 'Weekly';
      case 'sevenMonthTVL':
        return 'Monhtly';
      case 'oneYearTVL':
        return 'Yearly';
      default:
        return 'Total';
    }
  };

  if (!props.active) return;
  return (
    <Flex
      flexDir="column"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      bg="navy.900"
      w="250px"
      h="auto"
      p="2"
      gap="1"
    >
      <Text color="gray.500" fontSize="12px" fontWeight={700}>
        {new Date(props.payload[0].payload.timestamp).toLocaleString().split(',')[0]}
      </Text>
      <Flex justifyContent="space-between">
        <Text color="gray.500" fontSize="12px" fontWeight={700}>
          Total TVL
        </Text>
        <Text color="gray.500" fontSize="12px" fontWeight={700}>
          {props.totalTVL && formatNumberToUsd(props.totalTVL, { maximumFractionDigits: 2 })}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Flex gap="1" alignItems="center">
          <TokenIcon symbol="usdc" width={12} height={12} />
          <Text color="gray.500" fontSize="12px">
            USDC
          </Text>
        </Flex>
        <Text color="gray.500" fontSize="12px">
          {props.totalTVL && formatNumberToUsd(props.totalTVL, { maximumFractionDigits: 2 })}
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between">
        <Text color="gray.500" fontSize="12px" fontWeight={700}>
          {currentTVLLabel()} TVL
        </Text>
        <Text color="gray.500" fontSize="12px" fontWeight={700}>
          {formatNumberToUsd(props.payload[0].payload.value, { maximumFractionDigits: 2 })}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Flex gap="1" alignItems="center">
          <TokenIcon symbol="usdc" width={12} height={12} />
          <Text color="gray.500" fontSize="12px">
            USDC
          </Text>
        </Flex>
        <Text color="gray.500" fontSize="12px">
          {formatNumberToUsd(props.payload[0].payload.value, { maximumFractionDigits: 2 })}
        </Text>
      </Flex>
    </Flex>
  );
};
