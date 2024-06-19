import { Dispatch } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { PoolsFilterAction } from './PoolsList';
import { NETWORKS, NetworkIcon } from '@snx-v3/useBlockchain';

interface ChainFilterProps {
  activeChains: number[];
  dispatch: Dispatch<PoolsFilterAction>;
}

// TODO: Remove filter when mainnet and optimism are supported
const mainnets = NETWORKS.filter(({ isSupported, isTestnet }) => isSupported && !isTestnet).filter(
  ({ id }) => id !== 10 && id !== 1
);

export const ChainFilter = ({ activeChains, dispatch }: ChainFilterProps) => {
  const isAllActive = activeChains.length === 0;

  return (
    <Flex justifyContent="center">
      <Flex
        variant="unstyled"
        bg={isAllActive ? 'whiteAlpha.300' : 'transparent'}
        onClick={() => dispatch({ type: 'RESET_CHAIN' })}
        color="gray.50"
        as={Button}
        px="16px"
        py="6px"
        fontWeight={600}
        borderRadius="9999px"
        mr={1.5}
      >
        All
      </Flex>
      {mainnets.map((chain) => {
        const isActive = activeChains.includes(chain.id);

        const toggle = () => {
          if (isActive) {
            dispatch({ type: 'REMOVE_CHAIN', payload: { chain: chain.id } });
          } else {
            dispatch({ type: 'ADD_CHAIN', payload: { chain: chain.id } });
          }
        };

        return (
          <Flex
            key={chain.id}
            onClick={toggle}
            variant="unstyled"
            bg={isActive ? 'whiteAlpha.300' : 'transparent'}
            justifyContent="center"
            display="flex"
            mr={1.5}
            as={Button}
            px="16px"
            py="6px"
            fontWeight={600}
            borderRadius="9999px"
          >
            <NetworkIcon size="18px" networkId={chain.id} />
          </Flex>
        );
      })}
    </Flex>
  );
};
