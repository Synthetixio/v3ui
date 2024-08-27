import { NETWORKS, appMetadata } from '@snx-v3/useBlockchain';
import coinbaseModule from '@web3-onboard/coinbase';
import gnosisModule from '@web3-onboard/gnosis';
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import { init } from '@web3-onboard/react';
import trezorModule from '@web3-onboard/trezor';
import walletConnectModule from '@web3-onboard/walletconnect';

export const supportedNetworks = [2192, 13001, 10];

export const chains = NETWORKS.filter((network) => supportedNetworks.includes(network.id)).map(
  (network) => ({
    id: network.id,
    label: network.label,
    rpcUrl: network.rpcUrl(),
    token: network.token,
  })
);

export const onboard = init({
  wallets: [
    coinbaseModule(),
    injectedModule({ displayUnavailable: [ProviderLabel.MetaMask, ProviderLabel.Trust] }),
    trezorModule({
      appUrl: 'https://governance.synthetix.io',
      email: 'info@synthetix.io',
    }),
    ledgerModule({
      projectId: process.env.WC_PROJECT_ID ?? '',
      walletConnectVersion: 2,
    }),
    walletConnectModule({
      version: 2,
      projectId: process.env.WC_PROJECT_ID ?? '',
      dappUrl: 'https://governance.synthetix.io',
    }),
    gnosisModule(),
  ],
  chains,
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
