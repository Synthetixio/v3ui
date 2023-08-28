import { Flex, Td, Text, Button, Fade } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';

interface RewardsRowInterface {
  symbol: string;
  amount: number;
  frequency: string;
  earnings: number;
  lifetimeEarned: number;
  hasClaimed: boolean;
}

export const RewardsRow = ({
  symbol,
  amount,
  frequency,
  earnings,
  lifetimeEarned,
  hasClaimed,
}: RewardsRowInterface) => {
  return (
    <>
      <Td display="flex" alignItems="center" px="14px" border="none" w="100%">
        <Fade in>
          <CollateralIcon height="30px" width="30px" symbol={symbol} />
        </Fade>
        <Fade in>
          <Flex flexDirection="column" ml="12px">
            <Text
              color="gray.50"
              fontSize="14px"
              fontFamily="heading"
              fontWeight={500}
              lineHeight="20px"
            >
              {amount}
              {` ${symbol}`}
            </Text>
            <Text color="gray.500" fontSize="12px" fontFamily="heading" lineHeight="16px">
              {frequency}
            </Text>
          </Flex>
        </Fade>
      </Td>
      <Td alignItems="center" px="14px" border="none">
        <Fade in>
          <Text
            color="gray.50"
            fontSize="14px"
            fontFamily="heading"
            fontWeight={500}
            lineHeight="20px"
          >
            {earnings}
            {` ${symbol}`}
          </Text>
          <Text
            color="gray.500"
            fontSize="12px"
            fontFamily="heading"
            lineHeight="16px"
          >{`Lifetime: ${lifetimeEarned} ${symbol}`}</Text>
        </Fade>
      </Td>
      <Td border="none" px="0px">
        <Fade in>
          <Button
            w="100%"
            size="sm"
            variant="solid"
            isDisabled={hasClaimed}
            _disabled={{
              bg: 'gray.900',
              backgroundImage: 'none',
              color: 'gray.500',
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            {hasClaimed ? 'Claimed' : 'Claim'}
          </Button>
        </Fade>
      </Td>
    </>
  );
};
