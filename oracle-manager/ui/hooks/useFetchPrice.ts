import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { importOracleManagerProxy, OracleManagerProxyType } from '@synthetixio/v3-contracts';
import { Contract } from 'ethers';
import { Wei } from '@synthetixio/wei';

export function useFetchPrice(nodeId: string, networkId?: number) {
  // make it work with other netwroks
  // console.log(networkId);
  // const baseNetwork = useGetNetwork(`0x${Number(8453).toString(16)}`);
  // const baseProvider = useProviderForChain(baseNetwork);
  const provider = useProvider();
  const { network } = useNetwork();

  return useQuery({
    refetchInterval: 15000,
    enabled: !!provider && !!network,
    queryKey: ['snx-price', !!provider],
    queryFn: async () => {
      if (provider && network) {
        try {
          const { address, abi } = await importOracleManagerProxy(network.id, network.preset);

          const OracleManagerProxy = new Contract(address, abi, provider) as OracleManagerProxyType;

          const price = [await OracleManagerProxy.populateTransaction.process(nodeId)];

          price[0].from = '0x4200000000000000000000000000000000000006';

          return await erc7412Call(
            network,
            provider,
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
