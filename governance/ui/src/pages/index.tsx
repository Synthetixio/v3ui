import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { BlockchainProvider } from '@snx-v3/useBlockchain';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../components/Header/Header';
import Councils from './Councils';
import Admin from './Admin';
import MyVotes from './MyVotes';

const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: '/admin',
    element: (
      <>
        <Header />
        <Admin />
      </>
    ),
  },
  {
    path: '/councils',
    element: (
      <>
        <Header />
        <Councils />
      </>
    ),
  },
  {
    path: '/my-votes',
    element: (
      <>
        <Header />
        <MyVotes />
      </>
    ),
  },
  //  Todo @dev remove them?
  // {
  //   path: '/members',
  //   element: (
  //     <>
  //       <Header />
  //       <Members />
  //     </>
  //   ),
  // },
  // {
  //   path: '/profile',
  //   element: (
  //     <>
  //       <Header />
  //       <Profile />
  //     </>
  //   ),
  // },
]);

const customTheme = extendTheme({
  ...theme,
  components: {
    ...theme.components,
    Table: {
      variants: {
        simple: {
          th: {
            borderBottom: 0,
            color: 'gray.600',
          },
          td: {
            borderBottom: 0,
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'navy.900',
      },
    },
  },
});

const container = document.querySelector('#app');

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={new QueryClient()}>
        <BlockchainProvider>
          <ChakraProvider theme={customTheme}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Fonts />
            <RouterProvider router={router} />
          </ChakraProvider>
        </BlockchainProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
