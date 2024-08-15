import { Flex, Show, Spinner, Text } from '@chakra-ui/react';
import { Timer } from '../Timer';
import { useEffect, useRef, useState } from 'react';
import MyVotesBox from '../MyVotesBox/MyVotesBox';
import { useNavigate } from 'react-router-dom';
import councils from '../../utils/councils';
import { useVoteContext } from '../../context/VoteContext';
import { useNetwork } from '../../queries';

interface MyVotesSummary {
  isLoading: boolean;
  councilPeriod?: string;
  isInMyVotesPage: boolean;
  schedule?: {
    startDate: number;
    nominationPeriodStartDate: number;
    votingPeriodStartDate: number;
    endDate: number;
  };
}

export const MyVotesSummary = ({
  isLoading,
  councilPeriod,
  schedule,
  isInMyVotesPage,
}: MyVotesSummary) => {
  const [action, setAction] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [mouseOnDropdown, setMouseOnDropdown] = useState(false);
  const navigate = useNavigate();
  const { network } = useNetwork();
  const networkForState = network?.id.toString() || '2192';
  const { state } = useVoteContext();
  const [timer, setTimer] = useState<any>();
  const isLongPress = useRef(false);

  const startPressTimer = () => {
    isLongPress.current = false;
    setTimer(
      setTimeout(() => {
        setAction('longpress');
        isLongPress.current = true;
      }, 500)
    );
  };

  useEffect(() => {
    if (action === 'click') {
      navigate('/my-votes');
    } else if (action === 'longpress') {
      setShowCart(true);
    }
  }, [action, navigate]);

  return (
    <Flex
      position="relative"
      cursor="pointer"
      data-cy="my-votes-button"
      onClick={() => {
        if (isLongPress.current) {
          return;
        }
        setAction('click');
      }}
      onMouseEnter={() => {
        if (councilPeriod === '2') setShowCart(true);
      }}
      onMouseLeave={() =>
        setTimeout(() => {
          if (!mouseOnDropdown) setShowCart(false);
        }, 1000)
      }
      onMouseDown={() => {
        startPressTimer();
      }}
      onMouseUp={() => {
        clearTimeout(timer);
      }}
      onTouchStart={() => {
        startPressTimer();
      }}
      onTouchEnd={() => {
        clearTimeout(timer);
      }}
      rounded="base"
      w="100%"
      maxW="200px"
      borderColor={isInMyVotesPage ? 'cyan.500' : 'gray.900'}
      borderWidth="1px"
      py={2}
      px={4}
      height="48px"
      alignItems="center"
      bg="navy.700"
      _hover={{
        bg: 'linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), #0B0B22;',
      }}
    >
      <Text fontSize="xs" fontWeight="bold" mr="auto" data-cy="my-votes-summary-text">
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
