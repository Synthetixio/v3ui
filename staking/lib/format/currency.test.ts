import { currency } from './';
import { wei } from '@synthetixio/wei';

describe('currency', () => {
  it('should format positive Wei value with default options', () => {
    const value = wei('123456789000000000', 18, true);
    expect(currency(value)).toBe('0.12');
  });

  it('should format negative Wei value with default options', () => {
    const value = wei('-123456789000000000', 18, true);
    expect(currency(value)).toBe('-0.12');
  });

  it('should format positive Wei value with custom minimumDigitsToShowAfterZeros', () => {
    const value = wei('123456789000000000', 18, true);
    expect(currency(value, undefined, 4)).toBe('0.1235');
  });

  it('should format negative Wei value with custom minimumDigitsToShowAfterZeros', () => {
    const value = wei('-123456789000000000', 18, true);
    expect(currency(value, undefined, 4)).toBe('-0.1235');
  });

  it('should format zero Wei value with default options', () => {
    const value = wei('0');
    expect(currency(value)).toBe('0');
  });

  it('should format large positive Wei value', () => {
    const value = wei('123456789123456789123456789', 18, true);
    expect(currency(value)).toBe('123,456,789.12');
  });

  it('should format large negative Wei value', () => {
    const value = wei('-123456789123456789123456789', 18, true);
    expect(currency(value)).toBe('-123,456,789.12');
  });
});
