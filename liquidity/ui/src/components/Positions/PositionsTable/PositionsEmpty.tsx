import { Flex, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const PositionsEmpty = () => {
  return (
    <Flex justifyContent="space-between" alignItems="baseline" w="100%">
      <Text color="gray.500" fontWeight={500} fontSize="14px" my="4" pl="3">
        You can open a new position by browsing the different Pools and choosing a vault for
        collateral type
      </Text>
      <Link to="/pools">
        <Button size="sm">Explore all Pools</Button>
      </Link>
    </Flex>
  );
};
