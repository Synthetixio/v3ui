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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchInterval: 9999999,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
              },
            },
          })
        }
      >
        <BlockchainProvider>
          <ChakraProvider theme={customTheme}>
            <Fonts />
            <Header />
            <RouterProvider router={router} />
          </ChakraProvider>
        </BlockchainProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
