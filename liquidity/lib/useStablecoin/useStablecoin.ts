import { useQuery } from '@tanstack/react-query';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { useNetwork } from '@snx-v3/useBlockchain';

export function useStablecoin() {
  const { network } = useNetwork();
  const { data: USDProxy } = useUSDProxy();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'stablecoin', USDProxy?.address],
    queryFn: async function () {
      const [symbol, name] = await Promise.all([
        USDProxy?.callStatic?.symbol(),
        USDProxy?.callStatic?.name(),
      ]);

      return {
        symbol,
        name,
        address: USDProxy?.address,
      };
    },
    enabled: Boolean(USDProxy),
  });
}
