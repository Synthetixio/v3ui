import { NETWORKS, appMetadata } from '@snx-v3/useBlockchain';
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets';
import trezorModule from '@web3-onboard/trezor';
import ledgerModule from '@web3-onboard/ledger';
import walletConnectModule from '@web3-onboard/walletconnect';
// import gnosisModule from '@web3-onboard/gnosis';
import coinbaseModule from '@web3-onboard/coinbase';
import { init } from '@web3-onboard/react';

// LP App Supported Networks
// MAINNET, SEPOLIA, BASE, BASE SEPOLIA, Arbitrum
const supportedNetworks = [1, 11155111, 8453, 84532, 421614, 42161];

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
      appUrl: 'https://liquidity.synthetix.eth.limo',
      email: 'info@synthetix.io',
    }),
    ledgerModule({
      projectId: 'd6eac005846a1c3be1f8eea3a294eed9',
      walletConnectVersion: 2,
    }),
    walletConnectModule({
      version: 2,
      projectId: 'd6eac005846a1c3be1f8eea3a294eed9',
      dappUrl: 'liquidity.synthetix.eth.limo',
    }),
    // gnosisModule(),
    coinbaseModule(),
  ],
  chains: [...networks],
  appMetadata: {
    ...appMetadata,
    name: 'Synthetix Liquidity',
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
