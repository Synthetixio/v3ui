import { useMemo } from 'react';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useSearchParams } from 'react-router-dom';
import { AssetsTable } from './AssetTable';
import { calculateAssets } from '../../utils/assets';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { getUSDCAddress, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';

export const AssetsList = () => {
  const [params] = useSearchParams();
  const { network } = useNetwork();
  const accountId = params.get('accountId') || undefined;

  const { data: accountCollaterals, isLoading: isAccountCollateralsLoading } = useAccountCollateral(
    {
      accountId,
    }
  );

  const collateralAddresses = isBaseAndromeda(network?.id, network?.preset)
    ? accountCollaterals
        ?.map((collateral) => collateral.tokenAddress)
        .concat(getUSDCAddress(network?.id)) || []
    : accountCollaterals?.map((collateral) => collateral.tokenAddress) || [];

  const { data: userTokenBalances, isLoading: tokenBalancesIsLoading } =
    useTokenBalances(collateralAddresses);
  const { data: collateralPrices, isLoading: isCollateralPricesLoading } = useCollateralPrices();

  const { data: collateralTypes, isLoading: isCollateralTypesLoading } = useCollateralTypes();

  const { data: accountCollateralUnlockDate, isLoading: isAccountCollateralDateLoading } =
    useAccountCollateralUnlockDate({
      accountId,
    });

  const combinedCollateral = useMemo(() => {
    return accountCollaterals &&
      accountCollaterals[0] &&
      isBaseAndromeda(network?.id, network?.preset)
      ? [
          accountCollaterals?.reduce((cur, prev, index) => {
            //ignore the first iteration cause we are starting witht the first index of the
            // array as a default
            if (!index) return cur;
            return {
              ...cur,
              availableCollateral: cur.availableCollateral.add(prev.availableCollateral),
            };
          }, accountCollaterals[0]),
        ]
      : accountCollaterals;
  }, [accountCollaterals, network?.id, network?.preset]);

  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const assets = useMemo(
    () =>
      calculateAssets(
        combinedCollateral,
        userTokenBalances,
        collateralPrices,
        collateralTypes,
        isBase
      ),
    [combinedCollateral, userTokenBalances, collateralPrices, collateralTypes, isBase]
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
