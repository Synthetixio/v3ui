import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importOracleManagerProxy, OracleManagerProxyType } from '@synthetixio/v3-contracts';

export function useOracleManagerProxy(customNetwork?: Network) {
  const providerForChain = useProviderForChain(customNetwork);

  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'OracleManagerProxy', { withSigner }],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address, abi } = await importOracleManagerProxy(
          customNetwork.id,
          customNetwork.preset
        );
        return new Contract(address, abi, providerForChain) as OracleManagerProxyType;
      }
      if (!network || !signerOrProvider) throw new Error('Network or signer not available');
      const { address, abi } = await importOracleManagerProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider) as OracleManagerProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
