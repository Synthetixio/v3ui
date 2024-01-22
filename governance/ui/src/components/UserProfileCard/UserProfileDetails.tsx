import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Button, Image, Box, Text, Tooltip } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import Blockies from 'react-blockies';
import { shortAddress } from '../../utils/address';
import { Socials } from '../Socials';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [removeOrSelect, setRemoveOrSelect] = useState(
    JSON.parse(localStorage.getItem('voteSelection') || '')?.[activeCouncil]?.toLowerCase() ===
      userData?.address.toLowerCase()
  );

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
        {userData?.pfpImageId ? (
          <Image borderRadius="full" src={userData.pfpImageId} w="56px" h="56px" mr="4" />
        ) : (
          userData?.address && (
            <Box mr="4">
              <Blockies size={14} seed={userData.address.toLowerCase()} className="fully-rounded" />
            </Box>
          )
        )}
        <Flex flexDir="column" w="100%">
          <Flex justifyContent="space-between">
            <Text fontSize="16px" fontWeight="700">
              {shortAddress(userData?.address)}
            </Text>
          </Flex>
          <Text fontSize="12px" fontWeight="400" lineHeight="16px">
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
              onClick={() => navigate(`/councils/${activeCouncil}?editProfile=true`)}
              color="white"
            >
              Edit Profile
            </Button>
            {!isNominated ? (
              <Button
                variant="outline"
                colorScheme="gray"
                w="100%"
                onClick={() => navigate(`/councils/${activeCouncil}?nominate=true`)}
              >
                Nominate Self
              </Button>
            ) : (
              <></>
            )}
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
            ) : (
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
            )}
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
                parsedSelection[activeCouncil] =
                  parsedSelection[activeCouncil].toLowerCase() === userData?.address.toLowerCase()
                    ? ''
                    : userData.address;
                localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
                queryClient.refetchQueries({ queryKey: ['voting-candidates'] });
                setRemoveOrSelect(
                  parsedSelection[activeCouncil].toLowerCase() === userData?.address.toLowerCase()
                );
              }
            }}
          >
            {removeOrSelect ? 'Remove ' : 'Select '}
            {userData?.ens || userData?.username || shortAddress(userData?.address)}
          </Button>
        )}
      </Flex>
    </>
  );
};
