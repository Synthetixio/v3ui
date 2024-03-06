import { InfoIcon } from '@chakra-ui/icons';
import { Thead, Tr, Th, Flex, Text, Tooltip } from '@chakra-ui/react';

export function PositionTableHeader() {
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
            <Tooltip label="???">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              APY
            </Text>
            <Tooltip label="???">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Pool PNL
            </Text>
            <Tooltip label="???">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Borrowed
            </Text>
            <Tooltip label="???">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Debt
            </Text>
            <Tooltip label="???">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              C-Ratio
            </Text>
            <Tooltip label="???">
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
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
