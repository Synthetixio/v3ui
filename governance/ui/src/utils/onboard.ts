import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';

import { NETWORKS, appMetadata } from '@snx-v3/useBlockchain';

const injected = injectedModule();

// Governance Supported Networks
// MAINNET, SEPOLIA, BASE, BASE SEPOLIA, OPTIMISM, OPTIMISM SEPOLIA
const supportedNetworks = [1, 11155111, 8453, 84532, 10, 11155420];

// Filter networks to only supported ones
export const networks = NETWORKS.filter((n) => supportedNetworks.includes(n.id)).map((n) => ({
  id: n.id,
  token: n.token,
  label: n.label,
  rpcUrl: n.rpcUrl(),
}));

export const onboard = init({
  wallets: [injected],
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
