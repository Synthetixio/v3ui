import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { NETWORKS, useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { CoreProxyType, importCoreProxy } from '@synthetixio/v3-contracts';
import { providers } from 'ethers';

export function useCoreProxy(providerForChain?: providers.JsonRpcProvider) {
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
      if (providerForChain) {
        const chainFromProvider = await providerForChain.getNetwork();
        const networkFromProvider = NETWORKS.find(
          (network) => network.id === chainFromProvider.chainId
        );
        if (!networkFromProvider?.id)
          throw new Error('Can not deteced network from provided provider');
        const { address, abi } = await importCoreProxy(
          networkFromProvider.id,
          networkFromProvider?.preset
        );
        return new Contract(address, abi, providerForChain) as CoreProxyType;
      }
      if (!signerOrProvider || !network) throw new Error('Should be disabled');

      const { address, abi } = await importCoreProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider) as CoreProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
