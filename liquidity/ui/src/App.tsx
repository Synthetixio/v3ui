import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react';
import { Fonts, theme } from '@synthetixio/v3-theme';
import { DEFAULT_QUERY_STALE_TIME } from '@snx-v3/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GasSpeedProvider } from '@snx-v3/useGasSpeed';
import { TermsModal } from '@snx-v3/TermsModal';
import { SESSION_STORAGE_KEYS } from '@snx-v3/constants';
import { Router } from './Router';
import { Web3OnboardProvider } from '@web3-onboard/react';
import Head from 'react-helmet';
import { onboard } from './utils/onboard';
import { Progress } from './utils/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false, //  if queries needs refetching we should be explicit about it, given erc7412
      staleTime: DEFAULT_QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
      throwOnError: (e) => {
        console.error(e);
        return false;
      },
    },
    mutations: {
      throwOnError: (e) => {
        console.error(e);
        return false;
      },
    },
  },
});

const extendedTheme = extendTheme({
  ...theme,
  components: {
    ...theme.components,
    Progress,
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
    localStorage.getItem(SESSION_STORAGE_KEYS.TERMS_CONDITIONS_ACCEPTED) === 'true';

  return (
    <>
      <Head>
        {/* open graph */}
        <meta property="og:url" content="https://liquidity.synthetix.eth.limo/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Synthetix | Liquidity" />
        <meta
          property="og:description"
          content="The Liquidity Layer of DeFi. Provide liquidity for the next generation of permissionless protocols"
        />
        <meta property="og:image" content="https://liquidity.synthetix.eth.limo/Liquidity.jpg" />
        <meta property="og:image:alt" content="Synthetix | Liquidity" />
        <meta property="og:site_name" content="" />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@synthetix_io" />
        <meta name="twitter:creator" content="@synthetix_io" />
        <meta name="twitter:image" content="https://liquidity.synthetix.eth.limo/Liquidity.jpg" />
        <meta name="twitter:url" content="https://liquidity.synthetix.eth.limo/" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Web3OnboardProvider web3Onboard={onboard}>
          <ChakraProvider theme={extendedTheme}>
            <ColorMode />
            <Fonts />
            <GasSpeedProvider>
              <HashRouter>
                <TermsModal
                  defaultOpen={process.env.NODE_ENV !== 'development' && !TERMS_CONDITIONS_ACCEPTED}
                />
                <Router />
              </HashRouter>
            </GasSpeedProvider>
            <ReactQueryDevtools />
          </ChakraProvider>
        </Web3OnboardProvider>
      </QueryClientProvider>
    </>
  );
};
