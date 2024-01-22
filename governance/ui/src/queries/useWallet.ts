import { NETWORKS } from '@snx-v3/useBlockchain';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import { ethers } from 'ethers';
import { useCallback } from 'react';

export function useWallet() {
  const [{ wallet }, connect, disconnect] = useConnectWallet();

  if (!wallet) {
    return {
      activeWallet: null,
      walletsInfo: null,
      connect,
      disconnect,
    };
  }

  const activeWallet = wallet?.accounts[0];

  return {
    activeWallet: activeWallet,
    walletsInfo: wallet,
    connect,
    disconnect,
  };
}

export function useNetwork() {
  const [{ connectedChain }, setChain] = useSetChain();

  // Hydrate the network info
  const network = NETWORKS.find((n) => n.hexId === connectedChain?.id);

  const setNetwork = useCallback(
    async (networkId: number) => {
      const newNetwork = NETWORKS.find((n) => n.id === networkId);
      if (!newNetwork) return;
      await setChain({ chainId: newNetwork?.hexId });
    },
    [setChain]
  );

  if (!network) {
    return {
      network: null,
      setNetwork,
    };
  }

  return {
    network,
    setNetwork,
  };
}

export function useIsConnected(): boolean {
  const [{ wallet }] = useConnectWallet();
  return Boolean(wallet);
}

export function useSigner() {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return null;
  }

  const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');

  return provider.getSigner();
}

export function useProvider() {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return null;
  }

  const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');

  return provider;
}
