import { Flex, Show, Spinner, Text } from '@chakra-ui/react';
import { Timer } from '../Timer';
import { useEffect, useState } from 'react';
import MyVotesBox from '../MyVotesBox/MyVotesBox';
import { useNavigate } from 'react-router-dom';
import councils from '../../utils/councils';
import { useVoteContext, VoteStateForNetwork } from '../../context/VoteContext';
import { useGetCurrentPeriod, useGetEpochIndex, useNetwork } from '../../queries';
import { voteCardState } from '../../state/vote-card';
import { useRecoilState } from 'recoil';
import { getVoteSelectionState } from '../../utils/localstorage';

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
  const [voteCard, setVoteCard] = useRecoilState(voteCardState);
  const [action, setAction] = useState<'click' | 'longpress' | undefined>(undefined);
  const [showCart, setShowCart] = useState(false);
  const [mouseOnDropdown, setMouseOnDropdown] = useState(false);
  const navigate = useNavigate();
  const { network } = useNetwork();
  const { data: epochId } = useGetEpochIndex('spartan');
  const { state } = useVoteContext();
  const networkForState = getVoteSelectionState(state, epochId, network?.id.toString(), 'spartan');
  const stateFromCouncils = (
    typeof networkForState !== 'string' ? networkForState : { spartan: networkForState }
  ) as VoteStateForNetwork;
  const [timer, setTimer] = useState<any>();
  const [isLongpress, setIsLongpress] = useState(false);

  const startPressTimer = () => {
    setIsLongpress(false);
    setTimer(
      setTimeout(() => {
        setAction('longpress');
        setIsLongpress(true);
      }, 500)
    );
  };

  useEffect(() => {
    if (action === 'click') {
      setAction('click');
      navigate('/my-votes');
    } else if (action === 'longpress') {
      setAction(undefined);
      setShowCart(true);
    }
  }, [action, navigate]);

  useEffect(() => {
    const thisComponent = document.querySelector('#my-votes-summary');
    const listener = (event: any) => {
      if (event.target && !thisComponent?.contains(event.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  useEffect(() => {
    if (voteCard) {
      setTimeout(() => setVoteCard(false), 3000);
    }
  }, [voteCard, setVoteCard]);

  return (
    <Flex
      id="my-votes-summary"
      position="relative"
      cursor="pointer"
      data-cy="my-votes-button"
      onClick={() => {
        if (isLongpress) {
          return;
        }
        setAction('click');
      }}
      onMouseEnter={() => {
        if (councilPeriod === '2') setShowCart(true);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          if (!mouseOnDropdown) setShowCart(false);
        }, 1000);
      }}
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
      maxW={{ base: '220px', xl: '300px' }}
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
      <Text fontSize="sm" fontWeight="bold" mr="auto" data-cy="my-votes-summary-text">
        My Votes
      </Text>
      <Show above="md">
        <Text fontSize="small" ml={8} fontWeight="bold">
          {councilPeriod === '2' && (
            <>
              {Object.values(stateFromCouncils).filter((vote) => !!vote).length}/{councils.length}
            </>
          )}
          {isLoading && <Spinner colorScheme="cyan" />}
          {schedule && (councilPeriod === '1' || councilPeriod === '0') && (
            <Timer expiryTimestamp={schedule.votingPeriodStartDate} id="summary" />
          )}
        </Text>
        {voteCard || (showCart && councilPeriod === '2') ? (
          <MyVotesBox
            closeCart={() => setShowCart(false)}
            votes={stateFromCouncils}
            isMouseOnDropdown={(val: boolean) => setMouseOnDropdown(val)}
            period={councilPeriod}
          />
        ) : null}
      </Show>
    </Flex>
  );
};
