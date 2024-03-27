import { NETWORKS, appMetadata } from '@snx-v3/useBlockchain';
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets';
import trezorModule from '@web3-onboard/trezor';
import ledgerModule from '@web3-onboard/ledger';
import walletConnectModule from '@web3-onboard/walletconnect';
// import gnosisModule from '@web3-onboard/gnosis';
import coinbaseModule from '@web3-onboard/coinbase';
import { init } from '@web3-onboard/react';

// LP App Supported Networks
// MAINNET, SEPOLIA, BASE, BASE SEPOLIA,
const supportedNetworks = [1, 11155111, 8453, 84532];

// Filter networks to only supported ones
export const networks = NETWORKS.filter((n) => supportedNetworks.includes(n.id)).map((n) => ({
  id: n.id,
  token: n.token,
  label: n.label,
  rpcUrl: n.rpcUrl(),
}));

export const onboard = init({
  wallets: [
    injectedModule({ displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust] }),
    trezorModule({
      appUrl: 'https://governance.synthetix.io',
      email: 'info@synthetix.io',
    }),
    ledgerModule({
      projectId: 'a4aa25aa9a6ed6fd4c3b11c0cedc4b7c',
      walletConnectVersion: 2,
    }),
    walletConnectModule({
      version: 2,
      projectId: 'a4aa25aa9a6ed6fd4c3b11c0cedc4b7c',
    }),
    // gnosisModule(),
    coinbaseModule(),
  ],
  chains: [...networks],
  appMetadata: {
    ...appMetadata,
    name: 'Synthetix Governance',
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
  notify: {
    enabled: false,
  },
});
