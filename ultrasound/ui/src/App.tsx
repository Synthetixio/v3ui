import { Flex } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Main } from '../components/Main';

export function App() {
  return (
    <Flex flexDir="column" alignItems="center">
      <Header />
      <Main />
    </Flex>
  );
}
