import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import councils, { CouncilSlugs } from '../../utils/councils';
import { useGetCouncilMembers } from '../../queries/useGetCouncilMembers';

export default function CouncilInformation({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  const { data: getCouncilMembers } = useGetCouncilMembers(activeCouncil);
  const council = councils.find((council) => council.slug === activeCouncil);

  return (
    <Flex w="100%" maxW="735px" h="178px" py="5">
      <Flex
        borderRadius="50%"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.900"
        w="32"
        h="32"
        justifyContent="center"
        alignItems="center"
        mr="3"
      >
        <Image src={council?.image} w="32" h="32" />
      </Flex>
      <Flex flexDir="column">
        <Heading fontSize="large">{council?.title}</Heading>
        <Text fontSize="sm" color="gray.500">
          {council?.description}
        </Text>
        <Flex justifyContent={'space-between'} w="100%">
          <Heading fontSize="xs" mr="11">
            Council Seats: {getCouncilMembers?.length}
          </Heading>
          <Heading fontSize="xs">Stipends P/M: {council?.stipends}</Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}
