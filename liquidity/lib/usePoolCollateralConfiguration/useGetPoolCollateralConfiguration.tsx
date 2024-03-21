// import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
// import { useCoreProxy } from '@snx-v3/useCoreProxy';
// import { useQuery } from '@tanstack/react-query';

// export function useGetPoolCollateralConfiguration(poolIds: string[]) {
//   const { data: CoreProxy } = useCoreProxy();
//   const { data: collateralTypes } = useCollateralTypes();
//   return useQuery({
//     enabled: !!CoreProxy && !!poolIds.length && !!collateralTypes?.length,
//     staleTime: Infinity,
//     queryKey: ['Pool-Configuration', poolIds.toString()],
//     queryFn: async () => {
//       const promises = [];
//       poolIds.map((id) => {
//         collateralTypes!.map((type) =>
//           promises.push(CoreProxy.getPoolCollateralConfiguration(id, type.tokenAddress))
//         );
//       });
//       const configs = await Promise.all(promises);
//       return configs;
//     },
//   });
// }
//
export {};
