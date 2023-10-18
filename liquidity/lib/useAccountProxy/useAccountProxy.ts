import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { AccountProxy as AccountProxyCannon } from '@synthetixio/v3-contracts/build/cannon/AccountProxy';
import type { AccountProxy as AccountProxyMainnet } from '@synthetixio/v3-contracts/build/mainnet/AccountProxy';
import type { AccountProxy as AccountProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/AccountProxy';
import type { AccountProxy as AccountProxySepolia } from '@synthetixio/v3-contracts/build/sepolia/AccountProxy';
import type { AccountProxy as AccountProxyOptimismMainnet } from '@synthetixio/v3-contracts/build/optimism-mainnet/AccountProxy';
import type { AccountProxy as AccountProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/AccountProxy';
import type { AccountProxy as AccountProxyBaseGoerli } from '@synthetixio/v3-contracts/build/base-goerli/AccountProxy';

export type AccountProxyType =
  | AccountProxyCannon
  | AccountProxyMainnet
  | AccountProxyGoerli
  | AccountProxySepolia
  | AccountProxyOptimismMainnet
  | AccountProxyOptimismGoerli
  | AccountProxyBaseGoerli;

export async function importAccountProxy(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/cannon/AccountProxy');
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/mainnet/AccountProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/AccountProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/sepolia/AccountProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/optimism-mainnet/AccountProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/AccountProxy');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/base-goerli/AccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useAccountProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'AccountProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importAccountProxy(network.name);
      return new Contract(address, abi, signerOrProvider) as AccountProxyType;
    },
    enabled: Boolean(network.isSupported && signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
