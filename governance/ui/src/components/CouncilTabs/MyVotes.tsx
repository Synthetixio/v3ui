import { Flex, Show, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer/Timer';

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
  const navigate = useNavigate();
  return (
    <Flex
      key="tab-my-votes"
      cursor="pointer"
      onClick={() => navigate('/my-votes')}
      maxW="260px"
      rounded="base"
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
      </Show>
    </Flex>
  );
};
