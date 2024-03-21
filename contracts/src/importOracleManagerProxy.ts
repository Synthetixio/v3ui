// !!! DO NOT EDIT !!! Automatically generated file

import type { OracleManagerProxy as OracleManagerProxy1Main } from './1-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy10Main } from './10-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy11155111Main } from './11155111-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy13370Main } from './13370-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy42161Arbthetix } from './42161-arbthetix/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy421614Arbthetix } from './421614-arbthetix/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy8453Andromeda } from './8453-andromeda/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy84531Andromeda } from './84531-andromeda/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy84531Main } from './84531-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy84532Andromeda } from './84532-andromeda/OracleManagerProxy';

export type OracleManagerProxyType =
  | OracleManagerProxy1Main
  | OracleManagerProxy10Main
  | OracleManagerProxy11155111Main
  | OracleManagerProxy13370Main
  | OracleManagerProxy42161Arbthetix
  | OracleManagerProxy421614Arbthetix
  | OracleManagerProxy8453Andromeda
  | OracleManagerProxy84531Andromeda
  | OracleManagerProxy84531Main
  | OracleManagerProxy84532Andromeda;

export async function importOracleManagerProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/OracleManagerProxy');
    case '10-main':
      return import('./10-main/OracleManagerProxy');
    case '11155111-main':
      return import('./11155111-main/OracleManagerProxy');
    case '13370-main':
      return import('./13370-main/OracleManagerProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/OracleManagerProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/OracleManagerProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/OracleManagerProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/OracleManagerProxy');
    case '84531-main':
      return import('./84531-main/OracleManagerProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/OracleManagerProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for OracleManagerProxy`);
  }
}
