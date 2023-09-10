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
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();

  return useQuery({
    enabled: Boolean(CoreProxy),
    queryKey: [network.name, 'Pools'],
    queryFn: async () => {
      if (!CoreProxy) throw 'OMFG';

      const [preferredPoolIdRaw, approvedPoolIdsRaw] = await CoreProxy.callStatic.multicall([
        CoreProxy.interface.encodeFunctionData('getPreferredPool'),
        CoreProxy.interface.encodeFunctionData('getApprovedPools'),
      ]);

      const [preferredPoolId] = CoreProxy.interface.decodeFunctionResult(
        'getPreferredPool',
        preferredPoolIdRaw
      );
      const [approvedPoolIds] = CoreProxy.interface.decodeFunctionResult(
        'getApprovedPools',
        approvedPoolIdsRaw
      );

      const incompletePools = [
        {
          id: preferredPoolId,
          isPreferred: true,
        },
      ].concat(
        approvedPoolIds.map((id: ethers.BigNumber) => ({
          id,
          isPreferred: false,
        }))
      );

      const poolNamesRaw = await CoreProxy.callStatic.multicall(
        incompletePools.map(({ id }) => CoreProxy.interface.encodeFunctionData('getPoolName', [id]))
      );

      const poolNames = poolNamesRaw.map(
        (bytes: string) => CoreProxy.interface.decodeFunctionResult('getPoolName', bytes)[0]
      );

      const poolsRaw = incompletePools.map(({ id, isPreferred }, i) => ({
        id,
        isPreferred,
        name: poolNames[i],
      }));

      const pools = PoolsSchema.parse(poolsRaw);

      return pools;
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
