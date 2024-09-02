import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
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

  const epoch = calculateNextEpoch(councilSchedule, nextEpochDuration);

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
              if (nominee.username) {
                return nominee.username.toLowerCase().includes(search);
              } else {
                return nominee.address.toLowerCase().includes(search);
              }
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
        <Flex justifyContent="space-between" alignItems="center" px="6" py="4">
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
              width="40px"
              height="40px"
              imageProps={{ w: '32px', h: '32px' }}
            />
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
        <Input
          zIndex="1"
          maxW="320px"
          bg="navy.900"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
        />
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
                onClick={() => {
                  setSortConfig([!sortConfig[0], 'name']);
                  sortedNominees = sortedNominees.sort((a, b) => {
                    if (a.username && b.username) {
                      return sortConfig[0]
                        ? a.username.localeCompare(b.username)
                        : a.username.localeCompare(b.username) * -1;
                    }
                    return sortConfig[0]
                      ? a?.address.localeCompare(b.address) * -1
                      : a?.address.localeCompare(b.address);
                  });
                }}
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
            </Tr>
          </Thead>
          <Tbody>
            {!!sortedNominees?.length &&
              sortedNominees.map((councilNominee, index) => (
                <UserTableView
                  place={index}
                  user={councilNominee!}
                  activeCouncil={activeCouncil}
                  key={councilNominee.address.concat('council-nominees')}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
