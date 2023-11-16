// !!! DO NOT EDIT !!! Automatically generated file

import type { Multicall3 as Multicall31Main } from './1/Multicall3';
import type { Multicall3 as Multicall35Main } from './5/Multicall3';
import type { Multicall3 as Multicall310Main } from './10/Multicall3';
import type { Multicall3 as Multicall3420Main } from './420/Multicall3';
import type { Multicall3 as Multicall311155111Main } from './11155111/Multicall3';
import type { Multicall3 as Multicall384531Main } from './84531/Multicall3';
import type { Multicall3 as Multicall384531Competition } from './84531-competition/Multicall3';
import type { Multicall3 as Multicall384531Andromeda } from './84531-andromeda/Multicall3';
import type { Multicall3 as Multicall313370Main } from './13370/Multicall3';

export type Multicall3Type =
  | Multicall31Main
  | Multicall35Main
  | Multicall310Main
  | Multicall3420Main
  | Multicall311155111Main
  | Multicall384531Main
  | Multicall384531Competition
  | Multicall384531Andromeda
  | Multicall313370Main;

export async function importMulticall3(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1/Multicall3');
    case '5-main':
      return import('./5/Multicall3');
    case '10-main':
      return import('./10/Multicall3');
    case '420-main':
      return import('./420/Multicall3');
    case '11155111-main':
      return import('./11155111/Multicall3');
    case '84531-main':
      return import('./84531/Multicall3');
    case '84531-competition':
      return import('./84531-competition/Multicall3');
    case '84531-andromeda':
      return import('./84531-andromeda/Multicall3');
    case '13370-main':
      return import('./13370/Multicall3');
    default:
      throw new Error(`Unsupported chain ${chainId} for Multicall3`);
  }
}
