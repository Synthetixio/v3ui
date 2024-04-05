import { Fade, Flex, Heading, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { TokenIcon } from '../TokenIcon';
import { InfoIcon } from '@chakra-ui/icons';

export function PositionHeader({
  isLoading,
  collateralSymbol,
  poolName,
  PositionOverview,
  ManagePosition,
  title,
}: {
  isLoading: boolean;
  collateralSymbol?: string;
  poolName?: string;
  PositionOverview: ReactNode;
  ManagePosition: ReactNode;
  title: string;
}) {
  return (
    <Flex flexDir="column" gap="6">
      <Flex height="100%" flexDirection="column" w="100%">
        <Flex gap="4" alignItems="center" mb="6">
          <TokenIcon symbol={collateralSymbol || ''} width={42} height={42} />
          <Flex justifyContent="space-between" w="100%">
            <Skeleton
              isLoaded={!isLoading}
              height="48px"
              minWidth={isLoading ? '40%' : 'initial'}
              startColor="gray.700"
              endColor="navy.800"
            >
              <Fade in>
                <Heading fontSize="24px" color="white">
                  {title}
                </Heading>
                <Text fontWeight={700} color="white">
                  {poolName}
                </Text>
              </Fade>
            </Skeleton>
            <Flex flexDir="column" alignItems="flex-end">
              <Text fontSize="14px" color="gray.500" fontWeight={500}>
                Estimated APY{' '}
                <Tooltip label="TODO" p="3">
                  <InfoIcon w="12px" h="12px" />
                </Tooltip>
              </Text>
              <Text fontSize="24px" fontWeight={800}>
                TODO%
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" gap="6" justifyContent="center">
          {PositionOverview}
          {ManagePosition}
        </Flex>
      </Flex>
      <Heading>REWARDS</Heading>
    </Flex>
  );
}
