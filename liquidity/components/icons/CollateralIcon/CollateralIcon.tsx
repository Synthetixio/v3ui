import { EthereumIcon } from '../EthereumIcon';
import { OptimismIcon } from '../OptimismIcon';
import { SNXIcon } from '../SNXIcon';
import { DollarCircle } from '../DollarCircle';
import { Icon, IconProps } from '@chakra-ui/react';
import { BitcoinIcon } from '../BitcoinIcon';
import { SUSDCIcon } from '../SUSDCIcon';

interface CollateralIconProps extends IconProps {
  symbol?: string;
  fill?: string;
  color?: string;
}
export const CollateralIcon = ({
  symbol,
  fill = '#00D1FF',
  color = '#FFFFFF',
  ...props
}: CollateralIconProps) => {
  switch (symbol) {
    case 'WETH':
    case 'ETH':
      return <EthereumIcon {...props} />;
    case 'SNX':
    case 'fSNX':
      return <SNXIcon fill={fill} color={color} {...props} />;
    case 'OP':
      return <OptimismIcon {...props} />;
    case 'sUSD':
    case 'snxUSD':
      return <DollarCircle {...props} />;
    case 'WBTC':
      return <BitcoinIcon {...props} />;
    case 'sUSDC':
      return <SUSDCIcon {...props} />;
    default:
      return <UnknownIcon {...props} />;
  }
};

export const UnknownIcon = ({ width = '32px', height = '32px', ...props }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="15" fill="white" stroke="white" />
      <path
        d="M14.1156 19.2899V19.0472C14.1205 18.2147 14.1955 17.551 14.3408 17.0563C14.4908 16.5615 14.7087 16.1619 14.9944 15.8574C15.28 15.5529 15.6238 15.277 16.0257 15.0296C16.3258 14.8393 16.5946 14.6419 16.8318 14.4373C17.069 14.2328 17.2579 14.0068 17.3983 13.7594C17.5387 13.5073 17.6089 13.2266 17.6089 12.9174C17.6089 12.5891 17.529 12.3013 17.3692 12.0539C17.2095 11.8065 16.994 11.6162 16.7229 11.483C16.4566 11.3498 16.1612 11.2832 15.8368 11.2832C15.5221 11.2832 15.2244 11.3522 14.9435 11.4901C14.6627 11.6233 14.4327 11.8232 14.2536 12.0896C14.0745 12.3512 13.9776 12.6771 13.9631 13.0672H11C11.0242 12.1157 11.2566 11.3308 11.6972 10.7123C12.1378 10.0891 12.7212 9.62525 13.4475 9.32078C14.1737 9.01155 14.975 8.85693 15.8514 8.85693C16.8149 8.85693 17.667 9.01393 18.4078 9.32791C19.1485 9.63714 19.7295 10.0867 20.1508 10.6766C20.572 11.2665 20.7826 11.9778 20.7826 12.8103C20.7826 13.3669 20.6882 13.8617 20.4994 14.2946C20.3154 14.7228 20.0564 15.1034 19.7223 15.4364C19.3882 15.7646 18.9936 16.062 18.5385 16.3284C18.156 16.552 17.8413 16.7851 17.5944 17.0277C17.3523 17.2703 17.1707 17.551 17.0497 17.8698C16.9335 18.1885 16.873 18.581 16.8681 19.0472V19.2899H14.1156ZM15.5536 23.8569C15.0694 23.8569 14.6555 23.6904 14.3117 23.3574C13.9728 23.0196 13.8058 22.6153 13.8106 22.1443C13.8058 21.6781 13.9728 21.2784 14.3117 20.9454C14.6555 20.6124 15.0694 20.4459 15.5536 20.4459C16.0136 20.4459 16.4178 20.6124 16.7664 20.9454C17.115 21.2784 17.2918 21.6781 17.2966 22.1443C17.2918 22.4583 17.207 22.7461 17.0424 23.0077C16.8826 23.2646 16.672 23.4716 16.4106 23.6286C16.1491 23.7808 15.8635 23.8569 15.5536 23.8569Z"
        fill="#06061B"
      />
    </Icon>
  );
};
