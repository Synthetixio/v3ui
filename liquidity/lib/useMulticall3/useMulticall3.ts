import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importMulticall3 } from '@snx-v3/contracts';

export function useMulticall3(customNetwork?: Network) {
  const { network } = useNetwork();
  const providerForChain = useProviderForChain(customNetwork);
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider || providerForChain;
  const withSigner = Boolean(signer);

  const targetNetwork = customNetwork || network;

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'Multicall3',
      { withSigner },
      signer?._address,
    ],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address, abi } = await importMulticall3(customNetwork.id, customNetwork.preset);
        return new Contract(address, abi, providerForChain);
      }

      if (!network || !signerOrProvider) throw new Error('Network or signer not available');
      const { address, abi } = await importMulticall3(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider);
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
