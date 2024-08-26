import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';
import { GetUserDetails } from '../../queries';
import { Socials } from '../Socials';
import { CopyIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';

export default function UserProfileEditPreview({
  userData,
  activeWallet,
  isPending,
  isDirty,
}: {
  isPending: boolean;
  activeWallet?: string;
  isDirty: boolean;
  userData: GetUserDetails;
}) {
  const elementRef = useRef<HTMLParagraphElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
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

  return (
    <Flex
      border="1px solid"
      borderColor={{ base: 'navy.700', xl: 'cyan.500' }}
      rounded="base"
      p={{ base: 0, xl: '4' }}
      bg="navy.700"
      flexDir="column"
      // w="451px"
      // h="612px"
      w={{ base: '100%', xl: '451px' }}
      h={{ base: '100%', xl: '612px' }} //@mrx idk how to put this height 100% or vh 97 like the UserProfileCard
      position={{ base: 'unset', xl: 'sticky' }}
      top="105px"
    >
      <Flex>
        <ProfilePicture imageSrc={userData?.pfpUrl} address={userData?.address || activeWallet} />
        <Flex flexDir="column" w="100%" justifyContent="center" ml="2">
          <Text
            fontSize="16px"
            fontWeight="700"
            data-cy="username-preview"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            maxW="250px"
          >
            {userData.username ? userData.username : prettyString(activeWallet || '')}
          </Text>
          <Text
            fontSize="12px"
            fontWeight="400"
            lineHeight="16px"
            data-cy="about-preview"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            maxW="250px"
          >
            {userData?.about}
          </Text>
        </Flex>
      </Flex>
      <Flex my="4">
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
              navigator.clipboard.writeText(activeWallet || '');
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Text mr="1" fontSize="14px" fontWeight="400">
            {prettyString(activeWallet || '')}
          </Text>
          <CopyIcon w="12px" h="12px" />
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
            h="330px"
            mb="auto"
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
                background="linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, black 100%)"
              />
            )}
          </Text>
        </>
      )}
      <Button
        mt="auto"
        isLoading={isPending}
        w="100%"
        type="submit"
        data-cy="save-profile-changes-button"
        isDisabled={!isDirty}
      >
        Save Changes
      </Button>
    </Flex>
  );
}
