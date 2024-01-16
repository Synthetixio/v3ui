import { ChevronDownIcon, CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Image, Spinner, Text } from '@chakra-ui/react';
import { Badge } from '../Badge';
import { prettyString } from '@snx-v3/format';
import { shortAddress } from '../../utils/address';
import { Socials } from '../Socials';
import { useNavigate } from 'react-router-dom';
import Blockies from 'react-blockies';
import './UserProfileCard.css';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilSlugs } from '../../utils/councils';
import { useQueryClient } from '@tanstack/react-query';

export function UserProfileCard({
  walletAddress,
  activeCouncil,
  isOwn,
}: {
  walletAddress: string;
  activeCouncil: CouncilSlugs;
  isOwn?: boolean;
}) {
  const navigate = useNavigate();
  const { data: userData, error } = useGetUserDetailsQuery(walletAddress);
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { data: isNominated } = useGetIsNominated(isOwn ? walletAddress : '');
  const queryClient = useQueryClient();

  if (error)
    return (
      <Flex
        flexDir="column"
        bg="navy.700"
        borderRadius="base"
        borderStyle="solid"
        borderColor="gray.900"
        borderWidth="1px"
        p="4"
        w="100%"
        maxW="483px"
        h="612px"
      >
        {error.message}
      </Flex>
    );

  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      borderRadius="base"
      borderStyle="solid"
      borderColor="cyan.900"
      borderWidth="1px"
      p="4"
      w="100%"
      maxW="483px"
      h="612px"
    >
      {!userData ? (
        <Spinner colorScheme="cyan" />
      ) : (
        <>
          <Flex alignItems="center" mb="4">
            {userData?.pfpImageId ? (
              <Image borderRadius="full" src={userData.pfpImageId} w="56px" h="56px" mr="4" />
            ) : (
              userData?.address && (
                <Box mr="4">
                  <Blockies size={14} seed={userData.address} className="fully-rounded" />
                </Box>
              )
            )}
            <Flex flexDir="column" w="100%">
              <Flex justifyContent="space-between">
                <Text fontSize="16px" fontWeight="700">
                  {shortAddress(userData?.address)}
                </Text>
                <IconButton
                  onClick={() => navigate(`/councils/${activeCouncil}`)}
                  size="xs"
                  aria-label="close button"
                  icon={<CloseIcon />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  color="white"
                />
              </Flex>
              <Text fontSize="12px" fontWeight="400" lineHeight="16px">
                {userData?.about}
              </Text>
            </Flex>
          </Flex>
          <Flex mb="6">
            <Badge color="green">2x Elected</Badge>
          </Flex>
          <Flex mb="4">
            <Socials
              discord={userData?.discord}
              github={userData?.github}
              twitter={userData?.twitter}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start" mb="6">
            {/* @TODO what gray is that? */}
            <Text fontSize="14px" fontWeight="700" color="#828295">
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
          <Text fontSize="14px" lineHeight="20px">
            {userData?.delegationPitch}
          </Text>
          <Button
            alignSelf="flex-start"
            size="xs"
            variant="ghost"
            colorScheme="cyan"
            fontSize="12px"
            fontWeight="400"
          >
            View More
            <ChevronDownIcon color="cyan.500" ml="1" />
          </Button>
          <Flex mt="auto" gap="2" flexDir="column">
            {isOwn && (
              <>
                <Button
                  variant="outline"
                  colorScheme="gray"
                  mb="1"
                  w="100%"
                  onClick={() => navigate(`/councils/${activeCouncil}?editProfile=true`)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  colorScheme="gray"
                  w="100%"
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
              </>
            )}
            {councilPeriod === '2' && (
              <Button
                w="100%"
                onClick={() => {
                  if (userData?.address) {
                    const selection = localStorage.getItem('voteSelection');
                    if (!selection) localStorage.setItem('voteSelection', '');
                    const parsedSelection = JSON.parse(selection ? selection : '{}');
                    parsedSelection[activeCouncil] = userData?.address;
                    localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
                    queryClient.refetchQueries({ queryKey: ['voting-candidates'] });
                  }
                }}
              >
                Select {userData?.ens || userData?.username || shortAddress(userData?.address)}
              </Button>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
}
