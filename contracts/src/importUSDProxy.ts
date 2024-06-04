// !!! DO NOT EDIT !!! Automatically generated file

import type { USDProxy as USDProxy1Main } from './1-main/USDProxy';
import type { USDProxy as USDProxy11155111Main } from './11155111-main/USDProxy';
import type { USDProxy as USDProxy10Main } from './10-main/USDProxy';
import type { USDProxy as USDProxy8453Andromeda } from './8453-andromeda/USDProxy';
import type { USDProxy as USDProxy84532Andromeda } from './84532-andromeda/USDProxy';
import type { USDProxy as USDProxy42161Main } from './42161-main/USDProxy';
import type { USDProxy as USDProxy421614Main } from './421614-main/USDProxy';
import type { USDProxy as USDProxy42161Arbthetix } from './42161-arbthetix/USDProxy';

export type USDProxyType =
  | USDProxy1Main
  | USDProxy11155111Main
  | USDProxy10Main
  | USDProxy8453Andromeda
  | USDProxy84532Andromeda
  | USDProxy42161Main
  | USDProxy421614Main
  | USDProxy42161Arbthetix;

export async function importUSDProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/USDProxy');
    case '11155111-main':
      return import('./11155111-main/USDProxy');
    case '10-main':
      return import('./10-main/USDProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/USDProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/USDProxy');
    case '42161-main':
      return import('./42161-main/USDProxy');
    case '421614-main':
      return import('./421614-main/USDProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/USDProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for USDProxy`);
  }
}
