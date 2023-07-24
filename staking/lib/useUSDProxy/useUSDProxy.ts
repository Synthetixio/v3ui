import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import type { JsonRpcProvider } from '@ethersproject/providers';
import { useNetwork, useProvider, useSigner, NETWORKS } from '@snx-v3/useBlockchain';
import type { USDProxy as USDProxyCannon } from '@synthetixio/v3-contracts/build/cannon/USDProxy';
import type { USDProxy as USDProxyMainnet } from '@synthetixio/v3-contracts/build/mainnet/USDProxy';
import type { USDProxy as USDProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/USDProxy';
import type { USDProxy as USDProxySepolia } from '@synthetixio/v3-contracts/build/sepolia/USDProxy';
import type { USDProxy as USDProxyOptimismMainnet } from '@synthetixio/v3-contracts/build/optimism-mainnet/USDProxy';
import type { USDProxy as USDProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/USDProxy';

export type USDProxyType =
  | USDProxyCannon
  | USDProxyMainnet
  | USDProxyGoerli
  | USDProxySepolia
  | USDProxyOptimismMainnet
  | USDProxyOptimismGoerli;

export async function importUSDProxy(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/cannon/USDProxy');
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/mainnet/USDProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/USDProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/sepolia/USDProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/optimism-mainnet/USDProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/USDProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

const networks = Object.values(NETWORKS);

export function useUSDProxy(nonConnectedProvider?: JsonRpcProvider) {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();

  const providerToUse = nonConnectedProvider || provider;
  const signerOrProvider = signer || providerToUse;
  const withSigner = Boolean(signer);

  const nonConnectedNetworkName = networks.find(
    (n) => n.id === nonConnectedProvider?.network.chainId
  )?.name;
  const networkName = nonConnectedNetworkName || network.name;

  return useQuery({
    queryKey: [networkName, 'USDProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importUSDProxy(networkName);
      return new Contract(address, abi, signerOrProvider) as USDProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
