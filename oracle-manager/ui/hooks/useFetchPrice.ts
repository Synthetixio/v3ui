import { useQuery } from '@tanstack/react-query';
import { useGetNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { importOracleManagerProxy } from '@snx-v3/contracts';
import { Contract } from 'ethers';
import { Wei } from '@synthetixio/wei';

export function useFetchPrice(nodeId: string, networkId: number) {
  const baseNetwork = useGetNetwork(`0x${Number(networkId).toString(16)}`);
  const baseProvider = useProviderForChain(baseNetwork);

  return useQuery({
    refetchInterval: 15000,
    retry: false,
    staleTime: 99999,

    enabled: !!baseNetwork && !!baseProvider,
    queryKey: ['snx-price', !!baseProvider],
    queryFn: async () => {
      if (baseProvider && baseNetwork) {
        try {
          const { address, abi } = await importOracleManagerProxy(
            baseNetwork.id,
            baseNetwork.preset
          );

          const OracleManagerProxy = new Contract(address, abi, baseProvider);

          const price = [await OracleManagerProxy.populateTransaction.process(nodeId)];

          price[0].from = '0x4200000000000000000000000000000000000006';

          return await erc7412Call(
            baseNetwork,
            baseProvider,
            price,
            (txs) => {
              const node = OracleManagerProxy.interface.decodeFunctionResult(
                'process',
                Array.isArray(txs) ? txs[0] : txs
              );
              return {
                price: new Wei(node.price),
                timestamp: new Date(Number(node.timestamp.mul(1000).toString())),
              };
            },
            'priceCall'
          );
        } catch (error) {
          console.error(error);
          throw error;
        }
      } else {
        throw new Error('BaseProvider and BaseNetwork undefined');
      }
    },
  });
}
