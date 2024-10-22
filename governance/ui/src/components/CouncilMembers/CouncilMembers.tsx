import {
  Divider,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { calculateNextEpoch, CouncilSlugs } from '../../utils/councils';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import UserTableView from '../UserTableView/UserTableView';
import MemberTableView from '../UserTableView/MemberTableView';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useMemo, useState } from 'react';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import SortArrows from '../SortArrows/SortArrows';
import { useGetCouncilMembers, useGetHistoricalVotes, useGetUserDetailsQuery } from '../../queries';
import TableLoading from '../TableLoading/TableLoading';
import { sortUsers } from '../../utils/sort-users';
import { Members } from '../../Test';

export default function CouncilMembers({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [sortConfig, setSortConfig] = useState<[boolean, string]>([true, 'votingPower']);

  const { data: councilMembers } = useGetCouncilMembers(activeCouncil);
  const { data: councilMemberDetails, isLoading: userDetailsLoading } = useGetUserDetailsQuery(
    councilMembers || []
  );
  const { data: councilSchedule } = useGetEpochSchedule(activeCouncil);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { data: votes } = useGetHistoricalVotes();

  const nextEpoch = calculateNextEpoch(councilSchedule);

  const sortedNominees = useMemo(() => {
    return sortUsers(activeCouncil, '', sortConfig, councilMemberDetails, votes);
  }, [sortConfig, councilMemberDetails, activeCouncil, votes]);

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
      <Flex p={{ base: 4, md: 6 }} justifyContent="space-between">
        <Flex flexDir="column" alignItems="center">
          <Heading fontSize="lg" w="100%">
            Election for Q4 2023 - Q1 2024
          </Heading>
          <Text fontSize="xs" w="100%">
            01 Oct 2023 - 01 April 2024
          </Text>
        </Flex>
        <Flex justifyContent="flex-end">
          <Tag bg="gray.900" color="white" h="fit-content" data-cy="election-closed-tag">
            Closed
          </Tag>
        </Flex>
      </Flex>
      <Divider />
      <TableContainer>
        <Table style={{ borderCollapse: 'separate', borderSpacing: '0 1px' }}>
          <Thead>
            <Tr>
              <Th
                textTransform="none"
                cursor="pointer"
                w="50px"
                userSelect="none"
                px="0"
                textAlign="center"
                onClick={() => {
                  setSortConfig([!sortConfig[0], 'ranking']);
                }}
                data-cy="number-table-header"
              >
                Seat {sortConfig[1] === 'ranking' && <SortArrows up={sortConfig[0]} />}
              </Th>
              <Th
                textTransform="none"
                w="200px"
                cursor="pointer"
                userSelect="none"
                data-cy="name-table-header"
                onClick={() => {
                  setSortConfig([!sortConfig[0], 'name']);
                }}
              >
                Name {sortConfig[1] === 'name' && <SortArrows up={sortConfig[0]} />}
                {/* @ts-ignore */}
                {sortConfig[1] === 'start' && sortConfig[1] !== 'name' && (
                  <ArrowUpDownIcon color="cyan" />
                )}
              </Th>
              {(councilPeriod === '2' || councilPeriod === '0') && (
                <Th
                  cursor="pointer"
                  w="120px"
                  userSelect="none"
                  textTransform="none"
                  data-cy="votes-table-header"
                  px="6"
                  onClick={() => {
                    setSortConfig([!sortConfig[0], 'votes']);
                  }}
                >
                  Votes {sortConfig[1] === 'votes' && <SortArrows up={sortConfig[0]} />}
                </Th>
              )}
              {(councilPeriod === '2' || councilPeriod === '0') && (
                <Th
                  cursor="pointer"
                  userSelect="none"
                  textTransform="none"
                  data-cy="voting-power-table-header"
                  w="180px"
                  px="6"
                  onClick={() => {
                    setSortConfig([!sortConfig[0], 'votingPower']);
                  }}
                >
                  Voting Power{' '}
                  {sortConfig[1] === 'votingPower' && <SortArrows up={sortConfig[0]} />}
                </Th>
              )}
              {councilPeriod === '0' && (
                <Th userSelect="none" textTransform="none" textAlign="center" px="0"></Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {!!Members?.length &&
              Members.map((member, index) => {
                return (
                  // <Text> {member.name!} </Text>
                  <MemberTableView
                    name={member.name}
                    place={member.seat}
                    address={member.address}
                    image={member.image}
                    //   user={member.name!}
                    //   // isNomination
                    activeCouncil={activeCouncil}
                    //   totalVotingPower={votes && votes[totalVotingPowerForCouncil(activeCouncil)]}
                    //   key={member?.address.concat('council-nominees').concat(index.toString())}
                  />
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

function totalVotingPowerForCouncil(council: CouncilSlugs) {
  switch (council) {
    case 'treasury':
      return 'totalVotingPowerSpartan';
    case 'advisory':
      return 'totalVotingPowerAmbassador';
    case 'strategy':
      return 'totalVotingPowerTreasury';
  }
}
