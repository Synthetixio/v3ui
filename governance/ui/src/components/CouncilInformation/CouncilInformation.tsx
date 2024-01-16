import { Flex, Heading, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useGetCouncilMembers } from '../../queries/useGetCouncilMembers';
import { CouncilImage } from '../CouncilImage';

export default function CouncilInformation({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const { data: getCouncilMembers } = useGetCouncilMembers(activeCouncil);
  const council = councils.find((council) => council.slug === activeCouncil);

  return (
    <Flex py="5">
      <CouncilImage
        imageUrl={council?.image || ''}
        width="130px"
        height="130px"
        imageProps={{ w: '108px', h: '108px' }}
      />
      <Flex flexDir="column" maxWidth="80%">
        <Heading fontSize="lg" mb="2">
          {council?.title}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {council?.description}
        </Text>
        <Flex justifyContent="space-between" w="100%" mt="2">
          <Heading fontSize="xs" mr="11">
            Council Seats: {getCouncilMembers?.length}
          </Heading>
          <Heading fontSize="xs">Stipends P/M: {council?.stipends}</Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}
