import { InfoIcon } from '@chakra-ui/icons';
import { Divider, Flex, Heading, Input, Text, Tooltip } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';

export function LiquidityPositionInput({
  title,
  collateralSymbol,
  balance,
}: {
  title: string;
  collateralSymbol: string;
  balance: { deposited: Wei; wallet: Wei };
}) {
  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      w="100%"
      maxW="500px"
      p="6"
      gap="6"
    >
      <Heading color="gray.50" fontSize="20px">
        {title}
      </Heading>
      <Divider />
      <Text fontSize="14px" color="gray.50">
        Deposit Collateral{' '}
        <Tooltip label="TODO" p="3">
          <InfoIcon w="12px" h="12px" />
        </Tooltip>
      </Text>
      <Flex border="1px solid" borderColor="gray.900" rounded="base" justifyContent="space-between">
        <Flex p="2" flexDir="column" gap="1">
          <TokenIcon symbol={collateralSymbol} />
          <Text fontSize="12px" display="flex">
            Balance: {balance.deposited.add(balance.wallet).toNumber().toFixed(2)}{' '}
            <Text
              color="cyan.500"
              fontSize="12px"
              fontWeight={700}
              ml="2"
              cursor="pointer"
              onClick={() => {
                // set all
              }}
            >
              Max
            </Text>
          </Text>
        </Flex>
        <Flex p="2">
          <Input variant="unstyled" placeholder="00.00" textAlign="end" fontSize="24px" />
          <Text fontSize="12px"></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
