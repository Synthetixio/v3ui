import { Button, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import councils, { CouncilSlugs } from '../../utils/councils';
import { CloseIcon } from '@chakra-ui/icons';
import Blockies from 'react-blockies';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import { useWallet } from '@snx-v3/useBlockchain';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { Dispatch, SetStateAction } from 'react';
import { shortAddress } from '../../utils/address';

export default function EditNominationSelect({
  activeCouncil,
  selectedCouncil,
  setSelectedCouncil,
  setShowConfirm,
}: {
  activeCouncil: CouncilSlugs;
  selectedCouncil?: CouncilSlugs;
  setSelectedCouncil: Dispatch<SetStateAction<CouncilSlugs | undefined>>;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const wallet = useWallet();
  const { data: nominatedFor } = useGetIsNominated(wallet?.address);
  const { data: user } = useGetUserDetailsQuery(wallet?.address);
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading fontSize="medium">Edit Nomination</Heading>
        <IconButton
          onClick={() => navigate(`/councils/${activeCouncil}?nominate=false`)}
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
      {nominatedFor !== false && (
        <>
          <Text fontSize="sm" color="gray.500" mb="2">
            You will withdraw your nomination from:
          </Text>
          <Flex
            key="council-user-nominated-for"
            w="100%"
            height="58px"
            rounded="base"
            borderColor="cyan.500"
            borderWidth="1px"
            padding="2"
            alignItems="center"
            mb="12"
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
              <Image src={typeof nominatedFor === 'object' ? nominatedFor.image : ''} w="6" h="6" />
            </Flex>
            <Text fontSize="x-small" fontWeight="bold">
              {typeof nominatedFor === 'object' && nominatedFor.title}
            </Text>
          </Flex>
        </>
      )}
      <Text fontSize="xs" color="gray.500">
        Chose which governing body you would like to represent if chosen as an elected member:
      </Text>
      <Flex flexDirection="column">
        {councils
          .filter((c) => (typeof nominatedFor === 'object' ? nominatedFor.slug !== c.slug : true))
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
                <Image src={council.image} w="6" h="6" />
              </Flex>
              <Text fontSize="x-small" fontWeight="bold">
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
          borderColor={!selectedCouncil ? 'cyan.500' : 'gray.900'}
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
          ></Flex>
          <Text fontSize="x-small" fontWeight="bold">
            None
          </Text>
        </Flex>
      </Flex>

      <Button mt="12" onClick={() => setShowConfirm(true)}>
        Edit Nomination
      </Button>
    </>
  );
}
