import { Flex, Heading, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useGetCouncilMembers } from '../../queries/useGetCouncilMembers';
import { CouncilImage } from '../CouncilImage';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function CouncilInformation({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const { data: getCouncilMembers } = useGetCouncilMembers(activeCouncil);
  const council = councils.find((council) => council.slug === activeCouncil);

  return (
    <Flex py="5" maxW="735px" w="100%" flexDirection={{ base: 'column', md: 'row' }}>
      <Flex>
        <CouncilImage
          imageUrl={council?.image || ''}
          width="130px"
          height="130px"
          imageProps={{ w: '108px', h: '108px' }}
        />
      </Flex>
      <Flex
        width={{ base: '100%' }}
        flexDir="column"
        ml={{ base: 'unset', md: '24px' }}
        mt={{ base: '24px', md: 'unset' }}
      >
        <Heading fontSize="lg" mb="2">
          {council?.title}
        </Heading>
        <Text
          w={{ base: '100%', md: '581px' }}
          fontSize="14px"
          lineHeight="20px"
          fontFamily="heading"
          color="gray.500"
        >
          {council?.description}
        </Text>
        <Flex w="100%" mt="2" gap={{ md: '6' }}>
          <Heading
            fontSize="xs"
            lineHeight="1rem"
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            px="2"
            py="1"
          >
            Council Seats: {getCouncilMembers?.length}
          </Heading>
          <Heading
            fontSize="xs"
            lineHeight="1rem"
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            px="2"
            py="1"
          >
            Stipends P/M: {council?.stipends}
          </Heading>
          <Link to={council!.docLink} target="_blank" rel="noopener noreferrer">
            <Heading
              fontSize="xs"
              lineHeight="1rem"
              border="1px solid"
              borderColor="gray.900"
              rounded="base"
              px="2"
              py="1"
              cursor="pointer"
            >
              Learn more <ExternalLinkIcon />
            </Heading>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
