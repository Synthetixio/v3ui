import { Button, Flex, FlexProps, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useEditNomination from '../../mutations/useEditNomination';
import { CloseIcon } from '@chakra-ui/icons';
import { useGetIsNominated } from '../../queries/useGetIsNominated';
import { useWallet } from '../../queries/useWallet';
import EditNominationConfirmation from './EditNominationConfirmation';
import EditNominationSelect from './EditNominationSelect';

interface EditNominationProps extends FlexProps {
  activeCouncil: CouncilSlugs;
}

export default function EditNomination({ activeCouncil, ...props }: EditNominationProps) {
  const location = useLocation();
  const [selectedCouncil, setSelectedCouncil] = useState<CouncilSlugs | undefined | null>(
    location.pathname.includes(activeCouncil) ? null : activeCouncil
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { activeWallet } = useWallet();
  const { data: nominationInformation } = useGetIsNominated(activeWallet?.address);

  const { isSuccess } = useEditNomination({
    currentNomination: nominationInformation?.council.slug,
    nextNomination: selectedCouncil,
  });

  return (
    <Flex
      flexDirection="column"
      bg="navy.700"
      w="100%"
      maxW={{ base: '100%', xl: '451px' }}
      h="612px"
      borderColor="gray.900"
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      p="6"
      data-cy="edit-nomination"
      {...props}
    >
      <IconButton
        onClick={() => navigate(`/councils/${activeCouncil}`)}
        size="xs"
        aria-label="close button"
        icon={<CloseIcon />}
        variant="ghost"
        colorScheme="whiteAlpha"
        color="white"
        position="absolute"
        top="10px"
        right="10px"
      />
      {isSuccess ? (
        <>
          <Heading fontSize="medium">Nomination Successful</Heading>
          <Text fontSize="sm" color="gray.500" mt="2">
            Nominee:
          </Text>
          {activeWallet?.address}
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
              {!selectedCouncil && <Image src="" w="6" h="6" />}
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
          setSelectedCouncil={setSelectedCouncil}
          setShowConfirm={setShowConfirm}
        />
      )}
    </Flex>
  );
}
