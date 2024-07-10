import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import {
  Network,
  useNetwork,
  useProvider,
  useProviderForChain,
  useSigner,
} from '@snx-v3/useBlockchain';
import { importSpotMarketProxy } from '@snx-v3/contracts';

export function useSpotMarketProxy(customNetwork?: Network) {
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const providerForChain = useProviderForChain(customNetwork);
  const signerOrProvider = signer || provider;

  const targetNetwork = customNetwork || network;

  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'SpotMarketProxy',
      { withSigner },
      signer?._address,
    ],
    queryFn: async function () {
      if (!signerOrProvider || !targetNetwork) throw new Error('Should be disabled');

      if (providerForChain && customNetwork) {
        const { address, abi } = await importSpotMarketProxy(
          targetNetwork.id,
          targetNetwork.preset
        );
        return new Contract(address, abi, providerForChain);
      }

      const { address, abi } = await importSpotMarketProxy(
        targetNetwork?.id,
        targetNetwork?.preset
      );

      return new Contract(address, abi, signerOrProvider);
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
