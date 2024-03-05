import { Flex, Heading } from '@chakra-ui/react';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import Wei from '@synthetixio/wei';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { AssetsList, PositionsList, StatBox } from '../../components';

export function Home() {
  const [params] = useSearchParams();

  const { data: positions, isLoading } = useLiquidityPositions({
    accountId: params.get('accountId') || '',
  });

  const debt =
    positions && Object.values(positions).reduce((prev, cur) => prev.add(cur.debt), new Wei(0));

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
        <Flex w="100%" gap="4" mt={6}>
          <StatBox
            title="Total Assets"
            isLoading={false}
            value="TODO"
            label="All assets in your Wallet and in your Synthetix Account."
          />
          <StatBox
            title="Total Delegated"
            isLoading={false}
            value="TODO"
            label="All assets in your Account that have been Delegated to a Pool."
          />
          <StatBox
            title="Total Debt"
            isLoading={isLoading}
            value={debt?.toNumber().toFixed(2) || '0'}
            label="Aggregated Debt of all your Open Positions."
          />
          <StatBox
            title="APY"
            isLoading={false}
            value="14%"
            label="Aggregated APY from all your positions."
          />
        </Flex>
        <AssetsList />
        <PositionsList />
      </Flex>
    </>
  );
}
