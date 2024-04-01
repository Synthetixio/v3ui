import { useQuery } from '@tanstack/react-query';
import { useBlockNumber } from '../useBlockNumber';
import { useMemo } from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { getsUSDCAddress } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';

const BLOCKS = (60 * 60 * 24) / 2;

export const useGetPNL = () => {
  const { data: block } = useBlockNumber();
  const { data: CoreProxy } = useCoreProxy();
  const { network } = useNetwork();

  const blocks = useMemo(() => {
    if (!block) {
      return [];
    }

    return [
      block - BLOCKS * 7,
      block - BLOCKS * 6,
      block - BLOCKS * 5,
      block - BLOCKS * 4,
      block - BLOCKS * 3,
      block - BLOCKS * 2,
      block - BLOCKS,
    ];
  }, [block]);

  return useQuery({
    queryKey: ['pnl', blocks.join(',')],
    queryFn: async () => {
      const vaultData = await Promise.all(
        blocks.map(async (block) => {
          try {
            const [result, debt] = await Promise.all([
              await CoreProxy?.getVaultCollateral(1, getsUSDCAddress(network?.id), {
                blockTag: block,
              }),
              await CoreProxy?.callStatic?.getVaultDebt(1, getsUSDCAddress(network?.id), {
                blockTag: block,
              }),
            ]);

            return {
              debt,
              amount: result?.amount,
              value: result?.value,
            };
          } catch (error) {}
        })
      );
    },
  });
};
