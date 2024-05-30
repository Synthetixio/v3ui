import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { NETWORKS, Network, useNetwork } from '@snx-v3/useBlockchain';
import { ZodBigNumber } from '@snx-v3/zod';
import { z } from 'zod';
import { ethers } from 'ethers';
import { importCoreProxy } from '@synthetixio/v3-contracts';
import { useAppReady } from '@snx-v3/useAppReady';

export const PoolIdSchema = ZodBigNumber.transform((x) => x.toString());

export const PoolSchema = z.object({
  id: PoolIdSchema,
  name: z.string().default('Unnamed Pool'),
  isPreferred: z.boolean(),
});

export type PoolType = z.infer<typeof PoolSchema>;

export const PoolsSchema = z.array(PoolSchema);
export type PoolsType = z.infer<typeof PoolsSchema>;

export function usePools(customNetwork?: Network) {
  const { network } = useNetwork();
  const { data: CoreProxy } = useCoreProxy(customNetwork);
  const isAppReady = useAppReady();

  const targetNetwork = useMemo(() => customNetwork || network, [customNetwork, network]);

  return useQuery({
    enabled: Boolean(customNetwork ? true : isAppReady),
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'Pools'],
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

export function usePool(poolId?: string, customNetwork?: Network) {
  const { isLoading, error, data } = usePools(customNetwork);

  return {
    isLoading,
    error,
    data: data?.find((item) => item.id === poolId),
  };
}

export function usePreferredPool(customNetwork?: Network) {
  const { isLoading, error, data } = usePools(customNetwork);

  return {
    isLoading,
    error,
    data: data?.find((item) => item.isPreferred),
  };
}

const supportedNetworks = [1, 8453, 42161];
const supportedTestNetworks = [1, 11155111, 8453, 84532, 421614, 42161];

export function useGetAllPools(withTestnets: boolean) {
  const networks = NETWORKS.filter((n) =>
    withTestnets ? supportedTestNetworks.includes(n.id) : supportedNetworks.includes(n.id)
  ).map((n) => ({
    id: n.id,
    token: n.token,
    label: n.label,
    rpcUrl: n.rpcUrl(),
    preset: n.preset,
  }));

  return useQuery({
    queryKey: ['AllPools'],
    queryFn: async () => {
      const allCoreProxies = (await Promise.all(
        networks.map((network) => importCoreProxy(network?.id))
      )) as any[];

      const allCoreProxiesConnected = allCoreProxies.map(
        (proxies, index) =>
          new ethers.Contract(
            proxies.address,
            proxies.abi,
            new ethers.providers.JsonRpcProvider(networks[index].rpcUrl)
          )
      );

      const prefferedPools = await Promise.all(
        allCoreProxiesConnected.map((contract) => {
          return contract.callStatic.getPreferredPool();
        })
      );
      // TODO @dev reimplement when used
      // const approvedPoolIds: ethers.BigNumber[][] = await Promise.all(
      //   allCoreProxiesConnected.map((contract) => {
      //     return contract.callStatic.getApprovedPools();
      //   })
      // );

      const incompletePools = prefferedPools.map((prefferedPool, index) => ({
        id: prefferedPool,
        isPreferred: true,
        network: networks[index].label,
      }));

      const poolNames = await Promise.all(
        incompletePools.map(
          async ({ id }, index) => await allCoreProxiesConnected[index].getPoolName(id)
        )
      );

      const poolsRaw = incompletePools.map(({ id, isPreferred, network }, i) => ({
        id,
        isPreferred,
        name: poolNames[i] as string,
        network,
      }));

      return poolsRaw;
    },
  });
}
