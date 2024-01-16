import { Box, Spinner, Text } from '@chakra-ui/react';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import Timer from '../Timer/Timer';
import { CouncilSlugs } from '../../utils/councils';

export default function PeriodCountdown() {
  const { data: spartanCouncilPeriod } = useGetCurrentPeriod('spartan');
  const { data: ambassadorCouncilPeriod } = useGetCurrentPeriod('ambassador');
  const { data: grantsCouncilPeriod } = useGetCurrentPeriod('grants');
  const { data: treasuryCouncilPeriod } = useGetCurrentPeriod('treasury');

  // @dev we want to show the timer depending on the following hierarchy
  // Admin => Nomination => Voting => Eval
  const lowestPeriodCouncilEpoch = getLowestPeriodCouncilEpoch(
    spartanCouncilPeriod,
    ambassadorCouncilPeriod,
    grantsCouncilPeriod,
    treasuryCouncilPeriod
  );

  const { data: schedule, isLoading } = useGetEpochSchedule(
    spartanCouncilPeriod && ambassadorCouncilPeriod && grantsCouncilPeriod && treasuryCouncilPeriod
      ? // @dev fetch the correct EpochSchedule depending on the hierarchy explained above
        ([
          [spartanCouncilPeriod, 'spartan'],
          [ambassadorCouncilPeriod, 'ambassador'],
          [grantsCouncilPeriod, 'grants'],
          [treasuryCouncilPeriod, 'treasury'],
        ].sort((a, b) => {
          if (Number(a[0]) > Number(b[0])) return 1;
          if (Number(a[0]) < Number(b[0])) return -1;
          return 0;
        })[0][1] as CouncilSlugs)
      : undefined
  );

  if (!lowestPeriodCouncilEpoch) return;

  return lowestPeriodCouncilEpoch !== 'eval' ? (
    <Box
      bg={
        lowestPeriodCouncilEpoch === 'nomination'
          ? 'orange.700'
          : lowestPeriodCouncilEpoch === 'voting'
            ? 'teal.700'
            : 'gray.700'
      }
      rounded="base"
      px={{ base: 1, lg: 2 }}
      py="1"
      w={{ base: '121px', md: '230px' }}
      alignItems="center"
      maxH="50px"
      maxW="fit-content"
    >
      <Text fontSize="12px">
        {lowestPeriodCouncilEpoch === 'admin'
          ? 'Next Elections:'
          : lowestPeriodCouncilEpoch === 'nomination'
            ? 'Voting starts'
            : 'Voting ends'}
      </Text>
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : lowestPeriodCouncilEpoch === 'admin' && schedule ? (
        <Timer expiryTimestamp={schedule.nominationPeriodStartDate * 1000} />
      ) : (
        (schedule?.votingPeriodStartDate || schedule?.votingPeriodStartDate) && (
          <Timer
            expiryTimestamp={
              lowestPeriodCouncilEpoch === 'nomination'
                ? schedule.votingPeriodStartDate * 1000
                : schedule.endDate * 1000
            }
          />
        )
      )}
    </Box>
  ) : null;
}

function getLowestPeriodCouncilEpoch(
  spartanCouncilPeriod?: string,
  ambassadorCouncilPeriod?: string,
  grantsCouncilPeriod?: string,
  treasuryCouncilPeriod?: string
) {
  if (
    !spartanCouncilPeriod ||
    !ambassadorCouncilPeriod ||
    !grantsCouncilPeriod ||
    !treasuryCouncilPeriod
  )
    return undefined;
  return spartanCouncilPeriod === '0' ||
    ambassadorCouncilPeriod === '0' ||
    grantsCouncilPeriod === '0' ||
    treasuryCouncilPeriod === '0'
    ? 'admin'
    : spartanCouncilPeriod === '1' ||
        ambassadorCouncilPeriod === '1' ||
        grantsCouncilPeriod === '1' ||
        treasuryCouncilPeriod === '1'
      ? 'nomination'
      : spartanCouncilPeriod === '2' ||
          ambassadorCouncilPeriod === '2' ||
          grantsCouncilPeriod === '2' ||
          treasuryCouncilPeriod === '2'
        ? 'voting'
        : 'eval';
}
