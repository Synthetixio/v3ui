// !!! DO NOT EDIT !!! Automatically generated file

import type { Multicall3 as Multicall31Main } from './1-main/Multicall3';
import type { Multicall3 as Multicall311155111Main } from './11155111-main/Multicall3';
import type { Multicall3 as Multicall310Main } from './10-main/Multicall3';
import type { Multicall3 as Multicall38453Andromeda } from './8453-andromeda/Multicall3';
import type { Multicall3 as Multicall384532Andromeda } from './84532-andromeda/Multicall3';
import type { Multicall3 as Multicall342161Main } from './42161-main/Multicall3';
import type { Multicall3 as Multicall3421614Main } from './421614-main/Multicall3';
import type { Multicall3 as Multicall342161Arbthetix } from './42161-arbthetix/Multicall3';

export type Multicall3Type =
  | Multicall31Main
  | Multicall311155111Main
  | Multicall310Main
  | Multicall38453Andromeda
  | Multicall384532Andromeda
  | Multicall342161Main
  | Multicall3421614Main
  | Multicall342161Arbthetix;

export async function importMulticall3(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/Multicall3');
    case '11155111-main':
      return import('./11155111-main/Multicall3');
    case '10-main':
      return import('./10-main/Multicall3');
    case '8453-andromeda':
      return import('./8453-andromeda/Multicall3');
    case '84532-andromeda':
      return import('./84532-andromeda/Multicall3');
    case '42161-main':
      return import('./42161-main/Multicall3');
    case '421614-main':
      return import('./421614-main/Multicall3');
    case '42161-arbthetix':
      return import('./42161-arbthetix/Multicall3');
    default:
      throw new Error(`Unsupported chain ${chainId} for Multicall3`);
  }
}
