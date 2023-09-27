import { useQuery } from '@tanstack/react-query';
import { CoreProxyType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { ZodBigNumber } from '@snx-v3/zod';
import Wei, { wei } from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';

const PriceSchema = ZodBigNumber.transform((x) => wei(x));

async function loadPrices({
  CoreProxy,
  collateralAddresses,
}: {
  CoreProxy: CoreProxyType;
  collateralAddresses: string[];
}) {
  if (collateralAddresses.length === 0) return {};
  const calls = await Promise.all(
    collateralAddresses.map((address) => {
      return CoreProxy.populateTransaction.getCollateralPrice(address);
    })
  );

  const prices = await erc7412Call(
    CoreProxy.provider,
    calls,
    (multicallEncoded) => {
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
    },
    'collateralPrices' // TODO label for logs, remove me
  );

  const collateralPriceByAddress = collateralAddresses.reduce(
    (acc: Record<string, Wei | undefined>, address, index) => {
      acc[address] = prices[index];
      return acc;
    },
    {}
  );

  return collateralPriceByAddress;
}

export const useCollateralPrices = () => {
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  const { data: collateralData } = useCollateralTypes();
  console.log(
    '[useCollateralPrices] Getting prices for:',
    collateralData?.map((x) => x.symbol)
  );
  const collateralAddresses = collateralData?.map((x) => x.tokenAddress);

  return useQuery({
    enabled: Boolean(CoreProxy && collateralAddresses),
    queryKey: [network.name, 'CollateralPrices', { collateralAddresses }],
    queryFn: async () => {
      if (!CoreProxy || !collateralAddresses) throw 'OMFG';
      return await loadPrices({ CoreProxy, collateralAddresses });
    },
  });
};

export const useCollateralPrice = (collateralAddress?: string) => {
  const { data: pricesByAddress, error, isLoading } = useCollateralPrices();
  return {
    data: collateralAddress ? pricesByAddress?.[collateralAddress] : undefined,
    isLoading,
    error,
  };
};
