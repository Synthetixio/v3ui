import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { CoreProxy as CoreProxy1 } from '@synthetixio/v3-contracts/build/1/CoreProxy';
import type { CoreProxy as CoreProxy5 } from '@synthetixio/v3-contracts/build/5/CoreProxy';
import type { CoreProxy as CoreProxy10 } from '@synthetixio/v3-contracts/build/10/CoreProxy';
import type { CoreProxy as CoreProxy420 } from '@synthetixio/v3-contracts/build/420/CoreProxy';
import type { CoreProxy as CoreProxy11155111 } from '@synthetixio/v3-contracts/build/11155111/CoreProxy';
import type { CoreProxy as CoreProxy84531Competition } from '@synthetixio/v3-contracts/build/84531-competition/CoreProxy';
import type { CoreProxy as CoreProxy13370 } from '@synthetixio/v3-contracts/build/420/CoreProxy';

export type CoreProxyType =
  | CoreProxy1
  | CoreProxy5
  | CoreProxy10
  | CoreProxy420
  | CoreProxy11155111
  | CoreProxy84531Competition
  | CoreProxy13370;

export async function importCoreProxy(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/420/CoreProxy'); // TODO: Make local cannon 13370 work
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/1/CoreProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/5/CoreProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/11155111/CoreProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/10/CoreProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/420/CoreProxy');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/84531-competition/CoreProxy');
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
