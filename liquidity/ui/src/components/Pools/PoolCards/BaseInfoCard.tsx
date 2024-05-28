import { Button, Flex, Image, Text, Link } from '@chakra-ui/react';

export const BaseInfoCard = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      maxW="397px"
      minH="337px"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      bg="navy.700"
      p={6}
    >
      <Flex flexDirection="column">
        <Image src="/snx.svg" w="66px" height="66px" mb={6} />
        <Text
          fontWeight={700}
          fontSize="18px"
          lineHeight="28px"
          fontFamily="heading"
          color="gray.50"
          width="70%"
        >
          Sell SNX at a Premium and watch it Burn
        </Text>
        <Text fontSize="16px" color="gray.500" lineHeight="24px" mt={1}>
          Sell your SNX at a premium to the Buyback and Burn contract and get USDC on Base
        </Text>
      </Flex>
      <Flex>
        <Link
          href="https://blog.synthetix.io/the-andromeda-release-buyback-and-burn/"
          target="_blank"
          rel="noopener"
        >
          <Button variant="outline" colorScheme="gray" color="white">
            Learn More
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
