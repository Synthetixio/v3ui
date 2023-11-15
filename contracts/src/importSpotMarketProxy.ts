// !!! DO NOT EDIT !!! Automatically generated file

import type { SpotMarketProxy as SpotMarketProxy10Main } from './10/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy420Main } from './420/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84531Main } from './84531/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84531Competition } from './84531-competition/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84531Andromeda } from './84531-andromeda/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy13370Main } from './13370/SpotMarketProxy';

export type SpotMarketProxyType =
  | SpotMarketProxy10Main
  | SpotMarketProxy420Main
  | SpotMarketProxy84531Main
  | SpotMarketProxy84531Competition
  | SpotMarketProxy84531Andromeda
  | SpotMarketProxy13370Main;

export async function importSpotMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '10-main':
      return import('./10/SpotMarketProxy');
    case '420-main':
      return import('./420/SpotMarketProxy');
    case '84531-main':
      return import('./84531/SpotMarketProxy');
    case '84531-competition':
      return import('./84531-competition/SpotMarketProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/SpotMarketProxy');
    case '13370-main':
      return import('./13370/SpotMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for SpotMarketProxy`);
  }
}
