import { Box, Button, Flex, Heading, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { FC } from 'react';
import { usePoolData } from '@snx-v3/usePoolData';
import { calculatePoolPerformanceSevenDays } from '@snx-v3/calculations';
import { generatePath, NavigateFunction, useNavigate } from 'react-router-dom';
import { Wei } from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { InfoIcon } from '@chakra-ui/icons';
import { TrendText } from '@snx-v3/TrendText';
import { currency } from '@snx-v3/format';
import { usePool } from '@snx-v3/usePools';

const PoolBoxUi: FC<{
  poolName?: string;
  poolId?: string;
  navigate: NavigateFunction;
  sevenDaysPoolPerformanceGrowth?: Wei;
}> = ({ poolName, poolId, navigate, sevenDaysPoolPerformanceGrowth }) => {
  return (
    <BorderBox h="100%" p={4} flexDirection="column">
      {poolId ? (
        <Flex justifyContent="space-between">
          <Flex flexDirection="column">
            <Heading fontSize="xl">{poolName}</Heading>
            <Text fontSize="sm" color="gray.400">
              Pool #{poolId}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent="space-between">
          <Box>
            <Skeleton w={16} height={8} />
            <Skeleton mt={1} w={8} height={6} />
          </Box>
          <Skeleton w={16} height={6} />
        </Flex>
      )}
      {sevenDaysPoolPerformanceGrowth && (
        <BorderBox mt={4} p={4} flexDirection="column">
          <Heading fontSize="md" alignItems="center" display="flex">
            Performance Last 7 Days{' '}
            <Tooltip label="Average growth of all markets in the pool for the last 7 days">
              <InfoIcon width="12px" height="12px" ml={1} />
            </Tooltip>
          </Heading>
          <TrendText fontSize="2xl" fontWeight="bold" value={sevenDaysPoolPerformanceGrowth}>
            {currency(sevenDaysPoolPerformanceGrowth, { style: 'percent' })}
          </TrendText>
        </BorderBox>
      )}
      {poolId && (
        <Button
          mt={4}
          size="md"
          onClick={() =>
            navigate({
              pathname: generatePath('/pools/:poolId', { poolId: poolId }),
            })
          }
          variant="outline"
        >
          See Pool
        </Button>
      )}
    </BorderBox>
  );
};

export const PoolBox = () => {
  const params = useParams();

  const navigate = useNavigate();
  const { data: poolData } = usePoolData(params.poolId);
  const sevenDaysPoolPerformance = calculatePoolPerformanceSevenDays(poolData);

  const { data: pool } = usePool(params.poolId);

  return (
    <PoolBoxUi
      poolName={pool?.name}
      poolId={pool?.id}
      navigate={navigate}
      sevenDaysPoolPerformanceGrowth={sevenDaysPoolPerformance?.growthPercentage}
    />
  );
};
