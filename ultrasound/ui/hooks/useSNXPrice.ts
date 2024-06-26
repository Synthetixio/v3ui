import { useQuery } from '@tanstack/react-query';
import { useGetNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { importOracleManagerProxy } from '@snx-v3/contracts';
import { Contract } from 'ethers';
import { Wei } from '@synthetixio/wei';
import { BuyBack } from '../mutations/useSellSNX';

export function useSNXPrice() {
  const baseNetwork = useGetNetwork(`0x${Number(8453).toString(16)}`);
  const baseProvider = useProviderForChain(baseNetwork);

  return useQuery({
    refetchInterval: 10000,
    enabled: Boolean(baseProvider && baseNetwork?.id && baseNetwork?.preset),
    queryKey: ['snx-price'],
    queryFn: async () => {
      if (!baseNetwork || !baseNetwork?.id || !baseNetwork?.preset)
        throw new Error('useSNX Price is not enabled');
      const { address, abi } = await importOracleManagerProxy(baseNetwork.id, baseNetwork.preset);
      const OracleManagerProxy = new Contract(address, abi, baseProvider);

      const price = [
        await OracleManagerProxy.populateTransaction.process(
          await BuyBack.connect(baseProvider!).getSnxNodeId()
        ),
      ];

      price[0].from = '0x4200000000000000000000000000000000000006';

      return await erc7412Call(
        baseNetwork!,
        baseProvider!,
        price,
        (txs) => {
          return new Wei(
            OracleManagerProxy.interface.decodeFunctionResult('process', txs[0])[0].price
          );
        },
        'useSNXPrice'
      );
    },
  });
}
