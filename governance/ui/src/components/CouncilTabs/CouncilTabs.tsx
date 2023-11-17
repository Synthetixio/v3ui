import { Flex, Image, Text } from '@chakra-ui/react';
import councils, { Council } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';

export default function CouncilTabs({ activeCouncil }: { activeCouncil: Council['slug'] }) {
  const navigate = useNavigate();
  return (
    <Flex
      w="100%"
      gap="4"
      bg="navy.700"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.900"
      px="10"
      py="4"
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
          <Text fontSize="x-small" fontWeight="bold">
            {council.title}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
