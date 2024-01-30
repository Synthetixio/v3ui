import { Box, Flex, Hide, Show, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilsSelect } from './CouncilSelect';
import { CouncilImage } from '../CouncilImage';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { MyVotesSummary } from '../MyVotesSummary';
import useGetUserBallot from '../../queries/useGetUserBallot';
import useGetUserDetailsQuery from '../../queries/useGetUserDetailsQuery';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';

export default function CouncilTabs({ activeCouncil }: { activeCouncil?: CouncilSlugs }) {
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const { data: schedule, isLoading } = useGetEpochSchedule(activeCouncil);
  const votedNomineesData = [
    useGetUserBallot('spartan'),
    useGetUserBallot('ambassador'),
    useGetUserBallot('grants'),
    useGetUserBallot('treasury'),
  ];
  const navigate = useNavigate();
  const votedNominees = votedNomineesData.map(({ data }) => data);

  const userInformationData = [
    {
      council: votedNominees[0]?.council,
      userInformation: useGetUserDetailsQuery(votedNominees[0]?.votedCandidates[0]),
    },
    {
      council: votedNominees[1]?.council,
      userInformation: useGetUserDetailsQuery(votedNominees[1]?.votedCandidates[0]),
    },
    {
      council: votedNominees[2]?.council,
      userInformation: useGetUserDetailsQuery(votedNominees[2]?.votedCandidates[0]),
    },
    {
      council: votedNominees[3]?.council,
      userInformation: useGetUserDetailsQuery(votedNominees[3]?.votedCandidates[0]),
    },
  ];
  const userInformation = userInformationData.map((data) => ({
    ...data,
    userInformation: data.userInformation.data,
  }));

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
          <MyVotesSummary isLoading={isLoading} councilPeriod={councilPeriod} schedule={schedule} />
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
            {councils.map((council, index) => (
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
                px="2"
              >
                <CouncilImage imageUrl={council.image} />
                <Text fontSize="12px" fontWeight="bold" mr="auto">
                  {council.title}
                </Text>
                {userInformation[index].userInformation?.pfpUrl ||
                !!userInformation[index].userInformation?.address ? (
                  <ProfilePicture
                    imageSrc={userInformation[index].userInformation?.pfpUrl}
                    address={userInformation[index].userInformation?.address}
                  />
                ) : (
                  <Box
                    borderRadius="50%"
                    w="8"
                    h="8"
                    borderWidth="1px"
                    bg="navy.700"
                    borderStyle="dashed"
                    borderColor="gray.500"
                  />
                )}
              </Flex>
            ))}
            <MyVotesSummary
              isLoading={isLoading}
              councilPeriod={councilPeriod}
              schedule={schedule}
            />
          </Flex>
        </Flex>
      </Show>
    </>
  );
}
