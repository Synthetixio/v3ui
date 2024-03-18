// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsAccountProxy as PerpsAccountProxy42161Arbthetix } from './42161-arbthetix/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy8453Andromeda } from './8453-andromeda/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84531Andromeda } from './84531-andromeda/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84532Andromeda } from './84532-andromeda/PerpsAccountProxy';

export type PerpsAccountProxyType =
  | PerpsAccountProxy42161Arbthetix
  | PerpsAccountProxy8453Andromeda
  | PerpsAccountProxy84531Andromeda
  | PerpsAccountProxy84532Andromeda;

export async function importPerpsAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '42161-arbthetix':
      return import('./42161-arbthetix/PerpsAccountProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/PerpsAccountProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/PerpsAccountProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/PerpsAccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsAccountProxy`);
  }
}
