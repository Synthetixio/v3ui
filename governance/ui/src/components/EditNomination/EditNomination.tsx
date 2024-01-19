import { Button, Flex, Heading, IconButton, Image, Spinner, Text } from '@chakra-ui/react';
import { useWallet } from '@snx-v3/useBlockchain';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEditNomination from '../../mutations/useEditNomination';
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import Blockies from 'react-blockies';
import '../UserProfileCard/UserProfileCard.css';
import { shortAddress } from '../../utils/address';

export default function EditNomination({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [selectedCouncil, setSelectedCouncil] = useState<CouncilSlugs | undefined>(activeCouncil);
  const navigate = useNavigate();
  const wallet = useWallet();
  const { data: nominatedFor } = useGetIsNominated(wallet?.address);
  const { data: user } = useGetUserDetailsQuery(wallet?.address);
  const { mutate, isPending, isSuccess } = useEditNomination({
    currentNomination: typeof nominatedFor === 'object' ? nominatedFor.slug : undefined,
    nextNomination: selectedCouncil,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isSuccess) setShowConfirm(false);
  }, [isSuccess]);

  return (
    <Flex
      flexDirection="column"
      bg="navy.700"
      w="100%"
      borderColor="gray.900"
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      p="6"
    >
      {isSuccess ? (
        <>
          <Flex justifyContent="space-between" mb="auto">
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
          {wallet?.address}
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
            my="auto"
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
              {!selectedCouncil && (
                <Image
                  src={councils.find((council) => council.slug === selectedCouncil)?.image}
                  w="6"
                  h="6"
                />
              )}
            </Flex>
            <Text fontSize="x-small" fontWeight="bold">
              {!selectedCouncil
                ? 'None'
                : councils.find((council) => council.slug === selectedCouncil)?.title}
            </Text>
          </Flex>
          <Button onClick={() => navigate(`/councils/${activeCouncil}`)} mt="auto">
            Done
          </Button>
        </>
      ) : showConfirm ? (
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
            {typeof nominatedFor === 'object' ? (
              <Flex
                key={`tab-nomination-${nominatedFor.docLink}`}
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
                  <Image src={nominatedFor.image} w="6" h="6" />
                </Flex>
                <Text fontSize="x-small" fontWeight="bold">
                  {nominatedFor.title}
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
              <Spinner colorScheme="cyan" />
            </Flex>
          ) : (
            <>
              <Button
                mt="auto"
                onClick={() => {
                  // setShowConfirm(false);
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
      ) : (
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
                    src={typeof nominatedFor === 'object' ? nominatedFor.image : ''}
                    w="6"
                    h="6"
                  />
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
              .filter((c) =>
                typeof nominatedFor === 'object' ? nominatedFor.slug !== c.slug : true
              )
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
      )}
    </Flex>
  );
}
