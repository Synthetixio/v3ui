import { Flex, Image, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';

export default function CouncilTabs({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);
  const navigate = useNavigate();
  return (
    <Flex
      w="100%"
      gap="4"
      bg="navy.700"
      borderBottomWidth="1px"
      borderStyle="solid"
      borderBottomColor="gray.900"
      px="10"
      py="4"
      justifyContent="center"
      mb="4"
    >
      {councils.map((council) => (
        <Flex
          key={`tab-${council.slug}`}
          cursor="pointer"
          onClick={() => navigate('/councils' + `?active=${council.slug}`)}
          w="100%"
          height="48px"
          maxW="260px"
          rounded="base"
          borderColor={activeCouncil === council.slug ? 'cyan.500' : 'gray.900'}
          borderWidth="1px"
          padding="2"
          alignItems="center"
          bg="navy.900"
        >
          <Flex
            borderRadius="50%"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.900"
            w="8"
            h="8"
            justifyContent="center"
            alignItems="center"
            mr="3"
          >
            <Image src={council.image} w="6" h="6" />
          </Flex>
          <Text fontSize="x-small" fontWeight="bold" mr="auto">
            {council.title}
          </Text>
          {councilPeriod === '2' && (
            <Flex
              borderRadius="50%"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="gray.900"
              w="8"
              h="8"
              justifyContent="center"
              alignItems="center"
              mr="3"
            ></Flex>
          )}
        </Flex>
      ))}
      {councilPeriod === '2' && (
        <Flex
          key="tab-my-votes"
          cursor="pointer"
          onClick={() => navigate('/my-votes')}
          w="100%"
          height="48px"
          maxW="260px"
          rounded="base"
          borderColor="gray.900"
          borderWidth="1px"
          padding="2"
          alignItems="center"
          bg="navy.900"
        >
          <Text fontSize="x-small" fontWeight="bold" mr="auto">
            My Votes
          </Text>
          <Text fontSize="x-small" fontWeight="bold">
            TODO 1/4
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
