import { Flex, Hide, Show, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import councils, { CouncilSlugs } from '../../utils/councils';
import { CouncilImage } from '../CouncilImage';
import { CouncilsSelect } from './CouncilSelect';

export default function CouncilTabs({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const location = useLocation();
  const isInMyVotesPage = location.pathname.includes('my-votes');
  const isInMyProfilePage = location.pathname.includes('profile');
  const navigate = useNavigate();

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
          <CouncilsSelect activeCouncil={activeCouncil || councils[0].slug} />
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
            {councils.map((council) => {
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
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Show>
    </>
  );
}
