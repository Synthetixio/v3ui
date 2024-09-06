import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../utils/councils';
import { CouncilCard } from '../components/CouncilCard';
import Head from 'react-helmet';
import { useGetHistoricalVotes } from '../queries';

function App() {
  const { data: votes } = useGetHistoricalVotes();
  return (
    <>
      <Head>
        {/* open graph */}
        <meta property="og:url" content="https://governance.synthetix.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Synthetix | Governance" />
        <meta property="og:description" content="Synthetix v3 Governance" />
        <meta property="og:image" content="https://governance.synthetix.io/governance.png" />
        <meta property="og:image:alt" content="Synthetix | Governance" />
        <meta property="og:site_name" content="" />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@synthetix_io" />
        <meta name="twitter:creator" content="@synthetix_io" />
        <meta name="twitter:image" content="https://governance.synthetix.io/governance.png" />
        <meta name="twitter:url" content="https://governance.synthetix.io/governance.png" />
      </Head>
      <Flex w="100%" justifyContent="center">
        <Container
          maxW={{ base: '100%', md: '768px', lg: '1280px' }}
          pt={{ base: 4, md: 14 }}
          mb="5"
        >
          <Flex flexDir="column">
            <Heading color="gray.50" fontSize={{ base: '4xl', md: '5xl' }} mb="2">
              Governing Councils
            </Heading>
            <Text fontSize="14px" lineHeight="20px" color="gray.500">
              The Synthetix Protocol is governed by three councils, each responsible for a core
              aspect of a DAO.
            </Text>
          </Flex>
          <Flex wrap={{ base: 'wrap', lg: 'nowrap' }} w="100%" gap={{ base: 4, lg: 6 }} mt="8">
            {councils.map((council) => (
              <CouncilCard
                council={council}
                votesReceived={
                  votes && votes[totalVotesForCouncil(council.slug)]
                    ? votes[totalVotesForCouncil(council.slug)].toNumber()
                    : 0
                }
                key={council.address.concat('council-card')}
              />
            ))}
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

export default App;

function totalVotesForCouncil(council: CouncilSlugs) {
  switch (council) {
    case 'spartan':
      return 'totalVotesSpartan';
    case 'ambassador':
      return 'totalVotesAmbassador';
    case 'treasury':
      return 'totalVotesTreasury';
  }
}
