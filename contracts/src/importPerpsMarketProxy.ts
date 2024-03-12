// !!! DO NOT EDIT !!! Automatically generated file

import type { PerpsMarketProxy as PerpsMarketProxy420Main } from './420-main/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy421614Arbthetix } from './421614-arbthetix/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy8453Andromeda } from './8453-andromeda/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy84531Andromeda } from './84531-andromeda/PerpsMarketProxy';
import type { PerpsMarketProxy as PerpsMarketProxy84532Andromeda } from './84532-andromeda/PerpsMarketProxy';

export type PerpsMarketProxyType =
  | PerpsMarketProxy420Main
  | PerpsMarketProxy421614Arbthetix
  | PerpsMarketProxy8453Andromeda
  | PerpsMarketProxy84531Andromeda
  | PerpsMarketProxy84532Andromeda;

export async function importPerpsMarketProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '420-main':
      return import('./420-main/PerpsMarketProxy');
    case '421614-arbthetix':
      return import('./421614-arbthetix/PerpsMarketProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/PerpsMarketProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/PerpsMarketProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/PerpsMarketProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for PerpsMarketProxy`);
  }
}
