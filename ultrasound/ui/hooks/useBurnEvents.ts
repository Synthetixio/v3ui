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

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

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

      // use oracle manger with price ID
      // 0x508a4a4d7905359126646eae38f367a55525e82375fe78ddaf7534e43c6246c0
      const { coins } = await SNXPriceResponse.json();

      const groupedByMonths = events.reduce(
        (cur, prev) => {
          const currentDate = new Date(prev.ts);
          const month = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
          if (cur[month]) {
            cur[month] = cur[month] - prev.snxAmount;
          } else {
            cur[month] = Number(utils.formatEther(totalSupply)) - prev.cumulativeSnxAmount;
          }
          return cur;
        },
        {} as Record<string, number>
      );

      const groupedByLast30Days = events.reduce(
        (cur, prev) => {
          const currentDate = new Date(prev.ts);
          if (currentDate.getTime() > thirtyDaysAgo.getTime()) {
            const day = currentDate.toLocaleString('default', { day: '2-digit', month: 'long' });
            if (cur[day]) {
              cur[day] = cur[day] - prev.snxAmount;
            } else {
              cur[day] = Number(utils.formatEther(totalSupply)) - prev.cumulativeSnxAmount;
            }
          }
          return cur;
        },
        {} as Record<string, number>
      );

      return {
        totalBurns: events.length,
        groupedByMonths,
        groupedByLast30Days,
        supplyChange7Days,
        totalSupply: Number(utils.formatEther(totalSupply)).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        }),
        SNXPrice: coins['ethereum:0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'].price || 3,
      };
    },
  });
}
