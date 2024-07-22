import { InfoIcon } from '@chakra-ui/icons';
import { Thead, Tr, Th, Flex, Text } from '@chakra-ui/react';
import { Tooltip } from '@snx-v3/Tooltip';

export function PositionTableHeader({ isBase }: { isBase: boolean }) {
  return (
    <Thead>
      <Tr>
        <Th
          py={5}
          textTransform="unset"
          color="gray.600"
          border="none"
          fontFamily="heading"
          fontSize="12px"
          lineHeight="16px"
        >
          Collateral
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Locked
            </Text>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              APR
            </Text>
            <Tooltip
              label={
                <Flex flexDirection="column" alignItems="start">
                  <Text textAlign="left" fontSize="14px">
                    APR is averaged over the trailing 28 days and is comprised of both performance
                    and rewards
                  </Text>
                </Flex>
              }
            >
              <InfoIcon w="10px" h="10px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              {isBase ? 'PNL' : 'Debt'}
            </Text>
            <Tooltip
              label={
                <Text textAlign={'left'}>
                  Debt consists of:
                  <br />
                  - Your portion of the pool&apos;s total debt, which fluctuates based on trader
                  performance and market conditions
                  <br />- The amount you&apos;ve borrowed against your collateral without incurring
                  interest
                </Text>
              }
            >
              <InfoIcon w="10px" h="10px" />
            </Tooltip>
          </Flex>
        </Th>
        {!isBase && (
          <Th border="none" textTransform="unset" py={5}>
            <Flex justifyContent="flex-end" alignItems="center">
              <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
                C-Ratio
              </Text>
              <Tooltip
                label={
                  <Flex flexDirection="column" alignItems="start">
                    <Text textAlign="left" fontSize="14px">
                      C-ratio is a dynamic number that represents a ratio between your locked
                      collateral and your debt
                    </Text>
                  </Flex>
                }
              >
                <InfoIcon w="10px" h="10px" />
              </Tooltip>
            </Flex>
          </Th>
        )}
        <Th
          py={5}
          textTransform="unset"
          color="gray.600"
          border="none"
          fontFamily="heading"
          fontSize="12px"
          lineHeight="16px"
        >
          {' '}
        </Th>
      </Tr>
    </Thead>
  );
}
