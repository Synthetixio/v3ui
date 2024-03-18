// !!! DO NOT EDIT !!! Automatically generated file

import type { Multicall3 as Multicall31Main } from './1-main/Multicall3';
import type { Multicall3 as Multicall310Main } from './10-main/Multicall3';
import type { Multicall3 as Multicall311155111Main } from './11155111-main/Multicall3';
import type { Multicall3 as Multicall313370Main } from './13370-main/Multicall3';
import type { Multicall3 as Multicall342161Arbthetix } from './42161-arbthetix/Multicall3';
import type { Multicall3 as Multicall35Main } from './5-main/Multicall3';
import type { Multicall3 as Multicall38453Andromeda } from './8453-andromeda/Multicall3';
import type { Multicall3 as Multicall384531Andromeda } from './84531-andromeda/Multicall3';
import type { Multicall3 as Multicall384531Main } from './84531-main/Multicall3';
import type { Multicall3 as Multicall384532Andromeda } from './84532-andromeda/Multicall3';

export type Multicall3Type =
  | Multicall31Main
  | Multicall310Main
  | Multicall311155111Main
  | Multicall313370Main
  | Multicall342161Arbthetix
  | Multicall35Main
  | Multicall38453Andromeda
  | Multicall384531Andromeda
  | Multicall384531Main
  | Multicall384532Andromeda;

export async function importMulticall3(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/Multicall3');
    case '10-main':
      return import('./10-main/Multicall3');
    case '11155111-main':
      return import('./11155111-main/Multicall3');
    case '13370-main':
      return import('./13370-main/Multicall3');
    case '42161-arbthetix':
      return import('./42161-arbthetix/Multicall3');
    case '5-main':
      return import('./5-main/Multicall3');
    case '8453-andromeda':
      return import('./8453-andromeda/Multicall3');
    case '84531-andromeda':
      return import('./84531-andromeda/Multicall3');
    case '84531-main':
      return import('./84531-main/Multicall3');
    case '84532-andromeda':
      return import('./84532-andromeda/Multicall3');
    default:
      throw new Error(`Unsupported chain ${chainId} for Multicall3`);
  }
}
