import { useQuery } from '@tanstack/react-query';
import { useGetNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { importOracleManagerProxy, OracleManagerProxyType } from '@synthetixio/v3-contracts';
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

          const OracleManagerProxy = new Contract(
            address,
            abi,
            baseProvider
          ) as OracleManagerProxyType;

          const price = [await OracleManagerProxy.populateTransaction.process(nodeId)];

          price[0].from = '0x4200000000000000000000000000000000000006';

          return await erc7412Call(
            baseNetwork,
            baseProvider,
            price,
            (txs) => {
              return {
                price: new Wei(
                  OracleManagerProxy.interface.decodeFunctionResult('process', txs[0])[0].price
                ),
                timestamp: new Date(
                  Number(
                    OracleManagerProxy.interface
                      .decodeFunctionResult('process', txs[0])[0]
                      .timestamp.mul(1000)
                      .toString()
                  )
                ),
              };
            },
            'priceCall'
          );
        } catch (error) {
          console.error(error);
          return { price: new Wei(0), timestamp: new Date() };
        }
      }
      return { price: new Wei(0), timestamp: new Date() };
    },
  });
}
