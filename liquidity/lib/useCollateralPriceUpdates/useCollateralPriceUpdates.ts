import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Network, useDefaultProvider, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { offchainMainnetEndpoint } from '@snx-v3/constants';
import { ERC7412_ABI } from '@snx-v3/withERC7412';
import { getPythWrapper, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { importMulticall3, importExtras } from '@snx-v3/contracts';

const priceService = new EvmPriceServiceConnection(offchainMainnetEndpoint);

async function getPythFeedIds(network: Network) {
  const extras = await importExtras(network.id, network.preset);
  return Object.entries(extras)
    .filter(
      ([key, value]) => key.startsWith('pyth') && key.endsWith('FeedId') && value.length === 66
    )
    .map(([_key, value]) => value);
}

const getPriceUpdates = async (
  priceIds: string[],
  stalenessTolerance: number,
  network: Network | null
) => {
  // network.id

  const signedOffchainData = await priceService.getPriceFeedsUpdateData(priceIds);
  const updateType = 1;
  const data = ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [updateType, stalenessTolerance, priceIds, signedOffchainData]
  );
  const erc7412Interface = new ethers.utils.Interface(ERC7412_ABI);

  return {
    // pyth wrapper
    to: getPythWrapper(network?.id),
    data: erc7412Interface.encodeFunctionData('fulfillOracleQuery', [data]),
    value: priceIds.length * 10,
  };
};

export const useAllCollateralPriceUpdates = (customNetwork?: Network) => {
  const { network } = useNetwork();
  const chain = customNetwork || network;

  return useQuery({
    queryKey: [`${chain?.id}-${chain?.preset}`, 'all-price-updates'],
    enabled: isBaseAndromeda(chain?.id, chain?.preset),
    queryFn: async () => {
      if (!(network?.id && network?.preset)) throw 'OMFG';
      const stalenessTolerance = 60;

      const pythFeedIds = await getPythFeedIds(network);
      const tx = await getPriceUpdates(pythFeedIds, stalenessTolerance, network);

      return {
        ...tx,
        value: tx.value * 10,
      };
    },
    refetchInterval: 60000,
  });
};

export const useCollateralPriceUpdates = () => {
  const { network } = useNetwork();
  const provider = useDefaultProvider();
  const { activeWallet } = useWallet();

  return useQuery({
    queryKey: [`${network?.id}-${network?.preset}`, 'price-updates', activeWallet?.address],
    enabled: isBaseAndromeda(network?.id, network?.preset),
    queryFn: async () => {
      const stalenessTolerance = 3300;
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

        const pythFeedIds = await getPythFeedIds(network);

        const txs = [
          ...pythFeedIds.map((priceId) => ({
            target: getPythWrapper(network.id),
            callData: pythInterface.encodeFunctionData('getLatestPrice', [
              priceId,
              stalenessTolerance,
            ]),
            value: 0,
            requireSuccess: false,
          })),
        ];

        const getPricesTx = multicallInterface.encodeFunctionData('aggregate3Value', [txs]);

        const result = await provider?.call({
          data: getPricesTx,
          to: multicallAddress,
        });

        const decodedMultiCall: { success: boolean }[] = multicallInterface.decodeFunctionResult(
          'aggregate3Value',
          result || ''
        )[0];

        const outdatedPriceIds: string[] = [];

        decodedMultiCall.forEach(({ success }, i) => {
          if (!success) {
            outdatedPriceIds.push(pythFeedIds[i]);
          }
        });

        if (outdatedPriceIds.length) {
          return {
            ...(await getPriceUpdates(outdatedPriceIds, stalenessTolerance, network)),
            from: activeWallet?.address,
          };
        }

        return null;
      } catch (error) {
        return null;
      }
    },
    refetchInterval: 60000,
  });
};
