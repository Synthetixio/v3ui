import { Flex, Heading } from '@chakra-ui/react';
import { useParams } from '@snx-v3/useParams';
import { usePool } from '@snx-v3/usePools';

// TODO: Delete when new pool page merged

export const PoolHeader = () => {
  const params = useParams();
  const { data: pool } = usePool(params.poolId);

  return (
    <Flex gap={2} alignItems="flex-end">
      <Heading fontWeight={700} fontSize="3xl">
        {pool ? pool.name : 'Unknown Pool'}
      </Heading>
    </Flex>
  );
};
