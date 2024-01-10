import { Button, Image, Spinner, Th, Tr } from '@chakra-ui/react';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { shortAddress } from '../../utils/address';
import '../UserProfileCard/UserProfileCard.css';
import Blockies from 'react-blockies';
import { Badge } from '../Badge';
import { useNavigate } from 'react-router-dom';

export default function UserTableView({
  user,
  activeCouncil,
  isNomination,
}: {
  user: GetUserDetails;
  activeCouncil: string;
  isNomination?: boolean;
}) {
  const navigate = useNavigate();
  if (!user) return <Spinner colorScheme="cyan" />;
  return (
    <Tr
      cursor="pointer"
      onClick={() => navigate(`/councils/${activeCouncil}?view=${user.address}`)}
    >
      <Th color="white" display="flex" alignItems="center" gap="2">
        {user.pfpUrl ? (
          <Image src={user.pfpUrl} />
        ) : (
          <Blockies seed={user.address} size={8} className="fully-rounded" />
        )}{' '}
        {shortAddress(user.address)}
      </Th>
      <Th>
        <Badge color="green">Nominee</Badge>
      </Th>
      <Th>
        <Button
          size="xs"
          colorScheme="gray"
          variant="outline"
          onClick={() => navigate(`/councils/${activeCouncil}?view=${user.address}`)}
          color="white"
        >
          {isNomination && 'View'}
        </Button>
      </Th>
    </Tr>
  );
}
