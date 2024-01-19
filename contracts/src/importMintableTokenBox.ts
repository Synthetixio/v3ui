// !!! DO NOT EDIT !!! Automatically generated file

import type { MintableTokenBox as MintableTokenBox13370Main } from './13370-main/MintableTokenBox';

export type MintableTokenBoxType = MintableTokenBox13370Main;

export async function importMintableTokenBox(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '13370-main':
      return import('./13370-main/MintableTokenBox');
    default:
      throw new Error(`Unsupported chain ${chainId} for MintableTokenBox`);
  }
}
