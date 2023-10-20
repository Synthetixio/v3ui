// !!! DO NOT EDIT !!! Automatically generated file

import type { CCIP as CCIP1Main } from './1/CCIP';
import type { CCIP as CCIP5Main } from './5/CCIP';
import type { CCIP as CCIP10Main } from './10/CCIP';
import type { CCIP as CCIP420Main } from './420/CCIP';
import type { CCIP as CCIP11155111Main } from './11155111/CCIP';
import type { CCIP as CCIP84531Competition } from './84531-competition/CCIP';

export type CCIPType =
  | CCIP1Main
  | CCIP5Main
  | CCIP10Main
  | CCIP420Main
  | CCIP11155111Main
  | CCIP84531Competition;

export async function importCCIP(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1/CCIP');
    case '5-main':
      return import('./5/CCIP');
    case '10-main':
      return import('./10/CCIP');
    case '420-main':
      return import('./420/CCIP');
    case '11155111-main':
      return import('./11155111/CCIP');
    case '84531-competition':
      return import('./84531-competition/CCIP');
    default:
      throw new Error(`Unsupported chain ${chainId} for CCIP`);
  }
}
