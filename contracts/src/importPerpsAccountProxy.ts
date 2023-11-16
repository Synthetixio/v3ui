// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsAccountProxy as PerpsAccountProxy420Main } from './420/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84531Competition } from './84531-competition/PerpsAccountProxy';
import type { PerpsAccountProxy as PerpsAccountProxy84531Andromeda } from './84531-andromeda/PerpsAccountProxy';

export type PerpsAccountProxyType =
  | PerpsAccountProxy420Main
  | PerpsAccountProxy84531Competition
  | PerpsAccountProxy84531Andromeda;

export async function importPerpsAccountProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '420-main':
      return import('./420/PerpsAccountProxy');
    case '84531-competition':
      return import('./84531-competition/PerpsAccountProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/PerpsAccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsAccountProxy`);
  }
}
