// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsMarketProxy as PerpsMarketProxy8453Andromeda } from './8453-andromeda/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy84532Andromeda } from './84532-andromeda/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy42161Main } from './42161-main/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy421614Main } from './421614-main/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy42161Arbthetix } from './42161-arbthetix/PerpsMarketProxy';

export type PerpsMarketProxyType =
  | PerpsMarketProxy8453Andromeda
  | PerpsMarketProxy84532Andromeda
  | PerpsMarketProxy42161Main
  | PerpsMarketProxy421614Main
  | PerpsMarketProxy42161Arbthetix;

export async function importPerpsMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '8453-andromeda':
      return import('./8453-andromeda/PerpsMarketProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/PerpsMarketProxy');
    case '42161-main':
      return import('./42161-main/PerpsMarketProxy');
    case '421614-main':
      return import('./421614-main/PerpsMarketProxy');
    case '42161-arbthetix':
      return import('./42161-arbthetix/PerpsMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsMarketProxy`);
  }
}
