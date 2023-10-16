import { formatValue, parseUnits, compareAddress, prettyString } from './';
import { wei } from '@synthetixio/wei';

describe('formatValue', () => {
  it('should format value correctly with default decimals', () => {
    const value = wei('1234567890000000000', 18, true).toBN();
    expect(formatValue(value)).toBeCloseTo(1.23456789);
  });

  it('should format value correctly with custom decimals', () => {
    const value = wei('1234', 6, true).toBN();
    expect(formatValue(value, 6)).toBeCloseTo(0.001234);
  });
});

describe('parseUnits', () => {
  it('should parse units correctly with default decimals', () => {
    const value = parseUnits(wei('1000000000000000000', 18, true).toBN());
    expect(value.toString()).toBe('1000000000000000000');
  });

  it('should parse units correctly with custom decimals', () => {
    const value = parseUnits(wei('1234000000000', 6, true), 6);
    expect(value.toString()).toBe('1234000000000');
  });
});

describe('compareAddress', () => {
  it('should return true for matching addresses', () => {
    const address1 = '0x123456789abcdef';
    const address2 = '0x123456789ABCDEF';
    expect(compareAddress(address1, address2)).toBe(true);
  });

  it('should return false for non-matching addresses', () => {
    const address1 = '0xabcdef';
    const address2 = '0x123456';
    expect(compareAddress(address1, address2)).toBe(false);
  });

  it('should return false when one or both addresses are null', () => {
    const address1 = null;
    const address2 = '0x123456';
    const address3 = '0xabcdef';
    expect(compareAddress(address1, address2)).toBe(false);
    expect(compareAddress(address2, address3)).toBe(false);
    expect(compareAddress(null, null)).toBe(false);
  });
});

describe('prettyString', () => {
  it('should create a pretty string', () => {
    const text = 'Hello, World!';
    expect(prettyString(text)).toBe('Hello,...rld!');
  });

  it('should create a pretty string with custom start and end lengths', () => {
    const text = 'This is a longer text';
    expect(prettyString(text, 5, 6)).toBe('This ...r text');
  });

  it('should handle short strings', () => {
    const text = 'Short';
    expect(prettyString(text)).toBe('Short');
  });
});
