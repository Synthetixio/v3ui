import { useQuery } from '@tanstack/react-query';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useSpotMarketProxy } from '@snx-v3/useSpotMarketProxy';
import { USDC_BASE_MARKET, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useSystemToken } from '@snx-v3/useSystemToken';

export function useGetUSDTokens(customNetwork?: Network) {
  const { network } = useNetwork();

  const targetNetwork = customNetwork || network;

  const isBase = isBaseAndromeda(targetNetwork?.id, targetNetwork?.preset);

  const { data: collateralTypes } = useCollateralTypes(false, customNetwork);
  const { data: SpotMarket } = useSpotMarketProxy(customNetwork);
  const { data: systemToken } = useSystemToken(customNetwork);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'GetUSDTokens'],
    enabled: Boolean(targetNetwork?.id && collateralTypes?.length && systemToken && SpotMarket),
    queryFn: async () => {
      if (!targetNetwork?.id || !systemToken || !SpotMarket) {
        throw 'useGetUSDTokens queries are not ready';
      }
      const USDC: string = isBase
        ? (await (SpotMarket as any)?.getWrapper(USDC_BASE_MARKET))?.wrapCollateralType
        : undefined;

      return {
        snxUSD: systemToken.address,
        sUSD: collateralTypes?.find((type) =>
          isBase ? type.symbol.toLowerCase() === 'usdc' : type.symbol.toLowerCase() === 'susdc'
        )?.tokenAddress,
        USDC,
      };
    },
  });
}

export const useGetWrapperToken = (marketId: string, customNetwork?: Network) => {
  const { network } = useNetwork();

  const targetNetwork = customNetwork || network;

  const isBase = isBaseAndromeda(targetNetwork?.id, targetNetwork?.preset);

  const { data: SpotMarket } = useSpotMarketProxy(customNetwork);

  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'GetWrapperToken', marketId],
    enabled: Boolean(targetNetwork?.id && SpotMarket),
    queryFn: async () => {
      if (!targetNetwork?.id || !SpotMarket) {
        throw 'useGetWrapperToken queries are not ready';
      }

      return isBase
        ? (await (SpotMarket as any)?.getWrapper(marketId))?.wrapCollateralType
        : undefined;
    },
  });
};
