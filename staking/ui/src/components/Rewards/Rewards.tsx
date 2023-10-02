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
  Tooltip,
} from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { RewardsRow } from './RewardsRow';
import { RewardsType } from '@snx-v3/useRewards';
import { RewardsLoading } from './RewardsLoading';
import { InfoIcon } from '@chakra-ui/icons';

interface RewardsDistributorsInterface extends FlexProps {
  rewards?: RewardsType;
  isLoading: boolean;
}

export const Rewards = ({ rewards, isLoading, ...props }: RewardsDistributorsInterface) => {
  const empty = (typeof rewards === 'undefined' && !isLoading) || (rewards && rewards.length === 0);

  return (
    <BorderBox bg="navy.700" py={4} px={6} flexDir="column" {...props}>
      <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs" mb="8px">
        REWARDS
      </Text>
      <TableContainer width="100%" mb="8px">
        {empty ? (
          <Fade in>
            <Flex mt="20px" mb="8px" justifyContent="center">
              <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs">
                No Rewards Available
              </Text>
            </Flex>
          </Fade>
        ) : (
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
                  Estimated Rate
                  <Tooltip label="Estimated rewards based on your position size">
                    <InfoIcon ml={1} mb="1px" />
                  </Tooltip>
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
                <Th
                  textTransform="unset"
                  color="transparent"
                  border="none"
                  fontFamily="heading"
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing={0.6}
                  fontWeight={700}
                  px={4}
                  py={3}
                >
                  Claim
                </Th>
              </Tr>
            </Thead>
            {isLoading ? (
              <RewardsLoading />
            ) : (
              <Tbody>
                {/* TODO: Update results with amount/frequency/lifetime/hasClaimed */}
                {rewards
                  ?.sort((a, b) => b.claimableAmount.toNumber() - a.claimableAmount.toNumber())
                  .map((item) => (
                    <RewardsRow
                      key={item.address}
                      symbol={item.symbol}
                      amount={item.claimableAmount.toNumber()}
                      frequency={item.duration}
                      projectedAmount={item.rate / item.duration || 0}
                      lifetimeClaimed={item.lifetimeClaimed}
                      hasClaimed={item.claimableAmount.lte(0)}
                      address={item.distributorAddress}
                    />
                  ))}
              </Tbody>
            )}
          </Table>
        )}
      </TableContainer>
    </BorderBox>
  );
};
