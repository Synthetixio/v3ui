import { Button, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Council } from '../../utils/councils';
import { Members } from '../CouncilMembers/Members';
import { CouncilPeriodBadge } from './CouncilPeriodBadge';

export function CouncilCard({ council }: { council: Council }) {
  const navigate = useNavigate();
  const count = Members.filter((member) => member.council === council.slug).length;

  return (
    <Flex
      p="6"
      w={{ base: '100%' }}
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
      _hover={{
        bg: 'linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%), #0B0B22;',
      }}
    >
      <Image src={council.image} h="80px" w="80px" mb="4" />
      <Heading
        fontSize="20px"
        lineHeight="28px"
        textAlign="center"
        mb="4"
        data-cy={`council-card-header-${council.slug}`}
      >
        {council.title}
      </Heading>
      <CouncilPeriodBadge councilPeriod="0" isLoading={false} />
      <Divider />
      <Flex justifyContent="space-between" w="100%" my="6" mb="auto">
        <Flex flexDir="column">
          <Text color="gray.500" fontSize="12px" lineHeight="16px">
            Members
          </Text>
          <Text fontSize="24px" lineHeight="32px" fontWeight={700}>
            {count}
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text color="gray.500" fontSize="12px" lineHeight="16px" textAlign="end">
            Votes Received
          </Text>
          <Text fontSize="24px" lineHeight="32px" fontWeight={700} textAlign="end">
            N/A
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%" mt="8">
        <Button
          data-cy={`view-council-button-${council.slug}`}
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
      </Flex>
    </Flex>
  );
}
