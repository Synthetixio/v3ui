import { useQuery } from '@tanstack/react-query';
import { CoreProxyType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { ZodBigNumber } from '@snx-v3/zod';
import Wei, { wei } from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { BigNumber } from 'ethers';
import { erc7412Call } from '@snx-v3/withERC7412';

const PriceSchema = ZodBigNumber.transform((x) => wei(x));

async function loadPrices({
  CoreProxy,
  collateralAddresses,
  network,
}: {
  CoreProxy: CoreProxyType;
  collateralAddresses: string[];
  network: ReturnType<typeof useNetwork>;
}) {
  const calls = collateralAddresses.map((address) => {
    const args = network.name === 'base-goerli' ? [address, BigNumber.from(1)] : [address];
    // Remove after release, base should be aligned with other networks
    // @ts-ignore
    return CoreProxy.interface.encodeFunctionData('getCollateralPrice', args);
  });
  const multicallData = CoreProxy.interface.encodeFunctionData('multicall', [calls]);
  const prices = await erc7412Call(
    CoreProxy.provider,
    { data: multicallData, to: CoreProxy.address },

    (multicallEncoded) => {
      const pricesEncoded = CoreProxy.interface.decodeFunctionResult(
        'multicall',
        multicallEncoded
      )[0] as string[];

      return pricesEncoded.map((priceEncoded) =>
        PriceSchema.parse(
          CoreProxy.interface.decodeFunctionResult('getCollateralPrice', priceEncoded)[0]
        )
      );
    }
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
