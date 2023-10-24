// !!! DO NOT EDIT !!! Automatically generated file

import type { RewardDistributor as RewardDistributor1Main } from './1/RewardDistributor';
import type { RewardDistributor as RewardDistributor5Main } from './5/RewardDistributor';
import type { RewardDistributor as RewardDistributor10Main } from './10/RewardDistributor';
import type { RewardDistributor as RewardDistributor420Main } from './420/RewardDistributor';
import type { RewardDistributor as RewardDistributor11155111Main } from './11155111/RewardDistributor';
import type { RewardDistributor as RewardDistributor84531Main } from './84531/RewardDistributor';
import type { RewardDistributor as RewardDistributor84531Competition } from './84531-competition/RewardDistributor';

export type RewardDistributorType =
  | RewardDistributor1Main
  | RewardDistributor5Main
  | RewardDistributor10Main
  | RewardDistributor420Main
  | RewardDistributor11155111Main
  | RewardDistributor84531Main
  | RewardDistributor84531Competition;

export async function importRewardDistributor(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1/RewardDistributor');
    case '5-main':
      return import('./5/RewardDistributor');
    case '10-main':
      return import('./10/RewardDistributor');
    case '420-main':
      return import('./420/RewardDistributor');
    case '11155111-main':
      return import('./11155111/RewardDistributor');
    case '84531-main':
      return import('./84531/RewardDistributor');
    case '84531-competition':
      return import('./84531-competition/RewardDistributor');
    default:
      throw new Error(`Unsupported chain ${chainId} for RewardDistributor`);
  }
}
