import { ethers } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';

export function useBurnMintFee() {
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'BurnMintFee'],
    enabled: Boolean(CoreProxy),
    queryFn: async function () {
      if (!CoreProxy) throw new Error('Core Proxy is not defined');

      const [burnUsdFeeRatio, mintUsdFeeRatio] = await Promise.all([
        CoreProxy.getConfigUint(ethers.utils.formatBytes32String('burnUsd_feeRatio')),
        CoreProxy.getConfigUint(ethers.utils.formatBytes32String('mintUsd_feeRatio')),
      ]);

      return {
        burnUsdFeeRatio,
        mintUsdFeeRatio,
      };
    },
  });
}
