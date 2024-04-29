import { useQuery } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { useAllCollateralPriceUpdates } from '@snx-v3/useCollateralPriceUpdates';
import { erc7412Call } from '@snx-v3/withERC7412';
import { importOracleManagerProxy, OracleManagerProxyType } from '@synthetixio/v3-contracts';
import { Contract } from 'ethers';
import { Wei } from '@synthetixio/wei';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

export function useSNXPrice() {
  const signer = useSigner();
  const { network } = useNetwork();
  const { data: priceUpdateTx } = useAllCollateralPriceUpdates();
  return useQuery({
    enabled: isBaseAndromeda(network?.id, network?.preset),
    queryKey: ['snx-price', { withSigner: !!signer?.provider, network: network?.id }],
    queryFn: async () => {
      if ((signer?.provider && network?.id, network?.preset)) {
        try {
          const { address, abi } = await importOracleManagerProxy(network.id, network.preset);
          const OracleManagerProxy = new Contract(
            address,
            abi,
            signer?.provider
          ) as OracleManagerProxyType;
          const price = [
            await OracleManagerProxy.populateTransaction.process(
              '0x508a4a4d7905359126646eae38f367a55525e82375fe78ddaf7534e43c6246c0'
            ),
          ];
          price[0].from = '0x4200000000000000000000000000000000000006';

          if (priceUpdateTx) {
            price.unshift(priceUpdateTx as any);
          }
          return await erc7412Call(
            network,
            signer!.provider,
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
