import { importCollateralTokens } from '@snx-v3/contracts';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { z } from 'zod';
import { useSystemToken } from '@snx-v3/useSystemToken';

const CollateralConfigurationSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  decimals: z.number().transform((x) => String(x)),
  depositingEnabled: z.boolean(),
  issuanceRatioD18: ZodBigNumber.transform((x) => wei(x)),
  liquidationRatioD18: ZodBigNumber.transform((x) => wei(x)),
  liquidationRewardD18: ZodBigNumber.transform((x) => wei(x)),
  oracleNodeId: z.string(),
  tokenAddress: z.string().startsWith('0x'), // As of current version in zod this will be a string: https://github.com/colinhacks/zod/issues/1747
  minDelegationD18: ZodBigNumber.transform((x) => wei(x)),
});

const CollateralTypeSchema = CollateralConfigurationSchema.extend({
  displaySymbol: z.string(),
});

export type CollateralType = z.infer<typeof CollateralTypeSchema>;

async function loadCollateralTypes(chainId: number, preset: string): Promise<CollateralType[]> {
  const tokenConfigsRaw: CollateralType[] = await importCollateralTokens(chainId, preset);

  const tokenConfigs = tokenConfigsRaw
    .map((config) => ({
      ...config,
      issuanceRatioD18: ethers.BigNumber.from(config.issuanceRatioD18),
      liquidationRatioD18: ethers.BigNumber.from(config.liquidationRatioD18),
      liquidationRewardD18: ethers.BigNumber.from(config.liquidationRewardD18),
      minDelegationD18: ethers.BigNumber.from(config.minDelegationD18),
    }))
    .map((x) => CollateralConfigurationSchema.parse({ ...x }))
    .filter(({ depositingEnabled }) => depositingEnabled);

  return tokenConfigs.map((config) => ({
    ...config,
    displaySymbol: config.symbol === 'WETH' ? 'ETH' : config.symbol,
  }));
}

export function useCollateralTypes(includeDelegationOff = false, customNetwork?: Network) {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;
  const { data: systemToken } = useSystemToken(customNetwork);

  return useQuery({
    enabled: Boolean(targetNetwork?.id && targetNetwork?.preset && systemToken),
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'CollateralTypes',
      { systemToken: systemToken?.symbol, includeDelegationOff },
    ],
    queryFn: async () => {
      if (!(targetNetwork?.id && targetNetwork?.preset && systemToken))
        throw Error('useCollateralTypes should not be enabled when contracts missing');

      const collateralTypes = (await loadCollateralTypes(targetNetwork.id, targetNetwork.preset))
        .map((collateralType) => {
          const isBase = isBaseAndromeda(targetNetwork?.id, targetNetwork?.preset);
          if (isBase && collateralType.symbol === 'sUSDC') {
            return {
              ...collateralType,
              symbol: 'USDC',
              displaySymbol: 'USDC',
              name: 'USD Coin',
            };
          }
          return {
            ...collateralType,
            symbol: collateralType.symbol,
            displaySymbol: collateralType.symbol,
          };
        })
        .filter((collateralType) => collateralType.tokenAddress !== systemToken.address);

      if (includeDelegationOff) {
        return collateralTypes;
      }

      // By default we only return collateral types that have minDelegationD18 < MaxUint256
      // When minDelegationD18 === MaxUint256, delegation is effectively disabled
      return collateralTypes.filter((collateralType) =>
        collateralType.minDelegationD18.lt(ethers.constants.MaxUint256)
      ) as CollateralType[];
    },
    // one hour in ms
    staleTime: Infinity,
    placeholderData: [],
  });
}

export function useCollateralType(collateralSymbol?: string) {
  const { data: collateralTypes, isFetching: isCollateralTypesFetching } = useCollateralTypes();

  function getCollateralType(collateralSymbol?: string) {
    if (!collateralTypes || !collateralTypes?.length) {
      return;
    }

    if (!collateralSymbol) {
      return collateralTypes[0];
    }

    return collateralTypes?.find(
      (collateral) => `${collateral.symbol}`.toLowerCase() === `${collateralSymbol}`.toLowerCase()
    );
  }

  return {
    isFetching: isCollateralTypesFetching,
    data: getCollateralType(collateralSymbol),
  };
}
