import { Box, Divider, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PoolHeader, MarketSection, CollateralSection, Rewards } from '../components';
import { useParams } from '@snx-v3/useParams';
import { HomeLink } from '@snx-v3/HomeLink';
import { useRewards } from '@snx-v3/useRewards';
import { usePool } from '@snx-v3/usePoolsList';
import { NETWORKS } from '@snx-v3/useBlockchain';

export const Pool = () => {
  const { accountId, poolId, networkId } = useParams();

  const { data: pool, isLoading: isPoolLoading } = usePool(Number(networkId), String(poolId));

  const { poolInfo } = pool || {};

  const registeredDistributors = poolInfo?.map((info) => info.pool.registered_distributors).flat();
  const collateralTypes = poolInfo?.map((info) => info.collateral_type);

  const network = NETWORKS.find((n) => n.id === Number(networkId));

  const { isLoading: isRewardsLoading, data: rewardsData } = useRewards(
    registeredDistributors,
    poolId,
    // TODO: Update this to support other collateral types
    collateralTypes?.[0]?.id,
    accountId || '69',
    network
  );

  const title = poolInfo ? `Pool #${poolInfo[0].pool.id} / ${poolInfo[0].pool.name}` : 'Pool';
  const isLoading = isRewardsLoading || isPoolLoading;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <>
        <HomeLink mt={4} />
        <PoolHeader name={poolInfo && poolInfo[0].pool.name} />
        <Divider my={8} bg="gray.900" />
        <Flex gap={4} flexDirection={{ base: 'column', lg: 'row' }} mb={8}>
          <Box flexGrow={1}>
            <CollateralSection />
          </Box>
          <Box flexGrow={1}>
            <MarketSection />
            <Rewards mt={4} isLoading={isLoading} rewards={rewardsData} readOnly={true} />
          </Box>
        </Flex>
      </>
    </>
  );
};
