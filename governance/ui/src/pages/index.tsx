import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Councils from './Councils';
import Admin from './Admin';
import MyVotes from './MyVotes';
import { Layout } from '../components/Layout';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { onboard } from '../utils/onboard';

const router = createHashRouter([
  {
    id: 'root',
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/admin', element: <Admin /> },
      { path: '/councils/:council', element: <Councils /> },
      { path: '/councils', element: <Navigate to="/councils/spartan" /> },
      { path: '/my-votes', element: <MyVotes /> },
    ],
  },
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
    <Web3OnboardProvider web3Onboard={onboard}>
      <RecoilRoot>
        <QueryClientProvider client={new QueryClient()}>
          <ChakraProvider theme={customTheme}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Fonts />
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </Web3OnboardProvider>
  </React.StrictMode>
);
