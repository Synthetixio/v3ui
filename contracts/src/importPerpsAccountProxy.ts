// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsAccountProxy as PerpsAccountProxy420Main } from './420-main/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy421614Arbthetix } from './421614-arbthetix/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy8453Andromeda } from './8453-andromeda/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84531Andromeda } from './84531-andromeda/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84532Andromeda } from './84532-andromeda/PerpsAccountProxy';

export type PerpsAccountProxyType =
  | PerpsAccountProxy420Main
  | PerpsAccountProxy421614Arbthetix
  | PerpsAccountProxy8453Andromeda
  | PerpsAccountProxy84531Andromeda
  | PerpsAccountProxy84532Andromeda;

export async function importPerpsAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '420-main':
      return import('./420-main/PerpsAccountProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/PerpsAccountProxy');
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
