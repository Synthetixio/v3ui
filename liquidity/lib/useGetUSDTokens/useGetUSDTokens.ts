import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { USDC_BASE_MARKET, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

export function useGetUSDTokens(customNetwork?: Network) {
  const { network } = useNetwork();

  const targetNetwork = useMemo(() => customNetwork || network, [customNetwork, network]);

  const isBase = isBaseAndromeda(targetNetwork?.id, targetNetwork?.preset);
  const { data: collateralTypes } = useCollateralTypes(false, customNetwork);
  const { data: CoreProxy } = useCoreProxy(customNetwork);
  const { data: SpotMarket } = useSpotMarketProxy(customNetwork);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'GetUSDTokens'],
    queryFn: async () => {
      if (!targetNetwork?.id || !CoreProxy) {
        throw 'useGetUSDTokens queries are not ready';
      }
      const USDProxy = await CoreProxy.getUsdToken();
      const USDC: string = isBase
        ? (await (SpotMarket as any).getWrapper(USDC_BASE_MARKET)).wrapCollateralType
        : undefined;

      return {
        snxUSD: USDProxy,
        sUSD: collateralTypes?.find((type) =>
          isBase ? type.symbol.toLowerCase() === 'usdc' : type.symbol.toLowerCase() === 'susdc'
        )?.tokenAddress,
        USDC,
      };
    },
    enabled: Boolean(targetNetwork?.id && CoreProxy && collateralTypes?.length),
  });
}
