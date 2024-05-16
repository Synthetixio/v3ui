import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { NETWORKS, useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { importOracleManagerProxy, OracleManagerProxyType } from '@synthetixio/v3-contracts';
import { providers } from 'ethers';

export function useOracleManagerProxy(providerForChain?: providers.JsonRpcProvider) {
  const { network } = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'OracleManagerProxy', { withSigner }],
    queryFn: async function () {
      if (providerForChain) {
        const chainFromProvider = await providerForChain.getNetwork();
        const networkFromProvider = NETWORKS.find(
          (network) => network.id === chainFromProvider.chainId
        );
        if (!networkFromProvider?.id)
          throw new Error('Can not deteced network from provided provider');
        const { address, abi } = await importOracleManagerProxy(
          networkFromProvider.id,
          networkFromProvider?.preset
        );
        return new Contract(address, abi, providerForChain) as OracleManagerProxyType;
      }
      if (!network || !signerOrProvider) throw new Error('Network or signer not available');
      const { address, abi } = await importOracleManagerProxy(network?.id, network?.preset);
      return new Contract(address, abi, signerOrProvider) as OracleManagerProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
