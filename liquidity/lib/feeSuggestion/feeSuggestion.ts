/**
 * This module is heavily inspired by https://github.com/rainbow-me/fee-suggestions
 * That library have some hardcoded min and max that doesn't make sense for optimism. See: https://github.com/rainbow-me/fee-suggestions/blob/main/src/index.ts#L165
 *
 * So I changed min max a bit
 *
 * That library is also a bit overkill in how it calculates maxFeePerGas per gas. It's using linear regression and sampling curves.
 * Instead of doing that, this module calculates max by taking  (previous baseFeePerGas * 2) + maxPriorityFeePerGas.
 *
 * The calculation for maxPriorityFeePerGas I kept quite complex since that will affect what the user actually pay..
 * It's calculated based on the Exponential Moving Average (EMA) of the block rewards at the 15th, 30th, and 45th percentiles, after removing the outliers.
 *
 * The other differences is that I also rely on our Wei library.
 *
 */
import { ethers } from 'ethers';
import { ema } from './math';
import { getOutlierBlocksToRemove, rewardsFilterOutliers } from './utils';
import { wei, Wei } from '@synthetixio/wei';
import { GWEI_DECIMALS } from '@snx-v3/constants';

type Reward = string[];
type GasUsedRatio = number[];
interface FeeHistoryResponse {
  baseFeePerGas: string[];
  gasUsedRatio: GasUsedRatio;
  oldestBlock: number;
  reward: Reward[];
}

const defaultForLocalProvider = () => {
  const baseFeePerGas = wei(1, 9).toBN();
  const maxFeePerGas = wei(5, 9).toBN();
  const maxPriorityFeePerGas = wei(1, 9).toBN();
  return {
    average: {
      maxPriorityFeePerGas,
      maxFeePerGas,
      baseFeePerGas,
    },
    fast: {
      maxPriorityFeePerGas,
      maxFeePerGas,
      baseFeePerGas,
    },
    fastest: {
      maxPriorityFeePerGas,
      maxFeePerGas,
      baseFeePerGas,
    },
  };
};
export const feeSuggestion = async (
  provider: ethers.providers.JsonRpcProvider,
  fromBlock = 'latest'
) => {
  const feeHistory = await provider
    .send('eth_feeHistory', [
      ethers.utils.hexStripZeros(ethers.utils.hexlify(10)),
      fromBlock,
      [15, 30, 45],
    ])
    .then((feeHistoryResponse: FeeHistoryResponse) => {
      return {
        baseFeePerGas: feeHistoryResponse.baseFeePerGas.map((x) => wei(x, GWEI_DECIMALS, true)),
        reward: feeHistoryResponse.reward.map((x) => x.map((num) => wei(num, GWEI_DECIMALS, true))),
      };
    });
  const blocksRewards = feeHistory.reward;
  const baseFeePerGas = feeHistory.baseFeePerGas.at(-1);

  if (!blocksRewards.length) {
    console.error(new Error('Error: block reward was empty'));
    return defaultForLocalProvider();
  }
  if (!baseFeePerGas) {
    console.error(new Error('Error: currentBaseFee was empty'));
    return defaultForLocalProvider();
  }

  const outlierBlocks = getOutlierBlocksToRemove(blocksRewards, 0);

  const blocksRewardsPerc15 = rewardsFilterOutliers(blocksRewards, outlierBlocks, 0);
  const blocksRewardsPerc30 = rewardsFilterOutliers(blocksRewards, outlierBlocks, 1);
  const blocksRewardsPerc45 = rewardsFilterOutliers(blocksRewards, outlierBlocks, 2);

  const emaPerc15 = ema(blocksRewardsPerc15, blocksRewardsPerc15.length)[
    blocksRewardsPerc15.length - 1
  ];
  const emaPerc30 = ema(blocksRewardsPerc30, blocksRewardsPerc30.length)[
    blocksRewardsPerc30.length - 1
  ];
  const emaPerc45 = ema(blocksRewardsPerc45, blocksRewardsPerc45.length)[
    blocksRewardsPerc45.length - 1
  ];

  if (emaPerc15 === undefined || emaPerc30 === undefined || emaPerc45 === undefined) {
    throw new Error('Error: ema was undefined');
  }

  const averageMaxPriorityFee = wei(Math.min(emaPerc15, 1), GWEI_DECIMALS);
  const fastMaxPriorityFee = wei(Math.min(emaPerc30, 2), GWEI_DECIMALS);
  const fastestMaxPriorityFee = wei(Math.min(emaPerc45, 4), GWEI_DECIMALS);

  const baseFeeToMax = (base: Wei, prio: Wei) => base.mul(wei(2, GWEI_DECIMALS)).add(prio);
  return {
    average: {
      maxPriorityFeePerGas: averageMaxPriorityFee.toBN(),
      maxFeePerGas: baseFeeToMax(baseFeePerGas, averageMaxPriorityFee).toBN(),
      baseFeePerGas: baseFeePerGas.toBN(),
    },
    fast: {
      maxPriorityFeePerGas: fastMaxPriorityFee.toBN(),
      maxFeePerGas: baseFeeToMax(baseFeePerGas, fastMaxPriorityFee).toBN(),
      baseFeePerGas: baseFeePerGas.toBN(),
    },
    fastest: {
      maxPriorityFeePerGas: fastestMaxPriorityFee.toBN(),
      maxFeePerGas: baseFeeToMax(baseFeePerGas, fastestMaxPriorityFee).toBN(),
      baseFeePerGas: baseFeePerGas.toBN(),
    },
  };
};
