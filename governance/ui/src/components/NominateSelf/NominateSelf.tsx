import {
  Button,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useState } from 'react';
import useNominateSelf from '../../mutations/useNominateSelf';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import { useGetUserDetailsQuery } from '../../queries';
import { useWallet } from '../../queries/useWallet';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { prettyString } from '@snx-v3/format';

interface NominateSelfProps extends FlexProps {
  activeCouncil: CouncilSlugs;
}

export default function NominateSelf({ activeCouncil, ...props }: NominateSelfProps) {
  const [selectedCouncil, setSelectedCouncil] = useState(activeCouncil);
  const navigate = useNavigate();

  const { activeWallet } = useWallet();

  const { mutate, isPending, isSuccess } = useNominateSelf(activeCouncil, activeWallet?.address);
  const { data } = useGetUserDetailsQuery(activeWallet?.address);

  return (
    <Flex
      flexDirection="column"
      bg="navy.700"
      w="100%"
      maxW="451px"
      borderColor="gray.900"
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      p="6"
      mt="6"
      h="fit-content"
      {...props}
    >
      {isSuccess ? (
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
            my="2"
            alignItems="center"
          >
            <ProfilePicture imageSrc={data?.pfpUrl} address={activeWallet?.address} />
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
                Nomination Wallet: {prettyString(data!.address)}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize="sm" color="gray.500" mt="2">
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
            <Text fontSize="x-small" fontWeight="bold">
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
            Nominate yourself to represent one of the Synthetix Governing Councils. Your will be
            nominating the wallet below:
          </Text>
          <Flex
            border="1px solid"
            borderColor="gray.900"
            p="2"
            rounded="base"
            my="2"
            alignItems="center"
          >
            <ProfilePicture imageSrc={data?.pfpUrl} address={data?.address} />
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
          <Text fontSize="sm" color="gray.500" mb="2" pt="12">
            Chose which governing body you would like to represent if chosen as an elected member:
          </Text>
          <Flex flexDirection="column">
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
            <Flex w="100%" justifyContent="center">
              loading <Spinner colorScheme="cyan" />
            </Flex>
          ) : (
            <Button
              onClick={() => mutate()}
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
