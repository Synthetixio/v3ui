import { ComponentMultiStyleConfig } from '@chakra-ui/react';

export const Progress: ComponentMultiStyleConfig = {
  parts: ['filledTrack', 'track'],
  baseStyle: {
    track: {
      overflow: 'unset',
      bg: 'whiteAlpha.100',
    },
  },
  variants: {
    error: (props) => ({
      filledTrack: {
        bg: 'error',
        boxShadow: `0px 0px 15px ${props.theme.colors.error}`,
      },
    }),
    warning: (props) => ({
      filledTrack: {
        bg: 'warning',
        boxShadow: `0px 0px 15px ${props.theme.colors.warning}`,
      },
    }),
    success: (props) => ({
      filledTrack: {
        bg: 'success',
        boxShadow: `0px 0px 15px ${props.theme.colors.success}`,
      },
    }),
    'update-error': () => ({
      filledTrack: {
        bg: 'red.700',
      },
    }),
    'update-warning': () => ({
      filledTrack: {
        bg: 'orange.700',
      },
    }),
    'update-success': () => ({
      filledTrack: {
        bg: 'green.700',
      },
    }),
    white: {
      filledTrack: {
        bg: 'white',
        borderRadius: 'full',
      },
    },
  },
};
