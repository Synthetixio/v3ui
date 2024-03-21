import { constants, utils } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { CoreProxyType, Multicall3Type } from '@synthetixio/v3-contracts';
import { z } from 'zod';
import { useMemo } from 'react';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

const USDCBaseAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const sUSDCBaseAddress = '0xC74eA762cF06c9151cE074E6a569a5945b6302E7';

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
});

export type CollateralType = z.infer<typeof CollateralTypeSchema>;

const SymbolSchema = z.string();
const ERC20Interface = new utils.Interface(['function symbol() view returns (string)']);

async function loadSymbols({
  Multicall3,
  tokenConfigs,
}: {
  Multicall3: Multicall3Type;
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

async function loadCollateralTypes({
  CoreProxy,
  Multicall3,
  isBaseAndromedaNetwork,
}: {
  CoreProxy: CoreProxyType;
  Multicall3: Multicall3Type;
  isBaseAndromedaNetwork?: boolean;
}): Promise<CollateralType[]> {
  const hideDisabled = true;
  const tokenConfigsRaw = await CoreProxy.getCollateralConfigurations(hideDisabled);

  const tokenConfigs = tokenConfigsRaw
    .map((x) => CollateralConfigurationSchema.parse({ ...x }))
    .filter(({ depositingEnabled }) => depositingEnabled); // sometimes we get back disabled ones, even though we ask for only enabled ones

  if (
    tokenConfigs.some((config) => {
      return config.tokenAddress === sUSDCBaseAddress && isBaseAndromedaNetwork;
    })
  ) {
    const sUSDConfig = tokenConfigs.find((config) => config.tokenAddress === sUSDCBaseAddress);
    if (sUSDConfig) {
      (tokenConfigs as any[]).push({
        tokenAddress: USDCBaseAddress,
        depositingEnabled: sUSDConfig.depositingEnabled,
        issuanceRatioD18: sUSDConfig.issuanceRatioD18,
        liquidationRatioD18: sUSDConfig.liquidationRatioD18,
        liquidationRewardD18: sUSDConfig.liquidationRewardD18,
        minDelegationD18: sUSDConfig.minDelegationD18,
        oracleNodeId: sUSDConfig.oracleNodeId,
        symbol: 'USDC',
        displaySymbol: 'USDC',
      });
    }
  }
  const symbols = await loadSymbols({ Multicall3, tokenConfigs });

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
  }));
}

export function useCollateralTypes(includeDelegationOff = false) {
  const { network } = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  const { data: Multicall3 } = useMulticall3();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'CollateralTypes', { includeDelegationOff }],
    queryFn: async () => {
      if (!CoreProxy || !Multicall3)
        throw Error('Query should not be enabled when contracts missing');

      const collateralTypes = (
        await loadCollateralTypes({
          CoreProxy,
          Multicall3,
          isBaseAndromedaNetwork: isBaseAndromeda(network?.id, network?.preset),
        })
      ).map((collateralType) => ({
        ...collateralType,
        symbol: collateralType.symbol,
        displaySymbol: collateralType.symbol,
      }));

      if (includeDelegationOff) {
        return collateralTypes;
      }

      // By default we only return collateral types that have minDelegationD18 < MaxUint256
      // When minDelegationD18 === MaxUint256, delegation is effectively disabled
      return collateralTypes.filter((collateralType) =>
        collateralType.minDelegationD18.lt(constants.MaxUint256)
      );
    },
    // one hour in ms
    staleTime: 60 * 60 * 1000,
    placeholderData: [],
    enabled: Boolean(CoreProxy && Multicall3),
  });
}

export function useCollateralType(collateralSymbol?: string) {
  const { data: collateralTypes, isLoading, error } = useCollateralTypes();

  return {
    isLoading,
    error,
    data: useMemo(() => {
      if (!collateralTypes || !collateralTypes?.length) {
        return;
      }
      if (!collateralSymbol) {
        return collateralTypes[0];
      }
      return collateralTypes.find(
        (collateral) => `${collateral.symbol}`.toLowerCase() === `${collateralSymbol}`.toLowerCase()
      );
    }, [collateralSymbol, collateralTypes]),
  };
}
