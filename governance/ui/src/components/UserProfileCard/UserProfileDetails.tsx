import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Button, Text, Tooltip } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { Socials } from '../Socials';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useVoteContext } from '../../context/VoteContext';
import { ProfilePicture } from './ProfilePicture';
import { useGetUserCurrentVotes } from '../../queries/useGetUserCurrentVotes';
import { useGetUserSelectedVotes } from '../../hooks/useGetUserSelectedVotes';

interface UserProfileDetailsProps {
  userData?: GetUserDetails;
  activeCouncil: CouncilSlugs;
  walletAddress: string;
  isOwn?: boolean;
  isNominated?: boolean;
  councilPeriod?: string;
}

export const UserProfileDetails = ({
  userData,
  activeCouncil,
  walletAddress,
  isOwn,
  isNominated,
  councilPeriod,
}: UserProfileDetailsProps) => {
  const { dispatch } = useVoteContext();
  const navigate = useNavigate();

  const { data: currentVotes } = useGetUserCurrentVotes();
  const selectedVotes = useGetUserSelectedVotes();

  const isSelected =
    selectedVotes[activeCouncil]?.toLowerCase() === userData?.address?.toLowerCase();

  const isAlreadyVoted =
    currentVotes[activeCouncil] &&
    currentVotes[activeCouncil]?.toLowerCase() === userData?.address?.toLowerCase();

  return (
    <>
      <Flex alignItems="center" mb="4" position="relative">
        <IconButton
          onClick={() => navigate(`/councils/${activeCouncil}`)}
          size="xs"
          aria-label="close button"
          icon={<CloseIcon />}
          variant="ghost"
          colorScheme="whiteAlpha"
          color="white"
          position="absolute"
          top="0px"
          right="0px"
        />
        <ProfilePicture imageSrc={userData?.pfpUrl} address={userData?.address} />
        <Flex flexDir="column" w="100%" ml="2">
          <Flex justifyContent="space-between">
            <Text fontSize="16px" fontWeight="700" data-testid="user-wallet-profile-address">
              {prettyString(userData!.address)}
            </Text>
          </Flex>
          <Text
            fontSize="12px"
            fontWeight="400"
            lineHeight="16px"
            whiteSpace="nowrap"
            maxW="300px"
            overflow="scroll"
          >
            {userData?.about}
          </Text>
        </Flex>
      </Flex>
      <Flex mb="4">
        <Socials
          discord={userData?.discord}
          github={userData?.github}
          twitter={userData?.twitter}
        />
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" mb="6">
        <Text fontSize="14px" fontWeight="700" color="gray.500">
          Wallet Address
        </Text>
        <Button
          size="xs"
          display="flex"
          variant="unstyled"
          onClick={() => {
            try {
              navigator.clipboard.writeText(walletAddress);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Text mr="1" fontSize="12px" fontWeight="700">
            {prettyString(walletAddress)}
          </Text>
          <CopyIcon w="12px" h="12px" />
        </Button>
      </Flex>
      <Text fontSize="14px" fontWeight="700" color="gray.500">
        Governance Pitch
      </Text>
      <Text fontSize="14px" lineHeight="20px" overflowY="scroll">
        {userData?.delegationPitch}
      </Text>
      <Flex mt="auto" gap="2" flexDir="column">
        {isOwn && (
          <>
            <Button
              variant="outline"
              colorScheme="gray"
              mb="1"
              w="100%"
              onClick={() => navigate(`/profile`)}
              color="white"
            >
              Edit Profile
            </Button>
            {councilPeriod === '2' ? (
              <Tooltip label="You cannot edit nor remove your nomination during the voting period">
                <Button
                  variant="outline"
                  colorScheme="gray"
                  w="100%"
                  isDisabled={councilPeriod === '2'}
                >
                  Edit Nomination
                </Button>
              </Tooltip>
            ) : councilPeriod === '1' ? (
              <Button
                variant="outline"
                colorScheme="gray"
                w="100%"
                color="white"
                data-cy="nominate-self-button-user-profile-details"
                onClick={() =>
                  navigate(
                    `/councils/${activeCouncil}?${
                      !isNominated ? 'nominate=true' : 'editNomination=true'
                    }`
                  )
                }
              >
                {isNominated ? 'Edit Nomination' : 'Nominate Self'}
              </Button>
            ) : null}
          </>
        )}
        {councilPeriod === '2' && (
          <Button
            w="100%"
            data-cy="select-user-to-vote-button"
            onClick={() => {
              if (isAlreadyVoted) {
                dispatch({
                  type: activeCouncil.toUpperCase(),
                  payload: '',
                });
              } else if (isSelected) {
                dispatch({
                  type: activeCouncil.toUpperCase(),
                  payload: undefined,
                });
              } else {
                dispatch({
                  type: activeCouncil.toUpperCase(),
                  payload: userData?.address.toLowerCase(),
                });
              }
              if (userData?.address) {
                const selection = localStorage.getItem('voteSelection');
                if (!selection) localStorage.setItem('voteSelection', '');
                const parsedSelection = JSON.parse(selection ? selection : '{}');

                if (parsedSelection[activeCouncil]) {
                  parsedSelection[activeCouncil] =
                    parsedSelection[activeCouncil].toLowerCase() === userData?.address.toLowerCase()
                      ? ''
                      : userData.address;
                } else {
                  parsedSelection[activeCouncil] = userData.address;
                }
                localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
              }
            }}
            whiteSpace="nowrap"
            overflow="scroll"
          >
            {isAlreadyVoted ? 'Withdraw ' : isSelected ? 'Remove ' : 'Select '}
            {userData?.ens || userData?.username || prettyString(userData!.address)}
          </Button>
        )}
      </Flex>
    </>
  );
};
