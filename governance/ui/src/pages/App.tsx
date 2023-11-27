import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import councils from '../utils/councils';
import { CouncilCard } from '../components/CouncilCard';

function App() {
  return (
    <Box px={{ base: 4, md: 10 }} pt={{ base: 4, md: 10 }} mb="5">
      <Flex flexDir="column">
        <Heading color="gray.50" fontSize={{ base: '4xl', md: '5xl' }} mb="2">
          Governing Councils
        </Heading>
        <Text fontSize="14px" lineHeight="20px" color="gray.500">
          The Synthetix Protocol is governed by four bodies, each responsible for a core aspect of a
          DAO
        </Text>
      </Flex>
      <Flex wrap="wrap" w="100%" justifyContent={{ base: 'center', md: 'flex-start' }}>
        {councils.map((council, index) => (
          <CouncilCard
            council={council}
            isLast={index === councils.length - 1}
            key={council.title.concat('landing-page')}
          />
        ))}
      </Flex>
    </Box>
  );
}

export default App;
