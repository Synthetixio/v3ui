import { Button, Image, Spinner, Th, Tr } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { shortAddress } from '../../utils/address';
import '../UserProfileCard/UserProfileCard.css';
import Blockies from 'react-blockies';
import { Badge } from '../Badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';

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
      {councilPeriod === '2' && <Th color="white">#{place + 1}</Th>}
      <Th color="white" display="flex" alignItems="center" gap="2" textTransform="unset">
        {user.pfpUrl ? (
          <Image src={user.pfpUrl} />
        ) : (
          <Blockies seed={user.address.toLowerCase()} size={8} className="fully-rounded" />
        )}{' '}
        {user.username ? user.username : shortAddress(user.address)}
      </Th>
      <Th>
        <Badge color="green">Nominee</Badge>
      </Th>
      {councilPeriod === '2' && <Th color="white">TODO</Th>}
      {councilPeriod === '2' && <Th color="white">TODO</Th>}
      {councilPeriod !== '2' && (
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
    </Tr>
  );
}
