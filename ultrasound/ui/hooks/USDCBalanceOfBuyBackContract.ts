import { useQuery } from '@tanstack/react-query';
import { BigNumber, Contract, providers } from 'ethers';

const USDC = new Contract(
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  ['function balanceOf(address _owner) view returns (uint256 balance)'],
  new providers.JsonRpcProvider('https://base.llamarpc.com')
);

export function USDCBalanceOfBuyBackContract(contract: string) {
  return useQuery({
    queryKey: ['USDCBalanceOfBuyBackContract'],
    queryFn: async () => {
      const balance: BigNumber = await USDC.balanceOf(contract);
      return balance;
    },
  });
}
