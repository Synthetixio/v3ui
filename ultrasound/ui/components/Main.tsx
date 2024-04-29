import { Flex, Heading, Image, Link, Spinner, Text } from '@chakra-ui/react';
import { Chart } from './Chart';
import { SupplyChangeStats } from './SupplyChangeStats';
import { CurrentSupplyStats } from './CurrentSupplyStats';
import { BurnSNX } from './BurnSNX';
import { useBurnEvents } from '../hooks/useBurnEvents';

export function Main() {
  const { data: events, isLoading } = useBurnEvents();

  return (
    <Flex flexDir="column" mt="10" width="100%" maxW="1200px">
      <Flex justifyContent="space-between">
        <Flex flexDir="column">
          <Heading fontSize="72px" fontWeight={700} color="white">
            ultrasound.homes
          </Heading>
          <Heading fontSize="30px" fontWeight={700} color="white">
            burning SNX for Kain's mansions
          </Heading>
        </Flex>
        <Flex alignItems="center">
          <Image src="/kain.svg" />
          <Flex flexDir="column">
            <Text fontSize="16px" fontWeight={700} color="white">
              Mansion counter
            </Text>
            <Text fontSize="24px" fontWeight={700} color="white">
              {isLoading ? <Spinner colorScheme="cyan" /> : events?.totalBurns}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="4" mt="4">
        <Flex flexDir="column">
          <Chart />
          <Flex gap="6">
            <SupplyChangeStats />
            <CurrentSupplyStats />
          </Flex>
        </Flex>
        <BurnSNX />
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center">
        <Text fontWeight={700} fontSize="16px">
          Share
        </Text>
        <Link href="https://twitter.com/intent/tweet?text=I%20am%20paying%20for%20Kains%20Mansion">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3050_14040)">
              <path
                d="M25.7124 25.8147L32.4133 33.75H30.8254L25.0071 26.8599L20.3599 33.75H15L22.0274 23.331L15 15.0096H16.588L22.7324 22.2858L27.6401 15.0096H33L25.7121 25.8147H25.7124ZM23.5375 23.2392L22.8255 24.2767L17.1602 32.5322H19.5992L24.1712 25.8697L24.8832 24.8322L30.8262 16.1721H28.3871L23.5375 23.2388V23.2392Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3050_14040">
                <rect
                  width="18"
                  height="18.75"
                  fill="white"
                  transform="matrix(1 0 0 -1 15 33.75)"
                />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </Flex>
    </Flex>
  );
}
