import { Heading, Flex } from '@chakra-ui/react';
import { PositionsTable } from './PositionsTable';
import { useLiquidityPositions } from '@snx-v3/useLiquidityPositions';
import { useSearchParams } from 'react-router-dom';

export const PositionsList = () => {
  const [params] = useSearchParams();

  const { data: positionsByKey, isLoading } = useLiquidityPositions({
    accountId: params.get('accountId') || '',
  });

  return (
    <Flex flexDir="column">
      <Heading fontSize="1.25rem" fontFamily="heading" lineHeight="1.75rem" mt={4}>
        Positions
      </Heading>
      <PositionsTable isLoading={isLoading} positionsByKey={positionsByKey} />
    </Flex>
  );
};
