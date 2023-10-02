import { Flex, Td, Text, Button, Fade, Tr } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { useClaimRewards } from '@snx-v3/useClaimRewards';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { RewardsModal } from './RewardsModal';

interface RewardsRowInterface {
  symbol: string;
  projectedAmount: number; // The amount per frequency period
  frequency: number;
  amount: number; // The immediate amount claimable as read from the contracts
  lifetimeEarned: number;
  hasClaimed: boolean;
  address: string;
}

export const RewardsRow = ({
  symbol,
  projectedAmount,
  frequency,
  amount,
  lifetimeEarned,
  hasClaimed,
  address,
}: RewardsRowInterface) => {
  const { accountId, collateralSymbol, poolId } = useParams();

  const { data: collateralData } = useCollateralType(collateralSymbol);

  const { exec, txnState } = useClaimRewards(
    poolId || '',
    collateralData?.tokenAddress || '',
    accountId,
    address,
    amount
  );

  const onClick = () => {
    exec();
  };

  const { txnStatus, txnHash } = txnState;

  const frequencyString = convertSecondsToDisplayString(frequency);

  return (
    <>
      <RewardsModal
        amount={amount}
        collateralSymbol={symbol}
        txnStatus={txnStatus}
        txnHash={txnHash}
      />
      <Tr>
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
                {projectedAmount}
                {` ${symbol}`}
              </Text>
              {frequencyString && (
                <Text color="gray.500" fontSize="12px" fontFamily="heading" lineHeight="16px">
                  {frequencyString}
                </Text>
              )}
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
              {amount}
              {` ${symbol}`}
            </Text>
            {lifetimeEarned && (
              <Text
                color="gray.500"
                fontSize="12px"
                fontFamily="heading"
                lineHeight="16px"
              >{`Lifetime: ${lifetimeEarned} ${symbol}`}</Text>
            )}
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
              onClick={onClick}
            >
              {hasClaimed ? 'Claimed' : 'Claim'}
            </Button>
          </Fade>
        </Td>
      </Tr>
    </>
  );
};

function convertSecondsToDisplayString(seconds: number) {
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2592000;

  if (seconds === 0) {
    return null;
  } else if (seconds % secondsInMonth === 0) {
    return 'every month';
  } else if (seconds % secondsInWeek === 0) {
    return 'every week';
  } else if (seconds % secondsInDay === 0) {
    return 'every day';
  } else if (seconds % secondsInHour === 0) {
    return 'every hour';
  } else {
    return `every ${(seconds / 3600).toFixed(1)} hours`;
  }
}
