import { Box, Divider, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PoolHeader } from '../../components';
import { MarketSection } from '../../components';
import { CollateralSection } from '../../components';
import { useParams } from '@snx-v3/useParams';
import { HomeLink } from '@snx-v3/HomeLink';
import { usePool } from '@snx-v3/usePools';
import { Rewards } from '../../components';
import { useRewards } from '@snx-v3/useRewards';
import { usePoolData } from '@snx-v3/usePoolData';
import { useCollateralType } from '@snx-v3/useCollateralTypes';

export const Pool = () => {
  const params = useParams();
  const { data: pool } = usePool(params.poolId);

  const { accountId, collateralSymbol, poolId } = useParams();

  const { isLoading: isCollateralLoading, data: collateralType } =
    useCollateralType(collateralSymbol);

  const { isLoading: isPoolGraphDataLoading, data: poolData } = usePoolData(poolId);

  const { isLoading: isRewardsLoading, data: rewardsData } = useRewards(
    poolData?.registered_distributors,
    poolId,
    collateralType?.tokenAddress,
    accountId
  );

  const isLoading = isRewardsLoading || isCollateralLoading || isPoolGraphDataLoading;

  const title = pool ? `Pool #${pool.id} / ${pool.name}` : 'Pool';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <>
        <HomeLink />
        <PoolHeader />
        <Divider my={8} bg="gray.900" />
        <Flex gap={4} flexDirection={{ base: 'column', lg: 'row' }}>
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
