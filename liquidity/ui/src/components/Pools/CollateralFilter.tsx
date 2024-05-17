import { Dispatch } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';
import { PoolsFilterAction } from './PoolsList';

const supportedCollateralTypes = ['ETH', 'SNX', 'USDC', 'DAI', 'ARB'];

interface CollateralFilterProps {
  activeCollateral: string[];
  dispatch: Dispatch<PoolsFilterAction>;
}

export const CollateralFilter = ({ activeCollateral, dispatch }: CollateralFilterProps) => {
  const isAllActive = activeCollateral.length === 0;

  return (
    <Flex justifyContent="center">
      <Flex
        variant="unstyled"
        bg={isAllActive ? 'whiteAlpha.300' : 'transparent'}
        onClick={() => dispatch({ type: 'RESET_COLLATERAL' })}
        color="gray.50"
        as={Button}
        px="16px"
        py="6px"
        fontWeight={600}
        borderRadius="9999px"
        w="62px"
      >
        All
      </Flex>
      {supportedCollateralTypes.map((collateral) => {
        const isActive = activeCollateral.includes(collateral);

        const toggle = () => {
          if (isActive) {
            dispatch({ type: 'REMOVE_COLLATERAL', payload: { collateral } });
          } else {
            dispatch({ type: 'ADD_COLLATERAL', payload: { collateral } });
          }
        };

        return (
          <Flex
            key={collateral}
            onClick={toggle}
            variant="unstyled"
            bg={isActive ? 'whiteAlpha.300' : 'transparent'}
            justifyContent="center"
            display="flex"
            mr={1}
            as={Button}
            px="16px"
            py="6px"
            fontWeight={600}
            borderRadius="9999px"
          >
            <TokenIcon symbol={collateral} />
          </Flex>
        );
      })}
    </Flex>
  );
};
