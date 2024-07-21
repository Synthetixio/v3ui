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

export function useCoreProxy({
  customNetwork,
  isWrite = false,
}: {
  customNetwork?: Network | null;
  isWrite?: boolean;
} = {}) {
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const { activeWallet } = useWallet();
  const targetNetwork = customNetwork || network;
  const providerForChain = useProviderForChain(targetNetwork);

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'CoreProxy',
      isWrite,
      activeWallet?.address,
    ],
    queryFn: async function () {
      const signerOrProvider = signer || provider;
      if (isWrite && signerOrProvider) {
        const { address, abi } = await importCoreProxy(network?.id, network?.preset);
        return new Contract(address, abi, signerOrProvider);
      }
      if (targetNetwork) {
        const { address, abi } = await importCoreProxy(targetNetwork.id, targetNetwork.preset);
        return new Contract(address, abi, providerForChain || provider || undefined);
      }

      if (!signerOrProvider || !network) throw new Error('Should be disabled CP');
    },
    enabled: Boolean(signer || provider || providerForChain),
    staleTime: Infinity,
  });
}
