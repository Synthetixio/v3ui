import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useNetwork } from '@snx-v3/useBlockchain';

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { offchainMainnetEndpoint } from '@snx-v3/constants';
import { ERC7412_ABI } from '@snx-v3/withERC7412';
import { getPythWrapper, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

const priceIds = [
  '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
  '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
  '0xeff7446475e218517566ea99e72a4abec2e1bd8498b43b7d8331e29dcb059389',
  '0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7',
  '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
  '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419',
  '0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c',
  '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
  '0x39d020f60982ed892abbcd4a06a276a9f9b7bfbce003204c110b6e488f502da3',
  '0x5c6c0d2386e3352356c3ab84434fafb5ea067ac2678a38a338c4a69ddc4bdb0c',
  '0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52',
];

const priceService = new EvmPriceServiceConnection(offchainMainnetEndpoint);

export const useCollateralPriceUpdates = () => {
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'price-updates', priceIds.join(',')],
    enabled: isBaseAndromeda(network?.id, network?.preset),
    queryFn: async () => {
      const updateType = 1,
        stalenessTolerance = 60;

      const signedOffchainData = await priceService.getPriceFeedsUpdateData(priceIds);

      const data = ethers.utils.defaultAbiCoder.encode(
        ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
        [updateType, stalenessTolerance, priceIds, signedOffchainData]
      );
      const erc7412Interface = new ethers.utils.Interface(ERC7412_ABI);

      return {
        //pyth wrapper
        to: getPythWrapper(network?.id),
        data: erc7412Interface.encodeFunctionData('fulfillOracleQuery', [data]),
        value: priceIds.length * 10,
      };
    },
  });
};
