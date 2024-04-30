import { useQuery } from '@tanstack/react-query';
import { useGetNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { importOracleManagerProxy, OracleManagerProxyType } from '@synthetixio/v3-contracts';
import { Contract } from 'ethers';
import { Wei } from '@synthetixio/wei';
import { BuyBack } from '../mutations/useSellSNX';

export function useSNXPrice() {
  const baseNetwork = useGetNetwork(`0x${Number(8453).toString(16)}`);
  const baseProvider = useProviderForChain(baseNetwork);

  return useQuery({
    refetchInterval: 5000,
    enabled: !!baseProvider,
    queryKey: ['snx-price', !!baseProvider],
    queryFn: async () => {
      if (baseProvider) {
        try {
          const { address, abi } = await importOracleManagerProxy(
            baseNetwork?.id,
            baseNetwork?.preset
          );
          const OracleManagerProxy = new Contract(
            address,
            abi,
            baseProvider
          ) as OracleManagerProxyType;

          const price = [
            await OracleManagerProxy.populateTransaction.process(
              await BuyBack.connect(baseProvider).getSnxNodeId()
            ),
          ];

          price[0].from = '0x4200000000000000000000000000000000000006';

          return await erc7412Call(
            baseNetwork,
            baseProvider,
            price,
            (txs) => {
              return new Wei(
                OracleManagerProxy.interface.decodeFunctionResult('process', txs[0])[0].price
              );
            },
            'priceCall'
          );
        } catch (error) {
          console.error(error);
          return new Wei(0);
        }
      }
      return new Wei(0);
    },
  });
}
