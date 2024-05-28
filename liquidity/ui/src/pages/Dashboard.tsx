import { Flex, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { AssetsList, PositionsList, StatsList, AccountBanner } from '../components';
import { useWallet } from '@snx-v3/useBlockchain';

export function Dashboard() {
  const { activeWallet } = useWallet();
  return (
    <>
      <Helmet>
        <title>Synthetix Liquidity V3</title>
        <meta name="description" content="Synthetix V3 - Dashboard" />
      </Helmet>
      <Flex flexDir="column" mb={16}>
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
    </>
  );
}
