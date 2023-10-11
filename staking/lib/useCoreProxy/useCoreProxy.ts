import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { CoreProxy as CoreProxyCannon } from '@synthetixio/v3-contracts/build/cannon/CoreProxy';
import type { CoreProxy as CoreProxyMainnet } from '@synthetixio/v3-contracts/build/mainnet/CoreProxy';
import type { CoreProxy as CoreProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/CoreProxy';
import type { CoreProxy as CoreProxySepolia } from '@synthetixio/v3-contracts/build/sepolia/CoreProxy';
import type { CoreProxy as CoreProxyOptimismMainnet } from '@synthetixio/v3-contracts/build/optimism-mainnet/CoreProxy';
import type { CoreProxy as CoreProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy';
import type { CoreProxy as CoreProxyBaseGoerli } from '@synthetixio/v3-contracts/build/base-goerli/CoreProxy';

export type CoreProxyType =
  | CoreProxyCannon
  | CoreProxyMainnet
  | CoreProxyGoerli
  | CoreProxySepolia
  | CoreProxyOptimismMainnet
  | CoreProxyOptimismGoerli
  | CoreProxyBaseGoerli;

export async function importCoreProxy(
  chainName: string
): Promise<{ address: string; abi: string[] }> {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/cannon/CoreProxy');
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/mainnet/CoreProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/CoreProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/sepolia/CoreProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/optimism-mainnet/CoreProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/base-goerli/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useCoreProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'CoreProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importCoreProxy(network.name);
      return new Contract(address, abi, signerOrProvider) as CoreProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
