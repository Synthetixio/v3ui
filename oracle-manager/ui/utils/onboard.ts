import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { NETWORKS } from '@snx-v3/useBlockchain';

const supportedNetworks = [1, 10];

export const networks = NETWORKS.filter((n) => supportedNetworks.includes(n.id)).map((n) => ({
  id: n.id,
  token: n.token,
  label: n.label,
  rpcUrl: n.rpcUrl(),
}));

export const onboard = init({
  wallets: [injectedModule({})],
  chains: [...networks],
});
