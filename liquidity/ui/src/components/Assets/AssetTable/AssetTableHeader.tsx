import { InfoIcon } from '@chakra-ui/icons';
import { Thead, Tr, Th, Flex, Text } from '@chakra-ui/react';
import { Tooltip } from '@snx-v3/Tooltip';

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
              label={
                <>
                  <Text fontWeight={600} textAlign="left">
                    Wallet Balance:
                  </Text>
                  <Text textAlign="left" mt={1}>
                    Assets currently in your Wallet that can be deposited in your Synthetix Account.
                  </Text>
                  <Text textAlign="left" mt={1}>
                    Note: Assets on your Account will not show on your Wallet.
                  </Text>
                </>
              }
            >
              <InfoIcon w="12px" h="12px" />
            </Tooltip>
          </Flex>
        </Th>
        <Th border="none" textTransform="unset" py={5}>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color="gray.600" fontFamily="heading" fontSize="12px" lineHeight="16px" mr={1}>
              Account Available
            </Text>
            <Tooltip
              label={
                <>
                  <Text fontWeight={600} textAlign="left">
                    Account Available:
                  </Text>
                  <Text textAlign="left" mt={1}>
                    Assets deposited in your Synthetix Account. These assets are available to be
                    delegated to a pool.
                  </Text>
                </>
              }
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
            <Tooltip
              label={
                <>
                  <Text fontWeight={600} textAlign="left">
                    Account Delegated Assets:
                  </Text>
                  <Text textAlign="left" mt={1}>
                    Assets used as collateral in a Position.
                  </Text>
                </>
              }
            >
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
