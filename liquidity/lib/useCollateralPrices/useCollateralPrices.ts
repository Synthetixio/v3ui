import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { CoreProxyType } from '@synthetixio/v3-contracts';
import { ZodBigNumber } from '@snx-v3/zod';
import Wei, { wei } from '@synthetixio/wei';
import { useDefaultProvider, useNetwork } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useAllCollateralPriceUpdates } from '../useCollateralPriceUpdates';

const PriceSchema = ZodBigNumber.transform((x) => wei(x));

export async function loadPrices({
  CoreProxy,
  collateralAddresses,
}: {
  CoreProxy: CoreProxyType;
  collateralAddresses: string[];
}) {
  const calls = await Promise.all(
    collateralAddresses.map((address) => {
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

  const provider = useDefaultProvider();
  const collateralAddresses = collateralData?.map((x) => x.tokenAddress);
  const { data: priceUpdateTx } = useAllCollateralPriceUpdates();

  return useQuery({
    enabled: Boolean(CoreProxy && collateralAddresses && collateralAddresses?.length > 0),
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'CollateralPrices',
      { collateralAddresses, priceUpdateTx: priceUpdateTx?.data },
    ],
    queryFn: async () => {
      if (
        !CoreProxy ||
        !collateralAddresses ||
        collateralAddresses.length == 0 ||
        !network ||
        !provider
      ) {
        throw 'useCollateralPrices missing required data';
      }

      const { calls, decoder } = await loadPrices({ CoreProxy, collateralAddresses });

      const allCalls = [...calls];
      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }

      const prices = await erc7412Call(network, provider, allCalls, decoder, 'useCollateralPrices');

      return collateralAddresses.reduce((acc: Record<string, Wei | undefined>, address, i) => {
        acc[address] = prices[i];
        return acc;
      }, {});
    },
  });
};
