import { Flex, Text } from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';

interface BalanceProps {
  isBase: boolean;
  balance?: Wei;
}

export const Balance = ({ isBase, balance }: BalanceProps) => {
  return (
    <>
      {balance && (
        <Flex
          border="1px solid"
          borderColor="gray.900"
          px={4}
          py={2}
          rounded="base"
          h="40px"
          alignItems="center"
        >
          <TokenIcon symbol={isBase ? 'USDC' : 'sUSD'} width={24} height={24} />
          <Text
            data-cy="header-balance"
            fontSize="14px"
            lineHeight="20px"
            fontWeight={600}
            ml="2"
            fontFamily="heading"
          >
            {balance?.toNumber().toFixed(2)}
          </Text>
        </Flex>
      )}
    </>
  );
};
