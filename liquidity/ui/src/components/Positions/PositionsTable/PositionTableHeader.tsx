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
              Delegated
            </Text>
            <Tooltip
              label={
                <Flex p={3} flexDirection="column" alignItems="start">
                  <Text fontWeight="bold">Delegated Assets:</Text>
                  <Text>Assets used as collateral in this Position.</Text>
                </Flex>
              }
            >
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              APR
            </Text>
            <Tooltip
              label={
                <Flex p={3} flexDirection="column" alignItems="start">
                  <Text fontWeight="bold" fontSize="14px">
                    Annual Percentage Yield (APY):
                  </Text>
                  <Text textAlign="left" fontSize="14px">
                    Reflects the Pool PNL. It is calculated as an estimate derived from past week
                    historical PNL, extrapolated as a year average.
                  </Text>
                  <Text fontWeight="bold" mt={2} fontSize="14px">
                    Calculation
                  </Text>
                  <Text fontSize="14px">Last 7 days Pool PNL * 52</Text>
                </Flex>
              }
            >
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        {!isBase && (
          <>
            <Th border="none" textTransform="unset" py={5}>
              <Flex justifyContent="flex-end" alignItems="center">
                <Text
                  color="gray.600"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  mr={1}
                >
                  Pool PNL
                </Text>
                <Tooltip
                  label={
                    <Flex p={3} flexDirection="column" alignItems="start">
                      <Text fontWeight="bold" fontSize="14px">
                        PNL Profit and Loss Lifetime:
                      </Text>
                      <Text textAlign="left" fontSize="14px">
                        Reflects how the Pool PNL is impacted by trading activities (Fees paid,
                        profits and losses taken by traders).
                      </Text>
                      <Text fontWeight="bold" mt={2} fontSize="14px">
                        Positive PNL:
                      </Text>
                      <Text fontSize="14px" textAlign="left">
                        Means the traders have paid fees to the Pool. All this fees are collected to
                        reward Liquidity Providers as Claim Credit.
                      </Text>
                    </Flex>
                  }
                >
                  <InfoIcon w="12px" h="12px" />
                </Tooltip>
              </Flex>
            </Th>
            <Th border="none" textTransform="unset" py={5}>
              <Flex justifyContent="flex-end" alignItems="center">
                <Text
                  color="gray.600"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  mr={1}
                >
                  Borrowed
                </Text>
                <Tooltip
                  label={
                    <Flex p={3} flexDirection="column" alignItems="start">
                      <Text fontWeight="bold" fontSize="14px">
                        Borrowed:
                      </Text>
                      <Text textAlign="left" fontSize="14px">
                        After Delegating assets in a Position, you can then borrow assets based on
                        your Position C-Ratio.
                      </Text>
                      <Text mt={2} fontSize="14px" textAlign="left">
                        Borrowed assets are required to be Repaid in order to close your Position
                        and unlock your Collateral.
                      </Text>
                    </Flex>
                  }
                >
                  <InfoIcon w="12px" h="12px" />
                </Tooltip>
              </Flex>
            </Th>
          </>
        )}
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Debt
            </Text>
            <Tooltip
              label={
                <Flex p={3} flexDirection="column" alignItems="start">
                  <Text fontWeight="bold" fontSize="14px">
                    Debt.
                  </Text>
                  <Text textAlign="left" fontSize="14px">
                    Represents Pool PNL - Borrowed.
                  </Text>
                  <Text fontWeight="bold" mt={2} fontSize="14px">
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
                    You have debt if the Pool PNL has not yet paid back your borrowed assets, or if
                    the Pool PNL is Negative.
                  </Text>
                </Flex>
              }
            >
              <InfoIcon w="12px" h="12px" />
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
                  <Flex p={3} flexDirection="column" alignItems="start">
                    <Text fontWeight="bold" fontSize="14px">
                      C-ratio:
                    </Text>
                    <Text textAlign="left" fontSize="14px">
                      Manage your Position by Adding or Removing collateral to this position.
                      BorrowIs a dynamic number that represents a ratio between the collateral
                      Delegated for your position and the Borrowed assets for this position - the
                      Pool PNL.
                    </Text>
                  </Flex>
                }
              >
                <InfoIcon w="12px" h="12px" />
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
