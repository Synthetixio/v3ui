import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Heading, Text, Tooltip } from '@chakra-ui/react';

export default function PositionOverview({
  currentCollateral,
  collateralType,
  collateralValue,
  debt,
  poolPnl,
  borrowed,
}: {
  currentCollateral: string;
  collateralType: string;
  collateralValue: string;
  debt: string;
  poolPnl: string;
  borrowed: string;
}) {
  return (
    <Flex
      rounded="base"
      border="1px solid"
      borderColor="gray.900"
      p="6"
      bg="navy.700"
      flexDir="column"
    >
      <Heading fontSize="20px" mb="4">
        Overview
      </Heading>
      <Flex>
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
            Collateral{' '}
            <Tooltip label="TODO" p="3">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Text>
          <Text color="gray.500" fontSize="14px">
            {currentCollateral} {collateralType}
          </Text>
          <Text color="gray.500" fontSize="12px">
            ${collateralValue}
          </Text>
        </Flex>
        <Flex rounded="base" border="1px solid" borderColor="gray.900" flexDir="column"></Flex>
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
          ${debt}
        </Text>
        <Text color="gray.500" fontSize="12px">
          Pool PNL{' '}
          <Tooltip label="TODO" p="3">
            <InfoIcon w="12px" h="12px" />
          </Tooltip>
        </Text>
        <Text color="gray.500" fontSize="12px">
          Borrowed{' '}
          <Tooltip label="TODO" p="3">
            <InfoIcon w="12px" h="12px" />
          </Tooltip>
        </Text>
      </Flex>
    </Flex>
  );
}
