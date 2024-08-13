import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importLegacyMarket } from '@snx-v3/contracts';

export function useLegacyMarket(customNetwork?: Network | null) {
  const providerForChain = useProviderForChain(customNetwork);
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const targetNetwork = customNetwork || network;

  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'LegacyMarket', { withSigner }],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address: lmAddress, abi: lmAbi } = await importLegacyMarket(
          customNetwork.id,
          customNetwork.preset
        );
        return new Contract(lmAddress, lmAbi, providerForChain);
      }

      const signerOrProvider = signer || provider;
      if (!signerOrProvider || !network) throw new Error('Should be disabled CP');

      const { address: lmAddress, abi: lmAbi } = await importLegacyMarket(
        network?.id,
        network?.preset
      );
      return new Contract(lmAddress, lmAbi, signerOrProvider);
    },
    enabled: Boolean(signer || provider || providerForChain),
    staleTime: Infinity,
  });
}
