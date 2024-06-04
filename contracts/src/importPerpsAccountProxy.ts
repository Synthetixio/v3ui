// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsAccountProxy as PerpsAccountProxy8453Andromeda } from './8453-andromeda/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84532Andromeda } from './84532-andromeda/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy42161Main } from './42161-main/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy421614Main } from './421614-main/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy42161Arbthetix } from './42161-arbthetix/PerpsAccountProxy';

export type PerpsAccountProxyType =
  | PerpsAccountProxy8453Andromeda
  | PerpsAccountProxy84532Andromeda
  | PerpsAccountProxy42161Main
  | PerpsAccountProxy421614Main
  | PerpsAccountProxy42161Arbthetix;

export async function importPerpsAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '8453-andromeda':
      return import('./8453-andromeda/PerpsAccountProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/PerpsAccountProxy');
    case '42161-main':
      return import('./42161-main/PerpsAccountProxy');
    case '421614-main':
      return import('./421614-main/PerpsAccountProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/PerpsAccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsAccountProxy`);
  }
}
