import ReactDOM from 'react-dom/client';
import { App } from './App';
import { preserveConnectedWallets, autoConnect } from '@snx-v3/useBlockchain';

const container = document.querySelector('#app');
async function run() {
  if (!container) {
    throw new Error('Container #app does not exist');
  }

  preserveConnectedWallets();
  await autoConnect();

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
  root.render(<App />);
}
run();
