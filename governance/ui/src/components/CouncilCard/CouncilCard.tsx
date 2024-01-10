import { Button, Divider, Flex, Heading, Image, Text, Skeleton, Fade } from '@chakra-ui/react';
import { Council } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetCouncilMembers } from '../../queries/useGetCouncilMembers';
import { useGetCouncilNominees } from '../../queries/useGetCouncilNominees';
import { CouncilPeriodBadge } from './CouncilPeriodBadge';

interface CouncilCardProps {
  council: Council;
}

export function CouncilCard({ council }: CouncilCardProps) {
  const navigate = useNavigate();
  const { data: councilPeriod, isLoading: isPeriodLoading } = useGetCurrentPeriod(council.slug);
  const { data: electedCouncilMembers, isLoading: isCouncilMembersLoading } = useGetCouncilMembers(
    council.slug
  );
  const { data: councilNominees, isLoading: isCouncilNomineesLoading } = useGetCouncilNominees(
    council.slug
  );

  const isLoading = isPeriodLoading || isCouncilMembersLoading || isCouncilNomineesLoading;

  return (
    <Flex
      p="6"
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
      <CouncilPeriodBadge councilPeriod={councilPeriod} isLoading={isLoading} />
      <Divider />
      <Flex justifyContent="space-between" w="100%" my="6" mb="auto">
        <Flex flexDir="column">
          <Text color="gray.500" fontSize="12px" lineHeight="16px" textTransform="uppercase">
            Members
          </Text>
          <Skeleton isLoaded={!isLoading} height="24px" mt={1}>
            <Fade in>
              <Text fontSize="24px" lineHeight="32px" fontWeight={700}>
                {electedCouncilMembers?.length || 'TBD'}
              </Text>
            </Fade>
          </Skeleton>
        </Flex>
        <Flex flexDir="column">
          {councilPeriod === '2' ? (
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
              <Skeleton isLoaded={!isLoading} height="24px" mt={1}>
                <Fade in>
                  <Text textAlign="end" fontSize="24px" lineHeight="32px" fontWeight={700}>
                    {councilNominees?.length || 'TBD'}
                  </Text>
                </Fade>
              </Skeleton>
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
