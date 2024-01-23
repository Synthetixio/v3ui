import { Flex, Show, Spinner, Text } from '@chakra-ui/react';

import Timer from '../Timer/Timer';
import { useState } from 'react';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { useNavigate } from 'react-router-dom';

interface MyVotesInterface {
  isLoading: boolean;
  councilPeriod?: string;
  votes?: Record<string, string>;
  schedule?: {
    startDate: number;
    nominationPeriodStartDate: number;
    votingPeriodStartDate: number;
    endDate: number;
  };
}

export const MyVotes = ({ isLoading, councilPeriod, votes, schedule }: MyVotesInterface) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  return (
    <Flex
      position="relative"
      key="tab-my-votes"
      cursor="pointer"
      onClick={() => {
        if (councilPeriod === '2' && showCart) {
          navigate('/my-votes');
        } else {
          setShowCart(true);
        }
      }}
      rounded="base"
      w="100%"
      borderColor="gray.900"
      borderWidth="1px"
      py={2}
      px={4}
      height="48px"
      alignItems="center"
      bg="navy.900"
      _hover={{ borderColor: 'cyan.500' }}
    >
      <Text fontSize="x-small" fontWeight="bold" mr="auto">
        My Votes
      </Text>
      <Show above="md">
        <Text fontSize="x-small" ml={8} fontWeight="bold">
          {councilPeriod === '2' && <>{Object.values(!!votes ? votes : {}).length}/4</>}
          {isLoading && <Spinner colorScheme="cyan" />}
          {schedule && (councilPeriod === '1' || councilPeriod === '0') && (
            <Timer expiryTimestamp={schedule.votingPeriodStartDate * 1000} />
          )}
        </Text>
        {showCart && <ShoppingCart closeCart={() => setShowCart(false)} votes={votes} />}
      </Show>
    </Flex>
  );
};
