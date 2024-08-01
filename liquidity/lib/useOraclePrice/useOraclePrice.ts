import { useQuery } from '@tanstack/react-query';
import { Network, useNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { importOracleManagerProxy } from '@snx-v3/contracts';
import { Contract } from 'ethers';
import { Wei } from '@synthetixio/wei';

export function useOraclePrice(nodeId: string, customNetwork?: Network) {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;
  const provider = useProviderForChain(targetNetwork);

  return useQuery({
    refetchInterval: 15000,
    retry: false,
    staleTime: 99999,
    enabled: !!targetNetwork && !!provider,
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'oracle-price'],
    queryFn: async () => {
      if (targetNetwork && provider) {
        try {
          const { address, abi } = await importOracleManagerProxy(
            targetNetwork.id,
            targetNetwork.preset
          );

          const OracleManagerProxy = new Contract(address, abi, provider);

          const price = [await OracleManagerProxy.populateTransaction.process(nodeId)];

          price[0].from = '0x4200000000000000000000000000000000000006';

          return await erc7412Call(
            targetNetwork,
            provider,
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
            'oraclePriceCall'
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
