// !!! DO NOT EDIT !!! Automatically generated file

import type { USDProxy as USDProxy1Main } from './1/USDProxy';
import type { USDProxy as USDProxy5Main } from './5/USDProxy';
import type { USDProxy as USDProxy10Main } from './10/USDProxy';
import type { USDProxy as USDProxy420Main } from './420/USDProxy';
import type { USDProxy as USDProxy11155111Main } from './11155111/USDProxy';
import type { USDProxy as USDProxy84531Main } from './84531/USDProxy';
import type { USDProxy as USDProxy84531Competition } from './84531-competition/USDProxy';

export type USDProxyType =
  | USDProxy1Main
  | USDProxy5Main
  | USDProxy10Main
  | USDProxy420Main
  | USDProxy11155111Main
  | USDProxy84531Main
  | USDProxy84531Competition;

export async function importUSDProxy(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1/USDProxy');
    case '5-main':
      return import('./5/USDProxy');
    case '10-main':
      return import('./10/USDProxy');
    case '420-main':
      return import('./420/USDProxy');
    case '11155111-main':
      return import('./11155111/USDProxy');
    case '84531-main':
      return import('./84531/USDProxy');
    case '84531-competition':
      return import('./84531-competition/USDProxy');
    default:
      throw new Error(`Unsupported chain ${chainId} for USDProxy`);
  }
}
