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
  calculateTotalAssets,
  calculateTotalAssetsAvailable,
  calculateTotalAssetsDelegated,
} from '../../utils/assets';
import { calculateDebt } from '../../utils/positions';
import { useApr } from '@snx-v3/useApr';

export const StatsList = () => {
  const [params] = useSearchParams();

  const { data: apr, isLoading: aprIsLoading } = useApr();

  const { data: positions, isLoading: isLiquidityPositionLoading } = useLiquidityPositions({
    accountId: params.get('accountId') || undefined,
  });

  const { data: accountCollaterals, isLoading: isAccountCollateralsLoading } = useAccountCollateral(
    {
      accountId: params.get('accountId') || undefined,
    }
  );

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } = useTokenBalances(
    accountCollaterals?.map((collateral) => collateral.tokenAddress) || []
  );

  const { data: collateralPrices, isLoading: isCollateralPricesLoading } = useCollateralPrices();

  const assets = useMemo(
    () => calculateAssets(accountCollaterals, userTokenBalances, collateralPrices),
    [accountCollaterals, userTokenBalances, collateralPrices]
  );

  const debt = calculateDebt(positions);
  const totalAssets = calculateTotalAssetsAvailable(assets);
  const totalDelegated = calculateTotalAssetsDelegated(assets);

  const isLoading =
    isAccountCollateralsLoading ||
    tokenBalancesIsLoading ||
    isCollateralPricesLoading ||
    isLiquidityPositionLoading ||
    aprIsLoading;

  return (
    <Flex w="100%" gap="4" mt={6}>
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
            <Text textAlign="left">
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
            <Text textAlign="left">Aggregated Debt of all your Open Positions.</Text>
          </>
        }
      />
      <StatBox
        title="APR"
        isLoading={isLoading}
        value={!!apr ? apr.combinedApr.toFixed(2) + '%' : '-'}
        label={
          <>
            <Text fontWeight={600} textAlign="left">
              APY Annual Percentage Yield:
            </Text>
            <Text textAlign="left">Aggregated APY from all your Positions.</Text>
            <Text textAlign="left">Sum(past 24 hourly pnls) * 365)</Text>
          </>
        }
      />
    </Flex>
  );
};
