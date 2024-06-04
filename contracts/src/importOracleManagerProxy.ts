// !!! DO NOT EDIT !!! Automatically generated file

import type { OracleManagerProxy as OracleManagerProxy1Main } from './1-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy11155111Main } from './11155111-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy10Main } from './10-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy8453Andromeda } from './8453-andromeda/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy84532Andromeda } from './84532-andromeda/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy42161Main } from './42161-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy421614Main } from './421614-main/OracleManagerProxy';
import type { OracleManagerProxy as OracleManagerProxy42161Arbthetix } from './42161-arbthetix/OracleManagerProxy';

export type OracleManagerProxyType =
  | OracleManagerProxy1Main
  | OracleManagerProxy11155111Main
  | OracleManagerProxy10Main
  | OracleManagerProxy8453Andromeda
  | OracleManagerProxy84532Andromeda
  | OracleManagerProxy42161Main
  | OracleManagerProxy421614Main
  | OracleManagerProxy42161Arbthetix;

export async function importOracleManagerProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/OracleManagerProxy');
    case '11155111-main':
      return import('./11155111-main/OracleManagerProxy');
    case '10-main':
      return import('./10-main/OracleManagerProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/OracleManagerProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/OracleManagerProxy');
    case '42161-main':
      return import('./42161-main/OracleManagerProxy');
    case '421614-main':
      return import('./421614-main/OracleManagerProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/OracleManagerProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for OracleManagerProxy`);
  }
}
