// !!! DO NOT EDIT !!! Automatically generated file

import type { AccountProxy as AccountProxy1Main } from './1-main/AccountProxy';
import type { AccountProxy as AccountProxy11155111Main } from './11155111-main/AccountProxy';
import type { AccountProxy as AccountProxy10Main } from './10-main/AccountProxy';
import type { AccountProxy as AccountProxy8453Andromeda } from './8453-andromeda/AccountProxy';
import type { AccountProxy as AccountProxy84532Andromeda } from './84532-andromeda/AccountProxy';
import type { AccountProxy as AccountProxy42161Main } from './42161-main/AccountProxy';
import type { AccountProxy as AccountProxy421614Main } from './421614-main/AccountProxy';
import type { AccountProxy as AccountProxy42161Arbthetix } from './42161-arbthetix/AccountProxy';

export type AccountProxyType =
  | AccountProxy1Main
  | AccountProxy11155111Main
  | AccountProxy10Main
  | AccountProxy8453Andromeda
  | AccountProxy84532Andromeda
  | AccountProxy42161Main
  | AccountProxy421614Main
  | AccountProxy42161Arbthetix;

export async function importAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/AccountProxy');
    case '11155111-main':
      return import('./11155111-main/AccountProxy');
    case '10-main':
      return import('./10-main/AccountProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/AccountProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/AccountProxy');
    case '42161-main':
      return import('./42161-main/AccountProxy');
    case '421614-main':
      return import('./421614-main/AccountProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/AccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for AccountProxy`);
  }
}
