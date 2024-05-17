import { ChakraProvider } from '@chakra-ui/react';
import { Fonts, theme } from '@synthetixio/v3-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Web3OnboardProvider } from '@web3-onboard/react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { onboard } from '../utils/onboard';
import { App } from './App';

const container = document.querySelector('#app');

export async function bootstrap() {
  if (!container) {
    throw new Error('Container #app does not exist');
  }

  if (process.env.NODE_ENV === 'development') {
    const { Wei, wei } = await import('@synthetixio/wei');
    const { ethers } = await import('ethers');
    // @ts-ignore
    window.devtoolsFormatters = window.devtoolsFormatters ?? [];
    // @ts-ignore
    window.devtoolsFormatters.push({
      header: function (obj: any) {
        if (obj instanceof ethers.BigNumber) {
          return [
            'div',
            { style: 'color: #f33' },
            ['span', {}, 'ethers.BigNumber('],
            ['span', { style: 'color: #3f3' }, wei(obj).toString()],
            ['span', {}, ')'],
          ];
        }
        if (obj instanceof Wei) {
          return [
            'div',
            { style: 'color: #f33' },
            ['span', {}, 'Wei('],
            ['span', { style: 'color: #3f3' }, obj.toString()],
            ['span', {}, ')'],
          ];
        }
        return null;
      },
      hasBody: function () {
        return false;
      },
    });
  }

  const root = ReactDOM.createRoot(container);
  root.render(
    <RecoilRoot>
      <QueryClientProvider
        client={new QueryClient({ defaultOptions: { queries: { staleTime: 999999 } } })}
      >
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
