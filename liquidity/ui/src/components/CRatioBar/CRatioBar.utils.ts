export const getHealthVariant = ({
  targetCratio,
  liquidationCratio,
  cRatio,
}: {
  liquidationCratio: number | undefined;
  targetCratio: number | undefined;
  cRatio: number | undefined;
}) => {
  if (!liquidationCratio || !targetCratio || !cRatio) {
    return 'success';
  }
  if (cRatio <= 0) {
    return 'success';
  }
  if (cRatio < liquidationCratio) {
    return 'error';
  }
  if (cRatio < targetCratio) {
    return 'warning';
  }
  return 'success';
};

export const ratioIsMaxUInt = (ratio: number) => ratio >= Number.MAX_SAFE_INTEGER;

export const getProgressSize = ({
  targetCratio,
  liquidationCratio,
  cRatio,
}: {
  liquidationCratio: number | undefined;
  targetCratio: number | undefined;
  cRatio: number | undefined;
}) => {
  if (!liquidationCratio || !targetCratio || !cRatio) {
    return 0;
  }

  if (cRatio < 0) {
    return 0;
  }

  if (cRatio >= targetCratio) {
    return 75 + (25 * (cRatio - targetCratio)) / liquidationCratio;
  }

  if (cRatio >= liquidationCratio) {
    return 25 + (50 * (cRatio - liquidationCratio)) / (targetCratio - liquidationCratio);
  }

  return (25 * cRatio) / liquidationCratio;
};
