// !!! DO NOT EDIT !!! Automatically generated file

import type { ChainlinkAggregator as ChainlinkAggregator1Main } from './1/ChainlinkAggregator';
import type { ChainlinkAggregator as ChainlinkAggregator5Main } from './5/ChainlinkAggregator';
import type { ChainlinkAggregator as ChainlinkAggregator10Main } from './10/ChainlinkAggregator';
import type { ChainlinkAggregator as ChainlinkAggregator420Main } from './420/ChainlinkAggregator';
import type { ChainlinkAggregator as ChainlinkAggregator11155111Main } from './11155111/ChainlinkAggregator';
import type { ChainlinkAggregator as ChainlinkAggregator84531Competition } from './84531-competition/ChainlinkAggregator';

export type ChainlinkAggregatorType =
  | ChainlinkAggregator1Main
  | ChainlinkAggregator5Main
  | ChainlinkAggregator10Main
  | ChainlinkAggregator420Main
  | ChainlinkAggregator11155111Main
  | ChainlinkAggregator84531Competition;

export async function importChainlinkAggregator(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1/ChainlinkAggregator');
    case '5-main':
      return import('./5/ChainlinkAggregator');
    case '10-main':
      return import('./10/ChainlinkAggregator');
    case '420-main':
      return import('./420/ChainlinkAggregator');
    case '11155111-main':
      return import('./11155111/ChainlinkAggregator');
    case '84531-competition':
      return import('./84531-competition/ChainlinkAggregator');
    default:
      throw new Error(`Unsupported chain ${chainId} for ChainlinkAggregator`);
  }
}
