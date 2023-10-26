import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import type { JsonRpcProvider } from '@ethersproject/providers';
import { NETWORKS, useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { importUSDProxy, USDProxyType } from '@synthetixio/v3-contracts';

export function useUSDProxy(nonConnectedProvider?: JsonRpcProvider) {
  const connectedNetwork = useNetwork();
  const provider = useProvider();
  const signer = useSigner();

  const providerToUse = nonConnectedProvider || provider;
  const signerOrProvider = signer || providerToUse;
  const withSigner = Boolean(signer);

  const network =
    NETWORKS.find((n) => n.id === nonConnectedProvider?.network.chainId) ?? connectedNetwork;

  return useQuery({
    queryKey: [`${network.id}-${network.preset}`, 'USDProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importUSDProxy(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider) as USDProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
