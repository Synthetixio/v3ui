import { LiquidityPositionType } from '@snx-v3/useLiquidityPositions';
import Wei from '@synthetixio/wei';

type DebtPositions = Record<`${string}-${string}`, LiquidityPositionType>;

export function calculateDebt(positions?: DebtPositions) {
  return (
    positions && Object.values(positions).reduce((prev, cur) => prev.add(cur.debt), new Wei(0))
  );
}

export function calculatePositions(positionsByKey?: DebtPositions) {
  const positionsIds = !!positionsByKey
    ? (Object.keys(positionsByKey) as `${string}-${string}`[])
    : [];

  return positionsByKey ? positionsIds.map((id) => positionsByKey[id]) : [];
}
