import { Button, Flex, Image, Text } from '@chakra-ui/react';
import Blockies from 'react-blockies';
import '../UserProfileCard/UserProfileCard.css';
import { shortAddress } from '../../utils/address';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import { useNetwork, useWallet } from '@snx-v3/useBlockchain';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { Badge } from '../Badge';

export default function UserListItem({
  address,
  activeCouncil,
}: {
  address: string;
  activeCouncil: CouncilSlugs;
}) {
  const [searchParams] = useSearchParams();
  const wallet = useWallet();
  const { data: user } = useGetUserDetailsQuery(address);
  const { data: nominationInformation } = useGetIsNominated(address);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const navigate = useNavigate();
  const network = useNetwork();
  const isOwn = wallet?.address.toLowerCase() === user?.address.toLowerCase();

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
        {user?.pfpImageId ? (
          <Image src={user.pfpImageId} w="8" h="8" />
        ) : (
          <Blockies seed={address.toLowerCase()} size={8} className="fully-rounded" />
        )}
        <Text fontWeight="bold" fontSize="14px" ml="3">
          {user?.ens ? user.ens : shortAddress(user?.address)}
        </Text>
      </Flex>
      {nominationInformation?.isNominated && (
        <Badge color="green" ml="4">
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
          {nominationInformation?.isNominated &&
          isOwn &&
          // TODO @dev remove once live
          (network.id === 11155111 || network.id === 10) ? (
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
