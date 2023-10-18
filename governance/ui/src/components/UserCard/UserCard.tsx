import { Box, Button, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Badge } from '../Badge/Badge';
import { EditIcon } from '@chakra-ui/icons';
import { Socials } from '../Socials/Socials';

export const UserCard: FC = () => {
  return (
    <Box
      minWidth="227px"
      p={4}
      rounded="md"
      borderWidth={1}
      borderColor="gray.900"
      color="whiteAlpha.800"
      bg="navy.700"
    >
      <Flex gap={2}>
        <Badge color="green">NOMINEE</Badge>
        <Badge color="cyan">SPARTAN</Badge>
      </Flex>

      <Flex gap={4} mt={4} alignItems="center">
        <Image src="/img.png" rounded="full" width="56px" height="56px" />
        <Flex flexDirection="column" gap={1}>
          <Heading size="xs">AndΞ | Andy C</Heading>
          <Text fontSize="xs">OG DeFi Member</Text>
          <Socials discord="invite/AEdUHzt" twitter="synthetix_io" github="synthetixio" />
        </Flex>
      </Flex>
      <Flex gap="2.5" mt={6}>
        <Button color="white" variant="outline" colorScheme="gray">
          Nominate Self
        </Button>
        <IconButton
          aria-label="edit"
          color="white"
          variant="outline"
          colorScheme="gray"
          icon={<EditIcon />}
        />
      </Flex>
    </Box>
  );
};
