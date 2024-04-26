import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RecoilRoot } from 'recoil';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onboard } from '../utils/onboard';
import { App } from './App';

const customTheme = extendTheme({
  ...theme,
});

// ts-ignore next-line
const root = createRoot(document!.querySelector('#app'));
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
          <App />
        </ChakraProvider>
      </Web3OnboardProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
