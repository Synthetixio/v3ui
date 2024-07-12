export const getHealthVariant = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
}: {
  liquidationCratioPercentage: number | undefined;
  targetCratioPercentage: number | undefined;
  currentCRatioPercentage: number | undefined;
}) => {
  if (!liquidationCratioPercentage || !targetCratioPercentage || !currentCRatioPercentage) {
    return 'success';
  }
  if (currentCRatioPercentage === 0) {
    return 'success';
  }
  if (currentCRatioPercentage < liquidationCratioPercentage) {
    return 'error';
  }
  if (currentCRatioPercentage < targetCratioPercentage) {
    return 'warning';
  }

  return 'success';
};

export const ratioIsMaxUInt = (ratio: number) => ratio >= Number.MAX_SAFE_INTEGER;