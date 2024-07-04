import { Flex, Heading, Skeleton, FlexProps, Tag, Text } from '@chakra-ui/react';
import { MAINNET, ARBITRUM, Network, NetworkIcon } from '@snx-v3/useBlockchain';

interface PoolHeaderProps extends FlexProps {
  name?: string;
  network: Network;
}

export const PoolHeader = ({ name, network, ...props }: PoolHeaderProps) => {
  return (
    <>
      <Flex gap={2} alignItems="center" {...props}>
        <Skeleton isLoaded={!!name}>
          <Heading fontWeight={700} fontSize="3xl">
            {name ? name : 'Unknown Pool'}
          </Heading>
        </Skeleton>
        {[MAINNET.id, ARBITRUM.id].includes(network?.id) && (
          <Tag
            ml={2}
            mt="2px"
            size="sm"
            bg="purple.500"
            mr="auto"
            color="white"
            height="fit-content"
          >
            Borrow Interest-Free
          </Tag>
        )}
      </Flex>
      <Flex mt={2}>
        <NetworkIcon w="14px" h="14px" networkId={network?.id} />
        <Text ml={1} fontSize="xs" color="gray.500" fontFamily="heading" lineHeight="16px">
          {network?.name.charAt(0).toUpperCase() + network?.name.slice(1)} Network
        </Text>
      </Flex>
    </>
  );
};
