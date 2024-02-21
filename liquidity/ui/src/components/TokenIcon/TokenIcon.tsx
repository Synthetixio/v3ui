import { Image, ImageProps } from '@chakra-ui/react';

type TokenSymbol = 'SNX' | 'sUSD' | 'ETH' | 'USDC';

interface TokenIconProps extends ImageProps {
  symbol: TokenSymbol;
  width?: number;
  height?: number;
}

export const TokenIcon = ({ symbol, width = 30, height = 30, ...props }: TokenIconProps) => {
  return (
    <Image
      src={`https://synthetixio.github.io/synthetix-assets/collateral/${symbol.toUpperCase()}.svg`}
      alt={symbol}
      style={{ width, height }}
      {...props}
    />
  );
};
