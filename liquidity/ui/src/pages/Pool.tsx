import { Box, Divider, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PoolHeader, CollateralSection } from '../components';
import { useParams } from '@snx-v3/useParams';
import { HomeLink } from '@snx-v3/HomeLink';
import { usePool } from '@snx-v3/usePoolsList';
import { MAINNET, NETWORKS } from '@snx-v3/useBlockchain';

export const Pool = () => {
  const { poolId, networkId } = useParams();

  const { data: pool } = usePool(Number(networkId), String(poolId));
  const network = NETWORKS.find((n) => n.id === Number(networkId));

  const { poolInfo } = pool || {};

  const title = poolInfo ? `Pool #${poolInfo[0].pool.id} / ${poolInfo[0].pool.name}` : 'Pool';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <>
        <HomeLink mt={4} />
        <PoolHeader mt={3} name={poolInfo && poolInfo[0].pool.name} network={network || MAINNET} />
        <Divider my={8} bg="gray.900" />
        <Flex gap={4} mb={16}>
          <Box w="100%">
            <CollateralSection />
          </Box>
        </Flex>
      </>
    </>
  );
};
