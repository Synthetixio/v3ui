import { Hex } from 'viem';

export function parseTxError(error: any): Hex | undefined {
  try {
    if (error.cause?.data) {
      return error.cause?.data;
    }
    if (error.cause?.cause?.data) {
      return error.cause?.cause?.data;
    }
    if (error.cause?.cause?.cause?.data) {
      return error.cause?.cause?.cause?.data;
    }
    if (error.cause?.cause?.error?.data) {
      return error.cause?.cause?.error?.data;
    }
    if (error.cause?.cause?.cause?.error?.data) {
      return error.cause?.cause?.cause?.error?.data;
    }
  } catch (err) {
    console.error('exception error parser:', err);
  }
}
