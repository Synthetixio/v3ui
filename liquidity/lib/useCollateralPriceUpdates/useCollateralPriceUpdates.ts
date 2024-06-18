import { useQuery } from '@tanstack/react-query';
import { BigNumberish, ethers } from 'ethers';
import { Network, useDefaultProvider, useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { offchainMainnetEndpoint } from '@snx-v3/constants';
import { ERC7412_ABI } from '@snx-v3/withERC7412';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { importMulticall3, importExtras } from '@snx-v3/contracts';
import { networksOffline } from '@snx-v3/usePoolsList';
import { wei } from '@synthetixio/wei';
import { importPythERC7412Wrapper } from '@snx-v3/contracts';
import { parseUnits } from '@snx-v3/format';

const priceService = new EvmPriceServiceConnection(offchainMainnetEndpoint);

async function getPythFeedIds(network: Network) {
  const extras = await importExtras(network.id, network.preset);
  return Object.entries(extras)
    .filter(
      ([key, value]) =>
        key.startsWith('pyth') && key.endsWith('FeedId') && String(value).length === 66
    )
    .map(([_key, value]) => value);
}

async function getPythFeedIdsFromCollateralList(collateralList: string[]) {
  const queries = networksOffline.map((network) => importExtras(network.id, network.preset));
  const extras = await Promise.all(queries);

  // Go over extras and find everything that starts with pyth and ends with FeedId, store in array
  const priceIds = extras
    .map((extra) => {
      return Object.entries(extra).filter(
        ([key, _value]) => key.startsWith('pyth') && key.endsWith('FeedId')
      );
    })
    .flat();

  const deduped = Array.from(
    new Set(
      priceIds.map((x) => ({
        collateral: x[0].replace('pyth', '').replace('FeedId', '').toUpperCase(),
        priceId: x[1],
      }))
    )
  );

  // Find the corresponding price feed id for each collateral
  return collateralList.map((collateral) => {
    let symbol = collateral;
    if (collateral === 'WETH') {
      symbol = 'ETH';
    }

    const id = deduped.find((x) => x.collateral === symbol);

    return {
      collateral,
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
    value: priceIds.length * 10,
  };
};

export const useAllCollateralPriceUpdates = (customNetwork?: Network) => {
  const { network } = useNetwork();
  const targetNetwork = customNetwork || network;
  return useQuery({
    queryKey: [`${targetNetwork?.id}-${targetNetwork?.preset}`, 'all-price-updates'],
    enabled: isBaseAndromeda(targetNetwork?.id, targetNetwork?.preset),
    queryFn: async () => {
      if (!(targetNetwork?.id && targetNetwork?.preset))
        throw 'useAllCollateralPriceUpdates is missing required data';
      const stalenessTolerance = 60;

      const pythFeedIds = (await getPythFeedIds(targetNetwork)) as string[];
      const tx = await getPriceUpdates(pythFeedIds, stalenessTolerance, network);

      return {
        ...tx,
        value: tx.value * 10,
      };
    },
    refetchInterval: 60000,
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
    enabled: Boolean(collaterals),
    queryFn: async () => {
      if (!collaterals) {
        throw 'useOfflinePrices is missing required data';
      }

      const returnData: { symbol: string; price: BigNumberish }[] = [
        {
          symbol: 'sUSDC',
          price: wei(1).toBN(),
        },
        {
          symbol: 'USDC',
          price: wei(1).toBN(),
        },
      ];

      const filteredCollaterals = collaterals.filter(
        (collateral) => !collateral.symbol.includes('sUSDC')
      );

      if (!filteredCollaterals.length) {
        return returnData;
      }

      const pythIds = await getPythFeedIdsFromCollateralList(
        collaterals.map((collateral) => collateral.symbol)
      );

      const prices = await priceService.getLatestPriceFeeds(
        pythIds.map((x) => x.priceId) as string[]
      );

      prices?.forEach((item, index) => {
        const price = item.getPriceUnchecked();

        returnData.push({
          symbol: collaterals[index].symbol,
          price: parseUnits(price.price, 18 + price.expo),
        });
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

        const pythFeedIds = (await getPythFeedIds(network)) as string[];

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
