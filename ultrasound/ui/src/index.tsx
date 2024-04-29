import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RecoilRoot } from 'recoil';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onboard } from '../utils/onboard';
import { App } from './App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

if (typeof document !== 'undefined') {
  // eslint-disable-next-line no-undef
  const element = document.querySelector('#app');
  if (element) {
    const root = createRoot(element);
    root.render(
      <RecoilRoot>
        <QueryClientProvider client={new QueryClient()}>
          <ReactQueryDevtools />
          <Web3OnboardProvider web3Onboard={onboard}>
            <ChakraProvider theme={theme}>
              <Fonts />
              <App />
            </ChakraProvider>
          </Web3OnboardProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );
  }
}
