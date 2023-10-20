import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import type { JsonRpcProvider } from '@ethersproject/providers';
import { useNetwork, useProvider, useSigner, NETWORKS } from '@snx-v3/useBlockchain';
import { USDProxyType, importUSDProxy } from '@synthetixio/v3-contracts';

const networks = Object.values(NETWORKS);

export function useUSDProxy(nonConnectedProvider?: JsonRpcProvider) {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();

  const providerToUse = nonConnectedProvider || provider;
  const signerOrProvider = signer || providerToUse;
  const withSigner = Boolean(signer);

  const net = networks.find((n) => n.id === nonConnectedProvider?.network.chainId) ?? network;

  return useQuery({
    queryKey: [net.name, 'USDProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importUSDProxy(net.chainId, net.preset);
      return new Contract(address, abi, signerOrProvider) as USDProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
