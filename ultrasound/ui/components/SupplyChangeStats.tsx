import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Image, Link, Spinner, Text, Tooltip } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';
import burnSvg from './burn.svg';
import mintedSvg from './minted.svg';

export function SupplyChangeStats() {
  const { data: events, isLoading } = useBurnEvents();

  return (
    <Flex
      w="369px"
      h="184px"
      p="4"
      border="1px solid"
      borderColor="gray.900"
      flexDir="column"
      rounded="base"
      bg="navy.700"
      gap="3"
    >
      {isLoading ? (
        <Spinner colorScheme="cyan" />
      ) : (
        <>
          <Flex justifyContent="space-between">
            <Text fontSize="18px" fontWeight={700}>
              Supply Change
            </Text>
            <Text
              bg="whiteAlpha.400"
              rounded="30"
              w="40px"
              pt="1"
              textAlign="center"
              fontWeight={700}
              fontSize="12px"
            >
              7D
            </Text>
          </Flex>
          <Text fontWeight={700} fontSize="24px">
            -{events?.supplyChange7Days.toString()} SNX
          </Text>
          <Flex gap="2" alignItems="center">
            <Image src={burnSvg} />
            <Text fontSize="16px" color="gray.500" fontWeight={400}>
              Burnt
            </Text>
            <Text fontSize="18px" color="gray.500" fontWeight={700}>
              {events?.supplyChange7Days.toString()} SNX
            </Text>
          </Flex>
          <Flex gap="2" alignItems="center">
            <Image src={mintedSvg} />
            <Text fontSize="16px" color="gray.500" fontWeight={400}>
              Minted
            </Text>
            <Text fontSize="18px" color="gray.500" fontWeight={700}>
              0.00 SNX
            </Text>

            <Tooltip
              hasArrow
              closeDelay={1000}
              label={
                <Text>
                  No more SNX are being minted. Read more about The End of Synthetix Token Inflation
                </Text>
              }
            >
              <Flex alignItems="center">
                <InfoIcon color="gray.500" mr="2" />
                <Link
                  href="https://sips.synthetix.io/sips/sip-2043/?ref=blog.synthetix.io"
                  rel="noopener"
                  target="_blank"
                >
                  <Text color="gray.500">Why?</Text>
                </Link>
              </Flex>
            </Tooltip>
          </Flex>
        </>
      )}
    </Flex>
  );
}
