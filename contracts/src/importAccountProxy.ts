// !!! DO NOT EDIT !!! Automatically generated file

import type { AccountProxy as AccountProxy1Main } from './1/AccountProxy';
import type { AccountProxy as AccountProxy5Main } from './5/AccountProxy';
import type { AccountProxy as AccountProxy10Main } from './10/AccountProxy';
import type { AccountProxy as AccountProxy420Main } from './420/AccountProxy';
import type { AccountProxy as AccountProxy11155111Main } from './11155111/AccountProxy';
import type { AccountProxy as AccountProxy84531Main } from './84531/AccountProxy';
import type { AccountProxy as AccountProxy84531Competition } from './84531-competition/AccountProxy';
import type { AccountProxy as AccountProxy84531Andromeda } from './84531-andromeda/AccountProxy';
import type { AccountProxy as AccountProxy13370Main } from './13370/AccountProxy';

export type AccountProxyType =
  | AccountProxy1Main
  | AccountProxy5Main
  | AccountProxy10Main
  | AccountProxy420Main
  | AccountProxy11155111Main
  | AccountProxy84531Main
  | AccountProxy84531Competition
  | AccountProxy84531Andromeda
  | AccountProxy13370Main;

export async function importAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1/AccountProxy');
    case '5-main':
      return import('./5/AccountProxy');
    case '10-main':
      return import('./10/AccountProxy');
    case '420-main':
      return import('./420/AccountProxy');
    case '11155111-main':
      return import('./11155111/AccountProxy');
    case '84531-main':
      return import('./84531/AccountProxy');
    case '84531-competition':
      return import('./84531-competition/AccountProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/AccountProxy');
    case '13370-main':
      return import('./13370/AccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for AccountProxy`);
  }
}
