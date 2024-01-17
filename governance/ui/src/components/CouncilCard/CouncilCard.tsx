import { Button, Divider, Flex, Heading, Image, Text, Skeleton, Fade } from '@chakra-ui/react';
import { Council } from '../../utils/councils';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentPeriod } from '../../queries/useGetCurrentPeriod';
import { useGetCouncilMembers } from '../../queries/useGetCouncilMembers';
import { useGetCouncilNominees } from '../../queries/useGetCouncilNominees';
import { CouncilPeriodBadge } from './CouncilPeriodBadge';
import { useWallet } from '@snx-v3/useBlockchain';
import { useGetIsNominated } from '../../queries/useGetIsNominated';

interface CouncilCardProps {
  council: Council;
}

export function CouncilCard({ council }: CouncilCardProps) {
  const navigate = useNavigate();
  const wallet = useWallet();
  const { data: councilPeriod, isLoading: isPeriodLoading } = useGetCurrentPeriod(council.slug);
  const { data: electedCouncilMembers, isLoading: isCouncilMembersLoading } = useGetCouncilMembers(
    council.slug
  );
  const { data: isNominated } = useGetIsNominated(wallet?.address);
  const { data: councilNominees, isLoading: isCouncilNomineesLoading } = useGetCouncilNominees(
    council.slug
  );

  const isLoading = isPeriodLoading || isCouncilMembersLoading || isCouncilNomineesLoading;

  return (
    <Flex
      p="6"
      w={{ base: '100%', md: '290px' }}
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.900"
      borderRadius="base"
      flexDir="column"
      alignItems="center"
      bg="navy.700"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/councils/${council.slug}`);
      }}
      cursor="pointer"
    >
      <Image src={council.image} h="80px" w="80px" mb="4" />
      <Heading fontSize="20px" lineHeight="28px" textAlign="center" mb="4">
        {council.title}
      </Heading>
      <CouncilPeriodBadge councilPeriod={councilPeriod} isLoading={isLoading} />
      <Divider />
      <Flex justifyContent="space-between" w="100%" my="6" mb="auto">
        {councilPeriod === '0' || councilPeriod === '1' ? (
          <Flex flexDir="column">
            <Text color="gray.500" fontSize="12px" lineHeight="16px">
              Members
            </Text>
            <Skeleton isLoaded={!isLoading} height="24px" mt={1} placeholder="0000">
              <Fade in>
                <Text fontSize="24px" lineHeight="32px" fontWeight={700}>
                  {electedCouncilMembers?.length}
                </Text>
              </Fade>
            </Skeleton>
          </Flex>
        ) : (
          <Flex flexDir="column">
            <Text color="gray.500" fontSize="12px" lineHeight="16px">
              Nominees
            </Text>
            <Skeleton isLoaded={!isLoading} height="24px" mt={1}>
              <Fade in>
                <Text fontSize="24px" lineHeight="32px" fontWeight={700}>
                  {councilNominees?.length}
                </Text>
              </Fade>
            </Skeleton>
          </Flex>
        )}
        {councilPeriod === '0' ? (
          <Flex flexDir="column">
            <Text color="gray.500" fontSize="12px" lineHeight="16px" textAlign="end">
              Votes Received
            </Text>
            <Skeleton isLoaded={!isLoading} height="24px" mt={1} placeholder="0000">
              <Fade in>
                <Text fontSize="24px" lineHeight="32px" fontWeight={700} textAlign="end">
                  0000
                </Text>
              </Fade>
            </Skeleton>
          </Flex>
        ) : councilPeriod === '1' ? (
          <Flex flexDir="column">
            <Text color="gray.500" fontSize="12px" lineHeight="16px" textAlign="end">
              Nominees
            </Text>
            <Skeleton isLoaded={!isLoading} height="24px" mt={1} placeholder="0000">
              <Fade in>
                <Text fontSize="24px" lineHeight="32px" fontWeight={700}>
                  {councilNominees?.length}
                </Text>
              </Fade>
            </Skeleton>
          </Flex>
        ) : (
          <Flex flexDir="column">
            <Text color="gray.500" fontSize="12px" lineHeight="16px" textAlign="end">
              Votes Received
            </Text>
            <Skeleton isLoaded={!isLoading} height="24px" mt={1} placeholder="0000">
              <Fade in>
                <Text fontSize="24px" lineHeight="32px" fontWeight={700} textAlign="end">
                  0000
                </Text>
              </Fade>
            </Skeleton>
          </Flex>
        )}
      </Flex>
      <Flex flexDir="column" w="100%" mt="8">
        {councilPeriod === '1' ? (
          <>
            <Button
              size="md"
              mb="1"
              onClick={(e) => {
                e.stopPropagation();
                if (isNominated && isNominated.slug === council.slug) {
                  navigate(`/councils/${council.slug}?editNomination=true`);
                } else {
                  navigate(`/councils/${council.slug}?nominate=true`);
                }
              }}
            >
              {isNominated && isNominated.slug === council.slug
                ? 'Edit Nomination'
                : 'Nominate Self'}
            </Button>
            <Button
              size="md"
              variant="outline"
              colorScheme="gray"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/councils/${council.slug}`);
              }}
            >
              View Council
            </Button>
          </>
        ) : councilPeriod === '2' ? (
          <Button
            size="md"
            mb="1"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/councils/${council.slug}`);
            }}
          >
            Vote
          </Button>
        ) : (
          <Button
            size="md"
            variant="outline"
            colorScheme="gray"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/councils/${council.slug}`);
            }}
          >
            View Council
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
