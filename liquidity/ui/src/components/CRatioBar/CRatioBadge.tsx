import { Badge } from '@chakra-ui/react';
import { FC } from 'react';
import { getHealthVariant } from './CRatioBar.utils';

const badgeColors = {
  success: {
    colorScheme: 'green',
    bg: 'green.900',
    label: 'HEALTHY',
  },
  error: {
    colorScheme: 'red',
    bg: 'red.900',
    label: 'Unhealthy',
  },
  warning: {
    colorScheme: 'orange',
    bg: 'orange.900',
    label: 'MANAGE',
  },
};

export const CRatioBadge: FC<{
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
}> = ({ liquidationCratioPercentage, targetCratioPercentage, currentCRatioPercentage }) => {
  const variant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage,
  });
  return (
    <Badge
      colorScheme={badgeColors[variant].colorScheme}
      border="1px solid"
      bg={badgeColors[variant].bg}
    >
      {badgeColors[variant].label}
    </Badge>
  );
};
