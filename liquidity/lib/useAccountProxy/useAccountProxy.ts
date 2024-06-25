import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useDefaultProvider, useNetwork } from '@snx-v3/useBlockchain';
import { importAccountProxy } from '@snx-v3/contracts';

export function useAccountProxy() {
  const { network } = useNetwork();
  const provider = useDefaultProvider();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'AccountProxy'],
    queryFn: async function () {
      if (!provider || !network) throw new Error('Should be disabled');
      const { address, abi } = await importAccountProxy(network.id, network?.preset);
      return new Contract(address, abi, provider);
    },
    enabled: Boolean(provider),
    staleTime: Infinity,
  });
}
