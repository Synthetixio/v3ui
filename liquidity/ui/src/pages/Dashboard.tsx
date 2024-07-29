import { Flex, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { AssetsList, PositionsList, StatsList, AccountBanner } from '../components';
import { useWallet, useNetwork } from '@snx-v3/useBlockchain';

import { useSearchParams } from 'react-router-dom';

import { MigrateModal, MigrateBanner } from '../components/MigrateModal';

export function Dashboard() {
  const { activeWallet } = useWallet();
  const network = useNetwork();

  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Helmet>
        <title>Synthetix Liquidity V3</title>
        <meta name="description" content="Synthetix V3 - Dashboard" />
      </Helmet>
      <Flex flexDir="column" mb={16}>
        {network.network?.id === 11155111 && <MigrateBanner />}
        {activeWallet && <AccountBanner />}
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
        <StatsList />
        <AssetsList />
        <PositionsList />
      </Flex>
      <MigrateModal
        isOpen={searchParams.has('v2xmigrate')}
        setIsOpen={(isOpen) => setSearchParams(isOpen ? { v2xmigrate: 'true' } : {})}
      />
    </>
  );
}
