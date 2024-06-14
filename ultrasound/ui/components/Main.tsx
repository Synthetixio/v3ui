import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Heading, Image, Link, Spinner, Text, Tooltip } from '@chakra-ui/react';
import { useBurnEvents } from '../hooks/useBurnEvents';
import { BurnSNX } from './BurnSNX';
import { Chart } from './Chart';
import { CurrentSupplyStats } from './CurrentSupplyStats';
import { SupplyChangeStats } from './SupplyChangeStats';

export function Main() {
  const { data: events, isLoading } = useBurnEvents();

  return (
    <Flex flexDir="column" mt="8" width="100%" maxW="1200px">
      <Flex justifyContent="space-between" flexWrap={{ base: 'wrap', xl: 'nowrap' }}>
        <Flex flexDir="column">
          <Heading fontSize={{ base: '48px', xl: '56px' }} fontWeight={700} color="white">
            Zero inflation, infinite burn
          </Heading>
          <Heading fontSize="36px" fontWeight={700} color="white">
            Perps fuel SNX deflation
          </Heading>
        </Flex>
        <Flex alignItems="center" mt={{ base: 10, xl: 0 }}>
          <Flex flexDir="column">
            <Flex alignItems="baseline" gap="2">
              <Text as="div" fontSize="16px" fontWeight={700} color="white">
                Burn counter
              </Text>
              <Tooltip label="Times the BuyBack and Burn contract was triggered">
                <InfoIcon w="10px" h="10px" />
              </Tooltip>
            </Flex>
            <Text as="div" fontSize="24px" fontWeight={700} color="white">
              {isLoading ? <Spinner colorScheme="cyan" /> : events?.totalBurns}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="4" mt="4" flexWrap={{ base: 'wrap', xl: 'nowrap' }}>
        <Flex alignItems="center" flexDir="column" w={{ base: '100%', xl: 'unset' }}>
          <Chart />
          <Flex
            width={{
              base: '100%',
            }}
            gap="4"
            flexWrap={{ base: 'wrap', xl: 'nowrap' }}
          >
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
        <Link
          href="https://twitter.com/intent/tweet?text=Celebrate+the+deflationary+impact+on+SNX+supply+driven+by+the+fee+burn+from+Synthetix+Perps+fees.+Discover+how+the+SNX+supply+is+evolving,+the+mechanics+behind+the+fee+burn,+and+the+role+of+Perps+in+driving+SNX+deflation.&url=https://ultrasoundsnx.money"
          target="_blank"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3050_14040)">
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
        <Link
          href="https://warpcast.com/~/compose?text=Celebrate+the+deflationary+impact+on+SNX+supply+driven+by+the+fee+burn+from+Synthetix+Perps+fees.+Discover+how+the+SNX+supply+is+evolving,+the+mechanics+behind+the+fee+burn,+and+the+role+of+Perps+in+driving+SNX+deflation.&embeds[]=https://ultrasoundsnx.money"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <g clipPath="url(#clip0_8298_10706)">
              <path
                d="M10.5238 11.3021C11.0768 13.375 11.542 15.0837 11.5576 15.0993C11.5732 15.1148 11.9073 13.9269 12.3002 12.4593L13.3214 8.64551L13.6282 7.5H16.0094C17.3191 7.5 18.3906 7.51182 18.3906 7.52623C18.3906 7.54974 20.36 14.9554 20.4034 15.0949C20.4133 15.1268 20.8207 13.6476 21.3088 11.8078C21.7969 9.96812 22.2549 8.24627 22.3265 7.98145L22.4566 7.5H25.1385C26.6135 7.5 27.8214 7.52245 27.8226 7.5498C27.8239 7.57716 26.7107 11.4018 25.349 16.0491L22.873 24.4985L20.5341 24.4993L18.1951 24.5L18.0945 24.1514C18.0392 23.9597 17.5453 22.2065 16.9969 20.2554C16.4485 18.3044 15.9924 16.7011 15.9833 16.6925C15.9742 16.6839 15.4737 18.4369 14.8711 20.5881L13.7754 24.4994L11.439 24.4997C9.27152 24.5 9.10012 24.4916 9.06752 24.3838C9.04813 24.3199 7.93934 20.5472 6.60352 16C5.26769 11.4528 4.15877 7.67976 4.13931 7.61548C4.10578 7.50491 4.25254 7.49947 6.8111 7.51587L9.51842 7.5332L10.5238 11.3021Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_8298_10706">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </Flex>
    </Flex>
  );
}
