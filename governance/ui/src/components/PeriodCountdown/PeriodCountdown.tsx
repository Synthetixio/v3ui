import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import Timer from '../Timer/Timer';

export default function PeriodCountdown() {
  const { data: spartanCouncilPeriod } = useGetCurrentPeriod('spartan');
  const { data: ambassadorCouncilPeriod } = useGetCurrentPeriod('ambassador');
  const { data: grantsCouncilPeriod } = useGetCurrentPeriod('grants');
  const { data: treasuryCouncilPeriod } = useGetCurrentPeriod('treasury');

  const atLeastOneIsInNomination =
    spartanCouncilPeriod === '1' ||
    ambassadorCouncilPeriod === '1' ||
    grantsCouncilPeriod === '1' ||
    treasuryCouncilPeriod === '1';

  const atLeastOneIsInVoting =
    spartanCouncilPeriod === '2' ||
    ambassadorCouncilPeriod === '2' ||
    grantsCouncilPeriod === '2' ||
    treasuryCouncilPeriod === '2';

  const { data: schedule, isLoading } = useGetEpochSchedule(
    spartanCouncilPeriod === '1'
      ? 'spartan'
      : ambassadorCouncilPeriod === '1'
        ? 'ambassador'
        : grantsCouncilPeriod === '1'
          ? 'grants'
          : 'treasury'
  );

  return atLeastOneIsInNomination || atLeastOneIsInVoting ? (
    <Flex
      bg={atLeastOneIsInNomination ? 'orange.700' : 'teal.700'}
      rounded="base"
      px={{ base: 1, lg: 2 }}
      py="1"
      w={{ base: '121px', md: '230px' }}
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
      maxW="210px"
      maxH="40px"
    >
      <Text fontSize={{ base: 'xs', lg: 'sm' }} mr="2">
        Voting {atLeastOneIsInNomination ? 'starts' : 'ends'}:
      </Text>
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : (
        (schedule?.votingPeriodStartDate || schedule?.votingPeriodStartDate) && (
          <Timer
            expiryTimestamp={
              atLeastOneIsInNomination
                ? schedule.votingPeriodStartDate * 1000
                : schedule.endDate * 1000
            }
          />
        )
      )}
    </Flex>
  ) : null;
}
