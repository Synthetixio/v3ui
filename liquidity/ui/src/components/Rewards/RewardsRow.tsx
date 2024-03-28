import { Flex, Td, Text, Button, Fade, Tr, Tooltip, Link } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { useClaimRewards } from '@snx-v3/useClaimRewards';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { RewardsModal } from './RewardsModal';
import { truncateAddress, convertSecondsToDisplayString } from '@snx-v3/formatters';
import { Amount } from '@snx-v3/Amount';
import { wei } from '@synthetixio/wei';
import { etherscanLink } from '@snx-v3/etherscanLink';
import { useNetwork } from '@snx-v3/useBlockchain';

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
  const { network } = useNetwork();

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
    if (claimableAmount > 0 || !hasClaimed) {
      return 'Claim';
    }

    return 'Claimed';
  };

  // Note adjustment will need to be made for decimals
  const totalAmount = total / 1e18;

  const link = etherscanLink({ chain: network?.name || 'mainnet', address });

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
              <Link href={link} target="_blank">
                <Tooltip label={`Distributed by ${truncateAddress(address)}`}>
                  <Text
                    color="gray.50"
                    fontSize="14px"
                    fontFamily="heading"
                    fontWeight={500}
                    lineHeight="20px"
                  >
                    <Amount value={wei(totalAmount)} />
                    {` ${symbol}`}
                  </Text>
                </Tooltip>
              </Link>

              {frequencyString && totalAmount > 0 && (
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
              <Amount value={wei(claimableAmount)} />
              {` ${symbol}`}
            </Text>
            {lifetimeClaimed > 0 && (
              <Text color="gray.500" fontSize="12px" fontFamily="heading" lineHeight="16px">
                <Tooltip label="Total claimed over lifetime">Lifetime: &nbsp;</Tooltip>
                <Amount value={wei(lifetimeClaimed.toString(), 18, true)} />
                {symbol}
              </Text>
            )}
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
