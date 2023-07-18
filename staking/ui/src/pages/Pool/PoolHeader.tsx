import { Flex, Heading } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { PoolType, usePool } from '@snx-v3/usePools';

export const PoolHeaderUi = ({ pool }: { pool?: PoolType }) => {
  return (
    <Flex gap={2} alignItems="flex-end">
      <Heading fontWeight={700} fontSize="3xl">
        {pool ? pool.name : ''}
      </Heading>
    </Flex>
  );
};

export const PoolHeader = () => {
  const params = useParams();
  const pool = usePool(params.poolId);
  return <PoolHeaderUi pool={pool} />;
};
