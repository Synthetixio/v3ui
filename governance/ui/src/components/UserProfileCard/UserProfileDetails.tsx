import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Button, Text, Tooltip, Box } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { Socials } from '../Socials';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useVoteContext } from '../../context/VoteContext';
import { ProfilePicture } from './ProfilePicture';
import { EditIcon, EthereumIcon, OPIcon, ShareIcon } from '../Icons';
import {
  useGetEpochIndex,
  useGetUserBallot,
  useGetUserVotingPowerForAllChains,
  useNetwork,
  useWallet,
} from '../../queries';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { voteCardState } from '../../state/vote-card';
import { getVoteSelectionState } from '../../utils/localstorage';
import { isMotherchain } from '../../utils/contracts';
import VotePower from './VotePower';
import { BigNumber } from 'ethers';

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
  const [showVotePower, setShowVoteBanner] = useState(false);
  const [_, setVoteCard] = useRecoilState(voteCardState);
  const { activeWallet } = useWallet();
  const [tooltipLabel, setTooltipLabel] = useState('Copy Profile Link');
  const [walletToolTipLabel, setWalletTooltipLabel] = useState('Copy');
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isWalletTooltipOpen, setWalletIsTooltipOpen] = useState(false);
  const { network } = useNetwork();
  const { data: votePowers } = useGetUserVotingPowerForAllChains(activeCouncil);
  const { data: epochId } = useGetEpochIndex(activeCouncil);
  const { dispatch, state } = useVoteContext();
  const navigate = useNavigate();
  const { data: ballot } = useGetUserBallot(activeCouncil);
  const elementRef = useRef<HTMLParagraphElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const networkForState = getVoteSelectionState(
    state,
    activeWallet?.address,
    epochId?.toString(),
    network?.id.toString(),
    activeCouncil
  );
  const voteAddressState = typeof networkForState === 'string' ? networkForState : '';
  const isSelected = voteAddressState
    ? voteAddressState?.toLowerCase().trim() === userData?.address?.toLowerCase().trim()
    : false;

  const isAlreadyVoted =
    !!ballot?.votedCandidates &&
    ballot?.votedCandidates[0]?.toLowerCase() === userData?.address?.toLowerCase();

  useEffect(() => {
    const checkOverflow = () => {
      const el = elementRef.current;
      if (el) {
        const isOverflowing = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
        setIsOverflowing(isOverflowing);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setIsOverflowing(false);
        } else {
          setIsOverflowing(true);
        }
      }
    };

    const refCurrent = elementRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  if (showVotePower) {
    return <VotePower activeCouncil={activeCouncil} networks={votePowerToNetwork(votePowers)} />;
  }

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
            mr="1"
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
        <ProfilePicture address={userData?.address} />
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
              {userData?.username ? userData.username : prettyString(userData?.address || '')}
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
              onMouseLeave={() => {
                if (tooltipLabel.includes('Copy')) setIsTooltipOpen(false);
              }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setTooltipLabel('Profile Link Copied');
                setTimeout(() => {
                  setTooltipLabel('Copy Profile Link');
                  setIsTooltipOpen(false);
                }, 2000);
              }}
            />
          </div>
        </Tooltip>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" mb="6">
        <Text fontSize="sm" fontWeight="700" color="gray.500" data-cy="user-profile-wallet-address">
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
          <Text mr="1" fontSize="14px" fontWeight="400">
            {prettyString(walletAddress)}
          </Text>
          <Tooltip label={walletToolTipLabel} isOpen={isWalletTooltipOpen}>
            <CopyIcon
              w="12px"
              h="12px"
              onMouseEnter={() => setWalletIsTooltipOpen(true)}
              onMouseLeave={() => {
                if (walletToolTipLabel.includes('Copy')) setWalletIsTooltipOpen(false);
              }}
              onClick={() => {
                navigator.clipboard.writeText(userData?.address || '');
                setWalletTooltipLabel('Copied');
                setTimeout(() => {
                  setWalletTooltipLabel('Copy');
                  setWalletIsTooltipOpen(false);
                }, 2000);
              }}
            />
          </Tooltip>
        </Button>
      </Flex>
      {userData?.delegationPitch && (
        <>
          <Text fontSize="14px" fontWeight="700" color="gray.500">
            Governance Pitch
          </Text>
          <Text
            position="relative"
            fontSize="14px"
            lineHeight="20px"
            overflowY="scroll"
            whiteSpace="pre-wrap"
            ref={elementRef}
          >
            {userData?.delegationPitch}
            {isOverflowing && (
              <Box
                position="sticky"
                bottom="-1px"
                left="0"
                right="0"
                height="50px"
                background="linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #0b0b22 100%)"
              />
            )}
          </Text>
        </>
      )}
      <Flex mt="auto" gap="2" flexDir="column">
        {isOwn && (
          <>
            {councilPeriod === '2' && isNominated ? (
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
          <>
            {!isNominated && isOwn && (
              <Button
                variant="solid"
                data-cy="nominate-self-button-in-user-profile"
                onClick={() => {
                  navigate({
                    pathname: `/councils/${activeCouncil}`,
                    search: `view=${walletAddress}&nominate=true`,
                  });
                }}
              >
                Nominate Self
              </Button>
            )}
            <Button
              variant={
                !isNominated && isOwn
                  ? 'outline'
                  : !isAlreadyVoted && !isSelected
                    ? 'solid'
                    : 'outline'
              }
              colorScheme={
                !isNominated && isOwn ? 'gray' : !isAlreadyVoted && !isSelected ? 'cyan' : 'gray'
              }
              isDisabled={!isNominated && isOwn}
              w="100%"
              mt={!isOwn ? 4 : 0}
              data-cy="select-user-to-vote-button"
              onClick={async () => {
                const parsedNetwork = network?.id ? network.id.toString() : '2192';
                if (isMotherchain(parsedNetwork) && !(process.env.CI === 'true')) {
                  setShowVoteBanner(true);
                } else {
                  if (isAlreadyVoted) {
                    dispatch({
                      type: activeCouncil.toUpperCase(),
                      payload: {
                        action: 'remove',
                        network: parsedNetwork,
                        epochId: epochId?.toString(),
                        wallet: activeWallet?.address,
                      },
                    });
                  } else if (isSelected) {
                    dispatch({
                      type: activeCouncil.toUpperCase(),
                      payload: {
                        action: undefined,
                        network: parsedNetwork,
                        epochId: epochId?.toString(),
                        wallet: activeWallet?.address,
                      },
                    });
                  } else {
                    dispatch({
                      type: activeCouncil.toUpperCase(),
                      payload: {
                        action: userData?.address.toLowerCase(),
                        network: parsedNetwork,
                        epochId: epochId?.toString(),
                        wallet: activeWallet?.address,
                      },
                    });
                  }
                  setVoteCard(true);
                }
              }}
            >
              <Text maxW="250px" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
                {isAlreadyVoted ? 'Withdraw Vote ' : isSelected ? 'Remove ' : 'Select '}
                {userData?.ens || userData?.username
                  ? userData.username
                  : prettyString(userData!.address)}
              </Text>
            </Button>
          </>
        )}

        {!isOwn && councilPeriod !== '2' && (
          <Button
            variant="outline"
            colorScheme="gray"
            onClick={() => navigate('/councils/' + activeCouncil)}
          >
            Close
          </Button>
        )}
      </Flex>
    </>
  );
};

interface VotePowerToNetwork {
  power: BigNumber;
  isDeclared: boolean;
}

function votePowerToNetwork(
  power?:
    | {
        L1: VotePowerToNetwork | undefined;
        Optimism: VotePowerToNetwork | undefined;
      }
    | undefined
) {
  if (!power) return [];
  const networks = [];
  networks.push({ icon: EthereumIcon, chainId: 1, power: power.L1?.power });
  networks.push({ icon: OPIcon, chainId: 10, power: power.Optimism?.power });
  return networks;
}
