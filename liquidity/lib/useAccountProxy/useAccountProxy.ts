import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner, useWallet } from '@snx-v3/useBlockchain';
import { importAccountProxy } from '@snx-v3/contracts';

export function useAccountProxy() {
  const { network } = useNetwork();
  const { activeWallet } = useWallet();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'AccountProxy',
      { withSigner },
      activeWallet?.address,
    ],
    queryFn: async function () {
      if (!signerOrProvider || !network) throw new Error('Should be disabled');
      const { address, abi } = await importAccountProxy(network.id, network?.preset);
      return new Contract(address, abi, signerOrProvider);
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
