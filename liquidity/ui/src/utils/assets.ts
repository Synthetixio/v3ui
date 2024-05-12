import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import Wei, { wei } from '@synthetixio/wei';
import { ONEWEI, ZEROWEI } from './constants';
import { getUSDCAddress } from '@snx-v3/isBaseAndromeda';

export interface Asset {
  collateral: AccountCollateralType;
  balance: Wei;
  price: Wei | undefined;
}

export function calculateAssets(
  accountCollaterals?: AccountCollateralType[],
  associatedUserBalances?:
    | {
        balance: Wei;
        tokenAddress: string;
      }[]
    | undefined,
  collateralPrices?: Record<string, Wei | undefined>,
  collateralTypes?: CollateralType[],
  isBase?: boolean,
  networkId?: number
): Asset[] | undefined {
  if (!accountCollaterals && !associatedUserBalances && !collateralPrices) return;

  // Empty state
  if (collateralTypes && !accountCollaterals && associatedUserBalances) {
    // Because we are mapping over collateral types we need to convert sUSDC symbol to USDC

    return collateralTypes.map((collateral) => {
      if (isBase && collateral.symbol === 'USDC') {
        const balance =
          associatedUserBalances?.find((item) => item.tokenAddress === getUSDCAddress(networkId))
            ?.balance || wei(0);

        return {
          collateral: {
            ...collateral,
            availableCollateral: ZEROWEI,
            totalDeposited: ZEROWEI,
            totalAssigned: ZEROWEI,
            totalLocked: ZEROWEI,
          },
          balance,
          price: ONEWEI,
        };
      }

      return {
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
      };
    });
  }

  if (associatedUserBalances && collateralPrices) {
    return accountCollaterals?.map((collateral) => {
      let balance =
        associatedUserBalances.find((item) => item.tokenAddress === collateral.tokenAddress)
          ?.balance || wei(0);
      const price = collateralPrices[collateral.tokenAddress] ?? ONEWEI;

      // ANDROMEDA CASE
      if (isBase && collateral.symbol === 'USDC') {
        // We also want to show the USDC balance, not the sUSDC balance
        balance =
          associatedUserBalances.find(
            (balance) => balance.tokenAddress === getUSDCAddress(networkId)
          )?.balance || wei(0);
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
