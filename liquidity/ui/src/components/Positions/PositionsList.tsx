import { useState, useEffect } from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { PositionsTable } from './PositionsTable';

export const PositionsList = () => {
  const [isLoading, setIsLoading] = useState(true); // TEMP

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <Flex flexDir="column">
      <Heading fontSize="1.25rem" fontFamily="heading" lineHeight="1.75rem" mt={4}>
        Positions
      </Heading>
      <PositionsTable isLoading={isLoading} />
    </Flex>
  );
};
