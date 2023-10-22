import { convertSecondsToDisplayString, unlockDateString, formatTimeToUnlock } from './date';

describe('convertSecondsToDisplayString', () => {
  it('should return null when seconds is 0', () => {
    expect(convertSecondsToDisplayString(0)).toBeNull();
  });

  it('should return "every month" when seconds is 2592000', () => {
    expect(convertSecondsToDisplayString(2592000)).toBe('every month');
  });

  it('should return "every 2 months" when seconds is 5184000', () => {
    expect(convertSecondsToDisplayString(5184000)).toBe('every 2 months');
  });

  it('should return "every week" when seconds is 604800', () => {
    expect(convertSecondsToDisplayString(604800)).toBe('every week');
  });

  it('should return "every 2 weeks" when seconds is 1209600', () => {
    expect(convertSecondsToDisplayString(1209600)).toBe('every 2 weeks');
  });

  it('should return "every day" when seconds is 86400', () => {
    expect(convertSecondsToDisplayString(86400)).toBe('every day');
  });

  it('should return "every 2 days" when seconds is 172800', () => {
    expect(convertSecondsToDisplayString(172800)).toBe('every 2 days');
  });

  it('should return "every hour" when seconds is 3600', () => {
    expect(convertSecondsToDisplayString(3600)).toBe('every hour');
  });

  it('should return "every 2.5 hours" when seconds is 9000', () => {
    expect(convertSecondsToDisplayString(9000)).toBe('every 2.5 hours');
  });

  it('should return "every 3.7 hours" when seconds is 13320', () => {
    expect(convertSecondsToDisplayString(13320)).toBe('every 3.7 hours');
  });
});

describe('unlockDateString function', () => {
  // Test case 1: accountCollateralUnlockDate is undefined
  it('should return undefined when accountCollateralUnlockDate is undefined', () => {
    const result = unlockDateString(undefined);
    expect(result).toBeUndefined();
  });

  // Test case 2: accountCollateralUnlockDate is in the past
  it('should return undefined when accountCollateralUnlockDate is in the past', () => {
    const pastDate = new Date('2022-01-01T00:00:00');
    const result = unlockDateString(pastDate);
    expect(result).toBeUndefined();
  });

  // Test case 3: accountCollateralUnlockDate is in the future
  it('should return a formatted date string when accountCollateralUnlockDate is in the future', () => {
    // Create a future date (e.g., one day from now)
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const result = unlockDateString(futureDate);

    // Define the expected format (you may adjust this based on your intlFormat implementation)
    const expectedFormat = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}, [0-9]{1,2}:[0-9]{2}/;

    expect(result).toMatch(expectedFormat);
  });
});

describe('formatTimeToUnlock function', () => {
  // Test case 1: accountCollateralUnlockDate is undefined
  it('should return undefined when accountCollateralUnlockDate is undefined', () => {
    const result = formatTimeToUnlock(undefined);
    expect(result).toBeUndefined();
  });

  // Test case 2: accountCollateralUnlockDate is in the past
  it('should return undefined when accountCollateralUnlockDate is in the past', () => {
    const pastDate = new Date('2022-01-01T00:00:00');
    const result = formatTimeToUnlock(pastDate);
    expect(result).toBeUndefined();
  });

  // Test case 3: accountCollateralUnlockDate is in the future
  it('should return a formatted time string when accountCollateralUnlockDate is in the future', () => {
    // Create a future date (e.g., one day from now)
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const result = formatTimeToUnlock(futureDate);

    // Assert that the result is a non-empty string
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
