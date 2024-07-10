import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
  useWallet,
} from '@snx-v3/useBlockchain';
import { importCoreProxy } from '@snx-v3/contracts';

export function useCoreProxy(customNetwork?: Network | null) {
  const providerForChain = useProviderForChain(customNetwork);
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const { activeWallet } = useWallet();
  const targetNetwork = customNetwork || network;

  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'CoreProxy',
      { withSigner },
      activeWallet?.address,
    ],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address, abi } = await importCoreProxy(customNetwork.id, customNetwork.preset);
        return new Contract(address, abi, providerForChain);
      }

      const signerOrProvider = signer || provider;
      if (!signerOrProvider || !network) throw new Error('Should be disabled CP');

      const { address, abi } = await importCoreProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider);
    },
    enabled: Boolean(signer || provider || providerForChain),
    staleTime: Infinity,
  });
}
