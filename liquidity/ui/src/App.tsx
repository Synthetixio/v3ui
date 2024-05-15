import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { Fonts, theme } from '@synthetixio/v3-theme';
import { DEFAULT_QUERY_STALE_TIME } from '@snx-v3/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GasSpeedProvider } from '@snx-v3/useGasSpeed';
import { TermsModal } from '@snx-v3/TermsModal';
import { SESSION_STORAGE_KEYS } from '@snx-v3/constants';
import { Router } from './Router';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { onboard } from './utils/onboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false, //  if queries needs refetching we should be explicit about it, given erc7412
      staleTime: DEFAULT_QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);
  return null;
}

export const App = () => {
  const TERMS_CONDITIONS_ACCEPTED =
    sessionStorage.getItem(SESSION_STORAGE_KEYS.TERMS_CONDITIONS_ACCEPTED) === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      <Web3OnboardProvider web3Onboard={onboard}>
        <ChakraProvider theme={theme}>
          <ColorMode />
          <Fonts />
          <GasSpeedProvider>
            <HashRouter>
              <TermsModal defaultOpen={!TERMS_CONDITIONS_ACCEPTED} />
              <Router />
            </HashRouter>
          </GasSpeedProvider>
          <ReactQueryDevtools />
        </ChakraProvider>
      </Web3OnboardProvider>
    </QueryClientProvider>
  );
};
