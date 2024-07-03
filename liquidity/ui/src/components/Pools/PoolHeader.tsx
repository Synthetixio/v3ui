import { Flex, Heading, Skeleton, FlexProps } from '@chakra-ui/react';

interface PoolHeaderProps extends FlexProps {
  name?: string;
}

export const PoolHeader = ({ name, ...props }: PoolHeaderProps) => {
  return (
    <Flex gap={2} alignItems="flex-end" {...props}>
      <Skeleton isLoaded={!!name}>
        <Heading fontWeight={700} fontSize="3xl">
          {name ? name : 'Unknown Pool'}
        </Heading>
      </Skeleton>
    </Flex>
  );
};
