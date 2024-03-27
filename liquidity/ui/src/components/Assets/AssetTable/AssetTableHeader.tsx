import { InfoIcon } from '@chakra-ui/icons';
import { Thead, Tr, Th, Flex, Text, Tooltip } from '@chakra-ui/react';

export const AssetTableHeader = () => {
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
          Asset
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Wallet Balance{' '}
            </Text>
            <Tooltip
              label="Assets currently in your wallet that can be deposited to your Synthetix Account, and utilized as collateral by delegating them to a pool"
              p="3"
            >
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Account Balance
            </Text>
            <Tooltip
              label="Assets deposited in your account. These assets are available to be delegated to a pool"
              p="3"
            >
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Delegated
            </Text>
            <Tooltip label="Assets used as collateral in a Position" p="3">
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
};
