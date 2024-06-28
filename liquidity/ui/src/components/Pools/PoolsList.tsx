import { useReducer, useMemo } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { ChainFilter, CollateralFilter, PoolCard } from './';
import { TorosPoolCard } from './PoolCards/TorosPoolCard';
import { usePoolsList } from '@snx-v3/usePoolsList';
import { PoolCardsLoading } from './PoolCards/PoolCardsLoading';
import { useOfflinePrices } from '@snx-v3/useCollateralPriceUpdates';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { ARBITRUM, BASE_ANDROMEDA } from '@snx-v3/useBlockchain';

export const PoolsList = () => {
  const [state, dispatch] = useReducer(poolsReducer, { collateral: [], chain: [] });
  const { data, isLoading: isPoolsListLoading } = usePoolsList();

  const { data: BaseCollateralTypes, isLoading: isBaseCollateralLoading } = useCollateralTypes(
    false,
    BASE_ANDROMEDA
  );

  const { data: ArbitrumCollateralTypes, isLoading: isArbCollateralLoading } = useCollateralTypes(
    false,
    ARBITRUM
  );

  const allCollaterals: CollateralType[] = useMemo(() => {
    if (!BaseCollateralTypes || !ArbitrumCollateralTypes) {
      return [];
    }

    return BaseCollateralTypes.concat(ArbitrumCollateralTypes);
  }, [ArbitrumCollateralTypes, BaseCollateralTypes]);

  const { data: collateralPrices, isLoading: isLoadingCollateralPrices } = useOfflinePrices(
    allCollaterals.map((item) => ({
      id: item.tokenAddress,
      oracleId: item.oracleNodeId,
      symbol: item.symbol,
    }))
  );

  const { collateral, chain } = state;

  const showToros =
    (chain.length === 0 || chain.includes(BASE_ANDROMEDA.id)) &&
    (collateral.length === 0 || collateral.includes('USDC'));

  const isLoading =
    isPoolsListLoading ||
    isLoadingCollateralPrices ||
    isBaseCollateralLoading ||
    isArbCollateralLoading;

  return (
    <Flex mt={6} flexDirection="column">
      <Heading fontWeight={700} fontSize={24}>
        Pools
      </Heading>
      <Flex flexWrap="wrap" gap={4} justifyContent="space-between" my={6}>
        <ChainFilter activeChains={state.chain} dispatch={dispatch} />
        <CollateralFilter activeCollateral={state.collateral} dispatch={dispatch} />
      </Flex>
      <Flex direction="column" gap={4}>
        {isLoading && <PoolCardsLoading />}
        {!isLoading && showToros && (
          <TorosPoolCard tvl={data?.toros.tvl || ''} apy={data?.toros.apy} />
        )}
        {!isLoading &&
          data?.synthetixPools.map(({ network, poolInfo, apr }) => {
            const { pool } = poolInfo[0];

            const collateralDeposited = poolInfo.map(({ collateral_type }) => ({
              collateralDeposited: collateral_type.total_amount_deposited,
              tokenAddress: collateral_type.id,
            }));

            const collateralTypes = (
              network.id === ARBITRUM.id ? ArbitrumCollateralTypes : BaseCollateralTypes
            )?.map((item) => ({
              ...item,
              collateralDeposited:
                collateralDeposited.find(
                  ({ tokenAddress }) =>
                    tokenAddress.toLowerCase() === item.tokenAddress.toLowerCase()
                )?.collateralDeposited || '0',
            }));

            if (chain.length > 0 && !chain.includes(network.id)) return null;

            return (
              <PoolCard
                key={network.hexId}
                collateralTypes={collateralTypes}
                collateralPrices={collateralPrices}
                apr={apr}
                network={network}
                pool={pool}
                collaterals={collateral}
              />
            );
          })}
      </Flex>
    </Flex>
  );
};

interface PoolsFilterState {
  collateral: string[];
  chain: number[];
}

export interface PoolsFilterAction {
  type:
    | 'ADD_COLLATERAL'
    | 'REMOVE_COLLATERAL'
    | 'ADD_CHAIN'
    | 'REMOVE_CHAIN'
    | 'RESET_COLLATERAL'
    | 'RESET_CHAIN';
  payload?: {
    collateral?: string;
    chain?: number;
  };
}

function poolsReducer(state: PoolsFilterState, action: PoolsFilterAction): PoolsFilterState {
  switch (action.type) {
    case 'ADD_COLLATERAL':
      if (action.payload?.collateral) {
        return {
          ...state,
          collateral: [...state.collateral, action.payload.collateral],
        };
      }

    case 'REMOVE_COLLATERAL':
      return {
        ...state,
        collateral: state.collateral.filter((item) => item !== action.payload?.collateral),
      };

    case 'ADD_CHAIN':
      if (action.payload?.chain) {
        // Only one chain active at once
        return {
          ...state,
          chain: [action.payload.chain],
        };
      }

    case 'REMOVE_CHAIN':
      return {
        ...state,
        chain: state.chain.filter((item) => item !== action.payload?.chain),
      };

    case 'RESET_COLLATERAL':
      return {
        collateral: [],
        chain: state.chain,
      };

    case 'RESET_CHAIN':
      return {
        collateral: state.collateral,
        chain: [],
      };

    default:
      return state;
  }
}
