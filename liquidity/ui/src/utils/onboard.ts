import { NETWORKS, appMetadata } from '@snx-v3/useBlockchain';
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets';
import trezorModule from '@web3-onboard/trezor';
import ledgerModule from '@web3-onboard/ledger';
import walletConnectModule from '@web3-onboard/walletconnect';
import gnosisModule from '@web3-onboard/gnosis';
import coinbaseModule from '@web3-onboard/coinbase';
import { init } from '@web3-onboard/react';
import type { ChainWithDecimalId } from '@web3-onboard/common';

// Filter networks to only supported ones
export const chains: ChainWithDecimalId[] = Object.values(
  NETWORKS.reduce((result, network) => {
    if (!network.isSupported) {
      return result;
    }
    if (network.id in result) {
      // We cannot have duplicate chains, but we can have multiple deployments per chain
      return result;
    }
    return Object.assign(result, {
      [network.id]: {
        id: network.id,
        token: network.token,
        label: network.label,
        rpcUrl: network.rpcUrl(),
        publicRpcUrl: network.publicRpcUrl,
      },
    });
  }, {})
);

export const onboard = init({
  wallets: [
    coinbaseModule(),
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
    gnosisModule(),
  ],
  chains,
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
