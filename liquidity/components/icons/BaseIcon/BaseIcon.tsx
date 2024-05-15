import { Icon, IconProps } from '@chakra-ui/react';

export const BaseIcon = ({
  width = '24px',
  height = '24px',
  fill = '#0052FF',
  ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="12" fill="white" />
      <g width="24" height="24" fill="white">
        <path
          d="M11.9791 24C18.618 24 24 18.6274 24 12C24 5.37257 18.618 0 11.9791 0C5.6804 0 0.513182 4.8359 0 10.9913H15.8889V13.0087H8.6297e-08C0.513182 19.1641 5.6804 24 11.9791 24Z"
          fill={fill as string}
        />
      </g>
    </Icon>
  );
};
