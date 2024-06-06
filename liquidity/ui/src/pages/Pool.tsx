import { Box, Divider, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PoolHeader, MarketSection, CollateralSection, Rewards } from '../components';
import { useParams } from '@snx-v3/useParams';
import { HomeLink } from '@snx-v3/HomeLink';
import { usePool } from '@snx-v3/usePools';
import { useRewards } from '@snx-v3/useRewards';
import { usePoolData } from '@snx-v3/usePoolData';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useLocation } from 'react-router-dom';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useEffect } from 'react';

export const Pool = () => {
  const params = useParams();
  const { state } = useLocation();
  const { network, setNetwork } = useNetwork();
  const { connect } = useWallet();

  const { data: pool } = usePool(params.poolId);

  const { accountId, collateralSymbol, poolId } = useParams();

  const { isFetching: isCollateralLoading, data: collateralType } =
    useCollateralType(collateralSymbol);

  const { isLoading: isPoolGraphDataLoading, data: poolData } = usePoolData(poolId);

  const { isLoading: isRewardsLoading, data: rewardsData } = useRewards(
    poolData?.registered_distributors,
    poolId,
    collateralType?.tokenAddress,
    accountId
  );

  useEffect(() => {
    if (state && network?.id !== state?.networkId) {
      // Switch network
      setNetwork(state.networkId);
    } else if (state && !network) {
      // Connect network
      connect();
      setNetwork(state.networkId);
    }
  }, [network, state, setNetwork, connect]);

  const isLoading = isRewardsLoading || isCollateralLoading || isPoolGraphDataLoading;

  const title = pool ? `Pool #${pool.id} / ${pool.name}` : 'Pool';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <>
        <HomeLink mt={4} />
        <PoolHeader />
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
