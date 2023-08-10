import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props extends BadgeProps {
  children?: ReactNode;
  color?: 'green' | 'cyan' | 'gray' | 'red';
}

export const Badge: FC<Props> = ({ children, color = 'cyan', ...props }) => {
  return (
    <ChakraBadge
      sx={{
        borderColor: color + '.500',
        bg: color + '.900',
        color: color + '.500',
        borderWidth: 2,
      }}
      {...props}
    >
      {children}
    </ChakraBadge>
  );
};
