import { Button, Flex, Heading, IconButton, Image, Spinner, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useEditNomination from '../../mutations/useEditNomination';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useWallet } from '@snx-v3/useBlockchain';
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import Blockies from 'react-blockies';
import { shortAddress } from '../../utils/address';

export default function EditNominationConfirmation({
  selectedCouncil,
  activeCouncil,
  setShowConfirm,
}: {
  selectedCouncil?: CouncilSlugs;
  activeCouncil: CouncilSlugs;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const wallet = useWallet();
  const { data: nominationInformation } = useGetIsNominated(wallet?.address);
  const { data: user } = useGetUserDetailsQuery(wallet?.address);

  const { mutate, isPending, isSuccess } = useEditNomination({
    currentNomination: nominationInformation?.council.slug,
    nextNomination: selectedCouncil,
  });

  useEffect(() => {
    if (isSuccess) setShowConfirm(false);
  }, [isSuccess, setShowConfirm]);

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading fontSize="medium">Confirm changes</Heading>
        <IconButton
          onClick={() => {
            navigate(`/councils/${activeCouncil}?nominate=false`);
            setShowConfirm(false);
          }}
          size="xs"
          aria-label="close button"
          icon={<CloseIcon />}
          variant="ghost"
          colorScheme="whiteAlpha"
          color="white"
        />
      </Flex>
      <Text fontSize="sm" color="gray.500" mt="2">
        Nominate yourself to represent one of the Synthetix Governing Councils. Your will be
        nominating the wallet below:
      </Text>
      <Flex
        rounded="base"
        borderColor="gray.900"
        borderStyle="solid"
        borderWidth="1px"
        alignItems="center"
        p="2"
        mt="3"
      >
        {user?.pfpImageId ? (
          <Image src={user.pfpImageId} w="10" h="10" />
        ) : (
          <Blockies
            seed={user?.address.toLowerCase() || '0x'}
            size={10}
            className="fully-rounded"
          />
        )}
        <Flex flexDirection="column" ml="2">
          <Text fontSize="xs" color="white" fontWeight="bold">
            {user?.ens || shortAddress(user?.address)}
          </Text>
          <Text fontSize="xs">Nomination Wallet: {shortAddress(user?.address)}</Text>
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mt="2">
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
              <Image src={nominationInformation.council.image} w="6" h="6" />
            </Flex>
            <Text fontSize="x-small" fontWeight="bold">
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
          <Text fontSize="x-small" fontWeight="bold">
            {councils.find((c) => c.slug === selectedCouncil)?.title || 'None'}
          </Text>
        </Flex>
      </Flex>
      {isPending ? (
        <Flex w="100%" justifyContent="center">
          loading
          <Spinner colorScheme="cyan" />
        </Flex>
      ) : (
        <>
          <Button
            mt="auto"
            onClick={() => {
              mutate();
            }}
          >
            Edit Nomination
          </Button>
          <Button
            variant="outline"
            colorScheme="gray"
            mt="2"
            onClick={() => {
              setShowConfirm(false);
              navigate(`/councils/${activeCouncil}?nominate=false`);
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
}
