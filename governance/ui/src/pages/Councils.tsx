import { Alert, AlertDescription, AlertIcon, Container, Flex, Link } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';
import CouncilMembers from '../components/CouncilMembers/CouncilMembers';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import { CouncilSlugs } from '../utils/councils';

export default function Councils() {
  const { council } = useParams();
  const activeCouncil = council as CouncilSlugs;

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
          <CouncilMembers activeCouncil={activeCouncil} />
        </Flex>
        <UserActionBox activeCouncil={activeCouncil} />
      </Container>
    </Flex>
  );
}
