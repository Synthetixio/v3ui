import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importMulticall3, Multicall3Type } from '@synthetixio/v3-contracts';

export function useMulticall3(customNetwork?: Network) {
  const { network } = useNetwork();
  const providerForChain = useProviderForChain(customNetwork);
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider || providerForChain;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'Multicall3',
      { withSigner, customNetwork: customNetwork?.id },
    ],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address, abi } = await importMulticall3(customNetwork.id, customNetwork.preset);
        return new Contract(address, abi, providerForChain) as Multicall3Type;
      }
      if (!network || !signerOrProvider) throw new Error('Network or signer not available');
      const { address, abi } = await importMulticall3(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider) as Multicall3Type;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
