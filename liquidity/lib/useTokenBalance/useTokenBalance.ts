import { assertAddressType } from '@snx-v3/assertAddressType';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useWallet } from '@snx-v3/useBlockchain';
import { ethers } from 'ethers';
import { ZodBigNumber } from '@snx-v3/zod';

export const BalanceSchema = ZodBigNumber.transform((x) => wei(x));
export const abi = ['function balanceOf(address) view returns (uint256)'];

export const useTokenBalance = (address?: string) => {
  const { activeWallet } = useWallet();
  const provider = useProvider();
  const { network } = useNetwork();

  const tokenAddress = assertAddressType(address) ? address : undefined;
  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'TokenBalance',
      { accountAddress: activeWallet?.address },
      { tokenAddress },
    ],
    queryFn: async () => {
      if (activeWallet?.address && tokenAddress && provider) {
        const contract = new ethers.Contract(tokenAddress, abi, provider);
        const balance =
          network?.id === 8453 && network.preset === 'andromeda'
            ? wei(await contract.balanceOf(activeWallet?.address), await contract.decimals())
            : BalanceSchema.parse(await contract.balanceOf(activeWallet?.address));
        return balance;
      }
    },
    enabled: Boolean(activeWallet?.address && tokenAddress && provider),
    refetchInterval: 5000,
  });
};
