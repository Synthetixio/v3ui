import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importLegacyMarket, importV2x } from '@snx-v3/contracts';

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
        const { address: v2xAddress, abi: v2xAbi } = await importV2x(
          customNetwork.id,
          customNetwork.preset
        );
        return {
          LegacyMarket: new Contract(lmAddress, lmAbi, providerForChain),
          V2xSynthetix: new Contract(v2xAddress, v2xAbi, providerForChain),
        };
      }

      const signerOrProvider = signer || provider;
      if (!signerOrProvider || !network) throw new Error('Should be disabled CP');

      const { address: lmAddress, abi: lmAbi } = await importLegacyMarket(
        network?.id,
        network?.preset
      );
      const { address: v2xAddress, abi: v2xAbi } = await importV2x(network?.id, network?.preset);
      return {
        LegacyMarket: new Contract(lmAddress, lmAbi, signerOrProvider),
        V2xSynthetix: new Contract(v2xAddress, v2xAbi, signerOrProvider),
      };
    },
    enabled: Boolean(signer || provider || providerForChain),
    staleTime: Infinity,
  });
}
