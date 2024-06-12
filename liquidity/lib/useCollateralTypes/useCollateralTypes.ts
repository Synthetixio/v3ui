import { constants, utils, Contract } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useMemo } from 'react';

const CollateralConfigurationSchema = z.object({
  depositingEnabled: z.boolean(),
  issuanceRatioD18: ZodBigNumber.transform((x) => wei(x)),
  liquidationRatioD18: ZodBigNumber.transform((x) => wei(x)),
  liquidationRewardD18: ZodBigNumber.transform((x) => wei(x)),
  oracleNodeId: z.string(),
  tokenAddress: z.string().startsWith('0x'), // As of current version in zod this will be a string: https://github.com/colinhacks/zod/issues/1747
  minDelegationD18: ZodBigNumber.transform((x) => wei(x)),
});

const CollateralTypeSchema = CollateralConfigurationSchema.extend({
  symbol: z.string(),
  displaySymbol: z.string(),
  name: z.string(),
});

export type CollateralType = z.infer<typeof CollateralTypeSchema>;

const SymbolSchema = z.string();

const ERC20Interface = new utils.Interface([
  'function symbol() view returns (string)',
  'function name() view returns (string)',
]);

async function loadSymbols({
  Multicall3,
  tokenConfigs,
}: {
  Multicall3: Contract;
  tokenConfigs: z.infer<typeof CollateralConfigurationSchema>[];
}) {
  const calls = tokenConfigs.map((tokenConfig) => ({
    target: tokenConfig.tokenAddress,
    callData: ERC20Interface.encodeFunctionData('symbol'),
  }));

  const multicallResult = await Multicall3.callStatic.aggregate(calls);

  return multicallResult.returnData.map((bytes: string) =>
    SymbolSchema.parse(ERC20Interface.decodeFunctionResult('symbol', bytes)[0])
  );
}

async function loadName({
  Multicall3,
  tokenConfigs,
}: {
  Multicall3: Contract;
  tokenConfigs: z.infer<typeof CollateralConfigurationSchema>[];
}) {
  const calls = tokenConfigs.map((tokenConfig) => ({
    target: tokenConfig.tokenAddress,
    callData: ERC20Interface.encodeFunctionData('name'),
  }));

  const multicallResult = await Multicall3.callStatic.aggregate(calls);

  return multicallResult.returnData.map((bytes: string) =>
    SymbolSchema.parse(ERC20Interface.decodeFunctionResult('name', bytes)[0])
  );
}

async function loadCollateralTypes({
  CoreProxy,
  Multicall3,
}: {
  CoreProxy: Contract;
  Multicall3: Contract;
}): Promise<CollateralType[]> {
  const hideDisabled = true;
  const tokenConfigsRaw: CollateralType[] =
    await CoreProxy.getCollateralConfigurations(hideDisabled);

  const tokenConfigs = tokenConfigsRaw
    .map((x) => CollateralConfigurationSchema.parse({ ...x }))
    .filter(({ depositingEnabled }) => depositingEnabled); // sometimes we get back disabled ones, even though we ask for only enabled ones

  const symbols = await loadSymbols({ Multicall3, tokenConfigs });

  const names = await loadName({ Multicall3, tokenConfigs });

  return tokenConfigs.map((config, i) => ({
    depositingEnabled: config.depositingEnabled,
    issuanceRatioD18: config.issuanceRatioD18,
    liquidationRatioD18: config.liquidationRatioD18,
    liquidationRewardD18: config.liquidationRewardD18,
    minDelegationD18: config.minDelegationD18,
    oracleNodeId: config.oracleNodeId,
    tokenAddress: config.tokenAddress,
    symbol: symbols[i],
    displaySymbol: symbols[i] === 'WETH' ? 'ETH' : symbols[i],
    name: names[i],
  }));
}

export function useCollateralTypes(includeDelegationOff = false, customNetwork?: Network) {
  const { network } = useNetwork();
  const { data: CoreProxy } = useCoreProxy(customNetwork);
  const { data: Multicall3 } = useMulticall3(customNetwork);

  const targetNetwork = useMemo(() => customNetwork || network, [customNetwork, network]);

  return useQuery({
    queryKey: [
      `${targetNetwork?.id}-${targetNetwork?.preset}`,
      'CollateralTypes',
      { includeDelegationOff },
    ],
    queryFn: async () => {
      if (!CoreProxy || !Multicall3)
        throw Error('useCollateralTypes should not be enabled when contracts missing');

      const collateralTypes = (await loadCollateralTypes({ CoreProxy, Multicall3 }))
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
        .filter((collateralType) => collateralType.symbol !== 'snxUSD');

      if (includeDelegationOff) {
        return collateralTypes;
      }

      // By default we only return collateral types that have minDelegationD18 < MaxUint256
      // When minDelegationD18 === MaxUint256, delegation is effectively disabled
      return collateralTypes.filter((collateralType) =>
        collateralType.minDelegationD18.lt(constants.MaxUint256)
      ) as CollateralType[];
    },
    // one hour in ms
    staleTime: 60 * 60 * 1000,
    placeholderData: [],
    enabled: Boolean(targetNetwork && CoreProxy && Multicall3),
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
