// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsMarketProxy as PerpsMarketProxy420Main } from './420/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy84531Competition } from './84531-competition/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy84531Andromeda } from './84531-andromeda/PerpsMarketProxy';

export type PerpsMarketProxyType =
  | PerpsMarketProxy420Main
  | PerpsMarketProxy84531Competition
  | PerpsMarketProxy84531Andromeda;

export async function importPerpsMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '420-main':
      return import('./420/PerpsMarketProxy');
    case '84531-competition':
      return import('./84531-competition/PerpsMarketProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/PerpsMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsMarketProxy`);
  }
}
