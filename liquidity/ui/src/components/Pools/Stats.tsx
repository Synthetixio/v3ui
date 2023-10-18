import { Fade, Flex, Skeleton, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v3/formatters';
import { BorderBox } from '@snx-v3/BorderBox';

export interface StatsProps {
  totalDebt?: number;
  totalCollateral?: number;
  isLoading: boolean;
}

export const Stats = ({ totalDebt, totalCollateral, isLoading }: StatsProps) => {
  return (
    <Flex justifyContent="space-between" gap={4} flexDirection={{ base: 'column', md: 'row' }}>
      <BorderBox p={4} width="33%" flexDir="column">
        <Text
          fontSize="xs"
          fontFamily="heading"
          textTransform="uppercase"
          color="gray.500"
          textAlign="center"
          fontWeight="400"
        >
          Total Collateral
        </Text>
        <Flex justifyContent="center">
          {isLoading ? (
            <Skeleton width="fit-content" mt="0.25rem">
              <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="xl">
                100,000
              </Text>
            </Skeleton>
          ) : (
            <Fade in>
              <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
                {totalCollateral ? formatNumberToUsd(totalCollateral) : '—'}
              </Text>
            </Fade>
          )}
        </Flex>
      </BorderBox>
      <BorderBox p={4} flexDir="column" width="33%">
        <Text
          fontSize="xs"
          fontFamily="heading"
          textTransform="uppercase"
          color="gray.500"
          textAlign="center"
          fontWeight="400"
        >
          Total debt
        </Text>

        <Flex justifyContent="center">
          {isLoading ? (
            <Skeleton width="fit-content" mt="0.25rem">
              <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="xl">
                100,000
              </Text>
            </Skeleton>
          ) : (
            <Fade in>
              <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
                {totalDebt ? formatNumberToUsd(totalDebt) : '—'}
              </Text>
            </Fade>
          )}
        </Flex>
      </BorderBox>
      <BorderBox p={4} flexDir="column" width="33%">
        <Text
          fontSize="xs"
          fontFamily="heading"
          textTransform="uppercase"
          color="gray.500"
          textAlign="center"
          fontWeight="400"
        >
          Total Earnings Lifetime
        </Text>
        <Flex justifyContent="center">
          {isLoading ? (
            <Skeleton width="fit-content" mt="0.25rem">
              <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="xl">
                100,000
              </Text>
            </Skeleton>
          ) : (
            <Fade in>
              <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
                —
              </Text>
            </Fade>
          )}
        </Flex>
      </BorderBox>
    </Flex>
  );
};
