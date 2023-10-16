import { convertSecondsToDisplayString } from './';

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
