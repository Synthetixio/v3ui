import { useQuery } from '@tanstack/react-query';
import { BigNumber, Contract, providers, utils } from 'ethers';

interface BurnEvent {
  ts: number;
  snxAmount: number;
  usdAmount: number;
  cumulativeSnxAmount: number;
  cumulativeUsdAmount: number;
}

const SNXonL1 = new Contract(
  '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  ['function totalSupply() view returns(uint256)'],
  new providers.JsonRpcProvider('https://eth.llamarpc.com')
);

export function useBurnEvents() {
  return useQuery({
    queryKey: ['burn-events'],
    queryFn: async () => {
      const repsonse = await fetch('https://api.synthetix.io/v3/base/snx-buyback');
      const events: BurnEvent[] = await repsonse.json();

      const now = new Date();
      now.setDate(now.getDate() - 7);

      const totalSupply: BigNumber = await SNXonL1.totalSupply();

      const supplyChange7Days = events
        .filter((event) => event.ts > now.getTime())
        .reduce((cur, prev) => cur + prev.snxAmount, 0)
        .toFixed(2);

      const SNXPriceResponse = await fetch(
        'https://coins.llama.fi/prices/current/ethereum:0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'
      );

      const { coins } = await SNXPriceResponse.json();

      return {
        events,
        supplyChange7Days,
        totalSupply: Number(utils.formatEther(totalSupply)).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        }),
        SNXPrice: coins['ethereum:0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'].price || 3,
      };
    },
  });
}
