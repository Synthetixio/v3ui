import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { CoreProxyType, importCoreProxy } from '@synthetixio/v3-contracts';
import { useMemo } from 'react';

export function useCoreProxy(customNetwork?: Network) {
  const providerForChain = useProviderForChain(customNetwork);
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const targetNetwork = useMemo(() => customNetwork || network, [customNetwork, network]);

  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'CoreProxy', { withSigner }],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address, abi } = await importCoreProxy(customNetwork.id, customNetwork.preset);
        return new Contract(address, abi, providerForChain) as CoreProxyType;
      }
      const signerOrProvider = signer || provider;
      if (!signerOrProvider || !network) throw new Error('Should be disabled');

      const { address, abi } = await importCoreProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider) as CoreProxyType;
    },
    enabled: Boolean(signer || provider || providerForChain),
    staleTime: Infinity,
  });
}
