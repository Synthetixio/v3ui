import { Flex, Heading, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PoolsList } from '../components/Pools';
import { MigrationBanner } from '../components/Migration/MigrationBanner';
import { MAINNET } from '@snx-v3/useBlockchain';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Synthetix Liquidity V3</title>
        <meta name="description" content="Synthetix V3 - Dashboard" />
      </Helmet>
      <Flex flexDir="column" mb={16}>
        <Heading
          mt={[6, 10]}
          color="gray.50"
          maxWidth="20rem"
          fontSize={['2rem', '3rem']}
          data-cy="liquidity-home"
          lineHeight="120%"
        >
          The Liquidity Layer of DeFi
        </Heading>
        <Text color="gray.500" fontSize="1rem" lineHeight={6} fontFamily="heading" mt="1rem">
          Provide liquidity for the next generation of permissionless protocols
        </Text>
        <PoolsList />
        <MigrationBanner network={MAINNET} />
      </Flex>
    </>
  );
}
