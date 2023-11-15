import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';
import { useTrustedMulticallForwarder } from '@snx-v3/useTrustedMulticallForwarder';
import { z } from 'zod';
import { useNetwork } from '@snx-v3/useBlockchain';

const MarketNamesSchema = z.array(z.string());

const marketAbi = ['function name(uint128 marketId) external view returns (string memory)'];
const marketInterface = new utils.Interface(marketAbi);

export const useMarketNamesById = (
  marketIdsAndAddresses?: { marketId: string; address: string }[]
) => {
  const { data: TrustedMulticallForwarder } = useTrustedMulticallForwarder();
  const network = useNetwork();
  return useQuery({
    queryKey: [
      `${network.id}-${network.preset}`,
      'MarketNamesById',
      {
        markets: marketIdsAndAddresses
          ? marketIdsAndAddresses.map((market) => market.marketId).sort()
          : [],
      },
    ],
    queryFn: async () => {
      if (!marketIdsAndAddresses || !TrustedMulticallForwarder) {
        throw Error('useMarketNamesById should not be enabled');
      }
      const calls = marketIdsAndAddresses.map((x) => ({
        target: x.address,
        callData: marketInterface.encodeFunctionData('name', [x.marketId]),
      }));
      const result = await TrustedMulticallForwarder.callStatic.aggregate(calls);
      const decoded = result.returnData.map(
        (bytes) => marketInterface.decodeFunctionResult('name', bytes)[0]
      );
      return MarketNamesSchema.parse(decoded);
    },
    select: (marketNames) =>
      marketNames.reduce((acc: Record<string, string | undefined>, marketName, index) => {
        const marketId = marketIdsAndAddresses?.[index].marketId;
        if (!marketId) return acc;
        acc[marketId] = marketName;
        return acc;
      }, {}),
    enabled: Boolean(
      TrustedMulticallForwarder && marketIdsAndAddresses && marketIdsAndAddresses.length > 0
    ),
  });
};
