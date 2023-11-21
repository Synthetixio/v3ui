import { Button, Flex, Image, Text } from '@chakra-ui/react';

import Blockies from 'react-blockies';
import '../UserProfileCard/UserProfileCard.css';
import { shortAddress } from '../../utils/address';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useNavigate } from 'react-router-dom';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';

export default function UserListItem({
  address,
  activeCouncil,
  isOwn,
}: {
  address: string;
  activeCouncil: string;
  isOwn?: boolean;
}) {
  const { data: user } = useGetUserDetailsQuery(address);
  const { data: isNominated } = useGetIsNominated(address);
  const navigate = useNavigate();
  return (
    <Flex p="6" justifyContent="space-between" alignItems="center">
      <Flex alignItems="center">
        {user?.pfpImageId ? (
          <Image src={user.pfpImageId} w="7" h="7" />
        ) : (
          <Blockies seed={address} size={14} className="fully-rounded" />
        )}
        <Text fontWeight="bold" fontSize="small" ml="2">
          {user?.ens ? user.ens : shortAddress(user?.address)}
        </Text>
      </Flex>
      <Button
        size="xs"
        variant={!isOwn ? 'outline' : isNominated ? 'outline' : 'solid'}
        colorScheme={!isOwn ? 'gray' : isNominated ? 'gray' : 'cyan'}
        onClick={() => {
          if (isOwn) {
            !isNominated
              ? navigate('/councils' + `?active=${activeCouncil}&nominateModal=true`)
              : navigate('/councils' + `?active=${activeCouncil}&editNomination=true`);
          } else {
            navigate('/councils' + `?active=${activeCouncil}&view=${address}`);
          }
        }}
      >
        {!isOwn ? (
          <Text color="white">View</Text>
        ) : isNominated ? (
          <Text color="white">Edit Nomination</Text>
        ) : (
          <Text color="black">Nominate Self</Text>
        )}
      </Button>
    </Flex>
  );
}
