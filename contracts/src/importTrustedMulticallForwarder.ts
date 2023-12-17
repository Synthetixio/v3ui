// !!! DO NOT EDIT !!! Automatically generated file

import type { TrustedMulticallForwarder as TrustedMulticallForwarder420Main } from './420/TrustedMulticallForwarder';
import type { TrustedMulticallForwarder as TrustedMulticallForwarder84531Competition } from './84531-competition/TrustedMulticallForwarder';
import type { TrustedMulticallForwarder as TrustedMulticallForwarder84531Andromeda } from './84531-andromeda/TrustedMulticallForwarder';
import type { TrustedMulticallForwarder as TrustedMulticallForwarder13370Main } from './13370/TrustedMulticallForwarder';

export type TrustedMulticallForwarderType =
  | TrustedMulticallForwarder420Main
  | TrustedMulticallForwarder84531Competition
  | TrustedMulticallForwarder84531Andromeda
  | TrustedMulticallForwarder13370Main;

export async function importTrustedMulticallForwarder(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '420-main':
      return import('./420/TrustedMulticallForwarder');
    case '84531-competition':
      return import('./84531-competition/TrustedMulticallForwarder');
    case '84531-andromeda':
      return import('./84531-andromeda/TrustedMulticallForwarder');
    case '13370-main':
      return import('./13370/TrustedMulticallForwarder');
    default:
      throw new Error(`Unsupported chain ${chainId} for TrustedMulticallForwarder`);
  }
}
