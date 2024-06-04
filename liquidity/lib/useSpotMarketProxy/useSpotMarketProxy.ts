import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { SpotMarketProxyType, importSpotMarketProxy } from '@snx-v3/contracts';

export function useSpotMarketProxy() {
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;

  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'SpotMarketProxy', { withSigner }],
    queryFn: async function () {
      if (!signerOrProvider || !network) throw new Error('Should be disabled');

      const { address, abi } = await importSpotMarketProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider) as SpotMarketProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
