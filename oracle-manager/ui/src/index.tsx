import { createRoot } from 'react-dom/client';
import { ChakraProvider, ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Header } from '../components/Header';
import { RegisteredNode } from './RegisteredNode';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onboard } from '../utils/onboard';

const Alert: ComponentStyleConfig = {
  variants: {
    solid: (props) => {
      return {
        icon: { color: 'black' },
        container: { bg: `${props.colorScheme}.500`, color: 'black' },
      };
    },
  },
};

const customTheme = extendTheme({
  ...theme,
  components: { ...theme.components, Alert },
});

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: 'node/:network/:nodeId', element: <RegisteredNode /> },
]);
const container = document.querySelector('#app');

const root = createRoot(container!);
root.render(
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
      <Web3OnboardProvider web3Onboard={onboard}>
        <ChakraProvider theme={customTheme}>
          <Fonts />
          <Header />
          <RouterProvider router={router} />
        </ChakraProvider>
      </Web3OnboardProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
