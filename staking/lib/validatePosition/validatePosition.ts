import { CollateralChange, DebtChange } from '@snx-v3/ManagePositionContext';
import { Wei, wei } from '@synthetixio/wei';

function calculateNewDebt(debt: Wei, debtChange: DebtChange) {
  const newDebt = debt.add(debtChange.amount);

  if (newDebt.lt(0)) {
    return wei(0);
  }

  return debt.add(debtChange.amount);
}

function calculateNewCollateral(collateral: Wei, collateralChange: CollateralChange) {
  return collateral.add(collateralChange.amount);
}

function calculateNewCRatio(debt: Wei, collateral: Wei, collateralPrice: Wei) {
  return debt.gt(0) ? collateralPrice.mul(collateral).div(debt) : wei(0);
}

export const validatePosition = ({
  issuanceRatioD18,
  collateralAmount,
  collateralValue,
  debt,
  collateralChange,
  debtChange,
}: {
  issuanceRatioD18?: Wei;
  collateralAmount?: Wei;
  collateralValue?: Wei;
  debt?: Wei;
  collateralChange: CollateralChange;
  debtChange: DebtChange;
}) => {
  const targetCRatio = issuanceRatioD18 ? issuanceRatioD18 : wei(1);

  const newDebt = calculateNewDebt(debt || wei(0), debtChange);
  const newCollateral = calculateNewCollateral(collateralAmount || wei(0), collateralChange);

  const collateralPrice = wei(collateralValue || 0).div(
    collateralAmount?.gt(0) ? collateralAmount : wei(1)
  );

  const newCRatio = calculateNewCRatio(newDebt, newCollateral, collateralPrice);

  const maybeMaxDebt = wei(newCollateral)
    .mul(collateralPrice)
    .div(targetCRatio)
    .sub(debt || 0);

  const maxDebt = maybeMaxDebt.gte(0) ? maybeMaxDebt : wei(0);

  const isValid =
    (newCRatio.gte(targetCRatio) || newCRatio.lte(0)) && (newDebt.eq(0) || newCollateral.gt(0));

  return {
    isValid,
    hasChanges: !collateralChange.amount.eq(0) || !debtChange.amount.eq(0),
    newCRatio,
    newDebt,
    newCollateral,
    maxDebt,
  };
};
