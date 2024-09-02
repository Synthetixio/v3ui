import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useGetUserDetailsQuery } from '../../queries';
import { useWallet } from '../../queries/useWallet';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { Dispatch, SetStateAction } from 'react';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';

export default function EditNominationSelect({
  selectedCouncil,
  setSelectedCouncil,
  setShowConfirm,
}: {
  selectedCouncil?: CouncilSlugs | null;
  setSelectedCouncil: Dispatch<SetStateAction<CouncilSlugs | undefined | null>>;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const { activeWallet } = useWallet();
  const { data: nominationInformation } = useGetIsNominated(activeWallet?.address);
  const { data: user } = useGetUserDetailsQuery(activeWallet?.address);

  return (
    <>
      <Heading fontSize="medium">Edit Nomination</Heading>
      <Text fontSize="sm" color="gray.500" mt="2">
        Nominate yourself to represent a Synthetix Governing Council with the wallet below:
      </Text>
      <Flex
        rounded="base"
        borderColor="gray.900"
        borderStyle="solid"
        borderWidth="1px"
        alignItems="center"
        p="2"
        mt="3"
        mb="3"
      >
        <ProfilePicture address={user?.address} size={10} />
        <Flex flexDirection="column" ml="2">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            maxW="300px"
          >
            {user?.username || prettyString(user?.address || '')}
          </Text>
          <Text fontSize="xs">Nomination Wallet: {prettyString(user?.address || '')}</Text>
        </Flex>
      </Flex>
      {nominationInformation?.isNominated && (
        <>
          <Text fontSize="sm" color="gray.500" mb="2">
            You will withdraw your nomination from:
          </Text>
          <Flex
            key="council-user-nominated-for"
            w="100%"
            height="58px"
            rounded="base"
            borderColor="gray.900"
            borderWidth="1px"
            padding="2"
            alignItems="center"
            mb="3"
          >
            <Flex
              borderRadius="50%"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.900"
              w="10"
              h="10"
              justifyContent="center"
              alignItems="center"
              mr="3"
            >
              <Image src={nominationInformation.council.image} w="8" h="8" />
            </Flex>
            <Text fontSize="small" fontWeight="bold">
              {nominationInformation.council.title}
            </Text>
          </Flex>
        </>
      )}
      <Text fontSize="sm" color="gray.500" mb="2">
        Chose which governing body you would like to represent if chosen as an elected member:
      </Text>
      <Flex flexDirection="column">
        {councils
          .filter((c) => nominationInformation?.council.slug !== c.slug)
          .map((council) => (
            <Flex
              key={`tab-nomination-${council.slug}`}
              cursor="pointer"
              onClick={() => setSelectedCouncil(council.slug)}
              w="100%"
              height="58px"
              rounded="base"
              borderColor={selectedCouncil === council.slug ? 'cyan.500' : 'gray.900'}
              borderWidth="1px"
              padding="2"
              alignItems="center"
              mb="2"
              _hover={{
                bg: 'linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), #0B0B22;',
              }}
            >
              <Flex
                borderRadius="50%"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.900"
                w="10"
                h="10"
                justifyContent="center"
                alignItems="center"
                mr="3"
              >
                <Image src={council.image} w="8" h="8" />
              </Flex>
              <Text fontSize="small" fontWeight="bold">
                {council.title}
              </Text>
            </Flex>
          ))}
        <Flex
          key="tab-nomination-none"
          cursor="pointer"
          onClick={() => setSelectedCouncil(undefined)}
          w="100%"
          height="58px"
          rounded="base"
          borderColor={
            !selectedCouncil && typeof selectedCouncil === 'undefined' ? 'cyan.500' : 'gray.900'
          }
          borderWidth="1px"
          padding="2"
          alignItems="center"
          mb="2"
          data-cy="withdraw-vote-select"
          _hover={{
            bg: 'linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), #0B0B22;',
          }}
        >
          <Flex
            borderRadius="50%"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.900"
            w="10"
            h="10"
            justifyContent="center"
            alignItems="center"
            mr="3"
          ></Flex>
          <Text fontSize="small" fontWeight="bold">
            None
          </Text>
        </Flex>
      </Flex>

      <Button
        mt="auto"
        onClick={() => setShowConfirm(true)}
        data-cy="edit-nomination-button"
        isDisabled={selectedCouncil === null}
      >
        Edit Nomination
      </Button>
    </>
  );
}
