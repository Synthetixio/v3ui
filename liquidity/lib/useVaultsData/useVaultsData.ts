import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { useNetwork } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';
import { fetchPriceUpdates, priceUpdatesToPopulatedTx } from '@snx-v3/fetchPythPrices';

const VaultCollateralSchema = z
  .object({ value: ZodBigNumber, amount: ZodBigNumber })
  .transform(({ value, amount }) => ({ value: wei(value), amount: wei(amount) }));
const VaultDebtSchema = ZodBigNumber.transform((x) => wei(x));

export const useVaultsData = (poolId?: number) => {
  const { network } = useNetwork();
  const { data: collateralTypes } = useCollateralTypes();
  const { data: CoreProxyContract } = useCoreProxy();

  return useQuery({
    queryKey: [
      `${network?.id}-${network?.preset}`,
      'VaultCollaterals',
      {
        pool: poolId,
        tokens: collateralTypes ? collateralTypes?.map((x) => x.tokenAddress).sort() : [],
      },
    ],
    queryFn: async () => {
      if (!CoreProxyContract || !collateralTypes || !poolId || !network) {
        throw Error('useVaultsData should not be enabled when missing data');
      }

      const collateralCallsP = Promise.all(
        collateralTypes.map((collateralType) =>
          CoreProxyContract.populateTransaction.getVaultCollateral(
            poolId,
            collateralType.tokenAddress
          )
        )
      );
      const debtCallsP = Promise.all(
        collateralTypes.map((collateralType) =>
          CoreProxyContract.populateTransaction.getVaultDebt(poolId, collateralType.tokenAddress)
        )
      );

      const collateralPriceUpdateCallsP = fetchPriceUpdates([], network.isTestnet).then(
        (signedData) => priceUpdatesToPopulatedTx('0x', [], signedData)
      );

      const calls = await Promise.all([collateralPriceUpdateCallsP, collateralCallsP, debtCallsP]);

      return await erc7412Call(
        network,
        CoreProxyContract.provider,
        calls.flat(),
        (multicallResult) => {
          if (!Array.isArray(multicallResult)) throw Error('Expected array');

          const collateralResult = multicallResult.slice(0, collateralTypes.length);
          const debtResult = multicallResult.slice(collateralTypes.length);

          return collateralResult.map((bytes: string, i: number) => {
            const debtBytes = debtResult[i];
            const decodedDebt = CoreProxyContract.interface.decodeFunctionResult(
              'getVaultDebt',
              debtBytes
            );

            const decodedCollateral = CoreProxyContract.interface.decodeFunctionResult(
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
    enabled: Boolean(collateralTypes?.length && CoreProxyContract && poolId),
  });
};

export type VaultsDataType = ReturnType<typeof useVaultsData>['data'];
