import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { Network, useProviderForChain } from '@snx-v3/useBlockchain';
import { importUSDProxy, USDProxyType } from '@synthetixio/v3-contracts';

export function useUSDProxyForChain(network?: Network) {
  const provider = useProviderForChain(network);
  const withSigner = false;

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'USDProxy', { withSigner }],
    queryFn: async function () {
      if (network && provider) {
        const { address, abi } = await importUSDProxy(network.id, network.preset);
        return new Contract(address, abi, provider) as USDProxyType;
      }
    },
    enabled: Boolean(network && provider),
    staleTime: Infinity,
  });
}
