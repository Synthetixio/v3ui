import { Flex } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v3/formatters';
import Wei from '@synthetixio/wei';
import { StatBox } from './StatBox';
import { useSearchParams } from 'react-router-dom';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { calculateAssets } from '../Assets';

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

  const assets = calculateAssets(accountCollaterals, userTokenBalances, collateralPrices);

  const debt =
    positions && Object.values(positions).reduce((prev, cur) => prev.add(cur.debt), new Wei(0));

  const totalDelegated = assets
    ?.map((asset) => asset.collateral.totalAssigned.mul(asset.price))
    .reduce((prev, cur) => prev.add(cur), new Wei(0))
    .toNumber()
    .toFixed(2);

  const totalAssets = assets
    ?.map((asset) => {
      const assigned = asset.collateral.totalAssigned.mul(asset.price);
      const deposited = asset.collateral.totalDeposited.mul(asset.price);
      const wallet = asset.balance.mul(asset.price);
      // if already assigned to pool, we dont add it
      return assigned !== deposited ? assigned.add(wallet) : assigned.add(wallet).add(deposited);
    })
    .reduce((prev, cur) => prev.add(cur), new Wei(0))
    .toNumber()
    .toFixed(2);

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
