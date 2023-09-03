import { Box, Divider, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { FC } from 'react';
import { PoolHeader } from './PoolHeader';
import { MarketSection } from './MarketSection';
import { CollateralSection } from './CollateralSection';
import { useParams } from '@snx-v3/useParams';
import { HomeLink } from '@snx-v3/HomeLink';
import { usePool } from '@snx-v3/usePools';

export const PoolUi: FC<{
  PoolHeader: FC;
  CollateralSection: FC;
  MarketSection: FC;
}> = ({ PoolHeader, CollateralSection, MarketSection }) => {
  return (
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
        </Box>
      </Flex>
    </>
  );
};

export const Pool = () => {
  const params = useParams();
  const { data: pool } = usePool(params.poolId);

  const title = pool ? `Pool #${pool.id} / ${pool.name}` : 'Pool';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <PoolUi
        PoolHeader={PoolHeader}
        CollateralSection={CollateralSection}
        MarketSection={MarketSection}
      />
    </>
  );
};
