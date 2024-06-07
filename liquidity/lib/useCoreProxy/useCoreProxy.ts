import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importCoreProxy } from '@snx-v3/contracts';

export function useCoreProxy(customNetwork?: Network) {
  const providerForChain = useProviderForChain(customNetwork);
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;

  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'CoreProxy',
      { withSigner },
      { providerForChain },
    ],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address, abi } = await importCoreProxy(customNetwork.id, customNetwork.preset);
        return new Contract(address, abi, providerForChain);
      }
      if (!signerOrProvider || !network) throw new Error('Should be disabled');

      const { address, abi } = await importCoreProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider);
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
