// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsMarketProxy as PerpsMarketProxy42161Arbthetix } from './42161-arbthetix/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy421614Arbthetix } from './421614-arbthetix/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy8453Andromeda } from './8453-andromeda/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy84532Andromeda } from './84532-andromeda/PerpsMarketProxy';

export type PerpsMarketProxyType =
  | PerpsMarketProxy42161Arbthetix
  | PerpsMarketProxy421614Arbthetix
  | PerpsMarketProxy8453Andromeda
  | PerpsMarketProxy84532Andromeda;

export async function importPerpsMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '42161-arbthetix':
      return import('./42161-arbthetix/PerpsMarketProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/PerpsMarketProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/PerpsMarketProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/PerpsMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsMarketProxy`);
  }
}
