import { Flex, Text } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';

const supportedCollateralTypes = ['ETH', 'SNX', 'USDC', 'DAI', 'ARB'];

interface TokenFilterProps {
  activeTokens: string[];
  addActiveToken: (tokens: string) => void;
  reset: () => void;
}

export const TokenFilter = ({ activeTokens, addActiveToken, reset }: TokenFilterProps) => {
  return (
    <Flex>
      <Text>Token Filter</Text>
      {supportedCollateralTypes.map((collateral) => (
        <Flex key={collateral}>
          <TokenIcon symbol={collateral} />
        </Flex>
      ))}
    </Flex>
  );
};
