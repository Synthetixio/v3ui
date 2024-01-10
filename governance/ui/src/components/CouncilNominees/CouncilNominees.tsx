import { Divider, Flex, Heading, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { useGetNextElectionSettings } from '../../queries/useGetNextElectionSettings';
import { useWallet } from '@snx-v3/useBlockchain';
import UserListItem from '../UserListItem/UserListItem';
import UserTableView from '../UserTableView/UserTableView';
import { useGetNomineesDetails } from '../../queries/useGetNomineesDetails';

export default function CouncilNominees({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const wallet = useWallet();

  const { data: councilNomineesDetails } = useGetNomineesDetails(activeCouncil);
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

  let sortedNominees = !!councilNomineesDetails?.length
    ? councilNomineesDetails.filter(
        (nominee) => nominee?.address.toLowerCase() !== wallet?.address.toLowerCase()
      )
    : [];

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
      {wallet?.address && <UserListItem address={wallet.address} activeCouncil={activeCouncil} />}
      <Divider />
      <Table>
        <Thead>
          <Tr>
            <Th
              cursor="pointer"
              onClick={() => {
                sortedNominees = sortedNominees.sort((a, b) => {
                  if (a?.username && b?.username) {
                    return a.username.localeCompare(b.username);
                  }
                  return a?.address.localeCompare(b.address);
                });
              }}
            >
              Name
            </Th>
            <Th cursor="pointer">Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!!sortedNominees?.length &&
            sortedNominees.map((councilNominee) => (
              <UserTableView
                user={councilNominee!}
                isNomination
                activeCouncil={activeCouncil}
                key={councilNominee.address.concat('council-nominees')}
              />
            ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
