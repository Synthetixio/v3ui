import {
  Divider,
  Flex,
  Heading,
  Skeleton,
  Table,
  Tag,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import UserTableView from '../UserTableView/UserTableView';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useMemo, useState } from 'react';
import { ArrowUpDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import SortArrows from '../SortArrows/SortArrows';
import { useGetCouncilMembers, useGetUserDetailsQuery } from '../../queries';

export default function CouncilMembers({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [sortConfig, setSortConfig] = useState<[boolean, string]>([false, 'start']);

  const { data: councilMembers } = useGetCouncilMembers(activeCouncil);
  const { data: councilMemberDetails, isLoading: userDetailsLoading } = useGetUserDetailsQuery(
    councilMembers || []
  );
  const { data: councilSchedule } = useGetEpochSchedule(activeCouncil);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);

  const startDay =
    councilSchedule?.startDate && new Date(councilSchedule?.startDate * 1000).getUTCDate();
  const startMonth =
    councilSchedule?.startDate &&
    new Date(councilSchedule.startDate * 1000).toLocaleString('default', { month: 'short' });
  const startYear =
    councilSchedule?.startDate && new Date(councilSchedule.startDate * 1000).getUTCFullYear();

  const endDay = councilSchedule?.endDate && new Date(councilSchedule.endDate * 1000).getUTCDate();
  const endMonth =
    councilSchedule?.endDate &&
    new Date(councilSchedule.endDate * 1000).toLocaleString('default', {
      month: 'short',
    });
  const endYear =
    councilSchedule?.endDate && new Date(councilSchedule.endDate * 1000).getUTCFullYear();

  const startQuarter =
    councilSchedule?.endDate &&
    Math.floor(new Date(councilSchedule.endDate * 1000).getMonth() / 3 + 1);

  const endQuarter =
    councilSchedule?.endDate &&
    Math.floor(new Date(councilSchedule.endDate * 1000).getMonth() / 3 + 1);

  const quarter =
    startYear === endYear && startQuarter === endQuarter
      ? `Q${startQuarter} ${startYear}`
      : startYear === endYear
        ? `Q${startQuarter} - ${endYear}`
        : `Q${startQuarter} ${startYear} - Q${endQuarter} ${endYear}`;

  let sortedNominees = useMemo(() => {
    if (sortConfig[1] === 'ranking') {
      return !!councilMemberDetails?.length ? councilMemberDetails.reverse() : [];
    }
  }, [sortConfig[0], sortConfig[1], councilMemberDetails]);

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
            Election for {quarter}
          </Heading>
          <Text fontSize="xs" w="100%">
            {startDay} {startMonth} {startYear} - {endDay} {endMonth} {endYear}
          </Text>
        </Flex>
        <Flex justifyContent="flex-end">
          <Tag bg="gray.900" color="white" h="fit-content" data-cy="election-closed-tag">
            Closed
          </Tag>
        </Flex>
      </Flex>
      <Divider />
      <Table>
        <Thead>
          <Tr>
            <Th
              cursor="pointer"
              w="50px"
              userSelect="none"
              px="0"
              textAlign="center"
              onClick={() => {
                setSortConfig([!sortConfig[0], 'ranking']);
              }}
            >
              N° {sortConfig[1] === 'ranking' && <SortArrows up={sortConfig[0]} />}
            </Th>
            <Th
              textTransform="capitalize"
              w="200px"
              cursor="pointer"
              userSelect="none"
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
                <ArrowUpDownIcon color="cyan" />
              )}
            </Th>
            {(councilPeriod === '2' || councilPeriod === '0') && (
              <Th
                cursor="pointer"
                w="120px"
                userSelect="none"
                textTransform="capitalize"
                px="6"
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
            {(councilPeriod === '2' || councilPeriod === '0') && (
              <Th
                cursor="pointer"
                userSelect="none"
                textTransform="capitalize"
                w="180px"
                px="6"
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
            {councilPeriod === '0' && (
              <Th userSelect="none" textTransform="capitalize" textAlign="center" px="0"></Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {userDetailsLoading ? (
            <>
              <Tr>
                <Th>
                  <Skeleton h={6} w={6} />
                </Th>
                <Th>
                  <Skeleton h={6} w="180px" />
                </Th>
                <Th>
                  <Skeleton h={6} w={10} />
                </Th>
                <Th>
                  <Skeleton h={6} w={12} />
                </Th>
              </Tr>
              <Tr>
                <Th>
                  <Skeleton h={6} w={6} />
                </Th>
                <Th>
                  <Skeleton h={6} w="180px" />
                </Th>
                <Th>
                  <Skeleton h={6} w={10} />
                </Th>
                <Th>
                  <Skeleton h={6} w={12} />
                </Th>
              </Tr>
            </>
          ) : (
            <>
              {!!sortedNominees?.length &&
                sortedNominees.map((councilNominee, index) => {
                  if (index === 8) {
                    return (
                      <>
                        <Tr
                          key={`${activeCouncil}-zone`}
                          border="1px solid"
                          borderTop="1px solid"
                          borderColor="cyan.500"
                          rounded="base"
                        >
                          <Th>
                            <ArrowUpIcon color="cyan" w="24px" height="24px" />
                          </Th>
                          <Th>
                            <Text fontWeight={700} color="cyan" w="180px">
                              {activeCouncil} Election Zone
                            </Text>
                          </Th>
                          <Th></Th>
                          <Th></Th>
                        </Tr>
                        <UserTableView
                          place={index}
                          user={councilNominee!}
                          isNomination
                          activeCouncil={activeCouncil}
                          key={councilNominee?.address
                            .concat('council-nominees')
                            .concat(index.toString())}
                        />
                      </>
                    );
                  }
                  return (
                    <UserTableView
                      place={index}
                      user={councilNominee!}
                      isNomination
                      activeCouncil={activeCouncil}
                      key={councilNominee?.address
                        .concat('council-nominees')
                        .concat(index.toString())}
                    />
                  );
                })}
            </>
          )}
        </Tbody>
      </Table>
    </Flex>
  );
}
