import { Badge } from '@chakra-ui/react';
import { FC } from 'react';
import Wei from '@synthetixio/wei';

export const CRatioBadge: FC<{
  issuanceRatioD18: Wei;
  cRatio: Wei;
}> = ({ cRatio, issuanceRatioD18 }) => {
  const parsedCRatio = issuanceRatioD18.gt(cRatio) ? 'MANAGE' : 'HEALTHY';

  return (
    <Badge
      colorScheme={parsedCRatio === 'MANAGE' ? 'red' : 'green'}
      border="1px solid"
      bg={parsedCRatio === 'MANAGE' ? 'red.900' : 'green.900'}
    >
      {parsedCRatio}
    </Badge>
  );
};
