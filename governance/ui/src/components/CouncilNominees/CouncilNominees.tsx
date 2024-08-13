import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { useGetNextElectionSettings } from '../../queries/useGetNextElectionSettings';
import UserListItem from '../UserListItem/UserListItem';
import UserTableView from '../UserTableView/UserTableView';
import { useGetNomineesDetails } from '../../queries/useGetNomineesDetails';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useMemo, useState } from 'react';
import { utils } from 'ethers';
import SortArrows from '../SortArrows/SortArrows';
import { useWallet } from '../../queries/useWallet';
import { CouncilImage } from '../CouncilImage';

export default function CouncilNominees({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<[boolean, string]>([false, 'start']);

  const { activeWallet, connect } = useWallet();

  const { data: councilNomineesDetails } = useGetNomineesDetails(activeCouncil);
  const { data: councilSchedule } = useGetEpochSchedule(activeCouncil);
  const { data: nextEpochDuration } = useGetNextElectionSettings(activeCouncil);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);

  const council = councils.find((council) => council.slug === activeCouncil);

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
              nominee?.address.toLowerCase() !== activeWallet?.address.toLowerCase();
            }
            return true;
          })
          .filter((nominee) => {
            if (utils.isAddress(search)) {
              return nominee.address.toLowerCase().includes(search);
            }
            if (search) {
              return nominee.username.toLowerCase().includes(search);
            }
            return true;
          })
      : [];
  }, [search, councilNomineesDetails, activeWallet?.address, councilPeriod]);

  return (
    <Flex
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      borderColor="gray.900"
      bg="navy.700"
      flexDirection="column"
      mt={6}
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
          <PeriodCountdown council={activeCouncil} />
        </Flex>
      </Flex>
      <Divider />
      {activeWallet?.address ? (
        <UserListItem
          address={activeWallet.address}
          activeCouncil={activeCouncil}
          data-cy="own-user-list-item"
        />
      ) : (
        <Flex justifyContent="space-between" px="6" py="4">
          <Text
            fontSize="14px"
            fontWeight={700}
            color="white"
            as={Flex}
            alignItems="center"
            gap="2"
            textTransform="capitalize"
          >
            <CouncilImage
              imageUrl={council?.image || ''}
              width="30px"
              height="30px"
              imageProps={{ w: '108px', h: '108px' }}
            />
            Nominate Yourself for the {activeCouncil} Council
          </Text>
          <Button size="xs" onClick={() => connect()}>
            Connect Wallet
          </Button>
        </Flex>
      )}
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" p="6">
        <Heading fontSize="medium">
          Current {councilPeriod === '1' ? 'Nominees' : 'Results'}
        </Heading>
        <Input
          zIndex="1"
          maxW="320px"
          bg="navy.900"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
        />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            {councilPeriod === '2' && (
              <Th
                cursor="pointer"
                w="50px"
                userSelect="none"
                px="0"
                textAlign="center"
                onClick={() => {
                  setSortConfig([!sortConfig[0], 'ranking']);
                  // sortedNominees = sortedNominees.sort((a, b) => {
                  // TODO implement sorting for most votes when subgraph is ready
                  // });
                }}
              >
                N°{' '}
                {sortConfig[1] === 'ranking' && sortConfig[0] && <SortArrows up={sortConfig[0]} />}
              </Th>
            )}
            <Th
              textTransform="capitalize"
              w="200px"
              cursor="pointer"
              userSelect="none"
              data-cy="name-table-header"
              onClick={() => {
                setSortConfig([!sortConfig[0], 'name']);
                sortedNominees = sortedNominees.sort((a, b) => {
                  if (a.username && b.username) {
                    return sortConfig[0]
                      ? a.username.localeCompare(b.username)
                      : a.username.localeCompare(b.username) * -1;
                  }
                  return sortConfig[0]
                    ? a?.address.localeCompare(b.address)
                    : a?.address.localeCompare(b.address) * -1;
                });
              }}
            >
              Name {sortConfig[1] === 'name' && <SortArrows up={sortConfig[0]} />}
              {/* @ts-ignore */}
              {sortConfig[1] === 'start' && sortConfig[1] !== 'name' && (
                <SortArrows up={sortConfig[0]} />
              )}
            </Th>
            {councilPeriod === '2' && (
              <Th
                cursor="pointer"
                w="150px"
                px="0"
                userSelect="none"
                textTransform="capitalize"
                pl="6"
                onClick={() => {
                  setSortConfig([!sortConfig[0], 'votes']);
                  // sortedNominees = sortedNominees.sort((a, b) => {
                  // TODO implement sorting for most votes when subgraph is ready
                  // });
                }}
              >
                Votes {sortConfig[1] === 'votes' && <SortArrows up={sortConfig[0]} />}
              </Th>
            )}
            {councilPeriod === '2' && (
              <Th
                cursor="pointer"
                userSelect="none"
                textTransform="capitalize"
                pl="6"
                onClick={() => {
                  setSortConfig([!sortConfig[0], 'votingPower']);
                  // sortedNominees = sortedNominees.sort((a, b) => {
                  // TODO implement sorting for most votes when subgraph is ready
                  // });
                }}
              >
                Voting Power {sortConfig[1] === 'votingPower' && <SortArrows up={sortConfig[0]} />}
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
