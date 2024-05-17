import { useGetNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';
import { BigNumber, Contract } from 'ethers';

export function SNXUSDBalanceOfBuyBackContract(contractAddress: string) {
  const baseNetwork = useGetNetwork(`0x${Number(8453).toString(16)}`);
  const baseProvider = useProviderForChain(baseNetwork);

  return useQuery({
    queryKey: ['USDCBalanceOfBuyBackContract', contractAddress],
    queryFn: async () => {
      const USDC = new Contract(
        '0x09d51516F38980035153a554c26Df3C6f51a23C3',
        ['function balanceOf(address _owner) view returns (uint256 balance)'],
        baseProvider
      );

      const balance: BigNumber = await USDC.balanceOf(contractAddress);
      return balance;
    },
    refetchInterval: 100000,
  });
}
