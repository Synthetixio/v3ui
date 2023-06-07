import { CollateralChange, DebtChange } from '@snx-v3/ManagePositionContext';
import { Wei, wei } from '@synthetixio/wei';

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
  // TODO: In the case that we are minting max, or burning max etc, we will use ethers.constants.MaxUint256,
  // however this causes some UI related issues in displaying changes in debt and collateral. For these cases
  // We should use a display value to render the change in debt or collateral (and the change in C-ratio)

  const targetCRatio = issuanceRatioD18 ? issuanceRatioD18 : wei(1);
  const newDebt = wei(debt || 0).add(debtChange);
  const newCollateralAmount = wei(collateralAmount || 0).add(collateralChange);

  const collateralPrice = wei(collateralValue || 0).div(
    collateralAmount?.gt(0) ? collateralAmount : wei(1)
  );

  const newCRatio = newDebt.gt(0) ? collateralPrice.mul(newCollateralAmount).div(newDebt) : wei(0);

  const maybeMaxDebt = wei(newCollateralAmount)
    .mul(collateralPrice)
    .div(targetCRatio)
    .sub(debt || 0);

  const maxDebt = maybeMaxDebt.gte(0) ? maybeMaxDebt : wei(0);

  const isValid =
    (newCRatio.gte(targetCRatio) || newCRatio.lte(0)) &&
    (newDebt.eq(0) || newCollateralAmount.gt(0));

  return {
    isValid,
    hasChanges: !collateralChange.amount.eq(0) || !debtChange.amount.eq(0),
    newCRatio,
    newDebt,
    newCollateralAmount,
    maxDebt,
  };
};
