import {
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Flex,
  Fade,
  FlexProps,
  Button,
} from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { RewardsRow } from './RewardsRow';
import { RewardsType } from '@snx-v3/useRewards';
import { RewardsLoading } from './RewardsLoading';
import { useClaimAllRewards } from '@snx-v3/useClaimRewards';
import { useParams } from 'react-router-dom';
import { RewardsModal } from './RewardsModal';
// import { currency } from '@snx-v3/format';
// import { TokenIcon } from '../TokenIcon';

interface RewardsDistributorsInterface extends FlexProps {
  rewards?: RewardsType;
  isLoading: boolean;
  readOnly?: boolean;
}

export const Rewards = ({ rewards, isLoading, ...props }: RewardsDistributorsInterface) => {
  const hasRewards = rewards && rewards.length > 0;
  const { poolId, accountId } = useParams();
  console.log('Account id', accountId);

  const distributorAddresses = rewards?.map((item) => item.distributorAddress);
  const collateralAddress = rewards?.map((item) => item.address)[0];

  const { exec, txnState } = useClaimAllRewards(
    poolId,
    collateralAddress,
    distributorAddresses,
    accountId
  );

  console.log('txnState', txnState);

  return (
    <>
      <RewardsModal txnHash={txnState.txnHash} txnStatus={txnState.txnStatus} />
      <BorderBox bg="navy.700" py={4} px={4} flexDir="column" {...props}>
        <Flex alignItems="center" mb="8px" justifyContent="space-between">
          <Flex direction="column">
            <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs" mr={1}>
              Rewards
            </Text>
            {/* Hide this until we have prices for all rewards types */}
            {/* {rewards?.map((item) => (
              <Flex key={item.address} direction="row" alignItems="center">
                <Text
                  fontFamily="heading"
                  fontSize="20px"
                  lineHeight="28px"
                  fontWeight={800}
                  mr={1}
                >
                  {currency(item.claimableAmount)}
                </Text>
                <TokenIcon width={18} height={18} symbol={item.symbol} />
              </Flex>
            ))} */}
          </Flex>
          <Button size="sm" onClick={() => exec()}>
            Claim
          </Button>
        </Flex>
        {!isLoading && !hasRewards ? (
          <Fade in>
            <Flex mt="20px" mb="8px" justifyContent="center">
              <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs">
                No Rewards Available
              </Text>
            </Flex>
          </Fade>
        ) : (
          <TableContainer width="100%" mb="8px">
            <Table>
              <Thead>
                <Tr borderBottom="1px solid #2D2D38">
                  <Th
                    textTransform="unset"
                    color="gray.600"
                    border="none"
                    fontFamily="heading"
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing={0.6}
                    fontWeight={700}
                    px={4}
                    py={3}
                  >
                    Rewards Type
                  </Th>
                  <Th
                    textTransform="unset"
                    color="gray.600"
                    border="none"
                    fontFamily="heading"
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing={0.6}
                    fontWeight={700}
                    px={4}
                    py={3}
                  >
                    Earnings
                  </Th>
                </Tr>
              </Thead>
              {isLoading ? (
                <RewardsLoading />
              ) : (
                <Tbody>
                  {rewards?.map((item) => (
                    <RewardsRow
                      key={item.address}
                      symbol={item.symbol}
                      claimableAmount={item.claimableAmount.toNumber()}
                      frequency={item.duration}
                      lifetimeClaimed={item.lifetimeClaimed}
                      address={item.distributorAddress}
                      total={item.total}
                    />
                  ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        )}
      </BorderBox>
    </>
  );
};
