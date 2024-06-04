// !!! DO NOT EDIT !!! Automatically generated file

import type { CoreProxy as CoreProxy1Main } from './1-main/CoreProxy';
import type { CoreProxy as CoreProxy11155111Main } from './11155111-main/CoreProxy';
import type { CoreProxy as CoreProxy10Main } from './10-main/CoreProxy';
import type { CoreProxy as CoreProxy8453Andromeda } from './8453-andromeda/CoreProxy';
import type { CoreProxy as CoreProxy84532Andromeda } from './84532-andromeda/CoreProxy';
import type { CoreProxy as CoreProxy42161Main } from './42161-main/CoreProxy';
import type { CoreProxy as CoreProxy421614Main } from './421614-main/CoreProxy';
import type { CoreProxy as CoreProxy42161Arbthetix } from './42161-arbthetix/CoreProxy';

export type CoreProxyType =
  | CoreProxy1Main
  | CoreProxy11155111Main
  | CoreProxy10Main
  | CoreProxy8453Andromeda
  | CoreProxy84532Andromeda
  | CoreProxy42161Main
  | CoreProxy421614Main
  | CoreProxy42161Arbthetix;

export async function importCoreProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/CoreProxy');
    case '11155111-main':
      return import('./11155111-main/CoreProxy');
    case '10-main':
      return import('./10-main/CoreProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/CoreProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/CoreProxy');
    case '42161-main':
      return import('./42161-main/CoreProxy');
    case '421614-main':
      return import('./421614-main/CoreProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for CoreProxy`);
  }
}
