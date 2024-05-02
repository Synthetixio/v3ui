import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import Wei from '@synthetixio/wei';
import { ONEWEI, ZEROWEI } from './constants';

export interface Asset {
  collateral: AccountCollateralType;
  balance: Wei;
  price: Wei | undefined;
}

export function calculateAssets(
  accountCollaterals?: AccountCollateralType[],
  userTokenBalances?: Wei[] | undefined,
  collateralPrices?: Record<string, Wei | undefined>,
  collateralTypes?: CollateralType[],
  isBase?: boolean
): Asset[] | undefined {
  if (!accountCollaterals && !userTokenBalances && !collateralPrices) return;

  // Empty state
  if (collateralTypes && !accountCollaterals) {
    return collateralTypes.map((collateral) => ({
      collateral: {
        tokenAddress: collateral.tokenAddress,
        symbol: collateral.symbol,
        displaySymbol: collateral.displaySymbol,
        availableCollateral: ZEROWEI,
        totalDeposited: ZEROWEI,
        totalAssigned: ZEROWEI,
        totalLocked: ZEROWEI,
      },
      balance: ZEROWEI,
      price: ZEROWEI,
    }));
  }

  if (userTokenBalances && collateralPrices) {
    return accountCollaterals?.map((collateral, index) => {
      const balance = userTokenBalances[index];
      const price = collateralPrices[collateral.tokenAddress] ?? ONEWEI;
      // We want to add USDC that user has in his wallet.
      if (isBase && index === accountCollaterals.length - 1) {
        return { collateral, balance: balance.add(userTokenBalances[2]), price };
      }
      return {
        collateral,
        balance,
        price,
      };
    });
  }
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
    .reduce((prev, cur) => prev.add(cur), ZEROWEI)
    .toNumber()
    .toFixed(2);
}

export function calculateTotalAssetsDelegated(assets?: Asset[]) {
  return assets
    ?.map((asset) => asset.collateral.totalAssigned.mul(asset.price))
    .reduce((prev, cur) => prev.add(cur), ZEROWEI)
    .toNumber()
    .toFixed(2);
}

export function calculateTotalAssetsAvailable(assets?: Asset[]) {
  return assets
    ?.map((asset) => {
      const assigned = asset.collateral.availableCollateral;
      const wallet = asset.balance.mul(asset.price);
      return assigned.add(wallet);
    })
    .reduce((prev, cur) => prev.add(cur), ZEROWEI)
    .toNumber()
    .toFixed(2);
}
