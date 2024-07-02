import { useMemo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v3/formatters';
import { StatBox } from './StatBox';
import { useSearchParams } from 'react-router-dom';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import {
  calculateAssets,
  calculateTotalAssetsAvailable,
  calculateTotalAssetsDelegated,
} from '../../utils/assets';
import { calculateDebt } from '../../utils/positions';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useSystemToken } from '@snx-v3/useSystemToken';

export const StatsList = () => {
  const [params] = useSearchParams();
  const { network } = useNetwork();

  const { data: usdTokens } = useGetUSDTokens();

  const { data: positions, isLoading: isLiquidityPositionLoading } = useLiquidityPositions({
    accountId: params.get('accountId') || undefined,
  });

  const { data: collateralTypes, isLoading: isCollateralTypesLoading } = useCollateralTypes();

  const { data: accountCollaterals, isLoading: isAccountCollateralsLoading } = useAccountCollateral(
    {
      accountId: params.get('accountId') || undefined,
    }
  );

  const collateralAddresses =
    isBaseAndromeda(network?.id, network?.preset) && usdTokens?.USDC
      ? accountCollaterals?.map((collateral) => collateral.tokenAddress).concat(usdTokens.USDC) ||
        []
      : accountCollaterals?.map((collateral) => collateral.tokenAddress) || [];

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } =
    useTokenBalances(collateralAddresses);

  const associatedUserBalances = userTokenBalances?.map((balance, index) => {
    return {
      balance,
      tokenAddress: collateralAddresses[index],
    };
  });

  const { data: collateralPrices, isLoading: isCollateralPricesLoading } = useCollateralPrices();

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const { data: systemToken } = useSystemToken();
  const assets = useMemo(
    () =>
      calculateAssets(
        accountCollaterals,
        associatedUserBalances,
        collateralPrices,
        collateralTypes,
        isBase,
        usdTokens?.USDC,
        systemToken
      ),
    [
      accountCollaterals,
      associatedUserBalances,
      collateralPrices,
      collateralTypes,
      isBase,
      usdTokens?.USDC,
      systemToken,
    ]
  );

  const debt = calculateDebt(positions);
  const totalAssets = calculateTotalAssetsAvailable(assets);
  const totalDelegated = calculateTotalAssetsDelegated(assets);

  const isLoading =
    isAccountCollateralsLoading ||
    tokenBalancesIsLoading ||
    isCollateralPricesLoading ||
    isLiquidityPositionLoading ||
    isCollateralTypesLoading;

  return (
    <Flex flexWrap="wrap" w="100%" gap="4" mt={6}>
      <StatBox
        title="Total Assets"
        isLoading={isLoading}
        value={totalAssets && formatNumberToUsd(totalAssets)}
        label={
          <>
            <Text fontWeight={600} textAlign="left">
              Total Assets:
            </Text>
            <Text textAlign="left">All assets in your Wallet and in your Synthetix Account.</Text>
          </>
        }
      />
      <StatBox
        title="Total Delegated"
        isLoading={isLoading}
        value={totalDelegated && formatNumberToUsd(totalDelegated)}
        label={
          <>
            <Text fontWeight={600} textAlign="left">
              Total Delegated:
            </Text>
            <Text textAlign="left" mt={1}>
              All assets in your Account that have been Delegated to a Pool.
            </Text>
          </>
        }
      />
      <StatBox
        title="Total Debt"
        isLoading={isLoading}
        value={debt && formatNumberToUsd(debt?.toNumber().toFixed(2))}
        label={
          <>
            <Text fontWeight={600} textAlign="left">
              Total Debt:
            </Text>
            <Text mt={1} textAlign="left">
              Aggregated Debt of all your Open Positions.
            </Text>
          </>
        }
      />
    </Flex>
  );
};
