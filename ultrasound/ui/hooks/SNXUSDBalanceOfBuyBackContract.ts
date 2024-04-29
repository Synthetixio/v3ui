import { useQuery } from '@tanstack/react-query';
import { BigNumber, Contract, providers } from 'ethers';

const USDC = new Contract(
  '0x09d51516F38980035153a554c26Df3C6f51a23C3',
  ['function balanceOf(address _owner) view returns (uint256 balance)'],
  new providers.JsonRpcProvider('https://base.llamarpc.com')
);

export function SNXUSDBalanceOfBuyBackContract(contract: string) {
  return useQuery({
    queryKey: ['USDCBalanceOfBuyBackContract'],
    queryFn: async () => {
      const balance: BigNumber = await USDC.balanceOf(contract);
      return balance;
    },
  });
}
