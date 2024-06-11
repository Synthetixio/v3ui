import { Flex, Heading, Skeleton } from '@chakra-ui/react';

export const PoolHeader = ({ name }: { name?: string }) => {
  return (
    <Flex gap={2} alignItems="flex-end">
      <Skeleton isLoaded={!!name}>
        <Heading fontWeight={700} fontSize="3xl">
          {name ? name : 'Unknown Pool'}
        </Heading>
      </Skeleton>
    </Flex>
  );
};
