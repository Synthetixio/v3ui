import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { CoreProxyType } from '@synthetixio/v3-contracts';
import { ZodBigNumber } from '@snx-v3/zod';
import Wei, { wei } from '@synthetixio/wei';
import { useNetwork, Network } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

const PriceSchema = ZodBigNumber.transform((x) => wei(x));

export async function loadPrices({
  network,
  CoreProxy,
  collateralAddresses,
}: {
  network: Network;
  CoreProxy: CoreProxyType;
  collateralAddresses: string[];
}) {
  const calls = await Promise.all(
    collateralAddresses.map((address) => {
      if (isBaseAndromeda(network?.id, network?.preset)) {
        // For new deployment we have new ABI
        // 'function getCollateralPrice(address collateralType, uint256 collateralAmount) view returns (uint256)'
        // @ts-ignore TODO: remove eventually when types are aligned
        return CoreProxy.populateTransaction.getCollateralPrice(address, 1);
      }
      return CoreProxy.populateTransaction.getCollateralPrice(address);
    })
  );
  if (calls.length === 0) return { calls: [], decoder: () => [] };

  const decoder = (multicallEncoded: string | string[]) => {
    if (Array.isArray(multicallEncoded)) {
      return multicallEncoded.map((encoded) => {
        const pricesEncoded = CoreProxy.interface.decodeFunctionResult(
          'getCollateralPrice',
          encoded
        )[0];

        return PriceSchema.parse(pricesEncoded);
      });
    }
    throw Error('Expected array got: ' + typeof multicallEncoded);
  };
  return { calls, decoder };
}

export const useCollateralPrices = () => {
  const { network } = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  const { data: collateralData } = useCollateralTypes();

  const collateralAddresses = collateralData?.map((x) => x.tokenAddress);

  return useQuery({
    enabled: Boolean(CoreProxy && collateralAddresses && collateralAddresses?.length > 0),
    queryKey: [`${network?.id}-${network?.preset}`, 'CollateralPrices', { collateralAddresses }],
    queryFn: async () => {
      if (!CoreProxy || !collateralAddresses || collateralAddresses.length == 0 || !network) {
        throw 'useCollateralPrices missing required data';
      }

      const { calls, decoder } = await loadPrices({ network, CoreProxy, collateralAddresses });

      const prices = await erc7412Call(
        network,
        CoreProxy.provider,
        calls,
        decoder,
        'useCollateralPrices'
      );
      return collateralAddresses.reduce((acc: Record<string, Wei | undefined>, address, i) => {
        acc[address] = prices[i];
        return acc;
      }, {});
    },
  });
};
