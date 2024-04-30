import { offchainMainnetEndpoint } from '@snx-v3/constants';
import { Network } from '@snx-v3/useBlockchain';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { ERC7412_ABI } from '@snx-v3/withERC7412';
import { getsPythWrapper } from '@snx-v3/isBaseAndromeda';
import { utils } from 'ethers';

const priceService = new EvmPriceServiceConnection(offchainMainnetEndpoint);

export async function getPriceUpdates(
  priceIds: string[],
  stalenessTolerance: number,
  network: Network | null
) {
  const signedOffchainData = await priceService.getPriceFeedsUpdateData(priceIds);
  const updateType = 1;
  const data = utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [updateType, stalenessTolerance, priceIds, signedOffchainData]
  );
  const erc7412Interface = new utils.Interface(ERC7412_ABI);

  return {
    to: getsPythWrapper(network?.id),
    data: erc7412Interface.encodeFunctionData('fulfillOracleQuery', [data]),
    value: priceIds.length * 10,
  };
}
