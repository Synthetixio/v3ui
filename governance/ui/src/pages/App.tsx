import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import councils from '../utils/councils';
import { CouncilCard } from '../components/CouncilCard';

function App() {
  return (
    <Flex w="100%" justifyContent="center">
      <Container maxW={{ base: '100%', md: '768px', lg: '1280px' }} pt={{ base: 4, md: 14 }} mb="5">
        <Flex flexDir="column">
          <Heading color="gray.50" fontSize={{ base: '4xl', md: '5xl' }} mb="2">
            Governing Councils
          </Heading>
          <Text fontSize="14px" lineHeight="20px" color="gray.500">
            The Synthetix Protocol is governed by three councils, each responsible for a core aspect
            of a DAO.
          </Text>
        </Flex>
        <Flex wrap={{ base: 'wrap', lg: 'nowrap' }} w="100%" gap={{ base: 4, lg: 6 }} mt="8">
          {councils.map((council) => (
            <CouncilCard council={council} key={council.address.concat('council-card')} />
          ))}
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;
