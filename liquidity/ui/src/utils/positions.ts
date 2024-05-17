import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import Wei from '@synthetixio/wei';

type DebtPositions = Record<`${string}-${string}`, LiquidityPositionType>;

export function calculateDebt(positions?: DebtPositions) {
  return (
    positions && Object.values(positions).reduce((prev, cur) => prev.add(cur.debt), new Wei(0))
  );
}

export function calculatePositions(positionsByKey?: DebtPositions, isBase = false) {
  const positionsIds = !!positionsByKey
    ? (Object.keys(positionsByKey) as `${string}-${string}`[])
    : [];

  if (!positionsByKey) return [];

  return positionsIds.map((id) => {
    const position = positionsByKey[id];

    if (isBase && position.collateralType.symbol === 'sUSDC') {
      position.collateralType.symbol = 'USDC';
      position.collateralType.displaySymbol = 'USDC';
      position.collateralType.name = 'USD Coin';
    }

    return position;
  });
}
