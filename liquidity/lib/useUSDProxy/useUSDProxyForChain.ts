import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { Network, useProviderForChain } from '@snx-v3/useBlockchain';
import { importUSDProxy } from '@snx-v3/contracts';

export function useUSDProxyForChain(network?: Network) {
  const provider = useProviderForChain(network);
  const withSigner = false;

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'USDProxyForChain', { withSigner }],
    queryFn: async function () {
      if (network && provider) {
        const { address, abi } = await importUSDProxy(network.id, network.preset);
        return new Contract(address, abi, provider);
      }
    },
    enabled: Boolean(network && provider),
    staleTime: Infinity,
  });
}
