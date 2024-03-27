// !!! DO NOT EDIT !!! Automatically generated file

import type { AccountProxy as AccountProxy1Main } from './1-main/AccountProxy';
import type { AccountProxy as AccountProxy10Main } from './10-main/AccountProxy';
import type { AccountProxy as AccountProxy11155111Main } from './11155111-main/AccountProxy';
import type { AccountProxy as AccountProxy13370Main } from './13370-main/AccountProxy';
import type { AccountProxy as AccountProxy42161Arbthetix } from './42161-arbthetix/AccountProxy';
import type { AccountProxy as AccountProxy421614Arbthetix } from './421614-arbthetix/AccountProxy';
import type { AccountProxy as AccountProxy8453Andromeda } from './8453-andromeda/AccountProxy';
import type { AccountProxy as AccountProxy84532Andromeda } from './84532-andromeda/AccountProxy';

export type AccountProxyType =
  | AccountProxy1Main
  | AccountProxy10Main
  | AccountProxy11155111Main
  | AccountProxy13370Main
  | AccountProxy42161Arbthetix
  | AccountProxy421614Arbthetix
  | AccountProxy8453Andromeda
  | AccountProxy84532Andromeda;

export async function importAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/AccountProxy');
    case '10-main':
      return import('./10-main/AccountProxy');
    case '11155111-main':
      return import('./11155111-main/AccountProxy');
    case '13370-main':
      return import('./13370-main/AccountProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/AccountProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/AccountProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/AccountProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/AccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for AccountProxy`);
  }
}
