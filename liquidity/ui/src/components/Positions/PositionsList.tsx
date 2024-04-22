import { Heading, Flex } from '@chakra-ui/react';
import { PositionsTable } from './PositionsTable';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { calculatePositions } from '../../utils/positions';
import { useParams } from '@snx-v3/useParams';
import { useApr } from '@snx-v3/useApr';

export const PositionsList = () => {
  const { accountId } = useParams();
  const { data: positionsByKey, isLoading } = useLiquidityPositions({
    accountId,
  });
  const { data: apr } = useApr();

  const positions = calculatePositions(positionsByKey);

  return (
    <Flex flexDir="column">
      <Heading fontSize="1.25rem" fontFamily="heading" lineHeight="1.75rem" mt={4}>
        Positions
      </Heading>
      <PositionsTable
        isLoading={isLoading}
        positions={positions}
        apr={apr?.combinedApr.toFixed(2)}
      />
    </Flex>
  );
};
