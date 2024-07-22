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
        <Th textAlign="right" border="none" textTransform="unset" py={5}>
          <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
            Locked
          </Text>
        </Th>
        <Th textAlign="right" border="none" textTransform="unset" py={5}>
          <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
            Unlocked
          </Text>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              APR
            </Text>
            <Tooltip
              label={
                <Flex flexDirection="column" alignItems="start">
                  <Text fontWeight="bold" fontSize="14px">
                    Annual Percentage Yield (APY):
                  </Text>
                  <Text textAlign="left" fontSize="14px">
                    Reflects the PNL. It is calculated as an estimate derived from past week
                    historical PNL, extrapolated as a year average.
                  </Text>
                  <Text fontWeight="bold" mt={2} fontSize="14px">
                    Calculation
                  </Text>
                  <Text fontSize="14px">Last 7 days PNL * 52</Text>
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
                <Flex flexDirection="column" alignItems="start">
                  {!isBase && (
                    <>
                      <Text fontWeight="bold" fontSize="14px">
                        Debt.
                      </Text>
                      <Text textAlign="left" fontSize="14px" mb={2}>
                        Represents PNL - Borrowed.
                      </Text>
                    </>
                  )}
                  <Text fontWeight="bold" fontSize="14px">
                    Claim Credit:
                  </Text>
                  <Text fontSize="14px" textAlign="left">
                    When your position is performing well, it pays back the borrowed assets (if any)
                    and turns into Credit available to Claim.
                  </Text>

                  <Text fontWeight="bold" mt={2} fontSize="14px">
                    Repay debt:
                  </Text>
                  <Text fontSize="14px" textAlign="left">
                    You have debt if the PNL has not yet paid back your borrowed assets, or if the
                    PNL is Negative.
                  </Text>
                </Flex>
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
                    <Text fontWeight="bold" fontSize="14px">
                      C-ratio:
                    </Text>
                    <Text textAlign="left" fontSize="14px">
                      Manage your c-ratio by repaying debt or adding more collateral to your
                      position.
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
