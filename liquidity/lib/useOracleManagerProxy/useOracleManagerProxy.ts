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
import { importOracleManagerProxy } from '@snx-v3/contracts';

export function useOracleManagerProxy(customNetwork?: Network) {
  const { network } = useNetwork();
  const providerForChain = useProviderForChain(customNetwork);
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = providerForChain || signer || provider;
  const withSigner = Boolean(signer);
  const { activeWallet } = useWallet();

  const targetNetwork = customNetwork || network;

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'OracleManagerProxy',
      { withSigner },
      activeWallet?.address,
    ],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address, abi } = await importOracleManagerProxy(
          customNetwork.id,
          customNetwork.preset
        );
        return new Contract(address, abi, providerForChain);
      }
      if (!network || !signerOrProvider) throw new Error('Network or signer not available');
      const { address, abi } = await importOracleManagerProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider);
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
