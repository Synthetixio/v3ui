import { unlockDateString, formatTimeToUnlock } from './date';

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

  // Test case 4: Exception on a invalid date
  it('should throw an exception when the date is invalid', () => {
    const invalidDate = new Date('invalid');
    expect(() => formatTimeToUnlock(invalidDate)).toThrow();
  });
});
