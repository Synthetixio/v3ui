import { Button, Flex, Text, Th, Tr } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { Badge } from '../Badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { useGetElectionSettings } from '../../queries/useGetElectionSettings';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';

export default function UserTableView({
  user,
  activeCouncil,
  isNomination,
  place,
}: {
  place: number;
  user: GetUserDetails;
  activeCouncil: CouncilSlugs;
  isNomination?: boolean;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { data: councilSettings } = useGetElectionSettings(activeCouncil);
  const isSelected = searchParams.get('view') === user.address;
  const councilIsInAdminOrVoting = councilPeriod === '2' || councilPeriod === '0';

  return (
    <Tr
      data-cy={`user-table-row-${place}`}
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${user.address}`)}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
    >
      {councilIsInAdminOrVoting && (
        <Th
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
          borderY="1px solid"
          borderLeft="1px solid"
        >
          <Text color="white">{place < 10 ? `#${place + 1}` : '-'}</Text>
        </Th>
      )}
      <Th
        color="white"
        textTransform="unset"
        px="3"
        borderY={!councilIsInAdminOrVoting ? '' : '1px solid'}
        borderLeft={councilIsInAdminOrVoting ? '' : '1px solid'}
        borderColor={isSelected ? 'cyan.500' : 'gray.900'}
      >
        <Flex gap="2" alignItems="center">
          <ProfilePicture
            imageSrc={user?.pfpUrl}
            address={user?.address}
            size={8}
            mr="0"
            ImageProps={{ w: '32px', h: '32px' }}
          />{' '}
          <Text
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW="170px"
            data-cy={`user-table-view-${user.address}`}
          >
            {user.username ? user.username : prettyString(user.address)}
          </Text>
        </Flex>
      </Th>
      {councilPeriod !== '0' && (
        <Th borderY="1px solid" borderColor={isSelected ? 'cyan.500' : 'gray.900'}>
          <Flex>
            {councilSettings && councilSettings?.epochSeatCount > place && <Badge>Member</Badge>}
          </Flex>
        </Th>
      )}
      {councilIsInAdminOrVoting && (
        <Th borderY="1px solid" borderColor={isSelected ? 'cyan.500' : 'gray.900'} color="white">
          TODO
        </Th>
      )}
      {councilIsInAdminOrVoting && (
        <Th borderY="1px solid" borderColor={isSelected ? 'cyan.500' : 'gray.900'} color="white">
          TODO
        </Th>
      )}
      {councilPeriod !== '2' && councilPeriod !== '0' && (
        <Th
          textAlign="end"
          borderY="1px solid"
          borderRight="1px solid"
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        >
          <Button
            size="xs"
            colorScheme="gray"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/councils/${activeCouncil}?view=${user.address}`);
            }}
            color="white"
            rounded="base"
            data-cy={`user-table-view-button-${user.address}`}
          >
            {isNomination && 'View'}
          </Button>
        </Th>
      )}
      {councilPeriod === '0' && (
        <Th
          textAlign="end"
          borderY="1px solid"
          borderRight="1px solid"
          borderColor={isSelected ? 'cyan.500' : 'gray.900'}
        >
          <Badge w="fit-content">Your Vote TODO</Badge>
        </Th>
      )}
    </Tr>
  );
}
