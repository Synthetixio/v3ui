import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { Multicall3 as Multicall3Cannon } from '@synthetixio/v3-contracts/build/cannon/Multicall3';
import type { Multicall3 as Multicall3Mainnet } from '@synthetixio/v3-contracts/build/mainnet/Multicall3';
import type { Multicall3 as Multicall3Goerli } from '@synthetixio/v3-contracts/build/goerli/Multicall3';
import type { Multicall3 as Multicall3Sepolia } from '@synthetixio/v3-contracts/build/sepolia/Multicall3';
import type { Multicall3 as Multicall3OptimismMainnet } from '@synthetixio/v3-contracts/build/optimism-mainnet/Multicall3';
import type { Multicall3 as Multicall3OptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/Multicall3';
import type { Multicall3 as Multicall3BaseGoerli } from '@synthetixio/v3-contracts/build/base-goerli/Multicall3';

export type Multicall3Type =
  | Multicall3Cannon
  | Multicall3Mainnet
  | Multicall3Goerli
  | Multicall3Sepolia
  | Multicall3OptimismMainnet
  | Multicall3OptimismGoerli
  | Multicall3BaseGoerli;

export async function importMulticall3(
  chainName: string
): Promise<{ address: string; abi: string[] }> {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/cannon/Multicall3');
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/mainnet/Multicall3');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/Multicall3');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/sepolia/Multicall3');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/optimism-mainnet/Multicall3');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/Multicall3');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/base-goerli/Multicall3');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useMulticall3() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'Multicall3', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importMulticall3(network.name);
      return new Contract(address, abi, signerOrProvider) as Multicall3Type;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
