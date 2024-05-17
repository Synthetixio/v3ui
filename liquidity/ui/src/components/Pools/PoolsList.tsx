import { useReducer } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { ChainFilter, TokenFilter } from '.';

export const PoolsList = () => {
  const [state, dispatch] = useReducer(poolsReducer, { collateral: [], chain: [] });

  return (
    <Flex mt={6}>
      <Heading fontWeight={700} fontSize={24}>
        Pools
      </Heading>
      <Flex>
        <ChainFilter />
        <TokenFilter activeTokens={state.collateral} />
      </Flex>
    </Flex>
  );
};

interface PoolsFilterState {
  collateral: string[];
  chain: string[];
}

interface PoolsFilterAction {
  type: 'ADD_COLLATERAL' | 'REMOVE_COLLATERAL' | 'ADD_CHAIN' | 'REMOVE_CHAIN' | 'RESET';
  payload: {
    collateral: string;
    chain: string;
  };
}

function poolsReducer(state: PoolsFilterState, action: PoolsFilterAction): PoolsFilterState {
  switch (action.type) {
    case 'ADD_COLLATERAL':
      return {
        ...state,
        collateral: [...state.collateral, action.payload.collateral],
      };

    case 'REMOVE_COLLATERAL':
      return {
        ...state,
        collateral: state.collateral.filter((item) => item !== action.payload.collateral),
      };

    case 'ADD_CHAIN':
      return {
        ...state,
        chain: [...state.chain, action.payload.chain],
      };

    case 'REMOVE_CHAIN':
      return {
        ...state,
        chain: state.chain.filter((item) => item !== action.payload.chain),
      };

    case 'RESET':
      return {
        collateral: [],
        chain: [],
      };

    default:
      return state;
  }
}
