import { Button, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { useWallet } from '@snx-v3/useBlockchain';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEditNomination from '../../mutations/useEditNomination';
import { CloseIcon } from '@chakra-ui/icons';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import '../UserProfileCard/UserProfileCard.css';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import EditNominationConfirmation from './EditNominationConfirmation';
import EditNominationSelect from './EditNominationSelect';

export default function EditNomination({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const [selectedCouncil, setSelectedCouncil] = useState<CouncilSlugs | undefined>(undefined);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const wallet = useWallet();
  const { data: nominatedFor } = useGetIsNominated(wallet?.address);
  const { data: councilPeriodFromNomination } = useGetCurrentPeriod(activeCouncil);

  const { isSuccess } = useEditNomination({
    currentNomination: typeof nominatedFor === 'object' ? nominatedFor.slug : undefined,
    nextNomination: selectedCouncil,
  });

  if (councilPeriodFromNomination === '2') {
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
        Not possible during Voting
      </Flex>
    );
  }

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
        <EditNominationConfirmation
          selectedCouncil={selectedCouncil}
          activeCouncil={activeCouncil}
          setShowConfirm={setShowConfirm}
        />
      ) : (
        <EditNominationSelect
          selectedCouncil={selectedCouncil}
          activeCouncil={activeCouncil}
          setSelectedCouncil={setSelectedCouncil}
          setShowConfirm={setShowConfirm}
        />
      )}
    </Flex>
  );
}
