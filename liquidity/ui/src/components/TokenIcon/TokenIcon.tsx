import { Image, ImageProps } from '@chakra-ui/react';

interface TokenIconProps extends ImageProps {
  symbol?: string;
  width?: number;
  height?: number;
}

export const TokenIcon = ({ symbol, width = 30, height = 30, ...props }: TokenIconProps) => {
  return symbol ? (
    <Image
      src={`https://synthetixio.github.io/synthetix-assets/collateral/${`${symbol}`.toUpperCase()}.svg`}
      fallbackSrc="https://synthetixio.github.io/synthetix-assets/collateral/UNKNOWN.svg"
      alt={symbol}
      style={{ width, height }}
      {...props}
    />
  ) : (
    <Image
      src="https://synthetixio.github.io/synthetix-assets/collateral/UNKNOWN.svg"
      fallbackSrc="https://synthetixio.github.io/synthetix-assets/collateral/UNKNOWN.svg"
      alt={symbol}
      style={{ width, height }}
      {...props}
    />
  );
};
