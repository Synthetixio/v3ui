import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import councils, { calculateNextEpoch, CouncilSlugs } from '../../utils/councils';
import PeriodCountdown from '../PeriodCountdown/PeriodCountdown';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { useGetNextElectionSettings } from '../../queries/useGetNextElectionSettings';
import UserListItem from '../UserListItem/UserListItem';
import UserTableView from '../UserTableView/UserTableView';
import { useGetNomineesDetails } from '../../queries/useGetNomineesDetails';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useMemo, useState } from 'react';
import SortArrows from '../SortArrows/SortArrows';
import { useNetwork, useWallet } from '../../queries/useWallet';
import { CouncilImage } from '../CouncilImage';
import TableLoading from '../TableLoading/TableLoading';
import { CloseIcon } from '@chakra-ui/icons';
import { useVoteContext } from '../../context/VoteContext';
import { useGetEpochIndex, useGetHistoricalVotes } from '../../queries';
import { getVoteSelectionState } from '../../utils/localstorage';
import { sortUsers } from '../../utils/sort-users';

export default function CouncilNominees({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<[boolean, string]>([false, 'name']);

  const { network } = useNetwork();
  const { data: epochId } = useGetEpochIndex(activeCouncil);
  const { activeWallet, connect } = useWallet();

  const { data: councilNomineesDetails, isLoading } = useGetNomineesDetails(activeCouncil);
  const { data: votes } = useGetHistoricalVotes();
  const { data: councilSchedule } = useGetEpochSchedule(activeCouncil);
  const { data: nextEpochDuration } = useGetNextElectionSettings(activeCouncil);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { state } = useVoteContext();
  const currentSelectedUser = getVoteSelectionState(
    state,
    epochId,
    network?.id.toString(),
    activeCouncil
  );
  const council = councils.find((council) => council.slug === activeCouncil);
  const epoch = calculateNextEpoch(councilSchedule, nextEpochDuration);

  const sortedNominees = useMemo(() => {
    return sortUsers(activeCouncil, search, sortConfig, councilNomineesDetails, votes);
  }, [search, councilNomineesDetails, sortConfig, activeCouncil, votes]);

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
            Nominees for {epoch.quarter}
          </Heading>
          <Text fontSize="xs" w="100%">
            {epoch.startDay} {epoch.startMonth} {epoch.startYear} - {epoch.endDay} {epoch.endMonth}{' '}
            {epoch.endYear}
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
        <Flex alignItems="center" px={{ base: 2, sm: '6' }} py="4">
          <CouncilImage
            imageUrl={council?.image || ''}
            width="40px"
            height="40px"
            minW="40px"
            minH="40px"
            imageProps={{ w: '32px', h: '32px' }}
          />
          <Text
            fontSize="14px"
            fontWeight={700}
            color="white"
            alignItems="center"
            gap="2"
            textTransform="capitalize"
            maxW="300px"
            mr="auto"
          >
            Nominate Yourself for the {activeCouncil} Council
          </Text>
          <Button size="xs" onClick={() => connect()} minW="100px">
            Connect Wallet
          </Button>
        </Flex>
      )}
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" p="6">
        <Heading fontSize="medium">
          Current {councilPeriod === '1' ? 'Nominees' : 'Results'}
        </Heading>
        <InputGroup maxW="320px">
          {search && (
            <InputRightElement cursor="pointer">
              <CloseIcon
                w={3}
                h={3}
                zIndex={10}
                onClick={() => {
                  setSearch('');
                }}
              />
            </InputRightElement>
          )}
          <Input
            bg="navy.900"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
          />
        </InputGroup>
      </Flex>
      <TableContainer>
        <Table style={{ borderCollapse: 'separate', borderSpacing: '0 1px' }}>
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
                    setSortConfig([true, 'ranking']);
                  }}
                >
                  N°{' '}
                  {sortConfig[1] === 'ranking' && sortConfig[0] && (
                    <SortArrows up={sortConfig[0]} />
                  )}
                </Th>
              )}
              <Th
                textTransform="capitalize"
                w="200px"
                cursor="pointer"
                userSelect="none"
                data-cy="name-table-header"
                onClick={() => setSortConfig([!sortConfig[0], 'name'])}
              >
                Name {sortConfig[1] === 'name' && <SortArrows up={sortConfig[0]} />}
                {sortConfig[1] === 'start' && <SortArrows up={sortConfig[0]} />}
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
                  }}
                >
                  Voting Power{' '}
                  {sortConfig[1] === 'votingPower' && <SortArrows up={sortConfig[0]} />}
                </Th>
              )}
              {councilPeriod === '2' && (
                <Th cursor="pointer" userSelect="none" textTransform="capitalize" pl="6"></Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {!!sortedNominees?.length ? (
              sortedNominees.map((councilNominee) => (
                <UserTableView
                  place={councilNominee.place}
                  user={councilNominee!}
                  isSelectedForVoting={
                    councilNominee.address.toLowerCase() ===
                    currentSelectedUser?.toString().toLowerCase()
                  }
                  activeCouncil={activeCouncil}
                  key={councilNominee.address.concat('council-nominees')}
                  totalVotingPower={votes && votes[totalVotingPowerForCouncil(activeCouncil)]}
                />
              ))
            ) : isLoading ? (
              <TableLoading />
            ) : !!search ? (
              <Text color="gray.500" fontSize="sm" p="4">
                No results found, try another search
              </Text>
            ) : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

function totalVotingPowerForCouncil(council: CouncilSlugs) {
  switch (council) {
    case 'spartan':
      return 'totalVotingPowerSpartan';
    case 'ambassador':
      return 'totalVotingPowerAmbassador';
    case 'treasury':
      return 'totalVotingPowerTreasury';
  }
}
