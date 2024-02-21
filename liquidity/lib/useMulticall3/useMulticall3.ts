import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { importMulticall3, Multicall3Type } from '@synthetixio/v3-contracts';

export function useMulticall3() {
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'Multicall3', { withSigner }],
    queryFn: async function () {
      if (!network || !signerOrProvider) throw new Error('Network or signer not available');
      const { address, abi } = await importMulticall3(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider) as Multicall3Type;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
