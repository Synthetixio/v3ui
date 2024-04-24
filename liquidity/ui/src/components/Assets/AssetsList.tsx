import { useMemo } from 'react';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useSearchParams } from 'react-router-dom';
import { AssetsTable } from './AssetTable';
import { calculateAssets } from '../../utils/assets';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';

export const AssetsList = () => {
  const [params] = useSearchParams();
  const accountId = params.get('accountId') || undefined;

  const { data: accountCollaterals, isLoading: isAccountCollateralsLoading } = useAccountCollateral(
    {
      accountId,
    }
  );

  const collateralAddresses =
    accountCollaterals?.map((collateral) => collateral.tokenAddress) || [];

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } =
    useTokenBalances(collateralAddresses);
  const { data: collateralPrices, isLoading: isCollateralPricesLoading } = useCollateralPrices();

  const { data: collateralTypes, isLoading: isCollateralTypesLoading } = useCollateralTypes();

  const { data: accountCollateralUnlockDate, isLoading: isAccountCollateralDateLoading } =
    useAccountCollateralUnlockDate({
      accountId,
    });

  const assets = useMemo(
    () => calculateAssets(accountCollaterals, userTokenBalances, collateralPrices, collateralTypes),
    [accountCollaterals, userTokenBalances, collateralPrices, collateralTypes]
  );

  const isLoading =
    isAccountCollateralsLoading ||
    tokenBalancesIsLoading ||
    isCollateralPricesLoading ||
    isCollateralTypesLoading ||
    isAccountCollateralDateLoading;

  return (
    <AssetsTable isLoading={isLoading} assets={assets} unlockDate={accountCollateralUnlockDate} />
  );
};
