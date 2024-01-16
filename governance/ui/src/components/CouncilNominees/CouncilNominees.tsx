import { Divider, Flex, Heading, Input, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { useGetNextElectionSettings } from '../../queries/useGetNextElectionSettings';
import { useWallet } from '@snx-v3/useBlockchain';
import UserListItem from '../UserListItem/UserListItem';
import UserTableView from '../UserTableView/UserTableView';
import { useGetNomineesDetails } from '../../queries/useGetNomineesDetails';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useMemo, useState } from 'react';
import { utils } from 'ethers';
import { ChevronDown, ChevronUp } from '@snx-v3/icons';

export default function CouncilNominees({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [searchAddress, setSearchAddress] = useState('');
  const [descending, setDescending] = useState(false);

  const wallet = useWallet();

  const { data: councilNomineesDetails } = useGetNomineesDetails(activeCouncil);
  const { data: councilSchedule } = useGetEpochSchedule(activeCouncil);
  const { data: nextEpochDuration } = useGetNextElectionSettings(activeCouncil);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);

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
        ? `Q${startQuarter} - ${endYear}`
        : `Q${startQuarter} ${startYear} - Q${endQuarter} ${endYear}`;

  let sortedNominees = useMemo(() => {
    return !!councilNomineesDetails?.length
      ? councilNomineesDetails
          .filter((nominee) => {
            if (councilPeriod !== '2') {
              nominee?.address.toLowerCase() !== wallet?.address.toLowerCase();
            }
            return true;
          })
          .filter((nominee) => {
            if (utils.isAddress(searchAddress)) {
              return nominee.address.toLowerCase() === searchAddress;
            }
            return true;
          })
      : [];
  }, [searchAddress, councilNomineesDetails, wallet?.address, councilPeriod]);

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
        <Flex justifyContent="flex-end">
          <PeriodCountdown />
        </Flex>
      </Flex>
      <Divider />
      {wallet?.address && <UserListItem address={wallet.address} activeCouncil={activeCouncil} />}
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" p="6">
        <Heading fontSize="medium">
          Current {councilPeriod === '1' ? 'Nominees' : 'Results'}
        </Heading>
        <Input
          maxW="320px"
          bg="navy.900"
          placeholder="Search"
          onChange={(e) => setSearchAddress(e.target.value.trim().toLowerCase())}
        />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            {councilPeriod === '2' && <Th w="20px">N°</Th>}
            <Th
              textTransform="capitalize"
              w="200px"
              cursor="pointer"
              userSelect="none"
              onClick={() => {
                setDescending(!descending);
                sortedNominees = sortedNominees.sort((a, b) => {
                  if (a.username && b.username) {
                    return descending
                      ? a.username.localeCompare(b.username)
                      : a.username.localeCompare(b.username) * -1;
                  }
                  return descending
                    ? a?.address.localeCompare(b.address)
                    : a?.address.localeCompare(b.address) * -1;
                });
              }}
            >
              Name {councilPeriod !== '2' && (descending ? <ChevronUp /> : <ChevronDown />)}
            </Th>
            <Th textTransform="capitalize">Role</Th>
            {councilPeriod === '2' && <Th textTransform="capitalize">Votes</Th>}
            {councilPeriod === '2' && (
              <Th textTransform="capitalize" px="0">
                Voting Power
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {!!sortedNominees?.length &&
            sortedNominees.map((councilNominee, index) => (
              <UserTableView
                place={index}
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
