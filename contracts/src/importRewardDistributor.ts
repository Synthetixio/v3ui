// !!! DO NOT EDIT !!! Automatically generated file

import type { RewardDistributor as RewardDistributor1Main } from './1-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor10Main } from './10-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor11155111Main } from './11155111-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor13370Main } from './13370-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor420Main } from './420-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor5Main } from './5-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor8453Andromeda } from './8453-andromeda/RewardDistributor';
import type { RewardDistributor as RewardDistributor84531Andromeda } from './84531-andromeda/RewardDistributor';
import type { RewardDistributor as RewardDistributor84531Main } from './84531-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor84532Andromeda } from './84532-andromeda/RewardDistributor';

export type RewardDistributorType =
  | RewardDistributor1Main
  | RewardDistributor10Main
  | RewardDistributor11155111Main
  | RewardDistributor13370Main
  | RewardDistributor420Main
  | RewardDistributor5Main
  | RewardDistributor8453Andromeda
  | RewardDistributor84531Andromeda
  | RewardDistributor84531Main
  | RewardDistributor84532Andromeda;

export async function importRewardDistributor(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/RewardDistributor');
    case '10-main':
      return import('./10-main/RewardDistributor');
    case '11155111-main':
      return import('./11155111-main/RewardDistributor');
    case '13370-main':
      return import('./13370-main/RewardDistributor');
    case '420-main':
      return import('./420-main/RewardDistributor');
    case '5-main':
      return import('./5-main/RewardDistributor');
    case '8453-andromeda':
      return import('./8453-andromeda/RewardDistributor');
    case '84531-andromeda':
      return import('./84531-andromeda/RewardDistributor');
    case '84531-main':
      return import('./84531-main/RewardDistributor');
    case '84532-andromeda':
      return import('./84532-andromeda/RewardDistributor');
    default:
      throw new Error(`Unsupported chain ${chainId} for RewardDistributor`);
  }
}
