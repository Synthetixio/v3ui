import { useMemo } from 'react';
import { Flex } from '@chakra-ui/react';
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
  calculateTotalAssetsDelegated,
} from '../../utils/assets';
import { calculateDebt } from '../../utils/positions';

export const StatsList = () => {
  const [params] = useSearchParams();

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
  const totalAssets = calculateTotalAssets(assets);
  const totalDelegated = calculateTotalAssetsDelegated(assets);

  const isLoading =
    isAccountCollateralsLoading ||
    tokenBalancesIsLoading ||
    isCollateralPricesLoading ||
    isLiquidityPositionLoading;

  return (
    <Flex w="100%" gap="4" mt={6}>
      <StatBox
        title="Total Assets"
        isLoading={isLoading}
        value={totalAssets && formatNumberToUsd(totalAssets)}
        label="All assets in your Wallet and in your Synthetix Account."
      />
      <StatBox
        title="Total Delegated"
        isLoading={isLoading}
        value={totalDelegated && formatNumberToUsd(totalDelegated)}
        label="All assets in your Account that have been Delegated to a Pool."
      />
      <StatBox
        title="Total Debt"
        isLoading={isLoading}
        value={debt && formatNumberToUsd(debt?.toNumber().toFixed(2))}
        label="Aggregated Debt of all your Open Positions."
      />
      <StatBox
        title="APY"
        isLoading={isLoading}
        value="14%"
        label="Aggregated APY from all your positions."
      />
    </Flex>
  );
};
