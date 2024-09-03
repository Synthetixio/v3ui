import { Flex, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PositionsList, StatsList } from '../components';
import { WatchAccountBanner } from '../components/WatchAccountBanner/WatchAccountBanner';
import { MAINNET, SEPOLIA, useNetwork } from '@snx-v3/useBlockchain';
import { MigrationBanner } from '../components/Migration/MigrationBanner';

export function Dashboard() {
  const { network } = useNetwork();
  return (
    <>
      <Helmet>
        <title>Synthetix Liquidity V3</title>
        <meta name="description" content="Synthetix V3 - Dashboard" />
      </Helmet>
      <Flex
        pt={{
          base: 2,
          sm: 10,
        }}
        flexDir="column"
        mb={16}
      >
        {network && [MAINNET.id, SEPOLIA.id].includes(network.id) && (
          <MigrationBanner network={network} type="alert" />
        )}

        <Heading color="gray.50" fontSize="1.5rem" data-cy="liquidity-dashboard">
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
