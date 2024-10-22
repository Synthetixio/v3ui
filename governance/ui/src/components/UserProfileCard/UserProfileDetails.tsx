import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Image, Text, Tooltip } from '@chakra-ui/react';
import { prettyString } from '@snx-v3/format';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserDetails } from '../../queries/useGetUserDetailsQuery';
import { CouncilSlugs } from '../../utils/councils';
import { ShareIcon } from '../Icons';
import { Socials } from '../Socials';
import { ProfilePicture } from './ProfilePicture';

export function UserProfileDetails({
  userData,
  activeCouncil,
  walletAddress,
}: {
  userData?: GetUserDetails;
  activeCouncil: CouncilSlugs;
  walletAddress: string;
}) {
  const [tooltipLabel, setTooltipLabel] = useState('Copy Profile Link');
  const [walletToolTipLabel, setWalletTooltipLabel] = useState('Copy');
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isWalletTooltipOpen, setWalletIsTooltipOpen] = useState(false);
  const navigate = useNavigate();
  const elementRef = useRef<HTMLParagraphElement | null>(null);

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
        {userData?.image ? (
          <Image src={userData?.image} w="14" h="14" />
        ) : (
          <ProfilePicture address={userData?.address} size={14} mr="0" />
        )}
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
              {userData?.name ? userData.name : prettyString(userData?.address || '')}
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
            {userData?.description}
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
          </Text>
        </>
      )}
      <Flex mt="auto" gap="2" flexDir="column">
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => navigate('/councils/' + activeCouncil)}
        >
          Close
        </Button>
      </Flex>
    </>
  );
}
