import { Image, ImageProps } from '@chakra-ui/react';

interface TokenIconProps extends ImageProps {
  symbol: string;
  width?: number;
  height?: number;
}

export const TokenIcon = ({ symbol, width = 30, height = 30, ...props }: TokenIconProps) => {
  const parseSymbol = () => {
    switch (symbol) {
      case 'sUSDC':
        return 'sUSD';
      case 'snxUSD':
        return 'sUSD';
      default:
        return symbol;
    }
  };
  return (
    <Image
      src={`https://synthetixio.github.io/synthetix-assets/collateral/${parseSymbol().toUpperCase()}.svg`}
      alt={symbol}
      style={{ width, height }}
      {...props}
    />
  );
};
