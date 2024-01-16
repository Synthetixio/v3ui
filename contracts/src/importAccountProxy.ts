// !!! DO NOT EDIT !!! Automatically generated file

import type { AccountProxy as AccountProxy1Main } from './1-main/AccountProxy';
import type { AccountProxy as AccountProxy10Main } from './10-main/AccountProxy';
import type { AccountProxy as AccountProxy11155111Main } from './11155111-main/AccountProxy';
import type { AccountProxy as AccountProxy13370Main } from './13370-main/AccountProxy';
import type { AccountProxy as AccountProxy420Main } from './420-main/AccountProxy';
import type { AccountProxy as AccountProxy5Main } from './5-main/AccountProxy';
import type { AccountProxy as AccountProxy8453Andromeda } from './8453-andromeda/AccountProxy';
import type { AccountProxy as AccountProxy84531Andromeda } from './84531-andromeda/AccountProxy';
import type { AccountProxy as AccountProxy84531Main } from './84531-main/AccountProxy';
import type { AccountProxy as AccountProxy84532Andromeda } from './84532-andromeda/AccountProxy';

export type AccountProxyType =
  | AccountProxy1Main
  | AccountProxy10Main
  | AccountProxy11155111Main
  | AccountProxy13370Main
  | AccountProxy420Main
  | AccountProxy5Main
  | AccountProxy8453Andromeda
  | AccountProxy84531Andromeda
  | AccountProxy84531Main
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
    case '420-main':
      return import('./420-main/AccountProxy');
    case '5-main':
      return import('./5-main/AccountProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/AccountProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/AccountProxy');
    case '84531-main':
      return import('./84531-main/AccountProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/AccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for AccountProxy`);
  }
}
