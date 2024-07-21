import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { Network, useNetwork, useProviderForChain } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { useAllCollateralPriceIds } from '@snx-v3/useAllCollateralPriceIds';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';
import { useAllCollateralPriceUpdates } from '../useCollateralPriceUpdates';
import { stringToHash } from '@snx-v3/tsHelpers';

const VaultCollateralSchema = z
  .object({ value: ZodBigNumber, amount: ZodBigNumber })
  .transform(({ value, amount }) => ({ value: wei(value), amount: wei(amount) }));
const VaultDebtSchema = ZodBigNumber.transform((x) => wei(x));

export const useVaultsData = (poolId?: number, customNetwork?: Network) => {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;

  const { data: collateralTypes } = useCollateralTypes(false, customNetwork);
  const { data: CoreProxy } = useCoreProxy({ customNetwork });
  const { data: collateralPriceUpdates } = useAllCollateralPriceIds(customNetwork);

  const provider = useProviderForChain(targetNetwork);

  const { data: priceUpdateTx } = useAllCollateralPriceUpdates(customNetwork);

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'VaultCollaterals',
      {
        pool: poolId,
        tokens: collateralTypes ? collateralTypes?.map((x) => x.tokenAddress).sort() : [],
        priceUpdateTx: stringToHash(priceUpdateTx?.data),
      },
    ],
    queryFn: async () => {
      if (
        !CoreProxy ||
        !collateralTypes ||
        !poolId ||
        !collateralPriceUpdates ||
        !targetNetwork ||
        !provider
      ) {
        throw Error('useVaultsData should not be enabled when missing data');
      }

      const collateralCallsP = Promise.all(
        collateralTypes.map((collateralType) =>
          CoreProxy.populateTransaction.getVaultCollateral(poolId, collateralType.tokenAddress)
        )
      );

      const debtCallsP = Promise.all(
        collateralTypes.map((collateralType) =>
          CoreProxy.populateTransaction.getVaultDebt(poolId, collateralType.tokenAddress)
        )
      );

      const collateralPriceUpdateCallsP = fetchPriceUpdates(
        collateralPriceUpdates,
        targetNetwork.isTestnet
      ).then((signedData) => priceUpdatesToPopulatedTx('0x', collateralPriceUpdates, signedData));

      const calls = await Promise.all([collateralPriceUpdateCallsP, collateralCallsP, debtCallsP]);

      if (priceUpdateTx) {
        calls.unshift(priceUpdateTx as any);
      }

      return await erc7412Call(
        targetNetwork,
        provider,
        calls.flat(),
        (multicallResult) => {
          if (!Array.isArray(multicallResult)) throw Error('Expected array');

          const collateralResult = multicallResult.slice(0, collateralTypes.length);
          const debtResult = multicallResult.slice(collateralTypes.length);

          return collateralResult.map((bytes: string, i: number) => {
            const debtBytes =
              debtResult[i] || '0x0000000000000000000000000000000000000000000000000000000000000000';

            const decodedDebt = CoreProxy.interface.decodeFunctionResult('getVaultDebt', debtBytes);

            const decodedCollateral = CoreProxy.interface.decodeFunctionResult(
              'getVaultCollateral',
              bytes
            );
            const collateral = VaultCollateralSchema.parse({ ...decodedCollateral });
            const debt = VaultDebtSchema.parse(decodedDebt[0]);
            return {
              debt,
              collateral,
              collateralType: collateralTypes[i],
            };
          });
        },
        'useVaultsData'
      );
    },
    enabled: Boolean(collateralTypes?.length && CoreProxy && poolId && collateralPriceUpdates),
  });
};

export type VaultsDataType = ReturnType<typeof useVaultsData>['data'];
