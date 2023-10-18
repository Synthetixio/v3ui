import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { OracleManagerProxy as OracleManagerProxyCannon } from '@synthetixio/v3-contracts/build/cannon/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxyMainnet } from '@synthetixio/v3-contracts/build/mainnet/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxySepolia } from '@synthetixio/v3-contracts/build/sepolia/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxyOptimismMainnet } from '@synthetixio/v3-contracts/build/optimism-mainnet/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxyBaseGoerli } from '@synthetixio/v3-contracts/build/base-goerli/OracleManagerProxy';

export type OracleManagerProxyType =
  | OracleManagerProxyCannon
  | OracleManagerProxyMainnet
  | OracleManagerProxyGoerli
  | OracleManagerProxySepolia
  | OracleManagerProxyOptimismMainnet
  | OracleManagerProxyOptimismGoerli
  | OracleManagerProxyBaseGoerli;

export async function getOracleManagerProxy(
  chainName: string
): Promise<{ address: string; abi: string[] }> {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/cannon/OracleManagerProxy');
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/mainnet/OracleManagerProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/OracleManagerProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/sepolia/OracleManagerProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/optimism-mainnet/OracleManagerProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/OracleManagerProxy');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/base-goerli/OracleManagerProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useOracleManagerProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'OracleManagerProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await getOracleManagerProxy(network.name);
      return new Contract(address, abi, signerOrProvider) as OracleManagerProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
