import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { Multicall3 as Multicall31 } from '@synthetixio/v3-contracts/build/1/Multicall3';
import type { Multicall3 as Multicall35 } from '@synthetixio/v3-contracts/build/5/Multicall3';
import type { Multicall3 as Multicall310 } from '@synthetixio/v3-contracts/build/10/Multicall3';
import type { Multicall3 as Multicall3420 } from '@synthetixio/v3-contracts/build/420/Multicall3';
import type { Multicall3 as Multicall311155111 } from '@synthetixio/v3-contracts/build/11155111/Multicall3';
import type { Multicall3 as Multicall384531Competition } from '@synthetixio/v3-contracts/build/84531-competition/Multicall3';
import type { Multicall3 as Multicall313370 } from '@synthetixio/v3-contracts/build/420/Multicall3';

export type Multicall3Type =
  | Multicall31
  | Multicall35
  | Multicall310
  | Multicall3420
  | Multicall311155111
  | Multicall384531Competition
  | Multicall313370;

export async function importMulticall3(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/420/Multicall3'); // TODO: Make local cannon 13370 work
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/1/Multicall3');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/5/Multicall3');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/11155111/Multicall3');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/10/Multicall3');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/420/Multicall3');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/84531-competition/Multicall3');
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
