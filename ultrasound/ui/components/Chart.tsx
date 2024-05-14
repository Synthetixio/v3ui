import { Flex, Heading, Spinner, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Chart() {
  const [range, setRange] = useState<'groupedByMonths' | 'groupedByLast30Days'>('groupedByMonths');
  const { data: events, isLoading } = useBurnEvents();

  if (!events || isLoading) return null;

  return (
    <Flex
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      maxWidth="100%"
      w={{ base: '100%', xl: '761px' }}
      h={{ base: '100%', xl: '400px' }}
      bg="navy.700"
      mb="4"
      p="4"
      position="relative"
      flexDir="column"
    >
      <Heading fontSize="18px" fontWeight={700} w="100%">
        SNX Supply Chart
      </Heading>
      {/* TODO @MF addd padding at the bottom of the chart */}
      <Line
        style={{ marginBottom: '8px' }}
        data={{
          labels: Object.keys(events[range]),
          datasets: [
            {
              label: 'TOTAL SNX SUPPLY',
              data: Object.values(events[range]),
              borderColor: '#FC8738',
              backgroundColor: '#FC8738',
            },
          ],
        }}
        options={{
          layout: { padding: { bottom: 16 } },
          plugins: {
            tooltip: {
              backgroundColor: '#06061B',
              borderColor: '#2D2D38',
              borderWidth: 1,
              padding: 8,
              titleColor: '#9999AC',
              titleFont: { weight: 700, family: 'Inter', size: 12 },
              bodyFont: { weight: 400, family: 'Inter', size: 12 },
              bodyColor: '#9999AC',
              bodySpacing: 8,
              usePointStyle: true,
              enabled: true,
              mode: 'index',
              intersect: false,
            },
            legend: {
              align: 'start',
              labels: {
                boxWidth: 8,
                useBorderRadius: true,
                boxHeight: 8,
                borderRadius: 4,
                color: '#9999AC',
                font: { size: 12, family: 'Inter' },
              },
            },
          },
          scales: {
            y: {
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
      <Tabs
        variant="soft-rounded"
        position="absolute"
        right="10px"
        top="10px"
        defaultIndex={range === 'groupedByMonths' ? 1 : 0}
        size="sm"
      >
        <TabList>
          <Tab
            onClick={() => setRange('groupedByLast30Days')}
            color="gray.500"
            _selected={{ color: 'white', bg: 'whiteAlpha.400' }}
          >
            1M
          </Tab>
          <Tab
            onClick={() => setRange('groupedByMonths')}
            color="gray.500"
            _selected={{ color: 'white', bg: 'whiteAlpha.400' }}
          >
            All
          </Tab>
        </TabList>
      </Tabs>
    </Flex>
  );
}
