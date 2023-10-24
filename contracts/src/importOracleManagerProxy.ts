// !!! DO NOT EDIT !!! Automatically generated file

import type { OracleManagerProxy as OracleManagerProxy1Main } from './1/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy5Main } from './5/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy10Main } from './10/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy420Main } from './420/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy11155111Main } from './11155111/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy84531Main } from './84531/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy84531Competition } from './84531-competition/OracleManagerProxy';

export type OracleManagerProxyType =
  | OracleManagerProxy1Main
  | OracleManagerProxy5Main
  | OracleManagerProxy10Main
  | OracleManagerProxy420Main
  | OracleManagerProxy11155111Main
  | OracleManagerProxy84531Main
  | OracleManagerProxy84531Competition;

export async function importOracleManagerProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1/OracleManagerProxy');
    case '5-main':
      return import('./5/OracleManagerProxy');
    case '10-main':
      return import('./10/OracleManagerProxy');
    case '420-main':
      return import('./420/OracleManagerProxy');
    case '11155111-main':
      return import('./11155111/OracleManagerProxy');
    case '84531-main':
      return import('./84531/OracleManagerProxy');
    case '84531-competition':
      return import('./84531-competition/OracleManagerProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for OracleManagerProxy`);
  }
}
