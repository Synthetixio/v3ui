import { Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { useGetNextElectionSettings } from '../../queries/useGetNextElectionSettings';
import { useWallet } from '@snx-v3/useBlockchain';
import { useGetCouncilNominees } from '../../queries/useGetCouncilNominees';
import UserListItem from '../UserListItem/UserListItem';

export default function CouncilNominees({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const wallet = useWallet();
  const { data: councilNominees } = useGetCouncilNominees(activeCouncil);
  const { data: councilSchedule } = useGetEpochSchedule(activeCouncil);
  const { data: nextEpochDuration } = useGetNextElectionSettings(activeCouncil);

  const startDay =
    councilSchedule?.endDate && new Date(councilSchedule?.endDate * 1000).getUTCDate();
  const startMonth =
    councilSchedule?.endDate &&
    new Date(councilSchedule.endDate * 1000).toLocaleString('default', { month: 'short' });
  const startYear =
    councilSchedule?.endDate && new Date(councilSchedule.endDate * 1000).getUTCFullYear();

  const endDay =
    councilSchedule?.endDate &&
    nextEpochDuration &&
    new Date(councilSchedule.endDate * 1000 + nextEpochDuration * 1000).getUTCDate();
  const endMonth =
    councilSchedule?.endDate &&
    nextEpochDuration &&
    new Date(councilSchedule.endDate * 1000 + nextEpochDuration * 1000).toLocaleString('default', {
      month: 'short',
    });
  const endYear =
    councilSchedule?.endDate &&
    nextEpochDuration &&
    new Date(councilSchedule.endDate * 1000 + nextEpochDuration * 1000).getUTCFullYear();

  const startQuarter =
    councilSchedule?.endDate &&
    Math.floor(new Date(councilSchedule.endDate * 1000).getMonth() / 3 + 1);

  const endQuarter =
    councilSchedule?.endDate &&
    nextEpochDuration &&
    Math.floor(
      new Date(councilSchedule.endDate * 1000 + nextEpochDuration * 1000).getMonth() / 3 + 1
    );

  const quarter =
    startYear === endYear && startQuarter === endQuarter
      ? `Q${startQuarter} ${startYear}`
      : startYear === endYear
        ? `Q${startQuarter} - ${endQuarter} ${endYear}`
        : `Q${startQuarter} ${startYear} - Q${endQuarter} ${endYear}`;

  return (
    <Flex
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      borderColor="gray.900"
      bg="navy.700"
      flexDirection="column"
    >
      <Flex p="6" justifyContent="space-between">
        <Flex flexDir="column" alignItems="center">
          <Heading fontSize="lg" w="100%">
            Nominees for {quarter}
          </Heading>

          <Text fontSize="xs" w="100%">
            {startDay} {startMonth} {startYear} - {endDay} {endMonth} {endYear}
          </Text>
        </Flex>
        <Flex>
          <PeriodCountdown />
        </Flex>
      </Flex>
      <Divider />
      {wallet?.address && (
        <UserListItem address={wallet.address} activeCouncil={activeCouncil} isOwn />
      )}
      <Divider />
      <div>TODO some headers for filtering</div>
      {councilNominees &&
        councilNominees
          .filter(
            (councilNominee) => councilNominee.toLowerCase() !== wallet?.address.toLowerCase()
          )
          .map((councilNominee) => (
            <UserListItem address={councilNominee} activeCouncil={activeCouncil} />
          ))}
    </Flex>
  );
}
