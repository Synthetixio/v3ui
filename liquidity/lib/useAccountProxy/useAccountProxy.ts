import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { AccountProxyType, importAccountProxy } from '@synthetixio/v3-contracts';

export function useAccountProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'AccountProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importAccountProxy(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider) as AccountProxyType;
    },
    enabled: Boolean(network.isSupported && signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
