import { useReducer, useMemo } from 'react';
import { Flex, Heading, Text, Divider } from '@chakra-ui/react';
import { ChainFilter, CollateralFilter, PoolCard } from './';
import { TorosPoolCard } from './PoolCards/TorosPoolCard';
import { usePoolsList } from '@snx-v3/usePoolsList';
import { PoolCardsLoading } from './PoolCards/PoolCardsLoading';
import { useOfflinePrices } from '@snx-v3/useCollateralPriceUpdates';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { ARBITRUM, BASE_ANDROMEDA, MAINNET } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useRewardsDistributors } from '@snx-v3/useRewardsDistributors';
import { useOraclePrice } from '@snx-v3/useOraclePrice';
import { Balloon } from './Balloon';

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

  const { data: MainnetCollateralTypes, isLoading: isMainCollateralLoading } = useCollateralTypes(
    false,
    MAINNET
  );

  const allCollaterals: CollateralType[] = useMemo(() => {
    if (!BaseCollateralTypes || !ArbitrumCollateralTypes || !MainnetCollateralTypes) {
      return [];
    }

    // We want to filter out assets that don't have a pyth price feed

    return BaseCollateralTypes.concat(ArbitrumCollateralTypes)
      .concat(MainnetCollateralTypes)
      .filter((item) => item.displaySymbol !== 'stataUSDC');
  }, [ArbitrumCollateralTypes, BaseCollateralTypes, MainnetCollateralTypes]);

  const { data: collateralPrices, isLoading: isLoadingCollateralPrices } = useOfflinePrices(
    allCollaterals.map((item) => ({
      id: item.tokenAddress,
      oracleId: item.oracleNodeId,
      symbol: item.symbol,
    }))
  );

  // Fetch stata price from oracle manager
  const stata = BaseCollateralTypes?.find((item) => item.symbol === 'stataUSDC');

  const { data: stataPrice, isLoading: isStataPriceLoading } = useOraclePrice(
    stata?.oracleNodeId,
    BASE_ANDROMEDA
  );

  // Arb Rewards
  const { data: ArbitrumRewards, isLoading: isArbitrumRewardsLoading } =
    useRewardsDistributors(ARBITRUM);

  // Base Rewards
  const { data: BaseRewards, isLoading: isBaseRewardsLoading } =
    useRewardsDistributors(BASE_ANDROMEDA);

  // Mainnet Rewards
  const { data: MainRewards, isLoading: isMainRewardsLoading } = useRewardsDistributors(MAINNET);

  const { collateral, chain } = state;

  const showToros =
    (chain.length === 0 || chain.includes(BASE_ANDROMEDA.id)) &&
    (collateral.length === 0 || collateral.includes('USDC'));

  const isLoading =
    isPoolsListLoading ||
    isLoadingCollateralPrices ||
    isBaseCollateralLoading ||
    isArbCollateralLoading ||
    isMainCollateralLoading ||
    isArbitrumRewardsLoading ||
    isBaseRewardsLoading ||
    isMainRewardsLoading ||
    isStataPriceLoading;

  const filteredPools = useMemo(() => {
    return (
      data?.synthetixPools
        .map(({ network, poolInfo, apr }) => {
          const collateralDeposited = poolInfo.map(({ collateral_type }) => ({
            collateralDeposited: collateral_type.total_amount_deposited,
            tokenAddress: collateral_type.id,
          }));

          let collaterals: typeof ArbitrumCollateralTypes = [];
          let rewardsDistributors: any = {};

          if (network.id === ARBITRUM.id) {
            collaterals = ArbitrumCollateralTypes;
            rewardsDistributors = ArbitrumRewards;
          } else if (network.id === BASE_ANDROMEDA.id) {
            collaterals = BaseCollateralTypes;
            rewardsDistributors = BaseRewards;
          } else if (network.id === MAINNET.id) {
            collaterals = MainnetCollateralTypes;
            rewardsDistributors = MainRewards;
          }

          const collateralTypes = collaterals?.map((item) => ({
            ...item,
            collateralDeposited:
              collateralDeposited.find(
                ({ tokenAddress }) => tokenAddress.toLowerCase() === item.tokenAddress.toLowerCase()
              )?.collateralDeposited || '0',
          }));

          return {
            network,
            poolInfo,
            apr,
            collateralDeposited,
            collateralTypes,
            rewardsDistributors,
          };
        })
        .filter((pool) => {
          const { network, collateralTypes } = pool;
          if (chain.length > 0 && !chain.includes(network.id)) {
            return false;
          }

          const isCollateralFiltered = collateralTypes?.some((collateralType) =>
            collateral.length
              ? !!collateral.find((collateral) => {
                  if (
                    isBaseAndromeda(network.id, network.preset) &&
                    collateralType.symbol.toUpperCase() === 'SUSDC'
                  ) {
                    return collateral.toUpperCase() === 'USDC';
                  }
                  return collateral.toUpperCase() === collateralType.symbol.toUpperCase();
                })
              : true
          );

          if (!isCollateralFiltered) {
            return false;
          }

          return true;
        }) || []
    );
  }, [
    data?.synthetixPools,
    ArbitrumCollateralTypes,
    ArbitrumRewards,
    BaseCollateralTypes,
    BaseRewards,
    MainnetCollateralTypes,
    MainRewards,
    chain,
    collateral,
  ]);

  const allCollateralPrices = useMemo(() => {
    if (stata && stataPrice) {
      return collateralPrices?.concat({ symbol: 'stataUSDC', price: stataPrice?.price.toBN() });
    }
  }, [stata, collateralPrices, stataPrice]);

  return (
    <Flex mt={6} flexDirection="column">
      <Heading fontWeight={700} fontSize={24}>
        Pools
      </Heading>
      <Flex flexWrap="wrap" gap={4} justifyContent="space-between" my={6}>
        <ChainFilter activeChains={state.chain} dispatch={dispatch} />
        <CollateralFilter activeCollateral={state.collateral} dispatch={dispatch} />
      </Flex>
      <Flex minW="1200px" overflowX="auto" direction="column" gap={4}>
        <Divider width="100%" />
        <Flex gap={4} px={4} py={3}>
          <Text
            color="gray.600"
            fontFamily="heading"
            fontSize="12px"
            lineHeight="16px"
            letterSpacing={0.6}
            fontWeight={700}
            width="190px"
          >
            Collateral/Network
          </Text>

          <Text
            color="gray.600"
            fontFamily="heading"
            fontSize="12px"
            lineHeight="16px"
            letterSpacing={0.6}
            fontWeight={700}
            width="220px"
            textAlign="right"
          >
            Wallet Balance
          </Text>

          <Text
            color="gray.600"
            fontFamily="heading"
            fontSize="12px"
            lineHeight="16px"
            letterSpacing={0.6}
            fontWeight={700}
            width="189px"
            textAlign="right"
          >
            Pool / Owner
          </Text>

          <Text
            color="gray.600"
            fontFamily="heading"
            fontSize="12px"
            lineHeight="16px"
            letterSpacing={0.6}
            fontWeight={700}
            width="144px"
            textAlign="right"
          >
            TVL
          </Text>

          <Text
            color="gray.600"
            fontFamily="heading"
            fontSize="12px"
            lineHeight="16px"
            letterSpacing={0.6}
            fontWeight={700}
            width="144px"
            textAlign="right"
          >
            APY/APR
          </Text>
          <Text
            color="gray.600"
            fontFamily="heading"
            fontSize="12px"
            lineHeight="16px"
            letterSpacing={0.6}
            fontWeight={700}
            width="121px"
            textAlign="right"
          >
            Specifics
          </Text>
          <Flex minW="159px" flex="1" />
        </Flex>
        {isLoading && <PoolCardsLoading />}
        {!isLoading && showToros && (
          <TorosPoolCard tvl={data?.toros.tvl || ''} apy={data?.toros.apy} />
        )}
        {!isLoading &&
          filteredPools.map(({ network, poolInfo, apr, collateralTypes, rewardsDistributors }) => {
            const { pool } = poolInfo[0];

            const rewardsPayoutTokens = [
              ...new Set(
                rewardsDistributors?.map(({ payoutToken }: any) => payoutToken.symbol.toUpperCase())
              ),
            ] as string[];

            return (
              <PoolCard
                key={network.hexId}
                collateralTypes={collateralTypes}
                collateralPrices={allCollateralPrices}
                apr={apr}
                network={network}
                pool={pool}
                rewardsPayoutTokens={rewardsPayoutTokens}
              />
            );
          })}

        {!isLoading && !filteredPools.length && (
          <Flex flexDir="column" alignItems="center">
            <Balloon mb={12} mt={6} />
            <Text mb={2} color="gray.500">
              No results found, select a different network or collateral
            </Text>

            <Text
              onClick={() => {
                dispatch({ type: 'RESET_CHAIN' });
                dispatch({ type: 'RESET_COLLATERAL' });
              }}
              cursor="pointer"
              fontWeight={700}
              color="cyan.500"
            >
              Clear Filters
            </Text>
          </Flex>
        )}
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
          // Only one collateral active at once
          collateral: [action.payload.collateral],
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
