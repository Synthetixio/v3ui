import { parseTxError } from './parseTxError';

describe('parseTxError', () => {
  it('should return erorr data', () => {
    const error = {
      cause: {
        data: 'error',
      },
    };
    expect(parseTxError(error)).toBe(error.cause.data);
  });
});
