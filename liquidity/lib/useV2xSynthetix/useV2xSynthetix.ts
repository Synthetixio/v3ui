import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importV2x } from '@snx-v3/contracts';

export function useV2xSynthetix(customNetwork?: Network) {
  const providerForChain = useProviderForChain(customNetwork);
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const targetNetwork = customNetwork || network;

  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'V2xSynthetix', { withSigner }],
    queryFn: async function () {
      if (providerForChain && customNetwork) {
        const { address: v2xAddress, abi: v2xAbi } = await importV2x(
          customNetwork.id,
          customNetwork.preset
        );
        return new Contract(v2xAddress, v2xAbi, providerForChain);
      }

      const signerOrProvider = signer || provider;
      if (!signerOrProvider || !network) throw new Error('Should be disabled CP');

      const { address: v2xAddress, abi: v2xAbi } = await importV2x(network?.id, network?.preset);
      return new Contract(v2xAddress, v2xAbi, signerOrProvider);
    },
    enabled: Boolean(signer || provider || providerForChain),
    staleTime: Infinity,
  });
}
