import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { CRatioBar } from '../CRatioBar';

export default function PositionOverview({
  currentCollateral,
  collateralType,
  collateralValue,
  cRatio,
  debt$,
  poolPnl,
  borrowed,
}: {
  currentCollateral: string;
  collateralType: string;
  collateralValue: string;
  debt$: string;
  poolPnl: string;
  borrowed: string;
  cRatio: string;
}) {
  return (
    <Flex
      rounded="base"
      border="1px solid"
      borderColor="gray.900"
      p="6"
      bg="navy.700"
      flexDir="column"
      w="100%"
    >
      <Heading fontSize="20px" mb="4">
        Overview
      </Heading>
      <Flex gap="4">
        <Flex
          rounded="base"
          border="1px solid"
          borderColor="gray.900"
          flexDir="column"
          gap="1"
          w="100%"
          p="4"
        >
          <Text color="gray.500" fontSize="16px">
            Collateral{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Text>
          <Text color="gray.500" fontSize="20px" fontWeight={800}>
            {currentCollateral} {collateralType}
          </Text>
          <Text color="gray.500" fontSize="16px">
            ${collateralValue}
          </Text>
        </Flex>
        <Flex
          rounded="base"
          border="1px solid"
          borderColor="gray.900"
          flexDir="column"
          gap="4"
          w="100%"
          p="4"
        >
          <Text color="gray.500" fontSize="14px">
            Debt{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Text>
          <Text color="gray.500" fontSize="14px">
            ${debt$}
          </Text>
          <Text color="gray.500" fontSize="12px" display="flex" alignItems="center" gap="2">
            Pool PNL{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
            <Text color="gray.500" fontSize="20px" fontWeight={800}>
              {poolPnl}
            </Text>
          </Text>
          <Text color="gray.500" fontSize="12px" display="flex" alignItems="center" gap="2">
            Borrowed{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
            <Text color="gray.500" fontSize="20px" fontWeight={800}>
              {borrowed}
            </Text>
          </Text>
        </Flex>
        <CRatioBar />
      </Flex>
    </Flex>
  );
}
