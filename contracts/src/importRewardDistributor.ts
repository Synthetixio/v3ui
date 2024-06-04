// !!! DO NOT EDIT !!! Automatically generated file

import type { RewardDistributor as RewardDistributor1Main } from './1-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor11155111Main } from './11155111-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor10Main } from './10-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor8453Andromeda } from './8453-andromeda/RewardDistributor';
import type { RewardDistributor as RewardDistributor84532Andromeda } from './84532-andromeda/RewardDistributor';
import type { RewardDistributor as RewardDistributor42161Main } from './42161-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor421614Main } from './421614-main/RewardDistributor';
import type { RewardDistributor as RewardDistributor42161Arbthetix } from './42161-arbthetix/RewardDistributor';

export type RewardDistributorType =
  | RewardDistributor1Main
  | RewardDistributor11155111Main
  | RewardDistributor10Main
  | RewardDistributor8453Andromeda
  | RewardDistributor84532Andromeda
  | RewardDistributor42161Main
  | RewardDistributor421614Main
  | RewardDistributor42161Arbthetix;

export async function importRewardDistributor(chainId: number, preset: string = 'main') {
  switch (`${chainId}-${preset}`) {
    case '1-main':
      return import('./1-main/RewardDistributor');
    case '11155111-main':
      return import('./11155111-main/RewardDistributor');
    case '10-main':
      return import('./10-main/RewardDistributor');
    case '8453-andromeda':
      return import('./8453-andromeda/RewardDistributor');
    case '84532-andromeda':
      return import('./84532-andromeda/RewardDistributor');
    case '42161-main':
      return import('./42161-main/RewardDistributor');
    case '421614-main':
      return import('./421614-main/RewardDistributor');
    case '42161-arbthetix':
      return import('./42161-arbthetix/RewardDistributor');
    default:
      throw new Error(`Unsupported chain ${chainId} for RewardDistributor`);
  }
}
