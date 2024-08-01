import { useReducer, useMemo } from 'react';
import { Flex, Heading, Text, Icon, IconProps } from '@chakra-ui/react';
import { ChainFilter, CollateralFilter, PoolCard } from './';
import { TorosPoolCard } from './PoolCards/TorosPoolCard';
import { usePoolsList } from '@snx-v3/usePoolsList';
import { PoolCardsLoading } from './PoolCards/PoolCardsLoading';
import { useOfflinePrices } from '@snx-v3/useCollateralPriceUpdates';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { ARBITRUM, BASE_ANDROMEDA } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useTokenBalances } from '@snx-v3/useTokenBalance';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { useRewardsDistributors } from '@snx-v3/useRewardsDistributors';

export const PoolsList = () => {
  const [state, dispatch] = useReducer(poolsReducer, { collateral: [], chain: [] });
  const { data, isLoading: isPoolsListLoading } = usePoolsList();
  const { data: usdTokens } = useGetUSDTokens(BASE_ANDROMEDA);

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

  console.log('All collaterals:', allCollaterals);

  const { data: collateralPrices, isLoading: isLoadingCollateralPrices } = useOfflinePrices(
    allCollaterals.map((item) => ({
      id: item.tokenAddress,
      oracleId: item.oracleNodeId,
      symbol: item.symbol,
    }))
  );

  console.log('Collateral prices:', collateralPrices);

  // Arb Balances
  const { data: ArbitrumTokenBalances, isLoading: isArbitrumBalancesLoading } = useTokenBalances(
    ArbitrumCollateralTypes?.map((item) => item.tokenAddress) || [],
    ARBITRUM
  );

  // Base Balances
  const additionalBaseTokens =
    BaseCollateralTypes?.filter((item) => item.symbol !== 'USDC').map(
      (item) => item.tokenAddress
    ) || [];

  const { data: BaseTokenBalances, isLoading: isBaseBalancesLoading } = useTokenBalances(
    usdTokens?.USDC ? [usdTokens.USDC, ...additionalBaseTokens] : [],
    BASE_ANDROMEDA
  );

  // Arb Rewards
  const { data: ArbitrumRewards, isLoading: isArbitrumRewardsLoading } =
    useRewardsDistributors(ARBITRUM);

  // Base Rewards
  const { data: BaseRewards, isLoading: isBaseRewardsLoading } =
    useRewardsDistributors(BASE_ANDROMEDA);

  const { collateral, chain } = state;

  const showToros =
    (chain.length === 0 || chain.includes(BASE_ANDROMEDA.id)) &&
    (collateral.length === 0 || collateral.includes('USDC'));

  const isLoading =
    isPoolsListLoading ||
    isLoadingCollateralPrices ||
    isBaseCollateralLoading ||
    isArbCollateralLoading ||
    isArbitrumBalancesLoading ||
    isBaseBalancesLoading ||
    isArbitrumRewardsLoading ||
    isBaseRewardsLoading;

  const filteredPools = useMemo(() => {
    return (
      data?.synthetixPools
        .map(({ network, poolInfo, apr }) => {
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
                ({ tokenAddress }) => tokenAddress.toLowerCase() === item.tokenAddress.toLowerCase()
              )?.collateralDeposited || '0',
          }));

          const balances = network.id === ARBITRUM.id ? ArbitrumTokenBalances : BaseTokenBalances;
          const rewardsDistributors = network.id === ARBITRUM.id ? ArbitrumRewards : BaseRewards;

          return {
            network,
            poolInfo,
            apr,
            collateralDeposited,
            collateralTypes,
            balances,
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
    ArbitrumCollateralTypes,
    BaseCollateralTypes,
    chain,
    collateral,
    data?.synthetixPools,
    ArbitrumTokenBalances,
    BaseTokenBalances,
    ArbitrumRewards,
    BaseRewards,
  ]);

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
          filteredPools.map(
            ({ network, poolInfo, apr, collateralTypes, balances, rewardsDistributors }) => {
              const { pool } = poolInfo[0];

              const rewardsPayoutTokens = [
                ...new Set(
                  rewardsDistributors?.map(({ payoutToken }: any) =>
                    payoutToken.symbol.toUpperCase()
                  )
                ),
              ] as string[];

              return (
                <PoolCard
                  key={network.hexId}
                  collateralTypes={collateralTypes}
                  collateralPrices={collateralPrices}
                  apr={apr}
                  network={network}
                  pool={pool}
                  balances={balances}
                  rewardsPayoutTokens={rewardsPayoutTokens}
                />
              );
            }
          )}

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

