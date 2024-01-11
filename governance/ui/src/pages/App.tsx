import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import councils from '../utils/councils';
import { CouncilCard } from '../components/CouncilCard';

function App() {
  return (
    <Flex w="100%" justifyContent="center">
      <Container px={{ base: 4, md: 10 }} pt={{ base: 4, md: 14 }} mb="5" maxW="1440px">
        <Flex flexDir="column">
          <Heading color="gray.50" fontSize={{ base: '4xl', md: '5xl' }} mb="2">
            Governing Councils
          </Heading>
          <Text fontSize="14px" lineHeight="20px" color="gray.500">
            The Synthetix Protocol is governed by four councils, each responsible for a core aspect
            of a DAO.
          </Text>
        </Flex>
        <Flex wrap="wrap" w="100%" gap="6" mt="8" justifyContent={{ md: 'center', lg: 'initial' }}>
          {councils.map((council) => (
            <CouncilCard council={council} key={council.address} />
          ))}
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;
