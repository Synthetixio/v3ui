// !!! DO NOT EDIT !!! Automatically generated file

import type { CoreProxy as CoreProxy1Main } from './1-main/CoreProxy';
import type { CoreProxy as CoreProxy10Main } from './10-main/CoreProxy';
import type { CoreProxy as CoreProxy11155111Main } from './11155111-main/CoreProxy';
import type { CoreProxy as CoreProxy13370Main } from './13370-main/CoreProxy';
import type { CoreProxy as CoreProxy42161Arbthetix } from './42161-arbthetix/CoreProxy';
import type { CoreProxy as CoreProxy421614Arbthetix } from './421614-arbthetix/CoreProxy';
import type { CoreProxy as CoreProxy8453Andromeda } from './8453-andromeda/CoreProxy';
import type { CoreProxy as CoreProxy84532Andromeda } from './84532-andromeda/CoreProxy';

export type CoreProxyType =
  | CoreProxy1Main
  | CoreProxy10Main
  | CoreProxy11155111Main
  | CoreProxy13370Main
  | CoreProxy42161Arbthetix
  | CoreProxy421614Arbthetix
  | CoreProxy8453Andromeda
  | CoreProxy84532Andromeda;

export async function importCoreProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/CoreProxy');
    case '10-main':
      return import('./10-main/CoreProxy');
    case '11155111-main':
      return import('./11155111-main/CoreProxy');
    case '13370-main':
      return import('./13370-main/CoreProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/CoreProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/CoreProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/CoreProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for CoreProxy`);
  }
}
