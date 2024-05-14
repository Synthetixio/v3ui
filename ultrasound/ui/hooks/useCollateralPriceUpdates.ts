import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Network, useGetNetwork } from '@snx-v3/useBlockchain';

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { offchainMainnetEndpoint } from '@snx-v3/constants';
import { ERC7412_ABI } from '@snx-v3/withERC7412';
import { getsPythWrapper } from '@snx-v3/isBaseAndromeda';

const snxPriceId = '0x39d020f60982ed892abbcd4a06a276a9f9b7bfbce003204c110b6e488f502da3';

const priceService = new EvmPriceServiceConnection(offchainMainnetEndpoint);

const getPriceUpdates = async (
  priceIds: string[],
  stalenessTolerance: number,
  network: Network | null
) => {
  const signedOffchainData = await priceService.getPriceFeedsUpdateData(priceIds);
  const updateType = 1;
  const data = ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [updateType, stalenessTolerance, priceIds, signedOffchainData]
  );
  const erc7412Interface = new ethers.utils.Interface(ERC7412_ABI);

  return {
    //pyth wrapper
    to: getsPythWrapper(network?.id),
    data: erc7412Interface.encodeFunctionData('fulfillOracleQuery', [data]),
    value: priceIds.length * 10,
  };
};
export const useSnxPriceUpdateTx = () => {
  const baseNetwork = useGetNetwork(`0x${Number(8453).toString(16)}`);

  return useQuery({
    refetchInterval: 10000,
    queryKey: [`${baseNetwork?.id}-${baseNetwork?.preset}`, 'snx-price-update'],
    queryFn: async () => {
      const stalenessTolerance = 10;

      const tx = await getPriceUpdates([snxPriceId], stalenessTolerance, baseNetwork!);

      return {
        ...tx,
      };
    },
  });
};