const Balloon = ({ ...props }: IconProps) => (
  <Icon width="242px" height="294px" viewBox="0 0 242 294" fill="none" {...props}>
    <path
      d="M35.5978 98.5483C53.9696 117.348 91.5399 175.897 98.468 215.303"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M51.7158 58.1003C67.1932 95.8157 92.3605 137.627 95.7502 212.037"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M91.4891 51.3845C94.7773 92.4947 101.899 151.755 93.6153 220.766"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M117.383 100.944C113.854 128.734 113.664 172.383 87.1345 216.569"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M36.1586 97.9597C54.5304 116.759 92.1006 175.309 99.0288 214.715"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M118.229 100.917C114.7 128.707 114.51 172.356 87.9809 216.542"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M52.4117 57.5923C67.889 95.3077 93.0564 137.119 96.446 211.529"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M92.2393 51.2368C95.5276 92.347 102.65 151.608 94.3656 220.618"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M125.029 216.256L168.984 241.78L168.973 245.837L125.05 271.379L118.049 271.364L74.088 245.836L74.0802 241.788L118.042 216.258L125.029 216.256Z"
      fill="#6B59FF"
    />
    <rect
      width="44.1452"
      height="44.1452"
      transform="matrix(0.864779 0.502153 -0.864779 0.502153 121.393 221.28)"
      fill="#00B0D6"
    />
    <path
      d="M87.2931 245.809L121.424 225.977L121.424 230.667L91.3375 248.161L87.2931 245.809Z"
      fill="#008EAD"
    />
    <path
      d="M121.393 225.995L155.533 245.81L151.479 248.145L121.393 230.689L121.393 225.995Z"
      fill="#008EAD"
    />
    <path
      d="M83.2195 243.449L121.397 221.28L121.397 223.743L85.3475 244.688L83.2195 243.449Z"
      fill="#2D1EA6"
    />
    <path
      d="M121.393 221.28L159.567 243.447L157.459 244.689L121.393 223.747L121.393 221.28Z"
      fill="#402FC8"
    />
    <path
      d="M85.1845 244.579L121.401 223.531L121.401 225.994L87.2849 245.816L85.1845 244.579Z"
      fill="#2D1EA6"
    />
    <path
      d="M121.393 223.531L157.65 244.565L155.51 245.809L121.393 225.998L121.393 223.531Z"
      fill="#402FC8"
    />
    <mask id="path-17-inside-1_14871_157174" fill="white">
      <path d="M74.0897 245.837L118.042 271.358L118.042 293.445L74.0897 267.923L74.0897 245.837Z" />
    </mask>
    <path
      d="M74.0897 245.837L118.042 271.358L118.042 293.445L74.0897 267.923L74.0897 245.837Z"
      fill="#402FC8"
    />
    <path
      d="M117.609 271.107L117.609 293.194L118.474 293.696L118.474 271.61L117.609 271.107Z"
      fill="#AEA4FF"
      mask="url(#path-17-inside-1_14871_157174)"
    />
    <mask id="path-19-inside-2_14871_157174" fill="white">
      <path d="M125.023 271.359L168.974 245.837L168.974 267.924L125.023 293.445L125.023 271.359Z" />
    </mask>
    <path
      d="M125.023 271.359L168.974 245.837L168.974 267.924L125.023 293.445L125.023 271.359Z"
      fill="#2D1EA6"
    />
    <path
      d="M125.455 293.194L125.455 271.108L124.59 271.61L124.59 293.696L125.455 293.194Z"
      fill="#AEA4FF"
      mask="url(#path-19-inside-2_14871_157174)"
    />
    <mask id="path-21-inside-3_14871_157174" fill="white">
      <path d="M118.039 271.371H125.027V293.445H118.039V271.371Z" />
    </mask>
    <path d="M118.039 271.371H125.027V293.445H118.039V271.371Z" fill="#2D1EA6" />
    <path
      d="M118.039 271.371V270.871H117.539V271.371H118.039ZM125.027 271.371H125.527V270.871H125.027V271.371ZM118.039 271.871H125.027V270.871H118.039V271.871ZM124.527 271.371V293.445H125.527V271.371H124.527ZM118.539 293.445V271.371H117.539V293.445H118.539Z"
      fill="#AEA4FF"
      mask="url(#path-21-inside-3_14871_157174)"
    />
    <path
      d="M142.396 265.149L140.962 265.977L140.962 279.389L142.396 278.561L142.396 265.149Z"
      fill="#06061B"
    />
    <path
      d="M143.831 264.317L142.396 265.146L142.396 278.561L143.831 279.389L143.831 264.317Z"
      fill="#402FC8"
    />
    <path
      d="M143.83 279.39L140.96 281.05L140.961 279.39L142.395 278.561L143.83 279.39Z"
      fill="#6B59FF"
    />
    <path
      d="M146.704 262.66L145.269 263.489L145.269 276.901L146.704 276.073L146.704 262.66Z"
      fill="#06061B"
    />
    <path
      d="M148.138 261.828L146.703 262.657L146.703 276.073L148.138 276.901L148.138 261.828Z"
      fill="#402FC8"
    />
    <path
      d="M148.137 276.901L145.267 278.562L145.268 276.901L146.702 276.073L148.137 276.901Z"
      fill="#6B59FF"
    />
    <path
      d="M151.009 260.172L149.574 261L149.574 274.412L151.009 273.584L151.009 260.172Z"
      fill="#06061B"
    />
    <path
      d="M152.443 259.34L151.008 260.169L151.008 273.584L152.443 274.412L152.443 259.34Z"
      fill="#402FC8"
    />
    <path
      d="M152.442 274.413L149.573 276.073L149.573 274.413L151.008 273.584L152.442 274.413Z"
      fill="#6B59FF"
    />
    <path
      d="M155.314 257.683L153.879 258.512L153.879 271.924L155.314 271.096L155.314 257.683Z"
      fill="#06061B"
    />
    <path
      d="M156.748 256.851L155.314 257.68L155.314 271.096L156.748 271.924L156.748 256.851Z"
      fill="#402FC8"
    />
    <path
      d="M156.747 271.924L153.878 273.585L153.878 271.924L155.313 271.096L156.747 271.924Z"
      fill="#6B59FF"
    />
    <path d="M74.0921 245.839L118.046 271.374H125.014L168.974 245.838" stroke="#AEA4FF" />
    <path
      d="M121.533 261.713L166.418 235.65L166.418 243.578L121.533 269.641L121.533 261.713Z"
      fill="#C9C9D9"
    />
    <path
      d="M76.6477 235.531L121.533 261.594L121.533 269.641L76.6477 243.578L76.6477 235.531Z"
      fill="#E2E2F0"
    />
    <path
      d="M125.029 187.193L168.984 212.716L168.973 216.774L125.05 242.316L118.049 242.3L74.088 216.773L74.0802 212.724L118.042 187.195L125.029 187.193Z"
      fill="#6B59FF"
    />
    <rect
      width="44.1452"
      height="44.1452"
      transform="matrix(0.864779 0.502153 -0.864779 0.502153 121.393 192.216)"
      fill="#00D1FF"
    />
    <path
      d="M87.2931 216.746L121.424 196.913L121.424 201.604L91.3375 219.097L87.2931 216.746Z"
      fill="#008EAD"
    />
    <path
      d="M121.393 196.932L155.533 216.746L151.479 219.082L121.393 201.625L121.393 196.932Z"
      fill="#008EAD"
    />
    <path
      d="M83.2195 214.385L121.397 192.216L121.397 194.68L85.3475 215.624L83.2195 214.385Z"
      fill="#2D1EA6"
    />
    <path
      d="M121.393 192.216L159.567 214.383L157.459 215.626L121.393 194.683L121.393 192.216Z"
      fill="#402FC8"
    />
    <path
      d="M85.1845 215.516L121.401 194.467L121.401 196.93L87.2849 216.752L85.1845 215.516Z"
      fill="#2D1EA6"
    />
    <path
      d="M121.393 194.468L157.65 215.502L155.51 216.746L121.393 196.935L121.393 194.468Z"
      fill="#402FC8"
    />
    <mask id="path-46-inside-4_14871_157174" fill="white">
      <path d="M74.0897 216.773L118.042 242.295L118.042 264.382L74.0897 238.86L74.0897 216.773Z" />
    </mask>
    <path
      d="M74.0897 216.773L118.042 242.295L118.042 264.382L74.0897 238.86L74.0897 216.773Z"
      fill="#402FC8"
    />
    <path
      d="M117.609 242.044L117.609 264.13L118.474 264.633L118.474 242.546L117.609 242.044Z"
      fill="#AEA4FF"
      mask="url(#path-46-inside-4_14871_157174)"
    />
    <mask id="path-48-inside-5_14871_157174" fill="white">
      <path d="M125.023 242.295L168.974 216.774L168.974 238.86L125.023 264.382L125.023 242.295Z" />
    </mask>
    <path
      d="M125.023 242.295L168.974 216.774L168.974 238.86L125.023 264.382L125.023 242.295Z"
      fill="#2D1EA6"
    />
    <path
      d="M125.455 264.131L125.455 242.044L124.59 242.546L124.59 264.633L125.455 264.131Z"
      fill="#AEA4FF"
      mask="url(#path-48-inside-5_14871_157174)"
    />
    <mask id="path-50-inside-6_14871_157174" fill="white">
      <path d="M118.039 242.307H125.027V264.382H118.039V242.307Z" />
    </mask>
    <path d="M118.039 242.307H125.027V264.382H118.039V242.307Z" fill="#2D1EA6" />
    <path
      d="M118.039 242.307V241.807H117.539V242.307H118.039ZM125.027 242.307H125.527V241.807H125.027V242.307ZM118.039 242.807H125.027V241.807H118.039V242.807ZM124.527 242.307V264.382H125.527V242.307H124.527ZM118.539 264.382V242.307H117.539V264.382H118.539Z"
      fill="#AEA4FF"
      mask="url(#path-50-inside-6_14871_157174)"
    />
    <path d="M74.0921 216.776L118.046 242.31H125.014L168.974 216.775" stroke="#AEA4FF" />
    <path
      d="M153.163 239.714L149.356 237.516L149.356 239.519L153.163 241.717L153.163 239.714Z"
      fill="#E2E2F0"
    />
    <path
      d="M142.551 245.872L138.745 243.674L138.745 245.677L142.551 247.875L142.551 245.872Z"
      fill="#E2E2F0"
    />
    <path
      d="M144.596 244.692L142.552 245.872L138.746 243.674L140.79 242.494L144.596 244.692Z"
      fill="#FEFEFF"
    />
    <path
      d="M155.195 238.55L153.162 239.724L149.356 237.526L151.389 236.353L155.195 238.55Z"
      fill="#FEFEFF"
    />
    <path
      d="M155.208 238.563L142.549 245.872L142.549 247.894L155.208 240.586L155.208 238.563Z"
      fill="#C9C9D9"
    />
    <path
      d="M155.214 238.56L142.551 245.871L140.186 244.506L152.849 237.195L155.214 238.56Z"
      fill="#FEFEFF"
    />
    <path
      d="M120.924 138.238C129.139 157.525 148.205 203.913 144.403 242.749"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M121.512 137.516C129.726 156.803 148.792 203.191 144.991 242.026"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M205.82 97.4355C179.333 130.637 153.721 194.747 146.117 242.106"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M206.306 98.1211C179.874 131.32 154.313 195.425 146.725 242.78"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M182.309 111.502C166.048 141.342 150.323 198.962 145.655 241.526"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M182.898 112.201C166.637 142.042 150.912 199.661 146.244 242.225"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M198.946 51.5159C135.775 104.355 147.359 193.927 144.901 242.205"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M199.781 51.4807C136.61 104.319 148.194 193.892 145.736 242.17"
      stroke="#C9C9D9"
      strokeWidth="1.5"
    />
    <path
      d="M174.533 30.1777L173.854 36.575L175.185 41.876L172.745 43.2919L171.466 40.6093L170.915 38.2281L170.54 36.2234L171.466 31.8229L174.533 30.1777Z"
      fill="#FEFEFF"
    />
    <path
      d="M234.234 74.8176C239.761 63.3438 229.095 53.7159 224.713 52.8425C222.443 45.1597 218.376 42.6613 216.557 42.3267C213.002 27.5427 201.65 25.8931 200.559 32.5614C194.25 21.3759 187.567 23.5273 187.315 29.5831C181.554 23.3398 171.893 24.0898 174.818 36.7916L222.33 69.6932L229.478 77.5694L234.234 74.8176Z"
      fill="#FEFEFF"
    />
    <path d="M172.304 29.1663L176.995 26.4646L175.784 29.1574L172.304 29.1663Z" fill="#FEFEFF" />
    <path d="M184.517 27.9732L189.208 25.2715L187.997 27.9643L184.517 27.9732Z" fill="#FEFEFF" />
    <path d="M197.765 32.2154L202.456 29.5137L201.245 32.2065L197.765 32.2154Z" fill="#FEFEFF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M175.13 41.9072L230.339 73.7824C230.642 72.9418 230.791 71.8492 230.791 70.528C229.835 65.3978 227.096 61.3545 223.791 58.0503C222.251 57.1613 220.931 56.7546 219.877 56.8368C219.881 56.7078 219.883 56.5745 219.883 56.437C219.177 55.5737 218.629 54.1485 218.043 52.626C217.124 50.2373 216.113 47.6091 214.256 46.537C212.964 45.7912 211.997 45.5545 211.312 45.7983C211.322 45.5973 211.327 45.3899 211.327 45.1762C211.327 41.9214 208.874 39.0744 206.722 36.5775C205.972 35.7078 205.259 34.8806 204.699 34.0934C200.899 31.8992 198.503 32.804 198.503 37.1924C198.503 37.2362 198.503 37.28 198.504 37.3239L196.146 38.6918C196.038 38.3899 195.933 38.0735 195.824 37.7452C195.124 35.6363 194.259 33.0317 191.58 30.5709C188.065 28.5415 186.226 28.9241 186.226 32.9828C186.226 33.5311 186.278 34.0954 186.377 34.6664L184.031 36.0288C182.99 34.0786 181.986 32.4106 179.981 31.2531C175.42 28.62 173.301 29.6001 173.301 34.8663C173.301 37.133 173.986 39.6104 175.13 41.9072Z"
      fill="#E2E2F0"
    />
    <path
      d="M230.09 73.6617L229.924 74.9156L228.742 75.598L172.756 43.2745L175.12 41.9097L230.09 73.6617Z"
      fill="#FEFEFF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M172.011 44.3916L229.478 77.5699C230.753 76.5168 231.519 74.6672 231.519 72.169C231.519 66.4468 227.502 59.4886 222.546 56.6275C221.653 56.112 220.791 55.7647 219.977 55.5752C219.391 51.7703 216.746 47.6275 213.572 45.7952C212.969 45.4469 212.385 45.2041 211.83 45.0609C211.169 40.2433 207.822 34.9354 203.791 32.6084C199.934 30.3812 196.701 31.6072 195.852 35.2718C194.517 32.3924 192.358 29.7767 189.923 28.3706C185.954 26.0791 182.72 27.8491 182.586 32.3163C181.563 31.308 180.463 30.4453 179.317 29.7834C173.911 26.6622 169.528 29.1925 169.528 35.4349C169.528 38.3239 170.467 41.5017 172.011 44.3916Z"
      fill="#E2E2F0"
    />
    <path
      d="M155.208 238.562L142.547 245.872L140.182 244.506L152.843 237.197L155.208 238.562Z"
      fill="#FEFEFF"
    />
    <path
      d="M48.7564 14.2131L48.0777 20.6098L49.4084 25.9103L46.9688 27.3261L45.6899 24.6437L45.1389 22.2628L44.7635 20.2582L45.6899 15.8581L48.7564 14.2131Z"
      fill="#FEFEFF"
    />
    <path
      d="M108.469 58.8484C113.995 47.3756 103.33 37.7486 98.948 36.8753C96.6782 29.1932 92.6117 26.695 90.7932 26.3604C87.238 11.5778 75.8879 9.92841 74.7963 16.5961C68.4882 5.41162 61.8056 7.56277 61.5542 13.618C55.7928 7.37532 46.1331 8.12529 49.058 20.8259L96.5656 53.7244L103.713 61.5999L108.469 58.8484Z"
      fill="#FEFEFF"
    />
    <path d="M46.5424 13.2022L51.2334 10.5007L50.0225 13.1933L46.5424 13.2022Z" fill="#FEFEFF" />
    <path d="M58.7401 12.0076L63.4311 9.30615L62.2202 11.9987L58.7401 12.0076Z" fill="#FEFEFF" />
    <path d="M71.9872 16.2505L76.6782 13.5491L75.4673 16.2416L71.9872 16.2505Z" fill="#FEFEFF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.3423 25.9443L104.548 57.8174C104.852 56.9765 105.001 55.883 105.001 54.5603C104.045 49.4305 101.306 45.3876 98.0023 42.0838C96.4571 41.1917 95.1328 40.7853 94.0772 40.8712C94.0815 40.7414 94.0836 40.6073 94.0836 40.4688C93.3776 39.6057 92.8292 38.1805 92.2435 36.6582C91.3244 34.2697 90.3133 31.6418 88.4565 30.5698C87.1726 29.8286 86.2098 29.5903 85.5257 29.8268C85.5356 29.6278 85.5406 29.4225 85.5406 29.2111C85.5406 25.9565 83.0872 23.1098 80.9355 20.6132C80.1861 19.7436 79.4732 18.9164 78.9134 18.1293C75.1132 15.9353 72.7172 16.84 72.7172 21.2281C72.7172 21.2707 72.7175 21.3134 72.7181 21.3562L72.7175 21.3558L70.3614 22.7225C70.2546 22.4217 70.15 22.1067 70.0415 21.7797L70.0415 21.7797C69.3414 19.671 68.4767 17.0666 65.7972 14.606C62.2826 12.5769 60.4442 12.9594 60.4442 17.0177C60.4442 17.5646 60.496 18.1275 60.5942 18.6971L58.2411 20.0635C57.2003 18.1138 56.1963 16.4462 54.1919 15.289C49.6317 12.6561 47.5125 13.6361 47.5125 18.9018C47.5125 21.169 48.1978 23.6471 49.3423 25.9443Z"
      fill="#E2E2F0"
    />
    <path
      d="M104.313 57.693L104.147 58.9468L102.965 59.6291L46.984 27.3086L49.3477 25.9439L104.313 57.693Z"
      fill="#FEFEFF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M46.2452 28.4261L103.708 61.6024C104.985 60.5499 105.752 58.6994 105.752 56.1992C105.752 50.4776 101.736 43.5201 96.7804 40.6593C95.8854 40.1425 95.021 39.7948 94.2053 39.6056C93.6185 35.8015 90.9745 31.6602 87.8017 29.8283C87.1965 29.4789 86.6104 29.2357 86.0543 29.0927C85.3931 24.276 82.046 18.9695 78.0165 16.643C74.1606 14.4168 70.9297 15.641 70.079 19.302C68.7435 16.424 66.5859 13.8099 64.1514 12.4044C60.1835 10.1136 56.9509 11.8824 56.8151 16.3475C55.7936 15.3403 54.6942 14.4784 53.5489 13.8172C48.1433 10.6962 43.7612 13.2262 43.7612 19.4681C43.7612 22.3575 44.7003 25.5359 46.2452 28.4261Z"
      fill="#E2E2F0"
    />
    <path
      d="M120.852 17.0082C111.091 13.6038 97.9605 15.5897 92.6154 17.0082L120.852 24.9519V17.0082Z"
      fill="#CFC9FF"
    />
    <path
      d="M120.851 17.0082C130.611 13.6038 143.742 15.5897 149.087 17.0082L120.851 24.9519V17.0082Z"
      fill="#10104E"
    />
    <path
      d="M68.909 27.0796L51.4791 47.7899L120.85 23.6752C91.4285 10.0575 73.9637 20.2708 68.909 27.0796Z"
      fill="#AEA4FF"
    />
    <path
      d="M172.789 27.0796L190.219 47.7899L120.848 23.6752C150.27 10.0575 167.734 20.2708 172.789 27.0796Z"
      fill="#1D1084"
    />
    <path
      d="M190.219 47.7899L172.789 27.0796C167.734 20.2708 150.27 10.0575 120.848 23.6752"
      stroke="#AEA4FF"
    />
    <path
      d="M181.379 52.0454L206.389 80.4156L181.379 108.786L121 120.537L60.621 108.786L35.6112 80.4156L60.621 52.0454L121 40.2941L181.379 52.0454Z"
      fill="#156800"
    />
    <path d="M120.849 120.417L120.849 23.6753" stroke="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M120.845 23.6763C88.7742 23.6763 37.8788 39.8472 35.613 80.4166L35.6157 80.4196L35.5957 98.4081C41.1312 95.5975 56.7965 102.256 60.6077 126.777L60.5355 108.784L58.1177 106.032L60.5378 108.787L120.845 23.6763Z"
      fill="#8D7EFF"
    />
    <path
      d="M35.5978 98.4081L35.0978 98.4075L35.0969 99.2232L35.8241 98.8539L35.5978 98.4081ZM120.847 23.1763C104.743 23.1763 83.9179 27.2334 66.8182 36.3922C49.7151 45.5528 36.2621 59.8659 35.1158 80.3887L36.1143 80.4444C37.2339 60.3979 50.3615 46.3409 67.2903 37.2737C84.2226 28.2046 104.881 24.1763 120.847 24.1763V23.1763ZM35.8241 98.8539C37.0607 98.226 38.9407 98.0965 41.177 98.69C43.4017 99.2803 45.9317 100.576 48.4242 102.722C53.4041 107.01 58.2252 114.69 60.1157 126.854L61.1038 126.7C59.1832 114.343 54.266 106.433 49.0767 101.964C46.4844 99.732 43.822 98.3572 41.4335 97.7234C39.0566 97.0926 36.9026 97.1848 35.3714 97.9622L35.8241 98.8539ZM36.0978 98.4086L36.1178 80.4181L35.1178 80.417L35.0978 98.4075L36.0978 98.4086Z"
      fill="#AEA4FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M120.859 23.6763C100.812 32.9368 61.5942 65.2385 60.5512 108.787L120.859 120.56V23.6763ZM60.6132 126.752C69.3539 119.96 99.9127 113.848 120.99 138.516L120.854 120.56L60.5424 108.785L60.6132 126.752Z"
      fill="#6B59FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M120.853 23.6765C152.924 23.6765 203.819 39.8475 206.085 80.4168L181.16 108.787L120.853 23.6765ZM181.382 126.762C183.433 115.91 191.984 94.0802 206.389 98.3929L206.092 80.4143L181.164 108.787L181.382 126.762Z"
      fill="#2D1EA6"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M120.844 23.6765C140.891 32.937 180.108 65.2388 181.151 108.787L120.844 120.561V23.6765ZM120.999 138.501C129.93 128.3 155.534 111.235 181.375 126.761L181.161 108.786L120.853 120.559L120.999 138.501Z"
      fill="#3726C2"
    />
    <path
      d="M120.651 23.2224C110.558 27.8847 95.6841 38.3213 83.1989 53.0503C70.7116 67.782 60.5784 86.8505 60.0532 108.775L61.0529 108.799C61.5709 87.1747 71.5679 68.3183 83.9618 53.6969C96.3578 39.0729 111.116 28.7283 121.07 24.1302L120.651 23.2224ZM61.1155 126.749L61.0444 108.783L60.0444 108.787L60.1155 126.753L61.1155 126.749Z"
      fill="#AEA4FF"
    />
    <path
      d="M120.634 24.1304C130.588 28.7286 145.347 39.0732 157.743 53.6972C170.137 68.3185 180.134 87.175 180.652 108.799L181.651 108.775C181.126 86.8507 170.993 67.7822 158.506 53.0506C146.021 38.3215 131.147 27.885 121.054 23.2226L120.634 24.1304ZM180.652 108.792L180.866 126.767L181.866 126.755L181.651 108.78L180.652 108.792Z"
      fill="#AEA4FF"
    />
    <path d="M120.819 27.2769L121.025 138.512" stroke="#AEA4FF" />
    <path
      d="M120.851 24.1763C136.818 24.1763 157.476 28.2046 174.408 37.2737C191.337 46.3409 204.465 60.3979 205.584 80.4444L206.583 80.3887C205.436 59.8659 191.983 45.5528 174.88 36.3922C157.781 27.2334 136.955 23.1763 120.851 23.1763V24.1763ZM205.583 80.4223L205.881 98.4009L206.88 98.3844L206.583 80.4058L205.583 80.4223Z"
      fill="#AEA4FF"
    />
    <path
      d="M113.914 23.937L115.936 26.2316L120.82 27.1821L125.703 26.2316L127.726 23.937L125.703 21.6424L120.82 20.692L115.936 21.6424L113.914 23.937Z"
      fill="#6B59FF"
      stroke="#AEA4FF"
    />
    <path d="M60.7169 126.719C69.4481 119.7 99.9736 113.384 121.028 138.878" stroke="#AEA4FF" />
    <path
      d="M121.203 139.2C125.631 133.968 134.216 126.953 144.898 123.25C155.562 119.554 168.297 119.163 181.101 127.122L181.629 126.273C168.52 118.124 155.461 118.531 144.57 122.306C133.697 126.074 124.967 133.204 120.439 138.554L121.203 139.2Z"
      fill="#AEA4FF"
    />
    <path
      d="M181.865 126.851C182.882 121.283 185.52 113.082 189.674 106.845C191.75 103.728 194.184 101.134 196.951 99.5899C199.703 98.0548 202.799 97.5486 206.26 98.6207L206.556 97.6654C202.814 96.5065 199.436 97.0585 196.464 98.7166C193.508 100.366 190.967 103.1 188.842 106.291C184.592 112.672 181.915 121.011 180.882 126.671L181.865 126.851Z"
      fill="#AEA4FF"
    />
    <path
      d="M148.213 102.493L147.647 107.824L148.756 112.241L146.723 113.421L145.657 111.186L145.198 109.201L144.885 107.531L145.657 103.864L148.213 102.493Z"
      fill="#FEFEFF"
    />
    <path
      d="M197.968 139.691C202.574 130.13 193.685 122.107 190.034 121.379C188.142 114.977 184.753 112.895 183.238 112.616C180.275 100.297 170.816 98.922 169.906 104.479C164.649 95.1578 159.08 96.9505 158.871 101.997C154.069 96.7943 146.019 97.4193 148.456 108.004L188.048 135.421L194.005 141.984L197.968 139.691Z"
      fill="#FEFEFF"
    />
    <path d="M146.36 101.65L150.269 99.3984L149.26 101.642L146.36 101.65Z" fill="#FEFEFF" />
    <path d="M156.536 100.655L160.446 98.4038L159.437 100.648L156.536 100.655Z" fill="#FEFEFF" />
    <path d="M167.572 104.19L171.481 101.939L170.472 104.183L167.572 104.19Z" fill="#FEFEFF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M148.715 112.272L194.716 138.83C194.968 138.13 195.093 137.219 195.093 136.118C194.296 131.843 192.013 128.473 189.26 125.72C187.976 124.979 186.876 124.64 185.997 124.709C186.001 124.601 186.002 124.489 186.002 124.374C185.414 123.655 184.957 122.467 184.469 121.198C183.703 119.208 182.86 117.018 181.313 116.124C180.241 115.505 179.437 115.307 178.867 115.506C178.875 115.34 178.879 115.168 178.879 114.991C178.879 112.279 176.835 109.906 175.042 107.826C174.417 107.101 173.823 106.412 173.356 105.756C170.189 103.927 168.193 104.681 168.193 108.338C168.193 108.374 168.193 108.41 168.193 108.447L166.224 109.589C166.134 109.337 166.047 109.073 165.956 108.799C165.372 107.042 164.652 104.871 162.419 102.82C159.49 101.129 157.958 101.448 157.958 104.83C157.958 105.288 158.001 105.759 158.083 106.235L156.13 107.369C155.263 105.744 154.426 104.354 152.755 103.389C148.955 101.195 147.189 102.012 147.189 106.4C147.189 108.29 147.761 110.357 148.715 112.272Z"
      fill="#E2E2F0"
    />
    <path
      d="M194.51 138.728L194.371 139.773L193.386 140.342L146.733 113.407L148.703 112.269L194.51 138.728Z"
      fill="#FEFEFF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M146.115 114.337L194.002 141.985C195.064 141.107 195.702 139.566 195.702 137.484C195.702 132.716 192.355 126.918 188.225 124.534C187.482 124.105 186.765 123.816 186.088 123.657C185.599 120.487 183.396 117.034 180.751 115.507C180.248 115.217 179.761 115.015 179.299 114.895C178.749 110.881 175.959 106.458 172.6 104.519C169.385 102.662 166.691 103.685 165.984 106.74C164.871 104.34 163.072 102.159 161.042 100.987C157.735 99.0777 155.04 100.553 154.928 104.277C154.076 103.436 153.159 102.716 152.203 102.165C147.698 99.5638 144.046 101.672 144.046 106.874C144.046 109.281 144.828 111.929 146.115 114.337Z"
      fill="#E2E2F0"
    />
    <path
      d="M15.3343 54.8779L14.8818 59.1424L15.7689 62.6761L14.1425 63.6199L13.2899 61.8317L12.9226 60.2444L12.6724 58.908L13.2899 55.9746L15.3343 54.8779Z"
      fill="#FEFEFF"
    />
    <path
      d="M55.1391 84.6344C58.8233 76.9859 51.713 70.5679 48.7919 69.9857C47.2787 64.8643 44.5678 63.1989 43.3554 62.9758C40.9853 53.1207 33.4185 52.0211 32.6908 56.4663C28.4854 49.0099 24.0303 50.444 23.8627 54.4809C20.0218 50.3191 13.582 50.819 15.532 59.2861L47.2037 81.2184L51.9684 86.4688L55.1391 84.6344Z"
      fill="#FEFEFF"
    />
    <path d="M13.8534 54.2036L16.9808 52.4026L16.1735 54.1976L13.8534 54.2036Z" fill="#FEFEFF" />
    <path d="M21.99 53.4074L25.1174 51.6064L24.3101 53.4015L21.99 53.4074Z" fill="#FEFEFF" />
    <path d="M30.8207 56.2358L33.9481 54.4348L33.1408 56.2298L30.8207 56.2358Z" fill="#FEFEFF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.7329 62.7006L52.5359 83.9488C52.7385 83.388 52.8385 82.6585 52.8385 81.7759C52.2009 78.3561 50.3751 75.6609 48.1725 73.4583C47.143 72.8639 46.2606 72.593 45.5571 72.6498C45.5599 72.5633 45.5614 72.4738 45.5614 72.3814C45.0907 71.806 44.7251 70.8559 44.3346 69.841C43.7219 68.2487 43.0478 66.4968 41.8099 65.7821C40.9523 65.2869 40.3095 65.1284 39.8533 65.2877C39.8599 65.1547 39.8632 65.0175 39.8632 64.8762C39.8632 62.7065 38.2276 60.8087 36.7932 59.1443C36.2935 58.5646 35.8183 58.0131 35.4451 57.4884C32.9116 56.0257 31.3143 56.6288 31.3143 59.5542C31.3143 59.5827 31.3145 59.6112 31.3149 59.6398L29.7434 60.5514C29.6721 60.3508 29.6023 60.1405 29.5299 59.9224L29.5298 59.9222C29.0631 58.5164 28.4866 56.7802 26.7003 55.1397C24.3572 53.787 23.1317 54.042 23.1317 56.7475C23.1317 57.1124 23.1662 57.4879 23.2317 57.8679L21.6644 58.7781C20.9705 57.4781 20.3012 56.3663 18.9648 55.5948C15.9247 53.8395 14.5118 54.4929 14.5118 58.0033C14.5118 59.5156 14.9692 61.1685 15.7329 62.7006Z"
      fill="#E2E2F0"
    />
    <path
      d="M52.3682 83.8642L52.2572 84.7L51.4693 85.1549L14.1488 63.6079L15.7246 62.6981L52.3682 83.8642Z"
      fill="#FEFEFF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6572 64.3522L51.9658 86.4697C52.817 85.768 53.3281 84.5344 53.3281 82.8679C53.3281 79.0535 50.6502 74.4152 47.3468 72.5079C46.7496 72.1632 46.1729 71.9313 45.6287 71.8052C45.2375 69.2691 43.4749 66.508 41.3596 65.2867C40.9574 65.0545 40.5679 64.8927 40.1982 64.7972C39.7576 61.586 37.5261 58.0479 34.8396 56.4968C32.2686 55.0124 30.1143 55.8291 29.5476 58.2707C28.6574 56.3516 27.2187 54.6085 25.5955 53.6713C22.95 52.144 20.7948 53.3235 20.7046 56.3007C20.0234 55.6289 19.2903 55.0541 18.5264 54.6131C14.9227 52.5325 12.0013 54.2192 12.0013 58.3804C12.0013 60.3066 12.6273 62.4255 13.6572 64.3522Z"
      fill="#E2E2F0"
    />
  </Icon>
);
