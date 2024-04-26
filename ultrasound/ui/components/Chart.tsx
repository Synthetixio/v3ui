import { Flex, Spinner, Tab, TabList, Tabs } from '@chakra-ui/react';
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

  if (isLoading) return <Spinner colorScheme="cyan" />;

  return (
    <Flex
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      w="761px"
      h="400px"
      bg="navy.700"
      mb="4"
      position="relative"
    >
      <Line
        data={{
          labels: Object.keys(events[range]),
          datasets: [
            {
              label: 'TOTAL SNX SUPPLY',
              data: Object.values(events[range]),
              borderColor: '#FC8738',
            },
          ],
        }}
        options={{
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
