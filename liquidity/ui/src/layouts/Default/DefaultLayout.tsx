import { FC } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export const DefaultLayout: FC = () => (
  <Box
    as="main"
    minHeight="100vh"
    color="rgba(255,255,255,0.85)"
    display="flex"
    flexDirection="column"
    bg="navy.900"
  >
    <Flex flex="1" flexDirection="column">
      <Header />
      <Container display="flex" flexDir="column" maxW="1240px" flex="1">
        <Outlet />
      </Container>
    </Flex>
  </Box>
);
