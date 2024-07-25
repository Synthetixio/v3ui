import { Flex, Td, Text, Button, Fade, Tr, Link } from '@chakra-ui/react';
import { useClaimRewards } from '@snx-v3/useClaimRewards';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { RewardsModal } from './RewardsModal';
import { truncateAddress, convertToReadableInterval } from '@snx-v3/formatters';
import { Amount } from '@snx-v3/Amount';
import { wei } from '@synthetixio/wei';
import { etherscanLink } from '@snx-v3/etherscanLink';
import { useNetwork } from '@snx-v3/useBlockchain';
import { Tooltip } from '@snx-v3/Tooltip';
import { TokenIcon } from '../TokenIcon';

interface RewardsRowInterface {
  symbol: string;
  frequency: number;
  claimableAmount: number; // The immediate amount claimable as read from the contracts
  lifetimeClaimed: number;
  address: string;
  readOnly: boolean;
  total: number;
}

export const RewardsRow = ({
  symbol,
  frequency,
  claimableAmount,
  lifetimeClaimed,
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

  // We want to pass in the total, as well as the
  const { amount, frequencyString } = convertToReadableInterval(total, frequency);

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
            <TokenIcon height={30} width={30} symbol={symbol} />
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
                    <Amount showTooltip={false} value={wei(amount)} suffix={` ${symbol}`} />
                  </Text>
                </Tooltip>
              </Link>
              {frequencyString && total > 0 && (
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
                <Amount value={wei(lifetimeClaimed)} />
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
                {claimableAmount > 0 || !lifetimeClaimed ? 'Claim' : 'Claimed'}
              </Button>
            </Fade>
          </Td>
        )}
      </Tr>
    </>
  );
};
