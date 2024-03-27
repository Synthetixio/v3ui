import { Box, Button, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { FC } from 'react';
import { usePoolData } from '@snx-v3/usePoolData';
import { calculatePoolPerformanceSevenDays } from '@snx-v3/calculations';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { Wei } from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { usePool } from '@snx-v3/usePools';

const PoolBoxUi: FC<{
  poolName?: string;
  poolId?: string;
  sevenDaysPoolPerformanceGrowth?: Wei;
}> = ({ poolName, poolId }) => {
  const location = useLocation();
  return (
    <BorderBox p={4} flexDirection="column">
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
      {poolId && (
        <Button
          as={Link}
          mt={4}
          size="md"
          to={{
            pathname: generatePath('/pools/:poolId', { poolId: poolId }),
            search: location.search,
          }}
          variant="outline"
        >
          See Pool
        </Button>
      )}
    </BorderBox>
  );
};

export const PoolBox = () => {
  const { poolId } = useParams();

  const { data: poolData } = usePoolData(poolId);

  const sevenDaysPoolPerformance = calculatePoolPerformanceSevenDays(poolData);

  const { data: pool } = usePool(poolId);

  return (
    <PoolBoxUi
      poolName={pool?.name}
      poolId={pool?.id}
      sevenDaysPoolPerformanceGrowth={sevenDaysPoolPerformance?.growthPercentage}
    />
  );
};
