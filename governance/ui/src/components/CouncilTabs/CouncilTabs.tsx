import { Box, Button, Flex, Hide, Show, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { CouncilsSelect } from './CouncilSelect';
import { CouncilImage } from '../CouncilImage';
import { useGetEpochSchedule } from '../../queries/useGetEpochSchedule';
import { MyVotesSummary } from '../MyVotesSummary';
import {
  useGetUserDetailsQuery,
  useGetUserBallot,
  useNetwork,
  useGetEpochIndex,
} from '../../queries';
import { ProfilePicture } from '../UserProfileCard/ProfilePicture';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { utils } from 'ethers';
import { useVoteContext } from '../../context/VoteContext';
import { getVoteSelectionState } from '../../utils/localstorage';

export default function CouncilTabs({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const location = useLocation();
  const isInMyVotesPage = location.pathname.includes('my-votes');
  const isInMyProfilePage = location.pathname.includes('profile');
  const { data: schedule, isLoading } = useGetEpochSchedule(activeCouncil);
  const { network } = useNetwork();
  const { data: epochId } = useGetEpochIndex(activeCouncil);
  const { state } = useVoteContext();
  // @dev dont put activeCounil in here cause its always spartan for the timer
  const networkForState = getVoteSelectionState(state, epochId, network?.id.toString());

  const votedNomineesData = [
    useGetUserBallot('spartan'),
    useGetUserBallot('ambassador'),
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
  ];
  const userInformation = userInformationData.map((data) => ({
    ...data,
    userInformation: data.userInformation.data,
  }));

  return (
    <>
      <Hide above="xl">
        <Flex
          w="100%"
          h="73px"
          bg="navy.700"
          borderBottomWidth="1px"
          borderStyle="solid"
          borderBottomColor="gray.900"
          px={{ base: 4, md: 6 }}
          py={3}
          position="sticky"
          top="0px"
          justifyContent="space-between"
          alignItems="center"
          zIndex={99}
        >
          {isInMyVotesPage ? (
            <Button
              colorScheme="gray"
              variant="outline"
              leftIcon={<ArrowBackIcon />}
              onClick={() => {
                navigate('/councils/spartan');
              }}
            >
              Back to Councils
            </Button>
          ) : (
            // If on my votes page, spartan council is active by default for navigation
            <>
              <CouncilsSelect activeCouncil={activeCouncil || councils[0].slug} />
              <MyVotesSummary
                isLoading={isLoading}
                councilPeriod={councilPeriod}
                schedule={schedule}
                isInMyVotesPage={false}
              />
            </>
          )}
        </Flex>
      </Hide>
      <Show above="xl">
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
          mb="5"
          position="sticky"
          top="0px"
          zIndex={99}
        >
          <Flex maxW="1440px" w="100%" justifyContent="center" gap="3">
            {councils.map((council, index) => {
              const newVoteCast =
                networkForState && typeof networkForState !== 'string'
                  ? networkForState[council.slug]
                  : '';
              // TODO @fix here
              // console.log(newVoteCast, userInformation[index].userInformation?.address);

              return (
                <Flex
                  key={`tab-${council.slug}`}
                  cursor="pointer"
                  onClick={() => navigate(`/councils/${council.slug}`)}
                  w="100%"
                  height="48px"
                  rounded="base"
                  borderColor={
                    isInMyProfilePage
                      ? 'gray.900'
                      : activeCouncil === council.slug && !isInMyVotesPage
                        ? 'cyan.500'
                        : 'gray.900'
                  }
                  borderWidth="1px"
                  py="1"
                  alignItems="center"
                  bg="navy.700"
                  _hover={{
                    bg: 'linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), #0B0B22;',
                  }}
                  px="2"
                  data-cy={`council-tab-button-${council.slug}`}
                >
                  <CouncilImage
                    imageUrl={council.image}
                    imageProps={{
                      w: '8',
                      h: '8',
                    }}
                    w="10"
                    h="10"
                    bg="none"
                    dataCy={`council-image-council-tabs-${council.slug}`}
                  />
                  <Text fontSize="14px" fontWeight="bold" mr="auto">
                    {council.title}
                  </Text>
                  {councilPeriod === '2' && utils.isAddress(newVoteCast || '') ? (
                    <ProfilePicture
                      address={userInformation[index].userInformation?.address}
                      size={9}
                      newVoteCast={newVoteCast}
                      isCouncilTabs={true}
                    />
                  ) : (
                    councilPeriod === '2' && (
                      <>
                        {userInformation[index].userInformation?.address && (
                          <ProfilePicture
                            address={userInformation[index].userInformation?.address}
                            size={9}
                            newVoteCast={newVoteCast}
                          />
                        )}

                        {newVoteCast && userInformation[index].userInformation?.address && (
                          <ArrowForwardIcon mx="2" />
                        )}
                        <Box
                          data-cy="council-tab-vote-circle"
                          borderRadius="50%"
                          w="9"
                          h="9"
                          borderWidth="1px"
                          bg="navy.700"
                          borderStyle="dashed"
                          borderColor="gray.500"
                        />
                      </>
                    )
                  )}
                </Flex>
              );
            })}
            <MyVotesSummary
              isLoading={isLoading}
              councilPeriod={councilPeriod}
              schedule={schedule}
              isInMyVotesPage={isInMyVotesPage}
            />
          </Flex>
        </Flex>
      </Show>
    </>
  );
}
