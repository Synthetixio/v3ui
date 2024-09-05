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
import { utils } from 'ethers';
import SortArrows from '../SortArrows/SortArrows';
import { useNetwork, useWallet } from '../../queries/useWallet';
import { CouncilImage } from '../CouncilImage';
import TableLoading from '../TableLoading/TableLoading';
import { CloseIcon } from '@chakra-ui/icons';
import { useVoteContext } from '../../context/VoteContext';
import { useGetEpochIndex, useGetHistoricalVotes } from '../../queries';
import { getVoteSelectionState } from '../../utils/localstorage';

export default function CouncilNominees({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<[boolean, string]>([false, 'name']);

  const { network } = useNetwork();
  const { data: epochId } = useGetEpochIndex(activeCouncil);
  const { activeWallet, connect } = useWallet();

  const { data: councilNomineesDetails, isLoading } = useGetNomineesDetails(activeCouncil);
  const { data: votes, isError } = useGetHistoricalVotes();
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
  const votesForCouncil = votes && votes[activeCouncil];

  const sortedNominees = useMemo(() => {
    if (councilNomineesDetails?.length && votesForCouncil) {
      return councilNomineesDetails
        .map((nominee) => {
          const vote = votesForCouncil.find(
            (vote) =>
              epochId === vote.id && vote.voter.toLowerCase() === nominee.address.toLowerCase()
          );
          if (vote) return (nominee = { ...nominee, vote });
          return nominee;
        })
        .filter((nominee) => {
          if (utils.isAddress(search)) {
            return nominee.address.toLowerCase().includes(search);
          }
          if (search) {
            if (nominee.username) {
              return nominee.username.toLowerCase().includes(search);
            } else {
              return nominee.address.toLowerCase().includes(search);
            }
          }
          return true;
        })
        .sort((a, b) => {
          if (sortConfig[1] === 'name') {
            if (a.username && b.username) {
              return sortConfig[0]
                ? a.username.localeCompare(b.username)
                : a.username.localeCompare(b.username) * -1;
            }
            if (a.username && !b.username) {
              return -1;
            } else if (b.username && !a.username) {
              return 1;
            }
            return sortConfig[0]
              ? a.address.localeCompare(b.address)
              : a.address.localeCompare(b.address) * -1;
          }
          return 0;
        });
    }
    return [];
  }, [search, councilNomineesDetails, sortConfig, votesForCouncil, epochId]);

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
                    setSortConfig([!sortConfig[0], 'ranking']);
                    // sortedNominees = sortedNominees.sort((a, b) => {
                    // TODO implement sorting for most votes when subgraph is ready
                    // });
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
              sortedNominees.map((councilNominee, index) => (
                <UserTableView
                  place={index}
                  user={councilNominee!}
                  isSelectedForVoting={
                    councilNominee.address.toLowerCase() ===
                    currentSelectedUser?.toString().toLowerCase()
                  }
                  activeCouncil={activeCouncil}
                  key={councilNominee.address.concat('council-nominees')}
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
