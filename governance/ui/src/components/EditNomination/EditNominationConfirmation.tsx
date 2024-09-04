import { Button, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useEditNomination from '../../mutations/useEditNomination';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useWallet } from '../../queries/useWallet';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useGetUserDetailsQuery } from '../../queries';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';

export default function EditNominationConfirmation({
  selectedCouncil,
  activeCouncil,
  setShowConfirm,
}: {
  selectedCouncil?: CouncilSlugs | null;
  activeCouncil: CouncilSlugs;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { activeWallet } = useWallet();
  const { data: nominationInformation } = useGetIsNominated(activeWallet?.address);
  const { data: user } = useGetUserDetailsQuery(activeWallet?.address);

  const { mutateAsync, isPending, isSuccess } = useEditNomination({
    currentNomination: nominationInformation?.council.slug,
    nextNomination: selectedCouncil,
  });

  useEffect(() => {
    if (isSuccess) {
      setShowConfirm(false);
      navigate(`/councils/${selectedCouncil ? selectedCouncil : 'spartan'}?nominate=false`);
    }
  }, [isSuccess, setShowConfirm, navigate, selectedCouncil]);

  return (
    <>
      <Heading fontSize="medium">Confirm changes</Heading>
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
      <Text fontSize="sm" color="gray.500" mb="2">
        Chose which governing body you would like to represent if chosen as an elected member:
      </Text>
      <Flex alignItems="center" justifyContent="space-between">
        {nominationInformation?.isNominated ? (
          <Flex
            key={`tab-nomination-${nominationInformation.council.docLink}`}
            cursor="pointer"
            w="45%"
            height="58px"
            rounded="base"
            borderColor="gray.900"
            borderWidth="1px"
            padding="2"
            alignItems="center"
            mb="2"
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
        ) : (
          <Flex
            key="tab-nomination-from-none"
            cursor="pointer"
            w="45%"
            height="58px"
            rounded="base"
            borderColor="gray.900"
            borderWidth="1px"
            padding="2"
            alignItems="center"
            mb="auto"
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
            <Text fontSize="x-small" fontWeight="bold">
              None
            </Text>
          </Flex>
        )}
        <ArrowForwardIcon />
        <Flex
          key={`tab-nomination-${selectedCouncil}`}
          cursor="pointer"
          w="45%"
          height="58px"
          rounded="base"
          borderColor="gray.900"
          borderWidth="1px"
          padding="2"
          alignItems="center"
          mb="auto"
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
            {selectedCouncil && (
              <Image
                src={councils.find((c) => c.slug === selectedCouncil)?.image || ''}
                w="6"
                h="6"
              />
            )}
          </Flex>
          <Text fontSize="small" fontWeight="bold">
            {councils.find((c) => c.slug === selectedCouncil)?.title || 'None'}
          </Text>
        </Flex>
      </Flex>
      {isPending ? (
        <Button variant="unstyled" cursor="progress" mt="auto">
          <Flex w="100%" justifyContent="center" gap="2" color="cyan.500">
            <Spinner colorScheme="cyan" /> Loading
          </Flex>
        </Button>
      ) : (
        <>
          <Button
            mt="auto"
            onClick={async () => {
              await mutateAsync();
            }}
            data-cy="confirm-edit-nomination-button"
          >
            Edit Nomination
          </Button>
          <Button
            variant="outline"
            colorScheme="gray"
            mt="2"
            onClick={() => {
              setShowConfirm(false);
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
}
