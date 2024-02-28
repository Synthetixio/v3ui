import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { ZodBigNumber } from '@snx-v3/zod';
import { z } from 'zod';
import { ethers } from 'ethers';

export const PoolIdSchema = ZodBigNumber.transform((x) => x.toString());

export const PoolSchema = z.object({
  id: PoolIdSchema,
  name: z.string().default('Unnamed Pool'),
  isPreferred: z.boolean(),
});
export type PoolType = z.infer<typeof PoolSchema>;

export const PoolsSchema = z.array(PoolSchema);
export type PoolsType = z.infer<typeof PoolsSchema>;

export function usePools() {
  const { network } = useNetwork();
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    enabled: Boolean(CoreProxy),
    queryKey: [`${network?.id}-${network?.preset}`, 'Pools'],
    queryFn: async () => {
      if (!CoreProxy) throw 'usePools is missing required data';

      const [prefferedPoolId, approvedPoolIds] = await Promise.all([
        CoreProxy.callStatic.getPreferredPool(),
        CoreProxy.callStatic.getApprovedPools(),
      ]);

      const incompletePools = [
        {
          id: prefferedPoolId,
          isPreferred: true,
        },
      ].concat(
        approvedPoolIds.map((id: ethers.BigNumber) => ({
          id: id,
          isPreferred: false,
        }))
      );

      const poolNames = await Promise.all(
        incompletePools.map(async ({ id }) => await CoreProxy.getPoolName(id))
      );

      const poolsRaw = incompletePools.map(({ id, isPreferred }, i) => ({
        id,
        isPreferred,
        name: poolNames[i],
      }));

      return PoolsSchema.parse(poolsRaw);
    },
  });
}

export function usePool(poolId?: string) {
  const { isLoading, error, data } = usePools();

  return {
    isLoading,
    error,
    data: data?.find((item) => item.id === poolId),
  };
}

export function usePreferredPool() {
  const { isLoading, error, data } = usePools();

  return {
    isLoading,
    error,
    data: data?.find((item) => item.isPreferred),
  };
}
