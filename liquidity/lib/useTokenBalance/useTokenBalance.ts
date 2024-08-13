import { assertAddressType } from '@snx-v3/assertAddressType';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { Network, useDefaultProvider, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { ethers, providers } from 'ethers';
import { ZodBigNumber } from '@snx-v3/zod';
import { ZEROWEI } from '../../ui/src/utils/constants';

export const BalanceSchema = ZodBigNumber.transform((x) => wei(x));

export const abi = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export const useTokenBalance = (address?: string, customNetwork?: Network) => {
  const { activeWallet } = useWallet();
  const provider = useDefaultProvider();
  const { network } = useNetwork();

  const targetNetwork = customNetwork || network;

  const tokenAddress = assertAddressType(address) ? address : undefined;
  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'TokenBalance',
      { accountAddress: activeWallet?.address },
      { tokenAddress },
    ],
    queryFn: async () => await fetchTokenBalance(address!, activeWallet!.address, provider!),
    enabled: Boolean(activeWallet?.address && tokenAddress && provider && targetNetwork?.id),
    refetchInterval: 15000,
  });
};

export const useTokenBalances = (addresses: string[], customNetwork?: Network) => {
  const { activeWallet } = useWallet();
  const defaultProvider = useDefaultProvider();

  const provider = customNetwork
    ? new ethers.providers.JsonRpcProvider(customNetwork.rpcUrl())
    : defaultProvider;

  const { network } = useNetwork();

  const targetNetwork = customNetwork || network;

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'TokenBalance',
      { accountAddress: activeWallet?.address },
      addresses.toString(),
    ],
    queryFn: async () =>
      await Promise.all(
        addresses.map((address) => fetchTokenBalance(address, activeWallet!.address, provider!))
      ),
    enabled: Boolean(activeWallet?.address && addresses.length && provider && targetNetwork?.id),
    refetchInterval: 15000,
  });
};

async function fetchTokenBalance(
  tokenAddress: string,
  walletAddress: string,
  provider: providers.JsonRpcProvider
) {
  if (!tokenAddress) {
    return ZEROWEI;
  }
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  const balance = wei(await contract.balanceOf(walletAddress), await contract.decimals());
  return balance;
}
