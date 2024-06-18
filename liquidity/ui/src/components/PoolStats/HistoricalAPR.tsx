import { Divider, Flex, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { useAprHistory } from '@snx-v3/useAprHistory';
import { useState } from 'react';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { TokenIcon } from '../TokenIcon';

type ActiveTabs = 'sevenDaysAPR' | 'sevenWeeksAPR' | 'sevenMonthAPR' | 'oneYearAPR' | 'allAPR';

export function HistoricalAPR() {
  const [activeTab, setActiveTab] = useState<ActiveTabs>('sevenDaysAPR');
  const { data } = useAprHistory();
  const combinedAPR = data?.allAPR && data.allAPR[data.allAPR.length - 1].combined;
  const pnlAPR = data?.allAPR && data.allAPR[data.allAPR.length - 1].pnlCombined;
  const rewardsAPR = data?.allAPR && data.allAPR[data.allAPR.length - 1].rewardsCombined;
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
          APR
        </Text>
        <Tabs
          variant="soft-rounded"
          colorScheme="gray"
          onChange={(e) => {
            setActiveTab(() => {
              switch (e) {
                case 0:
                  return 'sevenDaysAPR';
                case 1:
                  return 'sevenWeeksAPR';
                case 2:
                  return 'sevenMonthAPR';
                case 3:
                  return 'oneYearAPR';
                default:
                  return 'allAPR';
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
      {!!data && data[activeTab] && (
        <LineChart width={445} height={300} data={data[activeTab]}>
          <XAxis
            dataKey={(key) => {
              const now = new Date(key.timestamp);
              return `${now.getDate()}/${now.getMonth() + 1}`;
            }}
            color="#9999AC"
            fontSize="12px"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            fontSize="12px"
            type="number"
            tickFormatter={(value) => `${value}%`}
            includeHidden
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomizedToolTip activeTab={activeTab} totalAPR={combinedAPR} />} />

          <Legend
            verticalAlign="top"
            align="left"
            iconType="circle"
            content={
              <CustomizedLegend combinedAPR={combinedAPR} rewardsAPR={rewardsAPR} pnlAPR={pnlAPR} />
            }
          />

          <Line type="basis" dataKey="value" stroke="#00D1FF" dot={false} />
          <Line type="basis" dataKey="pnl" stroke="#EE2EFF" dot={false} />
          <Line type="basis" dataKey="rewards" stroke="#402FC8" dot={false} />
        </LineChart>
      )}
    </Flex>
  );
}

const CustomizedLegend = ({
  combinedAPR,
  pnlAPR,
  rewardsAPR,
}: {
  combinedAPR?: number;
  pnlAPR?: number;
  rewardsAPR?: number;
}) => {
  return (
    <Flex gap="2" mb="4" flexDir="column">
      <Flex flexDir="column">
        <Flex alignItems="center" gap="1">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="#00D1FF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="#00D1FF" />
          </svg>
          <Text fontSize="12px" color="gray.500">
            Total APR
          </Text>
        </Flex>
        <Text fontWeight={800} fontSize="30px">
          {combinedAPR?.toFixed(2)}%
        </Text>
      </Flex>
      <Flex alignItems="center" gap="2">
        <Flex
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          alignItems="center"
          gap="1"
          p="1"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="#402FC8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="#402FC8" />
          </svg>
          <Text fontSize="12px" color="gray.500">
            APR Rewards
          </Text>
          <Text fontSize="14px" fontWeight={700} color="white">
            {rewardsAPR?.toFixed(2)}%
          </Text>
        </Flex>
        <Flex
          border="1px solid"
          borderColor="gray.900"
          rounded="base"
          alignItems="center"
          gap="1"
          p="1"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="#EE2EFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="#EE2EFF" />
          </svg>
          <Text fontSize="12px" color="gray.500">
            APR PnL
          </Text>
          <Text fontSize="14px" fontWeight={700} color="white">
            {pnlAPR?.toFixed(2)}%
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CustomizedToolTip = (props: any) => {
  const currentTVLLabel = () => {
    switch (props.activeTab) {
      case 'sevenDaysAPR':
        return 'Daily';
      case 'sevenWeeksAPR':
        return 'Weekly';
      case 'sevenMonthAPR':
        return 'Monhtly';
      case 'oneYearAPR':
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

      <Divider />
      <Text color="gray.500" fontSize="12px" fontWeight={700}>
        {currentTVLLabel()} APR
      </Text>
      <Flex justifyContent="space-between">
        <Flex gap="1" alignItems="center">
          <TokenIcon symbol="usdc" width={12} height={12} />
          <Text color="gray.500" fontSize="12px">
            USDC
          </Text>
        </Flex>
        <Text color="gray.500" fontSize="12px" fontWeight={700}>
          {props.payload[0].payload.value.toFixed(2).concat('%')}
        </Text>
      </Flex>
      <Text color="gray.500" fontSize="12px" fontWeight={700}>
        APR PNL
      </Text>
      <Flex justifyContent="space-between">
        <Flex gap="1" alignItems="center">
          <TokenIcon symbol="usdc" width={12} height={12} />
          <Text color="gray.500" fontSize="12px">
            USDC
          </Text>
        </Flex>
        <Text color="gray.500" fontSize="12px">
          {props.payload[0].payload.pnl.toFixed(2).concat('%')}
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between">
        <Text color="gray.500" fontSize="12px" fontWeight={700}>
          APR Rewards
        </Text>
        <Text color="gray.500" fontSize="12px" fontWeight={700}>
          {props.payload[0].payload.rewards.toFixed(2).concat('%')}
        </Text>
      </Flex>
    </Flex>
  );
};
