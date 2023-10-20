import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { AccountProxy as AccountProxy1 } from '@synthetixio/v3-contracts/build/1/AccountProxy';
import type { AccountProxy as AccountProxy5 } from '@synthetixio/v3-contracts/build/5/AccountProxy';
import type { AccountProxy as AccountProxy10 } from '@synthetixio/v3-contracts/build/10/AccountProxy';
import type { AccountProxy as AccountProxy420 } from '@synthetixio/v3-contracts/build/420/AccountProxy';
import type { AccountProxy as AccountProxy11155111 } from '@synthetixio/v3-contracts/build/11155111/AccountProxy';
import type { AccountProxy as AccountProxy84531Competition } from '@synthetixio/v3-contracts/build/84531-competition/AccountProxy';
import type { AccountProxy as AccountProxy13370 } from '@synthetixio/v3-contracts/build/420/AccountProxy';

export type AccountProxyType =
  | AccountProxy1
  | AccountProxy5
  | AccountProxy10
  | AccountProxy420
  | AccountProxy11155111
  | AccountProxy84531Competition
  | AccountProxy13370;

export async function importAccountProxy(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/420/AccountProxy'); // TODO: Make local cannon 13370 work
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/1/AccountProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/5/AccountProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/11155111/AccountProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/10/AccountProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/420/AccountProxy');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/84531-competition/AccountProxy');
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
