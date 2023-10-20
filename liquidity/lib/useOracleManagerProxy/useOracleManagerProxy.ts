import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { OracleManagerProxy as OracleManagerProxy1 } from '@synthetixio/v3-contracts/build/1/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy5 } from '@synthetixio/v3-contracts/build/5/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy10 } from '@synthetixio/v3-contracts/build/10/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy420 } from '@synthetixio/v3-contracts/build/420/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy11155111 } from '@synthetixio/v3-contracts/build/11155111/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy84531Competition } from '@synthetixio/v3-contracts/build/84531-competition/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy13370 } from '@synthetixio/v3-contracts/build/420/OracleManagerProxy';

export type OracleManagerProxyType =
  | OracleManagerProxy1
  | OracleManagerProxy5
  | OracleManagerProxy10
  | OracleManagerProxy420
  | OracleManagerProxy11155111
  | OracleManagerProxy84531Competition
  | OracleManagerProxy13370;

export async function importOracleManagerProxy(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/420/OracleManagerProxy'); // TODO: Make local cannon 13370 work
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/1/OracleManagerProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/5/OracleManagerProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/11155111/OracleManagerProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/10/OracleManagerProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/420/OracleManagerProxy');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/84531-competition/OracleManagerProxy');
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
