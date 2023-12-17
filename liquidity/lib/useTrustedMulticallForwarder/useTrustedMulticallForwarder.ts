import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import {
  importTrustedMulticallForwarder,
  TrustedMulticallForwarderType,
} from '@synthetixio/v3-contracts';

export function useTrustedMulticallForwarder() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${network.id}-${network.preset}`, 'TrustedMulticallForwarderType', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importTrustedMulticallForwarder(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider) as TrustedMulticallForwarderType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
