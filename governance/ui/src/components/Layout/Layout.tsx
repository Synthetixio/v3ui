import { Flex } from '@chakra-ui/react';
import Footer from '../Footer/Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <Flex minH="100vh" flexDir="column">
        <Header />
        <Outlet />
        <Footer />
      </Flex>
    </>
  );
}
