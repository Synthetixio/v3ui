import { assertAddressType } from '@snx-v3/assertAddressType';
import { useQuery } from '@tanstack/react-query';
import { Network, useProviderForChain, useWallet } from '@snx-v3/useBlockchain';
import { Contract } from 'ethers';

import { abi, BalanceSchema } from './useTokenBalance';

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
        const contract = new Contract(tokenAddress, abi, provider);
        return BalanceSchema.parse(await contract.balanceOf(activeWallet?.address));
      }
    },
    enabled: Boolean(activeWallet?.address && tokenAddress && provider),
    refetchInterval: 5000,
  });
};
