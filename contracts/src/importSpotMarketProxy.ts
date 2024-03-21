// !!! DO NOT EDIT !!! Automatically generated file

import type { SpotMarketProxy as SpotMarketProxy10Main } from './10-main/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy13370Main } from './13370-main/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy42161Arbthetix } from './42161-arbthetix/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy421614Arbthetix } from './421614-arbthetix/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy8453Andromeda } from './8453-andromeda/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84531Andromeda } from './84531-andromeda/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84531Main } from './84531-main/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84532Andromeda } from './84532-andromeda/SpotMarketProxy';

export type SpotMarketProxyType =
  | SpotMarketProxy10Main
  | SpotMarketProxy13370Main
  | SpotMarketProxy42161Arbthetix
  | SpotMarketProxy421614Arbthetix
  | SpotMarketProxy8453Andromeda
  | SpotMarketProxy84531Andromeda
  | SpotMarketProxy84531Main
  | SpotMarketProxy84532Andromeda;

export async function importSpotMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '10-main':
      return import('./10-main/SpotMarketProxy');
    case '13370-main':
      return import('./13370-main/SpotMarketProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/SpotMarketProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/SpotMarketProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/SpotMarketProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/SpotMarketProxy');
    case '84531-main':
      return import('./84531-main/SpotMarketProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/SpotMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for SpotMarketProxy`);
  }
}
