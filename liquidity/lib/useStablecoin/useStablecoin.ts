import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useTokenInfo } from '@snx-v3/useTokenInfo';
import { useMemo } from 'react';

export function useStablecoin() {
  const { network } = useNetwork();
  const { data: USDTokens } = useGetUSDTokens();
  const { data: stablecoinInfo } = useTokenInfo(USDTokens?.snxUSD);

  return useMemo(() => {
    if (!stablecoinInfo) {
      return {
        symbol: 'snxUSD',
        name: 'snxUSD',
        address: USDTokens?.snxUSD as string,
      };
    }
    if (isBaseAndromeda(network?.id, network?.preset)) {
      return {
        symbol: 'USDC',
        name: 'USD Coin',
        address: USDTokens?.snxUSD as string,
      };
    }

    const { name, symbol } = stablecoinInfo;

    return {
      symbol,
      name,
      address: USDTokens?.snxUSD as string,
    };
  }, [USDTokens?.snxUSD, network?.id, network?.preset, stablecoinInfo]);
}
