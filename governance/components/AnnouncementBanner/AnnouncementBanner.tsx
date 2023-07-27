import { Box, Flex, Text } from '@chakra-ui/react';

export function AnnouncementBanner() {
  // @TODO dev add query for councils
  const now = new Date();
  return (
    <Flex bg="orange.500" h="40px" w="100vw" alignItems="center">
      <Flex bg="blackAlpha.600" h="26px" px="20px" ml="10%" borderRadius="base" alignItems="center">
        <Text fontSize="12px" mr="10px">
          Nominations close in
        </Text>
        <Text fontFamily="GT America Mono" fontSize="12px" lineHeight="16px">
          {now.getDay()}D {now.getHours()}H {now.getMinutes()}M
        </Text>
      </Flex>
    </Flex>
  );
}
