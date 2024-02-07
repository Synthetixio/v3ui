import { Flex, Show, Spinner, Text } from '@chakra-ui/react';

import Timer from '../Timer/Timer';
import { useState } from 'react';
import MyVotesBox from '../MyVotesBox/MyVotesBox';
import { useNavigate } from 'react-router-dom';
import { useGetUserSelectedVotes } from '../../hooks/useGetUserSelectedVotes';

interface MyVotesSummary {
  isLoading: boolean;
  councilPeriod?: string;
  schedule?: {
    startDate: number;
    nominationPeriodStartDate: number;
    votingPeriodStartDate: number;
    endDate: number;
  };
}

export const MyVotesSummary = ({ isLoading, councilPeriod, schedule }: MyVotesSummary) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const votes = useGetUserSelectedVotes();

  return (
    <Flex
      position="relative"
      key="tab-my-votes"
      cursor="pointer"
      onClick={() => navigate('/my-votes')}
      onMouseEnter={() => setShowCart(true)}
      rounded="base"
      w="100%"
      borderColor="gray.900"
      borderWidth="1px"
      py={2}
      px={4}
      height="48px"
      alignItems="center"
      bg="navy.700"
      _hover={{ borderColor: 'cyan.500' }}
    >
      <Text fontSize="x-small" fontWeight="bold" mr="auto">
        My Votes
      </Text>
      <Show above="md">
        <Text fontSize="x-small" ml={8} fontWeight="bold">
          {councilPeriod === '2' && (
            <>{Object.values(!!votes ? votes : {}).filter((vote) => !!vote).length}/4</>
          )}
          {isLoading && <Spinner colorScheme="cyan" />}
          {schedule && (councilPeriod === '1' || councilPeriod === '0') && (
            <>
              <Timer expiryTimestamp={schedule.votingPeriodStartDate * 1000} />
            </>
          )}
        </Text>
        {showCart && <MyVotesBox closeCart={() => setShowCart(false)} votes={votes} />}
      </Show>
    </Flex>
  );
};
