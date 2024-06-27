import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useTokenInfo } from '@snx-v3/useTokenInfo';

export function useStablecoin() {
  const { network } = useNetwork();

  const { data: USDTokens } = useGetUSDTokens();
  const { data: stablecoinInfo } = useTokenInfo(USDTokens?.snxUSD);

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'stablecoin', USDTokens?.snxUSD],
    queryFn: async function () {
      if (!stablecoinInfo) {
        throw new Error('useStablecoin requires more information');
      }

      const { name, symbol } = stablecoinInfo;

      return {
        symbol,
        name,
        address: USDTokens?.snxUSD,
      };
    },
    enabled: Boolean(USDTokens?.snxUSD && stablecoinInfo),
  });
}
