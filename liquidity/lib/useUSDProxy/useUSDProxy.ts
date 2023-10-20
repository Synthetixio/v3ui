import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import type { JsonRpcProvider } from '@ethersproject/providers';
import { useNetwork, useProvider, useSigner, NETWORKS } from '@snx-v3/useBlockchain';
import type { USDProxy as USDProxy1 } from '@synthetixio/v3-contracts/build/1/USDProxy';
import type { USDProxy as USDProxy5 } from '@synthetixio/v3-contracts/build/5/USDProxy';
import type { USDProxy as USDProxy10 } from '@synthetixio/v3-contracts/build/10/USDProxy';
import type { USDProxy as USDProxy420 } from '@synthetixio/v3-contracts/build/420/USDProxy';
import type { USDProxy as USDProxy11155111 } from '@synthetixio/v3-contracts/build/11155111/USDProxy';
import type { USDProxy as USDProxy84531Competition } from '@synthetixio/v3-contracts/build/84531-competition/USDProxy';
import type { USDProxy as USDProxy13370 } from '@synthetixio/v3-contracts/build/420/USDProxy';

export type USDProxyType =
  | USDProxy1
  | USDProxy5
  | USDProxy10
  | USDProxy420
  | USDProxy11155111
  | USDProxy84531Competition
  | USDProxy13370;

export async function importUSDProxy(chainName: string) {
  switch (chainName) {
    case 'cannon':
      return import('@synthetixio/v3-contracts/build/420/USDProxy'); // TODO: Make local cannon 13370 work
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/1/USDProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/5/USDProxy');
    case 'sepolia':
      return import('@synthetixio/v3-contracts/build/11155111/USDProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/10/USDProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/420/USDProxy');
    case 'base-goerli':
      return import('@synthetixio/v3-contracts/build/84531-competition/USDProxy');
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
