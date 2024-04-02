import { Heading, Flex } from '@chakra-ui/react';
import { PositionsTable } from './PositionsTable';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { calculatePositions } from '../../utils';
import { useParams } from '@snx-v3/useParams';

export const PositionsList = () => {
  const { accountId } = useParams();
  const { data: positionsByKey, isLoading } = useLiquidityPositions({
    accountId,
  });

  const positions = calculatePositions(positionsByKey);

  return (
    <Flex flexDir="column">
      <Heading fontSize="1.25rem" fontFamily="heading" lineHeight="1.75rem" mt={4}>
        Positions
      </Heading>
      <PositionsTable isLoading={isLoading} positions={positions} />
    </Flex>
  );
};
