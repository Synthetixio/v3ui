type DebtPosition = Record<
  `${string}-${string}`,
  {
    id: string;
    accountId: string;
    poolId: string;
    poolName: string;
    collateralPrice: string;
    collateralAmount: string;
    collateralValue: string;
    collateralType: string;
    cRatio: string;
    debt: string;
    isPreferred: boolean;
  }
>;

export function calculateDebt(positions: DebtPosition[]) {
  return (
    positions && Object.values(positions).reduce((prev, cur) => prev.add(cur.debt), new Wei(0))
  );
}
