import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import Wei from '@synthetixio/wei';

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

export function calculateTotalAssets(assets?: Asset[]) {
  return assets
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
}

export function calculateTotalAssetsDelegated(assets?: Asset[]) {
  return assets
    ?.map((asset) => asset.collateral.totalAssigned.mul(asset.price))
    .reduce((prev, cur) => prev.add(cur), new Wei(0))
    .toNumber()
    .toFixed(2);
}
