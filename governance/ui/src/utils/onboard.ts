import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
// const SEPOLIA_RPC_URL = `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;

const injected = injectedModule();

export const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: 1,
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum',
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc',
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org',
    },
  ],
  appMetadata: {
    name: 'Synthetix Governance',
    icon: '<SVG_ICON_STRING>',
  },
});

const connectedWallets = await onboard.connectWallet();

console.log(connectedWallets);
