import { Container, Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { CouncilSlugs } from '../utils/councils';
import { useParams } from 'react-router-dom';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import CouncilNominees from '../components/CouncilNominees/CouncilNominees';
import CouncilMembers from '../components/CouncilMembers/CouncilMembers';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

export default function Councils() {
  const { council } = useParams();
  const activeCouncil = council as CouncilSlugs;
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);

  return (
    <Flex flexDirection="column" alignItems="center">
      <CouncilTabs activeCouncil={activeCouncil} />
      <Container maxW={{ base: '100%', lg: '1280px' }} justifyContent="flex-start" w="100%">
        <Alert status="info" variant="left-accent" mb="6" colorScheme="blue">
          <AlertIcon />
          <AlertDescription>
            Synthetix Governance has undergone significant changes. Learn about our&nbsp;
            <Link color="cyan.500" target="_blank" href="https://sips.synthetix.io/srs/sr-2/">
              new streamlined structure.
            </Link>
          </AlertDescription>
        </Alert>
        <CouncilInformation activeCouncil={activeCouncil} />
      </Container>
      <Container
        maxW={{ base: '100%', lg: '1280px' }}
        gap={4}
        as={Flex}
        flexDirection="row"
        w="100%"
        mb="4"
      >
        <Flex flexDir="column" w="100%">
          {councilPeriod === '0' ? (
            <CouncilMembers activeCouncil={activeCouncil} />
          ) : (
            <CouncilNominees activeCouncil={activeCouncil} />
          )}
          {/* <PassedElectionAccordion
            activeCouncil={councils.find(
              (council) => council.slug === (activeCouncil)
            )}
          /> */}
        </Flex>
        <UserActionBox activeCouncil={activeCouncil} />
      </Container>
    </Flex>
  );
}
