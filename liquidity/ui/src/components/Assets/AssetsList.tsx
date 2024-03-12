import { useAccountCollateral, AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useSearchParams } from 'react-router-dom';
import Wei from '@synthetixio/wei';
import { AssetsTable } from './AssetTable';

export const AssetsList = () => {
  const [params] = useSearchParams();

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

  const isLoading =
    isAccountCollateralsLoading || tokenBalancesIsLoading || isCollateralPricesLoading;

  return <AssetsTable isLoading={isLoading} assets={assets} />;
};

export interface Asset {
  collateral: AccountCollateralType;
  balance: Wei;
  price: Wei | undefined;
}

export function calculateAssets(
  accountCollaterals?: AccountCollateralType[],
  userTokenBalances?: Wei[] | undefined,
  collateralPrices?: Record<string, Wei | undefined>
): Asset[] | undefined {
  if (!accountCollaterals || !userTokenBalances || !collateralPrices) return;

  return accountCollaterals.map((collateral, index) => {
    const balance = userTokenBalances[index];
    const price = collateralPrices[collateral.tokenAddress];

    return {
      collateral,
      balance,
      price,
    };
  });
}
