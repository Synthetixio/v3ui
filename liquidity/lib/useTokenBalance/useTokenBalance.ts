import { assertAddressType } from '@snx-v3/assertAddressType';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useWallet } from '@snx-v3/useBlockchain';
import { ethers, providers } from 'ethers';
import { ZodBigNumber } from '@snx-v3/zod';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

export const BalanceSchema = ZodBigNumber.transform((x) => wei(x));
export const abi = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

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
    queryFn: async () =>
      await fetchTokenBalance(address!, activeWallet!.address, provider!, network!),
    enabled: Boolean(activeWallet?.address && tokenAddress && provider && network?.id),
    refetchInterval: 5000,
  });
};

export const useTokenBalances = (addresses: string[]) => {
  const { activeWallet } = useWallet();
  const provider = useProvider();
  const { network } = useNetwork();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'TokenBalance',
      { accountAddress: activeWallet?.address },
      addresses.toString(),
    ],
    queryFn: async () =>
      await Promise.all(
        addresses.map((address) =>
          fetchTokenBalance(address, activeWallet!.address, provider!, network!)
        )
      ),
    enabled: Boolean(activeWallet?.address && addresses.length && provider && network?.id),
    refetchInterval: 5000,
  });
};

async function fetchTokenBalance(
  tokenAddress: string,
  walletAddress: string,
  provider: providers.Web3Provider,
  network: { id: number; preset: string }
) {
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  const balance = isBaseAndromeda(network.id, network.preset)
    ? wei(await contract.balanceOf(walletAddress), await contract.decimals())
    : BalanceSchema.parse(await contract.balanceOf(walletAddress));
  return balance;
}
