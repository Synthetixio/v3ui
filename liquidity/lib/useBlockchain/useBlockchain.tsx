import { ethers } from 'ethers';
import React from 'react';
import { BaseIcon, EthereumIcon, FailedIcon, LogoIcon, OptimismIcon } from '@snx-v3/icons';
import { INFURA_KEY as DEFAULT_INFURA_KEY, ONBOARD_KEY } from '@snx-v3/constants';
import onboardInit, { AppState, WalletState } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import SynthetixIcon from './SynthetixIcon.svg';
import SynthetixLogo from './SynthetixLogo.svg';

export type Network = {
  id: number;
  preset: string;
  hexId: string;
  token: string;
  name: string;
  rpcUrl: () => string;
  label: string;
  Icon: React.FC;
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
  Icon: () => <FailedIcon width="24px" height="24px" />,
  isSupported: false,
  isTestnet: false,
};

export const NETWORKS: Network[] = [
  {
    id: 1,
    preset: 'main',
    hexId: `0x${Number(1).toString(16)}`,
    token: 'ETH',
    name: 'mainnet',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Ethereum',
    Icon: () => <EthereumIcon />,
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
    Icon: () => <OptimismIcon />,
    isSupported: true,
    publicRpcUrl: 'https://mainnet.optimism.io',
    isTestnet: false,
  },
  {
    id: 5,
    preset: 'main',
    hexId: `0x${Number(5).toString(16)}`,
    token: 'ETH',
    name: 'goerli',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://goerli.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Goerli Testnet',
    Icon: () => <EthereumIcon />,
    isSupported: true,
    publicRpcUrl: 'https://ethereum-goerli.publicnode.com',
    isTestnet: true,
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
    Icon: () => <EthereumIcon />,
    isSupported: true,
    publicRpcUrl: 'https://ethereum-sepolia.publicnode.com',
    isTestnet: true,
  },
  {
    id: 420,
    preset: 'main',
    hexId: `0x${Number(420).toString(16)}`,
    token: 'ETH',
    name: 'optimism-goerli',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://optimism-goerli.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Optimistic Goerli',
    Icon: () => <OptimismIcon />,
    isSupported: true,
    publicRpcUrl: 'https://goerli.optimism.io',
    isTestnet: true,
  },
  {
    id: 8453,
    preset: 'andromeda',
    hexId: `0x${Number(8453).toString(16)}`,
    token: 'ETH',
    name: 'base',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://base.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Base',
    Icon: () => <BaseIcon />,
    isSupported: true,
    publicRpcUrl: 'https://base.publicnode.com',
    isTestnet: false,
  },
  {
    id: 84531,
    preset: 'andromeda',
    hexId: `0x${Number(84531).toString(16)}`,
    token: 'ETH',
    name: 'base-goerli',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://base-goerli.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Base Goerli (Andromeda)',
    Icon: () => <BaseIcon />,
    isSupported: false, // hidden by default but if wallet switched to Base Goerli it will be visible
    publicRpcUrl: 'https://goerli.base.org',
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
    label: 'Base Sepolia (Andromeda)',
    Icon: () => <BaseIcon />,
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
    Icon: () => <LogoIcon />,
    isSupported: false, // hidden by default but if wallet switched to Cannon it will be visible
    publicRpcUrl: 'http://127.0.0.1:8545',
    isTestnet: true,
  },
  {
    id: 8453,
    preset: 'main',
    hexId: `0x${Number(8453).toString(16)}`,
    token: 'ETH',
    name: 'base',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://base-mainnet.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Base',
    Icon: () => <BaseIcon />,
    isSupported: false,
    publicRpcUrl: 'https://base.publicnode.com',
    isTestnet: false,
  },
  {
    id: 11155420,
    preset: 'main',
    hexId: `0x${Number(11155420).toString(16)}`,
    token: 'ETH',
    name: 'optimism-sepolia',
    rpcUrl: (INFURA_KEY?: string) =>
      `https://optimism-sepolia.infura.io/v3/${INFURA_KEY ?? DEFAULT_INFURA_KEY}`,
    label: 'Base',
    Icon: () => <OptimismIcon />,
    isSupported: false,
    publicRpcUrl: 'https://sepolia.optimism.io/',
    isTestnet: true,
  },
];

export const deploymentsWithERC7412: string[] = ['84531-andromeda', '84532-andromeda'];

export const DEFAULT_NETWORK =
  NETWORKS.find(
    (network) =>
      `${network.id}-${network.preset}` === window.localStorage.getItem('DEFAULT_NETWORK')
  ) ?? NETWORKS[1];

const injected = injectedModule();
const walletConnect = walletConnectModule({
  version: 2,
  projectId: `${process.env.NEXT_PUBLIC_WC_PROJECT_ID}`,
  requiredChains: [1, 10, 8453],
});

const wallets = [injected, walletConnect];

