// !!! DO NOT EDIT !!! Automatically generated file

import type { SpotMarketProxy as SpotMarketProxy10Main } from './10/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy420Main } from './420/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84531Competition } from './84531-competition/SpotMarketProxy';

export type SpotMarketProxyType =
  | SpotMarketProxy10Main
  | SpotMarketProxy420Main
  | SpotMarketProxy84531Competition;

export async function importSpotMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '10-main':
      return import('./10/SpotMarketProxy');
    case '420-main':
      return import('./420/SpotMarketProxy');
    case '84531-competition':
      return import('./84531-competition/SpotMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for SpotMarketProxy`);
  }
}
