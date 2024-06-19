import { useGetNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';
import { BigNumber, Contract, utils } from 'ethers';

interface BurnEvent {
  ts: number;
  snxAmount: number;
  usdAmount: number;
  cumulativeSnxAmount: number;
  cumulativeUsdAmount: number;
}

const now = new Date();
now.setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

export function useBurnEvents() {
  const ethNetwork = useGetNetwork(`0x${Number(1).toString(16)}`);
  const ethProvider = useProviderForChain(ethNetwork);

  return useQuery({
    queryKey: ['burn-events'],
    queryFn: async () => {
      const SNXonL1 = new Contract(
        '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
        ['function totalSupply() view returns(uint256)'],
        ethProvider
      );

      const repsonse = await fetch('https://api.synthetix.io/v3/base/snx-buyback');
      const events: BurnEvent[] = await repsonse.json();

      const totalSupply: BigNumber = await SNXonL1.totalSupply();

      const supplyChange7Days = events
        .filter((event) => event.ts > now.getTime())
        .reduce((cur, prev) => cur + prev.snxAmount, 0)
        .toLocaleString();

      const SNXPriceResponse = await fetch(
        'https://coins.llama.fi/prices/current/ethereum:0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'
      );

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

      const groupedByLast30Days = events
        .filter((_, index) => index % 2 === 0)
        .reduce(
          (cur, prev) => {
            const currentDate = new Date(prev.ts);
            if (currentDate.getTime() > thirtyDaysAgo.getTime()) {
              const day = currentDate.toLocaleString('default', {
                day: '2-digit',
                month: '2-digit',
              });
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

      const totalBurned = events.reduce((cur, prev) => cur + prev.snxAmount, 0);
      const currentSupply = Number(utils.formatEther(totalSupply)) - totalBurned;

      return {
        totalBurns: events.length,
        groupedByMonths,
        groupedByLast30Days,
        supplyChange7Days,
        totalSupply: currentSupply.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        }),
        SNXPrice:
          (coins['ethereum:0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'].price as number) || 0,
      };
    },
    refetchInterval: 100000,
  });
}
