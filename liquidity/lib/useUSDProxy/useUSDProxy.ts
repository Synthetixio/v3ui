import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { importUSDProxy, USDProxyType } from '@snx-v3/contracts';

export function useUSDProxy() {
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'USDProxy', { withSigner }],
    queryFn: async function () {
      if (!signerOrProvider || !network) throw new Error('Should be disabled');
      const { address, abi } = await importUSDProxy(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider) as USDProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
