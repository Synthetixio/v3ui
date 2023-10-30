import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import { importOracleManagerProxy, OracleManagerProxyType } from '@synthetixio/v3-contracts';

export function useOracleManagerProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [`${network.id}-${network.preset}`, 'OracleManagerProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importOracleManagerProxy(network.id, network.preset);
      return new Contract(address, abi, signerOrProvider) as OracleManagerProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
  });
}
