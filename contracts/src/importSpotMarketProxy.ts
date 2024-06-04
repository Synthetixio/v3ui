// !!! DO NOT EDIT !!! Automatically generated file

import type { SpotMarketProxy as SpotMarketProxy10Main } from './10-main/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy8453Andromeda } from './8453-andromeda/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy84532Andromeda } from './84532-andromeda/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy42161Main } from './42161-main/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy421614Main } from './421614-main/SpotMarketProxy';
import type { SpotMarketProxy as SpotMarketProxy42161Arbthetix } from './42161-arbthetix/SpotMarketProxy';

export type SpotMarketProxyType =
  | SpotMarketProxy10Main
  | SpotMarketProxy8453Andromeda
  | SpotMarketProxy84532Andromeda
  | SpotMarketProxy42161Main
  | SpotMarketProxy421614Main
  | SpotMarketProxy42161Arbthetix;

export async function importSpotMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '10-main':
      return import('./10-main/SpotMarketProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/SpotMarketProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/SpotMarketProxy');
    case '42161-main':
      return import('./42161-main/SpotMarketProxy');
    case '421614-main':
      return import('./421614-main/SpotMarketProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/SpotMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for SpotMarketProxy`);
  }
}
