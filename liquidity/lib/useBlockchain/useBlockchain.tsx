import { ethers } from 'ethers';
import React, { useMemo } from 'react';
import {
  BaseIcon,
  EthereumIcon,
  FailedIcon,
  LogoIcon,
  OptimismIcon,
  ArbitrumIcon,
} from '@snx-v3/icons';
import { INFURA_KEY as DEFAULT_INFURA_KEY } from '@snx-v3/constants';
import SynthetixIcon from './SynthetixIcon.svg';
import SynthetixLogo from './SynthetixLogo.svg';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import { useCallback } from 'react';
import { IconProps } from '@chakra-ui/react';

export type Network = {
  id: number;
  preset: string;
  hexId: string;
  token: string;
  name: string;
  rpcUrl: () => string;
  label: string;
  isSupported: boolean;
  publicRpcUrl: string;
  isTestnet: boolean;
};

export const UNSUPPORTED_NETWORK: Network = {
  id: 0,
  preset: 'main',
  hexId: `0x${Number(0).toString(16)}`,
  token: 'ETH',
  name: 'unsupported',
  rpcUrl: () => '',
  publicRpcUrl: '',
  label: 'Unsupported',
  isSupported: false,
  isTestnet: false,
};

interface NetworkIconProps extends IconProps {
  networkId?: Network['id'];
  size?: string;
}

export const NetworkIcon = ({ networkId, size = '24px', ...props }: NetworkIconProps) => {
  switch (networkId) {
    case 1:
      return <EthereumIcon w={size} h={size} {...props} />;
    case 10:
      return <OptimismIcon w={size} h={size} {...props} />;
    case 11155111:
      return <EthereumIcon w={size} h={size} {...props} />;
    case 84531:
      return <BaseIcon w={size} h={size} {...props} />;
    case 84532:
      return <BaseIcon w={size} h={size} {...props} />;
    case 13370:
      return <LogoIcon w="29px" h="21px" {...props} />;
    case 8453:
      return <BaseIcon w={size} h={size} {...props} />;
    case 11155420:
      return <OptimismIcon w={size} h={size} {...props} />;
    case 421614:
      return <ArbitrumIcon w={size} h={size} {...props} />;
    case 42161:
      return <ArbitrumIcon w={size} h={size} {...props} />;
    default:
      return <FailedIcon w={size} h={size} {...props} />;
  }
};

export const NETWORKS: Network[] = [
  {
    id: 8453,
    preset: 'andromeda',
    hexId: `0x${Number(8453).toString(16)}`,
    token: 'ETH',
    name: 'base',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://base-mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Base',
    isSupported: false,
    publicRpcUrl: 'https://base.publicnode.com',
    isTestnet: false,
  },
  {
    id: 1,
    preset: 'main',
    hexId: `0x${Number(1).toString(16)}`,
    token: 'ETH',
    name: 'mainnet',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Ethereum',
    isSupported: true,
    publicRpcUrl: 'https://ethereum.publicnode.com',
    isTestnet: false,
  },
  {
    id: 10,
    preset: 'main',
    hexId: `0x${Number(10).toString(16)}`,
    token: 'ETH',
    name: 'optimism-mainnet',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://optimism-mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Optimism',
    isSupported: true,
    publicRpcUrl: 'https://mainnet.optimism.io',
    isTestnet: false,
  },
  {
    id: 11155111,
    preset: 'main',
    hexId: `0x${Number(11155111).toString(16)}`,
    token: 'ETH',
    name: 'sepolia',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://sepolia.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Sepolia Testnet',
    isSupported: true,
    publicRpcUrl: 'https://ethereum-sepolia.publicnode.com',
    isTestnet: true,
  },
  {
    id: 84532,
    preset: 'andromeda',
    hexId: `0x${Number(84532).toString(16)}`,
    token: 'ETH',
    name: 'base-sepolia',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://base-sepolia.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Base Sepolia',
    isSupported: false, // hidden by default but if wallet switched to Base Sepolia it will be visible
    publicRpcUrl: 'https://sepolia.base.org',
    isTestnet: true,
  },
  {
    id: 13370,
    preset: 'main',
    hexId: `0x${Number(13370).toString(16)}`,
    token: 'ETH',
    name: 'cannon',
    rpcUrl: () => `http://127.0.0.1:8545`,
    label: 'Cannon',
    isSupported: false, // hidden by default but if wallet switched to Cannon it will be visible
    publicRpcUrl: 'http://127.0.0.1:8545',
    isTestnet: true,
  },
  {
    id: 11155420,
    preset: 'main',
    hexId: `0x${Number(11155420).toString(16)}`,
    token: 'ETH',
    name: 'optimism-sepolia',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://optimism-sepolia.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Optimism Sepolia',
    isSupported: false,
    publicRpcUrl: 'https://sepolia.optimism.io/',
    isTestnet: true,
  },
  {
    id: 421614,
    preset: 'main',
    hexId: `0x${Number(421614).toString(16)}`,
    token: 'ETH',
    name: 'arbitrum-sepolia',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://arbitrum-sepolia.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Arbitrum Sepolia',
    isSupported: true,
    publicRpcUrl: 'https://sepolia.arbiscan.io/',
    isTestnet: true,
  },
  {
    id: 42161,
    preset: 'main',
    hexId: `0x${Number(42161).toString(16)}`,
    token: 'ETH',
    name: 'arbitrum',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Arbitrum',
    isSupported: true,
    publicRpcUrl: 'https://arbiscan.io/',
    isTestnet: false,
  },
  {
    id: 42161,
    preset: 'arbthetix',
    hexId: `0x${Number(42161).toString(16)}`,
    token: 'ETH',
    name: 'arbitrum',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Arbthetix (withdraw only)',
    isSupported: true,
    publicRpcUrl: 'https://arbiscan.io/',
    isTestnet: false,
  },
];

export const deploymentsWithERC7412: string[] = [
  '8453-andromeda',
  '84532-andromeda',
  '42161-main',
  '421614-main',
  '42161-arbthetix',
];

export const DEFAULT_NETWORK =
  NETWORKS.find(
    (network) =>
      `${network.id}-${network.preset}` === window.localStorage.getItem('DEFAULT_NETWORK')
  ) ?? NETWORKS[1];

export const appMetadata = {
  name: 'Synthetix',
  icon: SynthetixIcon,
  logo: SynthetixLogo,
  description: 'Synthetix | The derivatives liquidity protocol.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Brave Wallet', url: 'https://brave.com/wallet' },
  ],
  gettingStartedGuide: 'https://synthetix.io',
  explore: 'https://blog.synthetix.io',
};

export function useProviderForChain(network?: Network | null) {
  return network ? new ethers.providers.JsonRpcProvider(network.rpcUrl()) : undefined;
}

export function useDefaultProvider() {
  const { network } = useNetwork();
  return useProviderForChain(network);
}

export function useWallet() {
  const [{ wallet }, conn, disconn] = useConnectWallet();

  const connect = useCallback(conn, [conn]);
  const disconnect = useCallback(disconn, [disconn]);

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

export function useGetNetwork(chainId: string) {
  return useMemo(() => {
    return NETWORKS.find((n) => n.hexId === chainId);
  }, [chainId]);
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
