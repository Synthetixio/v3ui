import { formatDistanceToNow, intlFormat } from 'date-fns';

export function convertToReadableInterval(total: number, seconds: number) {
  // If the distribution is immediate, we return immediate, otherwise we return the amount per week
  const secondInWeek = 604800;
  if (seconds === 0) {
    return { amount: total, frequencyString: null };
  } else {
    const ratio = seconds / secondInWeek;
    const amount = total / ratio;
    return { amount: Math.floor(amount), frequencyString: 'per week' };
  }
}

export const formatTimeToUnlock = (accountCollateralUnlockDate: Date | undefined) => {
  if (!accountCollateralUnlockDate || accountCollateralUnlockDate.getTime() <= Date.now()) {
    return undefined;
  }
  return formatDistanceToNow(accountCollateralUnlockDate, { addSuffix: true });
};

export const unlockDateString = (accountCollateralUnlockDate: Date | undefined) => {
  if (!accountCollateralUnlockDate || accountCollateralUnlockDate.getTime() <= Date.now()) {
    return undefined;
  }

  return intlFormat(accountCollateralUnlockDate, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
