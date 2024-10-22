import {
  Alert,
  AlertDescription,
  AlertIcon,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import Head from 'react-helmet';
import { CouncilCard } from '../components/CouncilCard';
import councils from '../utils/councils';

function App() {
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
          <Alert status="info" variant="left-accent" mb="6" colorScheme="blue">
            <AlertIcon />
            <AlertDescription>
              Synthetix Governance has undergone significant changes. Learn about our&nbsp;
              <Link color="cyan.500" target="_blank" href="https://sips.synthetix.io/srs/sr-2/">
                new streamlined structure.
              </Link>
            </AlertDescription>
          </Alert>

          <Flex flexDir="column">
            <Heading color="gray.50" fontSize={{ base: '4xl', md: '5xl' }} mb="2">
              Spartan Council
            </Heading>
            <Text fontSize="14px" lineHeight="20px" color="gray.500">
              A consolidated council of 7 delegates, each with equal voting power, replacing the
              previous multi-council structure for more effective decision-making.
            </Text>
          </Flex>
          <Flex wrap={{ base: 'wrap', lg: 'nowrap' }} w="100%" gap={{ base: 4, lg: 6 }} mt="8">
            {councils.map((council) => (
              <CouncilCard council={council} key={council.address.concat('council-card')} />
            ))}
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

export default App;
