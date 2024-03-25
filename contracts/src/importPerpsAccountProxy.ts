// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsAccountProxy as PerpsAccountProxy42161Arbthetix } from './42161-arbthetix/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy421614Arbthetix } from './421614-arbthetix/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy8453Andromeda } from './8453-andromeda/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84532Andromeda } from './84532-andromeda/PerpsAccountProxy';

export type PerpsAccountProxyType =
  | PerpsAccountProxy42161Arbthetix
  | PerpsAccountProxy421614Arbthetix
  | PerpsAccountProxy8453Andromeda
  | PerpsAccountProxy84532Andromeda;

export async function importPerpsAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '42161-arbthetix':
      return import('./42161-arbthetix/PerpsAccountProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/PerpsAccountProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/PerpsAccountProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/PerpsAccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsAccountProxy`);
  }
}
