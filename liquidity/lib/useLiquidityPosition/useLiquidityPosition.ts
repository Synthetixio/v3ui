import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { CoreProxyType } from '@synthetixio/v3-contracts';
import { ZodBigNumber } from '@snx-v3/zod';
import Wei, { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { useNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { loadPrices } from '@snx-v3/useCollateralPrices';
import { loadAccountCollateral, AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { useUSDProxy } from '@snx-v3/useUSDProxy';
import { useCollateralPriceUpdates } from '../useCollateralPriceUpdates';

const PositionCollateralSchema = z.object({
  value: ZodBigNumber.transform((x) => wei(x)).optional(), // This is currently only removed on base-goreli
  amount: ZodBigNumber.transform((x) => wei(x)),
});

const DebtSchema = ZodBigNumber.transform((x) => wei(x));

export const loadPosition = async ({
  CoreProxy,
  accountId,
  poolId,
  tokenAddress,
}: {
  CoreProxy: CoreProxyType;
  accountId: string;
  poolId: string;
  tokenAddress: string;
}) => {
  const calls = await Promise.all([
    CoreProxy.populateTransaction.getPositionCollateral(accountId, poolId, tokenAddress),
    CoreProxy.populateTransaction.getPositionDebt(accountId, poolId, tokenAddress),
  ]);

  const decoder = (multicallEncoded: string | string[]) => {
    if (Array.isArray(multicallEncoded) && multicallEncoded.length === 2) {
      const decodedCollateral = CoreProxy.interface.decodeFunctionResult(
        'getPositionCollateral',
        multicallEncoded[0]
      );
      const decodedDebt = CoreProxy.interface.decodeFunctionResult(
        'getPositionDebt',
        multicallEncoded[1]
      )[0];
      return {
        debt: DebtSchema.parse(decodedDebt),
        collateral: PositionCollateralSchema.parse({ ...decodedCollateral }),
      };
    }
    throw Error('Expected array with two items');
  };

  return { calls, decoder };
};

export type LiquidityPosition = {
  collateralAmount: Wei;
  collateralPrice: Wei;
  collateralValue: Wei;
  debt: Wei;
  accountCollateral: AccountCollateralType;
  usdCollateral: AccountCollateralType;
  tokenAddress: string;
};

export const useLiquidityPosition = ({
  tokenAddress,
  accountId,
  poolId,
}: {
  tokenAddress?: string;
  accountId?: string;
  poolId?: string;
}) => {
  const { data: collateralPriceUpdates } = useAllCollateralPriceIds();
  const { data: CoreProxy } = useCoreProxy();
  const { data: UsdProxy } = useUSDProxy();
  const { network } = useNetwork();
  const { data: priceUpdateTx } = useCollateralPriceUpdates();
  const provider = useProviderForChain(network!);

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'LiquidityPosition',
      { accountId },
      {
        pool: poolId,
        token: tokenAddress,
        collateralPriceUpdatesLength: collateralPriceUpdates?.length,
        priceUpdateTx: priceUpdateTx?.data || '',
      },
    ],
    enabled: Boolean(
      CoreProxy && UsdProxy && poolId && accountId && tokenAddress && collateralPriceUpdates
    ),
    queryFn: async () => {
      if (
        !CoreProxy ||
        !accountId ||
        !poolId ||
        !tokenAddress ||
        !collateralPriceUpdates ||
        !UsdProxy ||
        !network ||
        !provider
      ) {
        throw Error('useLiquidityPosition should not be enabled');
      }
      const { calls: priceCalls, decoder: priceDecoder } = await loadPrices({
        collateralAddresses: [tokenAddress],
        CoreProxy,
      });

      const { calls: positionCalls, decoder: positionDecoder } = await loadPosition({
        CoreProxy,
        accountId,
        poolId,
        tokenAddress,
      });

      const { calls: accountCollateralCalls, decoder: accountCollateralDecoder } =
        await loadAccountCollateral({
          accountId,
          tokenAddresses: [tokenAddress, UsdProxy.address],
          CoreProxy,
        });

      const collateralPriceCalls = await fetchPriceUpdates(
        collateralPriceUpdates,
        network.isTestnet
      ).then((signedData) => priceUpdatesToPopulatedTx('0x', collateralPriceUpdates, signedData));

      const allCalls = collateralPriceCalls
        .concat(priceCalls)
        .concat(positionCalls)
        .concat(accountCollateralCalls);

      if (priceUpdateTx) {
        allCalls.unshift(priceUpdateTx as any);
      }

      return await erc7412Call(
        network,
        provider,
        allCalls,
        (encoded) => {
          if (!Array.isArray(encoded)) throw Error('Expected array ');
          const startOfPrice = 0;
          const endOfPrice = priceCalls.length;
          const startOfPosition = endOfPrice;
          const endOfPosition = startOfPosition + positionCalls.length;

          const startOfAccountCollateral = endOfPosition;
          const collateralPrice = priceDecoder(encoded.slice(startOfPrice, endOfPrice));
          const decodedPosition = positionDecoder(encoded.slice(startOfPosition, endOfPosition));
          const [accountCollateral, usdCollateral] = accountCollateralDecoder(
            encoded.slice(startOfAccountCollateral)
          );
          return {
            collateralPrice: Array.isArray(collateralPrice) ? collateralPrice[0] : collateralPrice,
            collateralAmount: decodedPosition.collateral.amount,
            collateralValue: decodedPosition.collateral.amount.mul(collateralPrice),
            debt: decodedPosition.debt,
            tokenAddress,
            accountCollateral,
            usdCollateral,
          };
        },
        `useLiquidityPosition`
      );
    },
  });
};
