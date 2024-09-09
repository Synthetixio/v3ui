import { Button, Fade, Flex, Link, Td, Text, Tr } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { etherscanLink } from '@snx-v3/etherscanLink';
import { truncateAddress } from '@snx-v3/formatters';
import { Tooltip } from '@snx-v3/Tooltip';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useClaimRewards } from '@snx-v3/useClaimRewards';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { wei } from '@synthetixio/wei';
import { TokenIcon } from '../TokenIcon';
import { RewardsModal } from './RewardsModal';

interface RewardsRowInterface {
  symbol: string;
  claimableAmount: number; // The immediate amount claimable as read from the contracts
  lifetimeClaimed: number;
  address: string;
}

export const RewardsRow = ({
  symbol,
  claimableAmount,
  lifetimeClaimed,
  address,
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

  return (
    <>
      <RewardsModal
        amount={claimableAmount}
        collateralSymbol={symbol}
        txnStatus={txnStatus}
        txnHash={txnHash}
      />
      <Tr>
        <Td display="flex" alignItems="center" px={4} py={3} border="none" w="100%">
          <Fade in>
            <TokenIcon height={30} width={30} symbol={symbol} />
          </Fade>
          <Fade in>
            <Flex flexDirection="column" ml="12px">
              <Link
                href={etherscanLink({ chain: network?.name || 'mainnet', address })}
                target="_blank"
              >
                <Tooltip label={`Distributed by ${truncateAddress(address)}`}>
                  <Text
                    color="gray.50"
                    fontSize="14px"
                    fontFamily="heading"
                    fontWeight={500}
                    lineHeight="20px"
                  >
                    {symbol}
                  </Text>
                </Tooltip>
              </Link>
            </Flex>
          </Fade>
        </Td>
        <Td alignItems="center" px={4} py={3} border="none">
          <Fade in>
            <Text
              color="gray.50"
              fontSize="14px"
              fontFamily="heading"
              fontWeight={500}
              lineHeight="20px"
            >
              <Amount value={wei(claimableAmount)} />
            </Text>
            {lifetimeClaimed > 0 && (
              <Text color="gray.500" fontSize="12px" fontFamily="heading" lineHeight="16px">
                <Tooltip label="Total claimed over lifetime">Lifetime: &nbsp;</Tooltip>
                <Amount value={wei(lifetimeClaimed)} />
              </Text>
            )}
          </Fade>
        </Td>
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
      </Tr>
    </>
  );
};
