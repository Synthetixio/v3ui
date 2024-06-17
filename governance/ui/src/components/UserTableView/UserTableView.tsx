import { Button, Flex, Spinner, Th, Tr } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { shortAddress } from '../../utils/address';
import { Badge } from '../Badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { useGetElectionSettings } from '../../queries/useGetElectionSettings';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';

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

  if (!user) return <Spinner colorScheme="cyan" />;
  return (
    <Tr
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${user.address}`)}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
      border={searchParams.get('view') === user.address ? '1px solid' : ''}
      borderTop="1px solid"
      borderColor={searchParams.get('view') === user.address ? 'cyan.500' : 'gray.900'}
      rounded="base"
    >
      {(councilPeriod === '2' || councilPeriod === '0') && (
        <Th color="white">{place < 10 ? `#${place + 1}` : '-'}</Th>
      )}
      <Th color="white" display="flex" alignItems="center" gap="2" textTransform="unset">
        <ProfilePicture
          imageSrc={user?.pfpUrl}
          address={user?.address}
          size={8}
          mr="0"
          ImageProps={{ w: '32px', h: '32px' }}
        />{' '}
        {user.username ? user.username : shortAddress(user.address, 8, 8)}
      </Th>
      {councilPeriod !== '0' && (
        <Th>
          <Flex>
            <Badge color="green">Nominee</Badge>
            {councilSettings && councilSettings?.epochSeatCount > place && (
              <Badge ml="2">Member</Badge>
            )}
          </Flex>
        </Th>
      )}
      {(councilPeriod === '2' || councilPeriod === '0') && <Th color="white">TODO</Th>}
      {(councilPeriod === '2' || councilPeriod === '0') && <Th color="white">TODO</Th>}
      {councilPeriod !== '2' && councilPeriod !== '0' && (
        <Th textAlign="end">
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
          >
            {isNomination && 'View'}
          </Button>
        </Th>
      )}
      {councilPeriod === '0' && (
        <Th textAlign="end">
          <Badge>Your Vote TODO</Badge>
        </Th>
      )}
    </Tr>
  );
}
