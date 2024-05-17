import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { USDC_BASE_MARKET, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

export function useGetUSDTokens() {
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: collateralTypes } = useCollateralTypes();
  const { data: CoreProxy } = useCoreProxy();
  const { data: SpotMarket } = useSpotMarketProxy();
  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'GetUSDTokens'],
    queryFn: async () => {
      if (!network?.id || !CoreProxy) {
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
    enabled: Boolean(network?.id && CoreProxy && collateralTypes?.length),
  });
}
