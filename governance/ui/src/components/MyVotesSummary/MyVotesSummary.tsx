import { Flex, Show, Spinner, Text } from '@chakra-ui/react';
import { Timer } from '../Timer';
import { useState } from 'react';
import MyVotesBox from '../MyVotesBox/MyVotesBox';
import { useNavigate } from 'react-router-dom';
import councils from '../../utils/councils';
import { useVoteContext } from '../../context/VoteContext';
import { useNetwork } from '../../queries';

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
  const [mouseOnDropdown, setMouseOnDropdown] = useState(false);
  const navigate = useNavigate();
  const { network } = useNetwork();
  const networkForState = network?.id.toString() || '2192';
  const { state } = useVoteContext();

  return (
    <Flex
      position="relative"
      key="tab-my-votes"
      cursor="pointer"
      data-cy="my-votes-button"
      onClick={() => navigate('/my-votes')}
      onMouseEnter={() => {
        if (councilPeriod === '2') setShowCart(true);
      }}
      onMouseLeave={() =>
        setTimeout(() => {
          if (!mouseOnDropdown) setShowCart(false);
        }, 1000)
      }
      rounded="base"
      w="100%"
      maxW="200px"
      borderColor="gray.900"
      borderWidth="1px"
      py={2}
      px={4}
      height="48px"
      alignItems="center"
      bg="navy.700"
      _hover={{ borderColor: 'cyan.500' }}
    >
      <Text fontSize="sm" fontWeight="bold" mr="auto" data-cy="my-votes-summary-text">
        My Votes
      </Text>
      <Show above="md">
        <Text fontSize="x-small" ml={8} fontWeight="bold">
          {councilPeriod === '2' && (
            <>
              {
                Object.values(state[networkForState] ? state[networkForState] : {}).filter(
                  (vote) => !!vote
                ).length
              }
              /{councils.length}
            </>
          )}
          {isLoading && <Spinner colorScheme="cyan" />}
          {schedule && (councilPeriod === '1' || councilPeriod === '0') && (
            <Timer expiryTimestamp={schedule.votingPeriodStartDate} />
          )}
        </Text>
        {showCart && (
          <MyVotesBox
            closeCart={() => setShowCart(false)}
            votes={state[networkForState]}
            isMouseOnDropdown={(val: boolean) => setMouseOnDropdown(val)}
            period={councilPeriod}
          />
        )}
      </Show>
    </Flex>
  );
};
