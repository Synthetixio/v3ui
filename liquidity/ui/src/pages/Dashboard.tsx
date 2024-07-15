import { Flex, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PositionsList, StatsList } from '../components';
import { WatchAccountBanner } from '../components/WatchAccountBanner/WatchAccountBanner';

export function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Synthetix Liquidity V3</title>
        <meta name="description" content="Synthetix V3 - Dashboard" />
      </Helmet>
      <Flex flexDir="column" mb={16}>
        <Heading
          mt={{
            base: 2,
            sm: 10,
          }}
          color="gray.50"
          fontSize="1.5rem"
          data-cy="liquidity-dashboard"
        >
          Dashboard
        </Heading>
        <WatchAccountBanner />

        <StatsList />
        {/* Leave commented out for now */}
        {/* <AssetsList /> */}
        <PositionsList />
      </Flex>
    </>
  );
}
