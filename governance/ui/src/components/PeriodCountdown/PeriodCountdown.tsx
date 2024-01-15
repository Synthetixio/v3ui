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

  const lowestPeriod =
    spartanCouncilPeriod === '0' ||
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

  const { data: schedule, isLoading } = useGetEpochSchedule(
    spartanCouncilPeriod && ambassadorCouncilPeriod && grantsCouncilPeriod && treasuryCouncilPeriod
      ? ([
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

  return lowestPeriod !== 'eval' ? (
    <Box
      bg={
        lowestPeriod === 'nomination'
          ? 'orange.700'
          : lowestPeriod === 'voting'
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
        {lowestPeriod === 'admin'
          ? 'Next Elections:'
          : lowestPeriod === 'nomination'
            ? 'Voting starts'
            : 'Voting ends'}
      </Text>
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : lowestPeriod === 'admin' && schedule ? (
        <Timer expiryTimestamp={schedule.nominationPeriodStartDate * 1000} />
      ) : (
        (schedule?.votingPeriodStartDate || schedule?.votingPeriodStartDate) && (
          <Timer
            expiryTimestamp={
              lowestPeriod === 'nomination'
                ? schedule.votingPeriodStartDate * 1000
                : schedule.endDate * 1000
            }
          />
        )
      )}
    </Box>
  ) : null;
}
