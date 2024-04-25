import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useDefaultProvider, useNetwork } from '@snx-v3/useBlockchain';

import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { offchainMainnetEndpoint } from '@snx-v3/constants';
import { ERC7412_ABI } from '@snx-v3/withERC7412';
import { getsPythWrapper, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { importMulticall3 } from '@synthetixio/v3-contracts';

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
  '0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf',
  '0x193c739db502aadcef37c2589738b1e37bdb257d58cf1ab3c7ebc8e6df4e3ec0',
  '0x7677dd124dee46cfcd46ff03cf405fb0ed94b1f49efbea3444aadbda939a7ad3',
  '0x60144b1d5c9e9851732ad1d9760e3485ef80be39b984f6bf60f82b28a2b7f126',
  '0x30e4780570973e438fdb3f1b7ad22618b2fc7333b65c7853a7ca144c39052f7a',
  '0xb27578a9654246cb0a2950842b92330e9ace141c52b63829cc72d5c45a5a595a',
  '0x0781209c28fda797616212b7f94d77af3a01f3e94a5d421760aef020cf2bcb51',
  '0xb962539d0fcb272a494d65ea56f94851c2bcf8823935da05bd628916e2e9edbf',
  '0x7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592',
  '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
  '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
  '0x410f41de235f2db824e562ea7ab2d3d3d4ff048316c61d629c0b93f58584e1af',
  '0xec7a775f46379b5e943c3526b1c8d54cd49749176b0b98e02dde68d1bd335c17',
  '0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723',
  '0x8963217838ab4cf5cadc172203c1f0b763fbaa45f346d8ee50ba994bbcac3026',
];

const priceService = new EvmPriceServiceConnection(offchainMainnetEndpoint);

export const useAllCollateralPriceUpdates = () => {
  const { network } = useNetwork();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'all-price-updates', priceIds.join(',')],
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
        to: getsPythWrapper(network?.id),
        data: erc7412Interface.encodeFunctionData('fulfillOracleQuery', [data]),
        value: priceIds.length * 10,
      };
    },
  });
};

export const useCollateralPriceUpdates = () => {
  const { network } = useNetwork();
  const provider = useDefaultProvider();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'price-updates', priceIds.join(',')],
    enabled: isBaseAndromeda(network?.id, network?.preset),
    queryFn: async () => {
      const stalenessTolerance = 1000;
      if (!network) {
        return;
      }
      try {
        const { address: multicallAddress, abi: multiCallAbi } = await importMulticall3(
          network.id,
          network.preset
        );

        const multicallInterface = new ethers.utils.Interface(multiCallAbi);
        const pythInterface = new ethers.utils.Interface([
          'function getLatestPrice(bytes32 priceId, uint256 stalenessTolerance) external view returns (int256)',
        ]);

        const getPricesTx = multicallInterface.encodeFunctionData('aggregate3Value', [
          priceIds.map((priceId) => ({
            target: getsPythWrapper(network?.id),
            callData: pythInterface.encodeFunctionData('getLatestPrice', [
              priceId,
              stalenessTolerance,
            ]),
            value: 0,
            requireSuccess: false,
          })),
        ]);

        const result = await provider?.call({
          data: getPricesTx,
          to: multicallAddress,
        });

        const decodedMultiCall: { returnData: string }[] = multicallInterface.decodeFunctionResult(
          'aggregate3Value',
          result
        )[0];

        console.log({
          decodedMultiCall,
        });
        return null;
      } catch (error) {
        console.log({
          error,
        });
        return null;
      }
    },
  });
};
