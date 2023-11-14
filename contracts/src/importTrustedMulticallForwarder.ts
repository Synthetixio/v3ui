// !!! DO NOT EDIT !!! Automatically generated file

import type { TrustedMulticallForwarder as TrustedMulticallForwarder420Main } from './420/TrustedMulticallForwarder';
import type { TrustedMulticallForwarder as TrustedMulticallForwarder84531Competition } from './84531-competition/TrustedMulticallForwarder';

export type TrustedMulticallForwarderType =
  | TrustedMulticallForwarder420Main
  | TrustedMulticallForwarder84531Competition;

export async function importTrustedMulticallForwarder(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '420-main':
      return import('./420/TrustedMulticallForwarder');
    case '84531-competition':
      return import('./84531-competition/TrustedMulticallForwarder');
    default:
      throw new Error(`Unsupported chain ${chainId} for TrustedMulticallForwarder`);
  }
}
