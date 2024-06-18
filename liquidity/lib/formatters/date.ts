import { formatDistanceToNow, intlFormat } from 'date-fns';

export function convertSecondsToDisplayString(seconds: number) {
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2592000;

  if (seconds === 0) {
    return null;
  } else if (seconds % secondsInMonth === 0) {
    const months = seconds / secondsInMonth;
    return months === 1 ? 'every month' : `every ${months} months`;
  } else if (seconds % secondsInWeek === 0) {
    const weeks = seconds / secondsInWeek;
    return weeks === 1 ? 'every week' : `every ${weeks} weeks`;
  } else if (seconds % secondsInDay === 0) {
    const days = seconds / secondsInDay;
    return days === 1 ? 'every day' : `every ${days} days`;
  } else if (seconds % secondsInHour === 0) {
    const hours = seconds / secondsInHour;
    return hours === 1 ? 'every hour' : `every ${hours.toFixed(1)} hours`;
  } else {
    const hours = seconds / secondsInHour;
    return `every ${hours.toFixed(1)} hours`;
  }
}

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
