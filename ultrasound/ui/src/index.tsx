import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RecoilRoot } from 'recoil';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onboard } from '../utils/onboard';
import { App } from './App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const customTheme = extendTheme({
  ...theme,
});

const root = createRoot(document.querySelector('#app'));
root.render(
  <RecoilRoot>
    <QueryClientProvider client={new QueryClient()}>
      <ReactQueryDevtools />
      <Web3OnboardProvider web3Onboard={onboard}>
        <ChakraProvider theme={customTheme}>
          <Fonts />
          <App />
        </ChakraProvider>
      </Web3OnboardProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
