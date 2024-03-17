import { Flex, Text } from '@chakra-ui/react';

export const AssetsEmpty = () => {
  return (
    <Flex justifyContent="space-between" alignItems="baseline" w="100%">
      <Text color="gray.500" fontWeight={500} fontSize="14px" my="4" pl="3">
        Assets cannot be found.
      </Text>
    </Flex>
  );
};
