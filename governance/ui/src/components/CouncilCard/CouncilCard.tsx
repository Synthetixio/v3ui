import { Badge, Button, Divider, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { Council } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetCouncilMembers } from '../../queries/useGetCouncilMembers';
import { useGetCouncilNominees } from '../../queries/useGetCouncilNominees';

interface CouncilCardProps {
  council: Council;
  isLast: boolean;
}

export function CouncilCard({ council, isLast }: CouncilCardProps) {
  const navigate = useNavigate();
  const { data: councilPeriod } = useGetCurrentPeriod(council.slug);
  const { data: electedCouncilMembers } = useGetCouncilMembers(council.slug);
  const { data: councilNominees } = useGetCouncilNominees(council.slug);

  return (
    <Flex
      p="6"
      mr={{ base: 0, md: isLast ? '0px' : '24px' }}
      mt="30px"
      w={{ base: '100%', md: '290px' }}
      h={{ base: 'auto', lg: '413px' }}
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
        <Badge bg="gray.900" color="white" mb="6" textTransform="uppercase">
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
      <Flex justifyContent="space-between" w="100%" my="6" mb="auto">
        <Flex flexDir="column">
          <Text color="gray.500" fontSize="12px" lineHeight="16px" textTransform="uppercase">
            Members
          </Text>
          <Text fontSize="24px" lineHeight="32px" fontWeight={700}>
            {electedCouncilMembers?.length || <Spinner colorScheme="cyan" />}
          </Text>
        </Flex>
        <Flex flexDir="column">
          {' '}
          {councilPeriod === '0' ? (
            <>
              <Text
                color="gray.500"
                fontSize="12px"
                lineHeight="16px"
                textTransform="uppercase"
                textAlign="right"
              >
                Votes Received
              </Text>
              <Text textAlign="end" fontSize="24px" lineHeight="32px" fontWeight={700}>
                TODO 1234
              </Text>
            </>
          ) : (
            <>
              <Text color="gray.500" fontSize="12px" lineHeight="16px" textTransform="uppercase">
                Nominees
              </Text>
              <Text textAlign="end" fontSize="24px" lineHeight="32px" fontWeight={700}>
                {councilNominees?.length ?? <Spinner colorScheme="cyan" />}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%">
        {councilPeriod === '1' ? (
          <>
            <Button
              size="md"
              mb="1"
              onClick={() => {
                navigate('/councils' + `?active=${council.slug}&nominate=true`);
              }}
            >
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
          </>
        ) : councilPeriod === '2' ? (
          <Button
            size="md"
            mb="1"
            onClick={() => {
              navigate('/councils' + `?active=${council.slug}`);
            }}
          >
            Vote
          </Button>
        ) : (
          <Button
            size="md"
            variant="outline"
            colorScheme="gray"
            onClick={() => navigate('/councils' + `?active=${council.slug}`)}
          >
            View Council
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
