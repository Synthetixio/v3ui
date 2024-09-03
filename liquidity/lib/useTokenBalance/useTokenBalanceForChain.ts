import { assertAddressType } from '@snx-v3/assertAddressType';
import { useQuery } from '@tanstack/react-query';
import { Network, useProviderForChain, useWallet } from '@snx-v3/useBlockchain';
import { fetchTokenBalance } from './useTokenBalance';

export const useTokenBalanceForChain = (address?: string, network?: Network) => {
  const { activeWallet } = useWallet();
  const provider = useProviderForChain(network);
  const tokenAddress = assertAddressType(address) ? address : undefined;

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'TokenBalanceForChain',
      { accountAddress: activeWallet?.address },
      { tokenAddress },
    ],
    queryFn: async () => {
      if (activeWallet?.address && tokenAddress && provider) {
        return await fetchTokenBalance(tokenAddress, activeWallet?.address, provider);
      }
    },
    enabled: Boolean(activeWallet?.address && tokenAddress && provider),
    refetchInterval: 5000,
  });
};
