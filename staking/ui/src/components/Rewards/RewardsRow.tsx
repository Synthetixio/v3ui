import { Flex, Td, Text, Button, Fade, Tr, Tooltip } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { useClaimRewards } from '@snx-v3/useClaimRewards';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { RewardsModal } from './RewardsModal';
import { truncateAddress } from '@snx-v3/formatters';

interface RewardsRowInterface {
  symbol: string;
  projectedAmount: number; // The amount per frequency period
  frequency: number;
  claimableAmount: number; // The immediate amount claimable as read from the contracts
  lifetimeClaimed: number;
  hasClaimed: boolean;
  address: string;
  readOnly: boolean;
  total: number;
}

export const RewardsRow = ({
  symbol,
  projectedAmount,
  frequency,
  claimableAmount,
  lifetimeClaimed,
  hasClaimed,
  address,
  readOnly,
  total,
}: RewardsRowInterface) => {
  const { accountId, collateralSymbol, poolId } = useParams();

  const { data: collateralData } = useCollateralType(collateralSymbol);

  const { exec, txnState } = useClaimRewards(
    poolId || '',
    collateralData?.tokenAddress || '',
    accountId,
    address,
    claimableAmount
  );

  const onClick = () => {
    exec();
  };

  const { txnStatus, txnHash } = txnState;

  const frequencyString = convertSecondsToDisplayString(frequency);
  const claimButtonLabel = () => {
    if (claimableAmount > 0) {
      return 'Claim';
    }
    if (!hasClaimed) {
      return 'Claim';
    }
    return 'Claimed';
  };
  return (
    <>
      <RewardsModal
        amount={claimableAmount}
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
              <Tooltip label={`Distributed by ${truncateAddress(address)}`}>
                <Text
                  color="gray.50"
                  fontSize="14px"
                  fontFamily="heading"
                  fontWeight={500}
                  lineHeight="20px"
                >
                  {readOnly ? total : projectedAmount}
                  {` ${symbol}`}
                </Text>
              </Tooltip>
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
              {claimableAmount}
              {` ${symbol}`}
            </Text>
            {lifetimeClaimed > 0 ? (
              <Tooltip label="Total claimed over lifetime">
                <Text
                  color="gray.500"
                  fontSize="12px"
                  fontFamily="heading"
                  lineHeight="16px"
                >{`Lifetime: ${lifetimeClaimed} ${symbol}`}</Text>
              </Tooltip>
            ) : null}
          </Fade>
        </Td>
        {!readOnly && (
          <Td border="none" px="0px">
            <Fade in>
              <Button
                w="100%"
                size="sm"
                variant="solid"
                isDisabled={claimableAmount === 0}
                _disabled={{
                  bg: 'gray.900',
                  backgroundImage: 'none',
                  color: 'gray.500',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
                onClick={onClick}
              >
                {claimButtonLabel()}
              </Button>
            </Fade>
          </Td>
        )}
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
