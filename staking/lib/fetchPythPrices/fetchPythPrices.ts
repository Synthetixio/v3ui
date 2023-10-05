import { offchainMainnetEndpoint, offchainTestnetEndpoint } from '@snx-v3/constants';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { ethers, PopulatedTransaction, BigNumber } from 'ethers';
import { Wei } from '@synthetixio/wei';

export const fetchPriceUpdates = async (
  requestedPriceUpdates: { priceFeedId: string; stalenessTolerance: Wei }[],
  isTestnet: boolean
) => {
  const priceService = new EvmPriceServiceConnection(
    isTestnet ? offchainTestnetEndpoint : offchainMainnetEndpoint
  );
  const signedPricesData = await priceService.getPriceFeedsUpdateData(
    requestedPriceUpdates.map(({ priceFeedId }) => priceFeedId)
  );

  return signedPricesData.map((signedOffchainData, i) => {
    const updateType = 1; // todo can I fetch this?

    const { priceFeedId, stalenessTolerance } = requestedPriceUpdates[i];
    return ethers.utils.defaultAbiCoder.encode(
      ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
      [updateType, stalenessTolerance.toBN(), [priceFeedId], [signedOffchainData]]
    );
  });
};

export const priceUpdatesToPopulatedTx = (
  from: string,
  oracleAddresses: { address: string }[],
  signedOffchainData: string[]
) => {
  if (oracleAddresses.length !== signedOffchainData.length) {
    throw new Error('oracleAddresses and signedOffchainData must be the same length');
  }
  return signedOffchainData.map((signedOffchainDatum, i) => {
    const tx: PopulatedTransaction = {
      to: oracleAddresses[i].address,
      from: from,
      data: new ethers.utils.Interface([
        'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
      ]).encodeFunctionData('fulfillOracleQuery', [signedOffchainDatum]),
      // We set the value to 1 wei to avoid FeeRequired error from pyth, it's quite nice that their fee seems to be the lowest denominator on every network.
      // If this ever changes, things wont break, but become slower.
      value: BigNumber.from(1),
    };
    return tx;
  });
};
