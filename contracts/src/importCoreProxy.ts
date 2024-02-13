// !!! DO NOT EDIT !!! Automatically generated file

import type { CoreProxy as CoreProxy1Main } from './1-main/CoreProxy';
import type { CoreProxy as CoreProxy10Main } from './10-main/CoreProxy';
import type { CoreProxy as CoreProxy11155111Main } from './11155111-main/CoreProxy';
import type { CoreProxy as CoreProxy13370Main } from './13370-main/CoreProxy';
import type { CoreProxy as CoreProxy420Main } from './420-main/CoreProxy';
import type { CoreProxy as CoreProxy5Main } from './5-main/CoreProxy';
import type { CoreProxy as CoreProxy8453Andromeda } from './8453-andromeda/CoreProxy';
import type { CoreProxy as CoreProxy84531Andromeda } from './84531-andromeda/CoreProxy';
import type { CoreProxy as CoreProxy84531Main } from './84531-main/CoreProxy';
import type { CoreProxy as CoreProxy84532Andromeda } from './84532-andromeda/CoreProxy';

export type CoreProxyType =
  | CoreProxy1Main
  | CoreProxy10Main
  | CoreProxy11155111Main
  | CoreProxy13370Main
  | CoreProxy420Main
  | CoreProxy5Main
  | CoreProxy8453Andromeda
  | CoreProxy84531Andromeda
  | CoreProxy84531Main
  | CoreProxy84532Andromeda;

export async function importCoreProxy(chainId: number, preset: string = 'main') {
  console.log(`importCoreProxy(${chainId}, ${preset})`)
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/CoreProxy');
    case '10-main':
      return import('./10-main/CoreProxy');
    case '11155111-main':
      return import('./11155111-main/CoreProxy');
    case '13370-main':
      return import('./13370-main/CoreProxy');
    case '420-main':
      return import('./420-main/CoreProxy');
    case '5-main':
      return import('./5-main/CoreProxy');
    case '8453-andromeda':
      return import('./8453-andromeda/CoreProxy');
    case '84531-andromeda':
      return import('./84531-andromeda/CoreProxy');
    case '84531-main':
      return import('./84531-main/CoreProxy');
    case '84532-andromeda':
      return import('./84532-andromeda/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for CoreProxy`);
  }
}
