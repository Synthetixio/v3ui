#!/usr/bin/env node

import { importExtras } from '@snx-v3/contracts';
import { doPriceUpdateForPyth } from './doPriceUpdateForPyth';

const splitIntoChunks = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export async function doAllPriceUpdates({ privateKey }) {
  const extras = await importExtras(process.env.CYPRESS_CHAIN_ID, process.env.CYPRESS_PRESET);
  const priceVerificationContract =
    extras.pyth_price_verification_address || extras.pythPriceVerificationAddress;
  const feedIds = Object.entries(extras)
    .filter(
      ([key]) =>
        key.startsWith('pyth_feed_id_') || (key.startsWith('pyth') && key.endsWith('FeedId'))
    )
    .map(([_key, value]) => value);
  console.log({ feedIds });
  const batches = splitIntoChunks(feedIds, 50);

  for (const batch of batches) {
    console.log({ batch });
    await doPriceUpdateForPyth({ privateKey, feedId: batch, priceVerificationContract });
  }
  return true;
}
