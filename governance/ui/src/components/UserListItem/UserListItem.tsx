import { Button, Flex, Image, Text } from '@chakra-ui/react';
import Blockies from 'react-blockies';
import '../UserProfileCard/UserProfileCard.css';
import { shortAddress } from '../../utils/address';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useNavigate } from 'react-router-dom';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';

export default function UserListItem({
  address,
  activeCouncil,
}: {
  address: string;
  activeCouncil: CouncilSlugs;
}) {
  const wallet = useWallet();
  const { data: user } = useGetUserDetailsQuery(address);
  const { data: isNominated } = useGetIsNominated(address);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const navigate = useNavigate();
  const network = useNetwork();
  const isOwn = wallet?.address.toLowerCase() === user?.address.toLowerCase();

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
      {councilPeriod === '1' ? (
        <Button
          size="xs"
          variant={isNominated ? 'outline' : 'solid'}
          colorScheme={isNominated ? 'gray' : 'cyan'}
          onClick={() => {
            !isNominated
              ? navigate(`/councils/${activeCouncil}?nominate=true`)
              : navigate(`/councils/${activeCouncil}?view=${address}`);
          }}
        >
          {isNominated && isOwn && (network.id === 11155111 || network.id === 10) ? (
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
