import {
  Button,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Image,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useEffect, useState } from 'react';
import useNominateSelf from '../../mutations/useNominateSelf';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import { useGetCurrentPeriod, useGetIsNominated, useGetUserDetailsQuery } from '../../queries';
import { useNetwork, useWallet } from '../../queries/useWallet';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';
import { isMotherchain } from '../../utils/contracts';

interface NominateSelfProps extends FlexProps {
  activeCouncil: CouncilSlugs;
}

export default function NominateSelf({ activeCouncil, ...props }: NominateSelfProps) {
  const [selectedCouncil, setSelectedCouncil] = useState(activeCouncil);
  const [showSnaxChainBanner, setShowSnaxChainBanner] = useState(false);
  const [sentTx, setSentTx] = useState(false);
  const navigate = useNavigate();

  const { network, setNetwork } = useNetwork();
  const { activeWallet } = useWallet();
  const { data: nominationInformation } = useGetIsNominated(activeWallet?.address);
  const { data: currentPeriod } = useGetCurrentPeriod(activeCouncil);

  const {
    mutateAsync,
    isPending,
    isSuccess,
    data: resultNomination,
  } = useNominateSelf(selectedCouncil, activeWallet?.address);
  const { data } = useGetUserDetailsQuery(activeWallet?.address);

  const isInNominationOrVoting =
    currentPeriod === '1' ? true : currentPeriod === '2' ? true : false;

  useEffect(() => {
    if ((nominationInformation?.isNominated && !sentTx) || !isInNominationOrVoting) {
      navigate('/councils/' + activeCouncil);
    }
  }, [nominationInformation?.isNominated, navigate, activeCouncil, sentTx, isInNominationOrVoting]);

  useEffect(() => {
    if (network?.id && !isMotherchain(network.id)) {
      setShowSnaxChainBanner(true);
    }
  }, [network?.id]);

  return (
    <Flex
      mb="24"
      flexDirection="column"
      bg="navy.700"
      w="100%"
      maxW={{ base: '100%', xl: '451px' }}
      borderColor="gray.900"
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      p="6"
      h="612px"
      data-cy="nominate-self-modal"
      {...props}
    >
      {showSnaxChainBanner ? (
        <>
          <Flex justifyContent="space-between" w="100%">
            <Heading fontSize="medium">Nomination only available on Snaxchain</Heading>
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
          <Text fontSize="sm" color="gray.500" mt="3">
            Nomination is only available on Snaxchain. Please bridge ETH to Snaxchain and switch
            your network to proceed.
          </Text>
          <Image src="/snaxchain-banner.png" mb="auto" mt="12" />
          <Link href="https://superbridge.app/snaxchain-mainnet" target="_blank" w="100%">
            <Button w="100%">Bridge Eth to Snaxchain</Button>
          </Link>
          <Button variant="outline" mt="2" colorScheme="gray" onClick={() => setNetwork(2192)}>
            Switch Network
          </Button>
        </>
      ) : isSuccess && resultNomination ? (
        <>
          <Flex justifyContent="space-between" w="100%">
            <Heading fontSize="medium">Nomination Successful</Heading>
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
            Nominee:
          </Text>
          <Flex
            border="1px solid"
            borderColor="gray.900"
            p="2"
            rounded="base"
            mt="2"
            alignItems="center"
            mb="12"
          >
            <ProfilePicture address={activeWallet?.address} size={10} />
            <Flex ml="2" flexDir="column">
              <Text
                fontWeight={700}
                fontSize="14px"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                maxW="300px"
              >
                {data?.username ? data.username : prettyString(activeWallet?.address || '')}
              </Text>
              <Text fontSize="12px" color="gray.500">
                Nomination Wallet: {prettyString(data?.address || '')}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize="sm" color="gray.500" my="2">
            Nominated for:
          </Text>
          <Flex
            key={`tab-nomination-${selectedCouncil}-done`}
            w="100%"
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
              <Image
                src={councils.find((council) => council.slug === selectedCouncil)?.image}
                w="6"
                h="6"
              />
            </Flex>
            <Text fontSize="sm" fontWeight="bold">
              {councils.find((council) => council.slug === selectedCouncil)?.title}
            </Text>
          </Flex>
          <Button
            onClick={() => navigate(`/councils/${activeCouncil}?nominate=false`)}
            mt="auto"
            data-cy="nominate-self-done-button"
          >
            Done
          </Button>
        </>
      ) : (
        <>
          <Flex justifyContent="space-between">
            <Heading fontSize="md">Nominate Self</Heading>
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
            Nominate yourself to represent a Synthetix Governing Council with the wallet below:
          </Text>
          <Flex
            border="1px solid"
            borderColor="gray.900"
            p="2"
            rounded="base"
            mt="3"
            mb="12"
            alignItems="center"
          >
            <ProfilePicture address={data?.address} size={10} />
            <Flex ml="2" flexDir="column">
              <Text
                fontWeight={700}
                fontSize="14px"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                maxW="300px"
                data-cy="nominate-self-username"
              >
                {data?.username ? data.username : prettyString(activeWallet?.address || '')}
              </Text>
              <Text fontSize="12px" color="gray.500">
                Nomination Wallet: {prettyString(data?.address || '')}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize="sm" color="gray.500" mb="2">
            Chose which governing body you would like to represent if chosen as an elected member:
          </Text>
          <Flex flexDirection="column" mb="auto">
            {councils.map((council) => (
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
                data-cy={`council-nomination-select-${council.slug}`}
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
                  <Image src={council.image} w="6" h="6" />
                </Flex>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  data-cy="council-select-button-text-nominate-self"
                >
                  {council.title}
                </Text>
              </Flex>
            ))}
          </Flex>
          {isPending ? (
            <Button variant="unstyled" cursor="progress" mt="auto">
              <Flex w="100%" justifyContent="center" gap="2" color="cyan.500">
                <Spinner colorScheme="cyan" /> Loading
              </Flex>
            </Button>
          ) : (
            <Button
              onClick={async () => {
                setSentTx(true);
                await mutateAsync();
              }}
              mt="auto"
              data-cy="nominate-self-cast-nomination-button"
            >
              Nominate Self
            </Button>
          )}
        </>
      )}
    </Flex>
  );
}
