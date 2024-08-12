import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Button, Text, Tooltip } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { Socials } from '../Socials';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useVoteContext } from '../../context/VoteContext';
import { ProfilePicture } from './ProfilePicture';
import { EditIcon, ShareIcon } from '../Icons';
import { useGetUserBallot, useNetwork } from '../../queries';
import { useState } from 'react';

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
  const [tooltipLabel, setTooltipLabel] = useState('Copy Profile Link');
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { network } = useNetwork();
  const networkForState = network?.id.toString() || '2192';
  const { dispatch, state } = useVoteContext();
  const navigate = useNavigate();
  const { data: ballot } = useGetUserBallot(activeCouncil);

  const isSelected = state[networkForState]
    ? state[networkForState][activeCouncil]?.toLowerCase() === userData?.address?.toLowerCase()
    : false;

  const isAlreadyVoted =
    !!ballot?.votedCandidates &&
    ballot?.votedCandidates[0]?.toLowerCase() === userData?.address?.toLowerCase();

  return (
    <>
      <Flex alignItems="center" mb="4" position="relative">
        <IconButton
          onClick={() => navigate(`/councils/${activeCouncil}`)}
          size="sm"
          aria-label="close button"
          icon={<CloseIcon />}
          variant="ghost"
          colorScheme="whiteAlpha"
          color="white"
          position="absolute"
          top="0px"
          right="0px"
          _hover={{}}
        />
        {isOwn && (
          <IconButton
            size="xs"
            icon={<EditIcon />}
            variant="ghost"
            position="absolute"
            top="4px"
            right="32px"
            aria-label="edit-profile"
            onClick={() => navigate(`/profile`)}
            data-cy="edit-icon-user-profile-details"
            color="white"
            _hover={{}}
          />
        )}
        <ProfilePicture imageSrc={userData?.pfpUrl} address={userData?.address} />
        <Flex flexDir="column" w="100%" ml="2">
          <Flex justifyContent="space-between">
            <Text
              fontSize="16px"
              fontWeight="700"
              data-testid="user-wallet-profile-address"
              maxW="250px"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {userData?.username ? userData.username : prettyString(userData!.address)}
            </Text>
          </Flex>
          <Text
            fontSize="12px"
            fontWeight="400"
            lineHeight="16px"
            maxW="250px"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {userData?.about}
          </Text>
        </Flex>
      </Flex>
      <Flex mb="4" gap="3">
        <Socials
          discord={userData?.discord}
          github={userData?.github}
          twitter={userData?.twitter}
        />
        <Tooltip label={tooltipLabel} isOpen={isTooltipOpen}>
          {/* @dev charka icon tickery */}
          <div>
            <ShareIcon
              cursor="pointer"
              onMouseEnter={() => setIsTooltipOpen(true)}
              onMouseLeave={() => setTimeout(() => setIsTooltipOpen(false), 3000)}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setTooltipLabel('Profile Link Copied');
                setTimeout(() => setTooltipLabel('Copy Profile Link'), 5000);
              }}
            />
          </div>
        </Tooltip>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" mb="6">
        <Text fontSize="xs" fontWeight="700" color="gray.500" data-cy="user-profile-wallet-address">
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
      {userData?.delegationPitch && (
        <>
          <Text fontSize="14px" fontWeight="700" color="gray.500">
            Governance Pitch
          </Text>
          <Text fontSize="14px" lineHeight="20px" overflowY="scroll">
            {userData?.delegationPitch}
          </Text>
        </>
      )}
      <Flex mt="auto" gap="2" flexDir="column">
        {isOwn && (
          <>
            {councilPeriod === '2' ? (
              <Tooltip label="You cannot edit nor remove your nomination during the voting period">
                <Button
                  mt="4"
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
                variant={!isNominated ? 'solid' : 'outline'}
                colorScheme={!isNominated ? 'cyan' : 'gray'}
                w="100%"
                mt="4"
                color={!isNominated ? 'black' : 'white'}
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
            variant={!isAlreadyVoted && !isSelected ? 'solid' : 'outline'}
            colorScheme={!isAlreadyVoted && !isSelected ? 'cyan' : 'gray'}
            w="100%"
            mt="4"
            data-cy="select-user-to-vote-button"
            onClick={async () => {
              if (isAlreadyVoted) {
                dispatch({
                  type: activeCouncil.toUpperCase(),
                  payload: { action: 'remove', network: networkForState },
                });
              } else if (isSelected) {
                dispatch({
                  type: activeCouncil.toUpperCase(),
                  payload: { action: undefined, network: networkForState },
                });
              } else {
                dispatch({
                  type: activeCouncil.toUpperCase(),
                  payload: {
                    action: userData?.address.toLowerCase(),
                    network: networkForState,
                  },
                });
              }
            }}
          >
            {isAlreadyVoted ? 'Withdraw Vote ' : isSelected ? 'Remove ' : 'Select '}
            {userData?.ens || userData?.username
              ? userData.username.slice(0, 20).concat('...')
              : prettyString(userData!.address)}
          </Button>
        )}
      </Flex>
    </>
  );
};
