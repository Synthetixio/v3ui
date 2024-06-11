import { appMetadata, NETWORKS } from '@snx-v3/useBlockchain';
import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';

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
  wallets: [injectedModule({})],
  chains,
  appMetadata: {
    ...appMetadata,
    name: 'Synthetix Oracle Manager',
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
