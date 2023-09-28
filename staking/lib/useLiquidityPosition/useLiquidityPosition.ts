import { CoreProxyType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { useNetwork } from '@snx-v3/useBlockchain';
import { erc7412Call } from '@snx-v3/withERC7412';

const PositionCollateralSchema = z.object({
  value: ZodBigNumber.transform((x) => wei(x)).optional(), // This is currently only removed on base-goreli
  amount: ZodBigNumber.transform((x) => wei(x)),
});
const DebtSchema = ZodBigNumber.transform((x) => wei(x));

export const selectPosition = ({
  collateral,
  debt,
}: {
  collateral: z.infer<typeof PositionCollateralSchema>;
  debt: z.infer<typeof DebtSchema>;
}) => {
  return {
    collateralAmount: collateral.amount,
    debt,
  };
};
export type LiquidityPosition = ReturnType<typeof selectPosition>;

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

export const useLiquidityPosition = ({
  tokenAddress,
  accountId,
  poolId,
}: {
  tokenAddress?: string;
  accountId?: string;
  poolId?: string;
}) => {
  const { data: CoreProxy } = useCoreProxy();
  const network = useNetwork();
  return useQuery({
    queryKey: [
      network.name,
      { accountId },
      'LiquidityPosition',
      {
        pool: poolId,
        token: tokenAddress,
      },
    ],
    queryFn: async () => {
      if (!CoreProxy || !accountId || !poolId || !tokenAddress)
        throw Error('Query should not be enabled');
      const { calls, decoder } = await loadPosition({ CoreProxy, accountId, poolId, tokenAddress });
      return await erc7412Call(
        CoreProxy.provider,
        calls,
        decoder,
        `loadPosition poolId: ${poolId} tokenAddress: ${tokenAddress}`
      );
    },
    select: selectPosition,
    enabled: Boolean(CoreProxy && poolId && accountId && tokenAddress),
  });
};
