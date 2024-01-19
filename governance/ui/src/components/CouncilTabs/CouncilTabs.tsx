import { Flex, Hide, Show, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetVotingCandidates } from '../../queries/useGetVotingCandidates';
import { CouncilsSelect } from './CouncilSelect';
import { CouncilImage } from '../CouncilImage';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { MyVotes } from './MyVotes';

export default function CouncilTabs({ activeCouncil }: { activeCouncil?: CouncilSlugs }) {
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { data: votes } = useGetVotingCandidates();
  const { data: schedule, isLoading } = useGetEpochSchedule(activeCouncil);

  const navigate = useNavigate();

  return (
    <>
      <Hide above="lg">
        <Flex
          w="100%"
          bg="navy.700"
          borderBottomWidth="1px"
          borderStyle="solid"
          borderBottomColor="gray.900"
          px={4}
          py={1}
          position="sticky"
          top="0px"
          justifyContent="space-between"
          alignItems="center"
          zIndex={99}
        >
          {/* If on my votes page, spartan council is active by default for navigation */}
          <CouncilsSelect activeCouncil={activeCouncil || councils[0].slug} />
          <MyVotes
            isLoading={isLoading}
            councilPeriod={councilPeriod}
            schedule={schedule}
            votes={votes}
          />
        </Flex>
      </Hide>
      <Show above="lg">
        <Flex
          w="100%"
          gap="4"
          bg="navy.700"
          borderBottomWidth="1px"
          borderStyle="solid"
          borderBottomColor="gray.900"
          py="4"
          px="6"
          justifyContent="center"
          mb="4"
          position="sticky"
          top="0px"
          zIndex={99}
        >
          <Flex maxW="1440px" w="100%" justifyContent="center" gap="3">
            {councils.map((council) => (
              <Flex
                key={`tab-${council.slug}`}
                cursor="pointer"
                onClick={() => navigate(`/councils/${council.slug}`)}
                w="100%"
                height="48px"
                rounded="base"
                borderColor={activeCouncil === council.slug ? 'cyan.500' : 'gray.900'}
                borderWidth="1px"
                py="1"
                alignItems="center"
                bg="navy.700"
                _hover={{ borderColor: 'cyan.500' }}
              >
                <CouncilImage ml={2} imageUrl={council.image} />
                <Text fontSize="12px" fontWeight="bold" mr="auto">
                  {council.title}
                </Text>
              </Flex>
            ))}
            <MyVotes
              isLoading={isLoading}
              councilPeriod={councilPeriod}
              schedule={schedule}
              votes={votes}
            />
          </Flex>
        </Flex>
      </Show>
    </>
  );
}
