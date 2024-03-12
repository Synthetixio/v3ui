import { Flex, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { AssetsList, PositionsList, StatsList } from '../../components';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Synthetix V3</title>
        <meta name="description" content="Synthetix V3 - Dashboard" />
      </Helmet>
      <Flex flexDir="column">
        <Heading color="gray.50" fontSize="1.5rem">
          Dashboard
        </Heading>
        <StatsList />
        <AssetsList />
        <PositionsList />
      </Flex>
    </>
  );
}
