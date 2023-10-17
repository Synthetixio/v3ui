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