const uniqueChains: Network[] = Object.values(
  NETWORKS.reduce((result, network) => {
    if (network.id in result) {
      return result;
    }
    Object.assign(result, {
      [network.id]: network,
    });
    return result;
  }, {})
);

const chains = uniqueChains.map((network) => ({
  id: network.hexId,
  token: network.token,
  label: network.label,
  rpcUrl: network.rpcUrl(),
  publicRpcUrl: network.publicRpcUrl,
}));

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

export const onboard = onboardInit({
  theme: 'dark',
  wallets,
  chains,
  appMetadata,
  apiKey: ONBOARD_KEY,
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

export const BlockchainContext = React.createContext<{
  onboardState: AppState;
  network: Network;
  setNetwork: React.Dispatch<React.SetStateAction<Network>>;
}>({
  onboardState: onboard.state.get(),
  network: DEFAULT_NETWORK,
  setNetwork: () => null,
});

export const BlockchainProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [onboardState, setOnboardState] = React.useState(onboard.state.get());
  const [network, setNetwork] = React.useState(DEFAULT_NETWORK);

  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    const { unsubscribe } = onboard.state.select().subscribe((nextState) => {
      setOnboardState(nextState);

      const [currentWallet] = nextState.wallets;
      if (currentWallet) {
        const [chain] = currentWallet.chains;
        if (chain) {
          const selectedNetwork = NETWORKS.find((network) => network.hexId === chain.id);
          if (selectedNetwork) {
            setNetwork(selectedNetwork);
            window.localStorage.setItem(
              'DEFAULT_NETWORK',
              `${selectedNetwork.id}-${selectedNetwork.preset}`
            );
          }
        }
      }
    });
    return () => {
      if (isMounted.current) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <BlockchainContext.Provider value={{ onboardState, network, setNetwork }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export function useOnboardWallet(): WalletState | undefined {
  const { onboardState } = React.useContext(BlockchainContext);
  const { wallets } = onboardState;
  if (wallets.length < 1) {
    return undefined;
  }
  const [wallet] = wallets;

  return wallet;
}

export function useNetwork() {
  const { network } = React.useContext(BlockchainContext);
  const wallet = useOnboardWallet();
  if (
    !wallet ||
    !Array.isArray(wallet.chains) ||
    !wallet.chains[0] ||
    !wallet.chains[0].id ||
    wallet.chains[0].id === network.hexId
  ) {
    return network;
  }
  const connectedChain = NETWORKS.find((network) => network.hexId === wallet.chains[0].id);
  if (connectedChain) {
    return connectedChain;
  }
  return UNSUPPORTED_NETWORK;
}

export function useSetNetwork() {
  const { setNetwork } = React.useContext(BlockchainContext);
  const wallet = useOnboardWallet();
  const hasWallet = Boolean(wallet);
  return React.useCallback(
    async (network: Network) => {
      setNetwork(network);
      window.localStorage.setItem('DEFAULT_NETWORK', `${network.id}-${network.preset}`);
      if (hasWallet) {
        await onboard.setChain({ chainId: network.hexId });
      }
    },
    [setNetwork, hasWallet]
  );
}

export function useIsConnected(): boolean {
  const wallet = useOnboardWallet();
  return Boolean(wallet);
}

export function useProvider() {
  const wallet = useOnboardWallet();
  const network = useNetwork();

  if (wallet) {
    return new ethers.providers.Web3Provider(wallet.provider, 'any');
  }

  return new ethers.providers.JsonRpcProvider(network.rpcUrl());
}

export function useProviderForChain(network?: Network) {
  return network ? new ethers.providers.JsonRpcProvider(network.rpcUrl()) : undefined;
}

export function useSigner() {
  const wallet = useOnboardWallet();

  if (!wallet) {
    return;
  }

  const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
  return provider.getSigner();
}

export function useWallet() {
  const wallet = useOnboardWallet();
  if (!wallet) {
    return undefined;
  }
  const [account] = wallet.accounts;
  return account;
}

export function preserveConnectedWallets() {
  const walletsSubscription = onboard.state.select('wallets');
  const { unsubscribe } = walletsSubscription.subscribe((wallets) => {
    const connectedWallets = wallets.map(({ label }) => label);
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets));
  });
  return unsubscribe;
}

export async function autoConnect() {
  const connectedWalletsRaw = window.localStorage.getItem('connectedWallets');
  if (!connectedWalletsRaw) {
    return;
  }
  try {
    const [connectedWallet] = JSON.parse(connectedWalletsRaw);
    await onboard.connectWallet({
      autoSelect: { label: connectedWallet, disableModals: true },
    });
  } catch (_e) {
    // whatever
    return;
  }
}

export async function disconnect() {
  window.localStorage.removeItem('connectedWallets');
  return await Promise.all(
    onboard.state.get().wallets.map(({ label }) => onboard.disconnectWallet({ label }))
  );
}
