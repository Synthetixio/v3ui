import { Alert, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import councils from '../utils/councils';
import { useNavigate } from 'react-router-dom';
import { CloseIcon, WarningIcon } from '@chakra-ui/icons';

export default function MyVotes() {
  const navigate = useNavigate();
  return (
    <Flex justifyContent="center" mt="8" gap="2">
      <Flex
        bg="navy.700"
        rounded="base"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.900"
        w="735px"
        flexDirection="column"
        p="6"
      >
        <Flex justifyContent="space-between" mb="4">
          <Heading fontSize="2xl">My Votes</Heading>
          <Heading fontSize="2xl">Todo 1/4</Heading>
        </Flex>
        <Text fontSize="xs" color="gray.500">
          You can cast 4 votes in one transaction. Continue voting if you want to add other nominee
          otherwise cast your vote to complete your voting.
        </Text>
        {councils.map((council) => (
          <Flex key={`vote-${council.slug}`} w="100%" padding="2" alignItems="center">
            <Flex
              borderRadius="50%"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.900"
              w="8"
              h="8"
              justifyContent="center"
              alignItems="center"
              mr="4"
              position="relative"
            >
              <Image src={council.image} w="6" h="6" />
              <Image
                src={council.image}
                borderRadius="50%"
                w="6"
                h="6"
                position="absolute"
                left="20px"
              />
            </Flex>
            <Flex flexDir="column" mr="auto">
              <Text fontSize="x-small" fontWeight="bold">
                {council.title}
              </Text>
              <Text fontSize="x-small">Voted For address todo</Text>
            </Flex>

            <IconButton aria-label="action-button" icon={<CloseIcon />} variant="outlined" />
          </Flex>
        ))}
        <Alert colorScheme="cyan">
          <WarningIcon color="cyan" mr="4" />
          You can now cast all your votes in one unique transaction
        </Alert>
      </Flex>
      <Flex
        bg="navy.700"
        rounded="base"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.900"
        w="483px"
        p="6"
      ></Flex>
    </Flex>
  );
}
