import { Button, Flex, Text } from '@chakra-ui/react';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../queries';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { useWallet } from '../../queries/useWallet';
import { Badge } from '../Badge';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';

export default function UserListItem({
  address,
  activeCouncil,
}: {
  address: string;
  activeCouncil: CouncilSlugs;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: user } = useGetUserDetailsQuery(address);
  const { data: nominationInformation } = useGetIsNominated(address);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { activeWallet } = useWallet();
  const isOwn = activeWallet?.address.toLowerCase() === user?.address.toLowerCase();

  return (
    <Flex
      px="6"
      h="56px"
      alignItems="center"
      cursor="pointer"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/councils/${activeCouncil}?view=${address}`);
      }}
      borderY="1px solid"
      borderX={address === searchParams.get('view') ? '1px solid' : ''}
      borderColor={address === searchParams.get('view') ? 'cyan.500' : 'gray.900'}
      _hover={{ background: 'rgba(255,255,255,0.12)' }}
      rounded="base"
    >
      <Flex alignItems="center">
        <ProfilePicture
          imageSrc={user?.pfpUrl}
          address={address}
          ImageProps={{ w: '8', h: '8' }}
          size={8}
          mr="0"
        />
        <Text fontWeight="bold" fontSize="14px" ml="3">
          {user?.username ? user.username : prettyString(user?.address || '')}
        </Text>
      </Flex>
      {nominationInformation?.isNominated && (
        <Badge color="green" ml="4" mr="auto">
          Nominee
        </Badge>
      )}
      {councilPeriod === '1' ? (
        <Button
          ml="auto"
          rounded="base"
          size="xs"
          variant={nominationInformation?.isNominated ? 'outline' : 'solid'}
          colorScheme={nominationInformation?.isNominated ? 'gray' : 'cyan'}
          onClick={(e) => {
            e.stopPropagation();
            if (!nominationInformation?.isNominated) {
              navigate(`/councils/${activeCouncil}?nominate=true`);
            } else {
              navigate(`/councils/${activeCouncil}?editNomination=true`);
            }
          }}
        >
          {nominationInformation?.isNominated && isOwn ? (
            <Text color="white">Edit Nomination</Text>
          ) : (
            <Text color="black">Nominate Self</Text>
          )}
        </Button>
      ) : (
        <Button
          size="xs"
          variant="outline"
          colorScheme="gray"
          onClick={() => {
            navigate(`/councils/${activeCouncil}?view=${address}`);
          }}
          color="white"
        >
          View
        </Button>
      )}
    </Flex>
  );
}
