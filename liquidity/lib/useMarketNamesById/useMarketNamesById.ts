import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { z } from 'zod';
import { Network, useNetwork } from '@snx-v3/useBlockchain';

const MarketNamesSchema = z.array(z.string());

const marketAbi = ['function name(uint128 marketId) external view returns (string memory)'];
const marketInterface = new ethers.utils.Interface(marketAbi);

export const useMarketNamesById = (
  marketIdsAndAddresses?: { marketId: string; address: string }[],
  customNetwork?: Network
) => {
  const { network } = useNetwork();
  const { data: MultiCall3 } = useMulticall3(customNetwork);

  const targetNetwork = customNetwork || network;

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'MarketNamesById',
      {
        markets: marketIdsAndAddresses
          ? marketIdsAndAddresses.map((market) => market.marketId).sort()
          : [],
      },
    ],
    queryFn: async () => {
      if (!marketIdsAndAddresses || !MultiCall3) {
        throw Error('Query should not be enable when contract or marketIdsAndAddresses missing');
      }
      const calls = marketIdsAndAddresses.map((x) => ({
        target: x.address,
        callData: marketInterface.encodeFunctionData('name', [x.marketId]),
      }));
      const result = await MultiCall3.callStatic.aggregate(calls);
      const decoded = result.returnData.map(
        (bytes: ethers.utils.BytesLike) => marketInterface.decodeFunctionResult('name', bytes)[0]
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
    enabled: Boolean(MultiCall3 && marketIdsAndAddresses && marketIdsAndAddresses.length > 0),
  });
};
