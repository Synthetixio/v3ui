import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { BlockchainProvider } from '@snx-v3/useBlockchain';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../components/Header/Header';
import Councils from './Councils';
import Members from './Members';
import Profile from './Profile';
import { AnnouncementBanner } from '../components/AnnouncementBanner';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <AnnouncementBanner />
        <App />
      </>
    ),
  },
  {
    path: '/councils',
    element: (
      <>
        <Header />
        <AnnouncementBanner />
        <Councils />
      </>
    ),
  },
  {
    path: '/members',
    element: (
      <>
        <Header />
        <AnnouncementBanner />
        <Members />
      </>
    ),
  },
  {
    path: '/profile',
    element: (
      <>
        <Header />
        <AnnouncementBanner />
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
