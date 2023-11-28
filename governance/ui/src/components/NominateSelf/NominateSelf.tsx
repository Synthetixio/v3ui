import { Button, Flex, Heading, IconButton, Image, Spinner, Text } from '@chakra-ui/react';
import { useWallet } from '@snx-v3/useBlockchain';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useState } from 'react';
import useNominateSelf from '../../mutations/useNominateSelf';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

export default function NominateSelf({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [selectedCouncil, setSelectedCouncil] = useState(activeCouncil);
  const navigate = useNavigate();
  const wallet = useWallet();
  const { mutate, isPending, isSuccess } = useNominateSelf(activeCouncil, wallet?.address);

  return (
    <Flex
      flexDirection="column"
      bg="navy.700"
      w="100%"
      maxW="483px"
      maxH="650px"
      borderColor="gray.900"
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      p="6"
      justifyContent="center"
    >
      {isSuccess ? (
        <>
          <Flex justifyContent="space-between" w="100%">
            <Heading fontSize="medium">Nomination Successful</Heading>
            <IconButton
              onClick={() => navigate('/councils' + `?active=${activeCouncil}&nominate=false`)}
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
          {wallet?.address}
          <Text fontSize="sm" color="gray.500" mt="2">
            Nominated for:
          </Text>
          <Flex
            key={`tab-nomination-${selectedCouncil}-done`}
            w="100%"
            height="58px"
            rounded="base"
            borderColor={'gray.900'}
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
          <Button onClick={() => navigate('/councils' + `?active=${activeCouncil}`)}>Done</Button>
        </>
      ) : (
        <>
          <Flex justifyContent="space-between">
            <Heading fontSize="medium">Nominate Self</Heading>
            <IconButton
              onClick={() => navigate('/councils' + `?active=${activeCouncil}&nominate=false`)}
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
          {wallet?.address}
          <Text fontSize="sm" color="gray.500" mb="2">
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
          </Flex>

          {isPending ? (
            <Flex w="100%" justifyContent="center">
              <Spinner colorScheme="cyan" />
            </Flex>
          ) : (
            <Button mt="12" onClick={() => mutate()}>
              Nominate Self
            </Button>
          )}
        </>
      )}
    </Flex>
  );
}
