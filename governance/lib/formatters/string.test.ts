import { truncateAddress, parseFloatWithCommas } from './string';

describe('truncateAddress', () => {
  it('should truncate the address with default parameters', () => {
    const address = '0x123456789abcdef'; // 14 characters
    expect(truncateAddress(address)).toBe('0x123...bcdef');
  });

  it('should truncate the address with custom first and last lengths', () => {
    const address = '0x123456789abcdef'; // 14 characters
    expect(truncateAddress(address, 6, 4)).toBe('0x1234...cdef');
  });

  it('should handle a shorter address', () => {
    const address = '0x123'; // 6 characters
    expect(truncateAddress(address)).toBe('0x123');
  });

  it('should handle an address shorter than first + last lengths', () => {
    const address = '0x12345'; // 8 characters
    expect(truncateAddress(address, 6, 4)).toBe('0x12345');
  });
});

describe('parseFloatWithCommas', () => {
  it('should parse a number with commas', () => {
    const numberWithCommas = '1,234,567.89';
    expect(parseFloatWithCommas(numberWithCommas)).toBe(1234567.89);
  });

  it('should parse a number without commas', () => {
    const numberWithCommas = '1234.56';
    expect(parseFloatWithCommas(numberWithCommas)).toBe(1234.56);
  });

  it('should handle a number with leading and trailing whitespace', () => {
    const numberWithCommas = '   1,234.56   ';
    expect(parseFloatWithCommas(numberWithCommas)).toBe(1234.56);
  });

  it('should handle a negative number with commas', () => {
    const numberWithCommas = '-1,234,567.89';
    expect(parseFloatWithCommas(numberWithCommas)).toBe(-1234567.89);
  });

  it('should handle a number with invalid commas', () => {
    const numberWithCommas = '1,23,45,6.78'; // Invalid commas
    expect(parseFloatWithCommas(numberWithCommas)).toBe(123456.78);
  });
});
