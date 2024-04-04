import { useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { useQuery } from '@tanstack/react-query';

const BLOCKS = (60 * 60 * 24) / 2;

export const useBlockNumber = () => {
  const provider = useProvider();
  const { network } = useNetwork();

  return useQuery({
    queryKey: ['block-number', network?.id],
    queryFn: async () => {
      if (!provider) throw 'Missing data required for useBlockNumber';
      const block = await provider.getBlockNumber();

      const blocks = () => {
        if (!block) {
          return [];
        }

        // We take the last 8 blocks as the PnL is calculated between two blocks
        // Interim take last 6 periods (last 7 blocks)
        return [
          // block - BLOCKS * 7,
          block - BLOCKS * 6,
          block - BLOCKS * 5,
          block - BLOCKS * 4,
          block - BLOCKS * 3,
          block - BLOCKS * 2,
          block - BLOCKS,
          block,
        ];
      };

      return {
        currentBlock: block,
        lastPeriodBlocks: blocks(),
      };
    },
    enabled: !!provider,
  });
};
