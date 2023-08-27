import { Table, TableContainer, Tbody, Text, Th, Thead, Tr, Td, Fade } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { RewardsRow } from './RewardsRow';

interface RewardsItem {
  symbol: string;
  amount: number;
  frequency: string;
  earnings: number;
  lifetimeEarned: number;
  hasClaimed: boolean;
}

interface RewardsDistributorInterface {
  id: string;
}

interface RewardsDistributorsInterface {
  rewards: RewardsDistributorInterface[];
  isLoading: boolean;
}

export const Rewards = ({
  rewards: rewardsDistributor,
  isLoading,
}: RewardsDistributorsInterface) => {
  const rewards: RewardsItem[] = rewardsDistributor.map((item) => {
    return {
      symbol: item.id,
      amount: 20,
      earnings: 200,
      frequency: 'every day',
      lifetimeEarned: 2000,
      hasClaimed: false,
    };
  });

  const empty = rewards.length === 0;

  return (
    <BorderBox bg="navy.700" py={4} px={6} flexDir="column">
      <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs" mb="8px">
        REWARDS
      </Text>
      {/* TODO Map Over rewards and  */}
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
                Estimated Rate
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
                Claim{' '}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <></>
            ) : (
              <>
                {empty ? (
                  <Tr borderBottom="1px solid #2D2D38">
                    <Td
                      border="none"
                      colSpan={3}
                      textAlign="center"
                      textTransform="unset"
                      fontFamily="heading"
                      fontSize="14px"
                      lineHeight="16px"
                      color="gray.400"
                      px={4}
                      py={4}
                    >
                      <Fade in={!isLoading}>No rewards available</Fade>
                    </Td>
                  </Tr>
                ) : (
                  <Fade in={!isLoading}>
                    {rewards.map((item) => (
                      <RewardsRow
                        key={item.symbol}
                        symbol={item.symbol}
                        amount={item.amount}
                        frequency={item.frequency}
                        earnings={item.earnings}
                        lifetimeEarned={item.lifetimeEarned}
                        hasClaimed={item.hasClaimed}
                      />
                    ))}
                  </Fade>
                )}
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </BorderBox>
  );
};
