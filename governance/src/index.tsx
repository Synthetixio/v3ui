import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { BlockchainProvider } from '@snx-v3/useBlockchain';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../components/Header';
import Councils from './Councils';
import Members from './Members';
import Profile from './Profile';

const router = createBrowserRouter([
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
    path: '/councils',
    element: (
      <>
        <Header />
        <Councils />
      </>
    ),
  },
  {
    path: '/members',
    element: (
      <>
        <Header />
        <Members />
      </>
    ),
  },
  {
    path: '/profile',
    element: (
      <>
        <Header />
        <Profile />
      </>
    ),
  },
]);

const customTheme = extendTheme({
  ...theme,
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
            <Fonts />
            <RouterProvider router={router} />
          </ChakraProvider>
        </BlockchainProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
