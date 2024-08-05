import { useQuery } from '@tanstack/react-query';
import { BigNumberish, ethers } from 'ethers';
import { Network, useDefaultProvider, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { offchainMainnetEndpoint } from '@snx-v3/constants';
import { ERC7412_ABI } from '@snx-v3/withERC7412';
import { importMulticall3, importExtras } from '@snx-v3/contracts';
import { networksOffline } from '@snx-v3/usePoolsList';
import { wei } from '@synthetixio/wei';
import { importPythERC7412Wrapper } from '@snx-v3/contracts';
import { parseUnits } from '@snx-v3/format';

const priceService = new EvmPriceServiceConnection(offchainMainnetEndpoint);

function getAllPriceIdsEntries(extras: any) {
  return Object.entries(extras).filter(
    ([key, value]) =>
      String(value).length === 66 &&
      (key.startsWith('pyth_feed_id_') || (key.startsWith('pyth') && key.endsWith('FeedId')))
  );
}

async function getPythFeedIds(network: Network) {
  const extras = await importExtras(network.id, network.preset);
  return getAllPriceIdsEntries(extras).map(([_key, value]) => value);
}

async function getPythFeedIdsFromCollateralList(
  collateralList: {
    symbol: string;
  }[]
) {
  const extras = await Promise.all(
    networksOffline.map((network) => importExtras(network.id, network.preset))
  );

  // Go over extras and find everything that starts with pyth and ends with FeedId, store in array
  const priceIds = extras.map(getAllPriceIdsEntries).flat();
  const deduped = Array.from(
    new Set(
      priceIds
        .map(([key, priceId]) => {
          if (key.startsWith('pyth_feed_id_')) {
            return {
              symbol: key.replace('pyth_feed_id_', '').toUpperCase(),
              priceId,
            };
          }
          if (key.startsWith('pyth') && key.endsWith('FeedId')) {
            return {
              symbol: key.replace('pyth', '').replace('FeedId', '').toUpperCase(),
              priceId,
            };
          }
          return { symbol: null, priceId: null };
        })
        .filter(({ symbol, priceId }) => symbol && priceId)
    )
  );

  // Find the corresponding price feed id for each symbol
  return collateralList.map((collateral) => {
    const symbol = collateral.symbol === 'WETH' ? 'ETH' : collateral.symbol;
    const id = deduped.find((x) => x.symbol?.toUpperCase() === symbol.toUpperCase());
    return {
      ...collateral,
      priceId: id?.priceId,
    };
  });
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

  const { address } = await importPythERC7412Wrapper(network?.id, network?.preset);

  return {
    // pyth wrapper
    to: address,
    data: erc7412Interface.encodeFunctionData('fulfillOracleQuery', [data]),
    value: priceIds.length,
  };
};

export const useAllCollateralPriceUpdates = (customNetwork?: Network) => {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;
  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'all-price-updates'],
    enabled: Boolean(targetNetwork?.id && targetNetwork?.preset),
    queryFn: async () => {
      if (!(targetNetwork?.id && targetNetwork?.preset)) {
        throw 'useAllCollateralPriceUpdates is missing required data';
      }
      const stalenessTolerance = 1;

      const pythFeedIds = (await getPythFeedIds(targetNetwork)) as string[];
      const tx = await getPriceUpdates(pythFeedIds, stalenessTolerance, targetNetwork);

      return {
        ...tx,
        value: tx.value,
      };
    },
    refetchInterval: 5 * 60000,
  });
};

interface Collaterals {
  symbol: string;
  oracleId: string;
  id: string;
}

export const useOfflinePrices = (collaterals?: Collaterals[]) => {
  return useQuery({
    queryKey: ['offline-prices', collaterals?.map((collateral) => collateral.id).join('-')],
    enabled: Boolean(collaterals && collaterals.length > 0),
    queryFn: async () => {
      if (!collaterals) {
        throw 'useOfflinePrices is missing required data';
      }

      const stables = ['sUSDC', 'USDC'];
      const filteredCollaterals = collaterals.filter((item) => !stables.includes(item.symbol));

      const returnData: { symbol: string; price: BigNumberish }[] = [
        {
          symbol: 'sUSDC',
          price: wei(1).toBN(),
        },
        {
          symbol: 'USDC',
          price: wei(1).toBN(),
        },
        {
          symbol: 'USDx',
          price: wei(1).toBN(),
        },
      ];

      if (!filteredCollaterals.length) {
        return returnData;
      }

      const collateralsWithPriceId = await getPythFeedIdsFromCollateralList(filteredCollaterals);
      const prices = await priceService.getLatestPriceFeeds(
        collateralsWithPriceId.map((x) => x.priceId) as string[]
      );
      prices?.forEach((item) => {
        const col = collateralsWithPriceId.find(({ priceId }) => priceId === `0x${item.id}`);
        const price = item.getPriceUnchecked();
        if (col) {
          returnData.push({
            symbol: col.symbol,
            price: parseUnits(price.price, 18 + price.expo),
          });
        }
      });
      return returnData;
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
    enabled: Boolean(network?.id && network?.preset),
    queryFn: async () => {
      const stalenessTolerance = 600;
      if (!(network?.id && network?.preset)) {
        throw 'OMG';
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

        const pythFeedIds = (await getPythFeedIds(network)) as string[];

        if (pythFeedIds.length === 0) {
          return null;
        }

        const { address } = await importPythERC7412Wrapper(network?.id, network?.preset);

        const txs = [
          ...pythFeedIds.map((priceId) => ({
            target: address,
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
