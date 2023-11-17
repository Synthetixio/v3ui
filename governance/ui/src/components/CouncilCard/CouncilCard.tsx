import { Badge, Button, Divider, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { Council } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetCouncilMembers } from '../../queries/useGetCouncilMembers';

interface CouncilCardProps {
  council: Council;
  isLast: boolean;
}

export function CouncilCard({ council, isLast }: CouncilCardProps) {
  const navigate = useNavigate();
  const { data: councilPeriod } = useGetCurrentPeriod(council.slug);
  const { data: electedCouncilMembers } = useGetCouncilMembers(council.slug);
  console.log(councilPeriod);
  return (
    <Flex
      p="6"
      mr={isLast ? '0px' : '24px'}
      mt="30px"
      w="290px"
      h="413px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.900"
      borderRadius="base"
      flexDir="column"
      alignItems="center"
    >
      <Image src={council.image} h="80px" mb="4" />
      <Heading fontSize="20px" lineHeight="28px" textAlign="center" mb="4">
        {council.title}
      </Heading>
      {!councilPeriod ? (
        <Spinner colorScheme="cyan" />
      ) : councilPeriod === '0' ? (
        <Badge bg="purple.600" color="white" mb="6" textTransform="uppercase">
          Closed - Council Elected
        </Badge>
      ) : councilPeriod === '1' ? (
        <Badge bg="orange.600" color="white" mb="6" textTransform="uppercase">
          Nomination Open
        </Badge>
      ) : councilPeriod === '2' ? (
        <Badge bg="teal.500" color="white" mb="6" textTransform="uppercase">
          Voting Open
        </Badge>
      ) : (
        <Badge bg="purple.500" color="white" mb="6" textTransform="uppercase">
          Evaluation
        </Badge>
      )}
      <Divider />
      <Flex justifyContent="space-between" w="100%" my="6">
        <Flex flexDir="column">
          <Text color="gray.500" fontSize="12px" lineHeight="16px" textTransform="uppercase">
            Members
          </Text>
          <Text fontSize="24px" lineHeight="32px" fontWeight={700}>
            {electedCouncilMembers?.length || <Spinner colorScheme="cyan" />}
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text color="gray.500" fontSize="12px" lineHeight="16px">
            NOMINEES
          </Text>
          <Text textAlign="end" fontSize="24px" lineHeight="32px" fontWeight={700}>
            10
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%">
        <Button size="md" mb="1">
          Nominate Self
        </Button>
        <Button
          size="md"
          variant="outline"
          colorScheme="gray"
          onClick={() => navigate('/councils' + `?active=${council.slug}`)}
        >
          View Council
        </Button>
      </Flex>
    </Flex>
  );
}
