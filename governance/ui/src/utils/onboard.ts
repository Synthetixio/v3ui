import { appMetadata, NETWORKS } from '@snx-v3/useBlockchain';
import coinbaseModule from '@web3-onboard/coinbase';
import gnosisModule from '@web3-onboard/gnosis';

import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import { init } from '@web3-onboard/react';
import trezorModule from '@web3-onboard/trezor';
import walletConnectModule from '@web3-onboard/walletconnect';

const supportedDeployments = [
  '1-main',
  '11155111-main',
  '8453-andromeda',
  '84532-andromeda',
  '42161-main',
  '421614-main',
];

// Filter networks to only supported ones
export const chains = NETWORKS.filter(({ id, preset }) =>
  supportedDeployments.includes(`${id}-${preset}`)
).map((n) => ({
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
      projectId: process.env.WC_PROJECT_ID ?? '',
      walletConnectVersion: 2,
    }),
    walletConnectModule({
      version: 2,
      projectId: process.env.WC_PROJECT_ID ?? '',
      dappUrl: 'https://governance.synthetix.io',
    }),
    gnosisModule(),
    coinbaseModule(),
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
