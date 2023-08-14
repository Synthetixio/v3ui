import { Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { RewardsRow } from './RewardsRow';

interface RewardsItem {
  collateralType: string;
  amount: number;
  frequency: string;
  earnings: number;
  lifetimeEarned: number;
  hasClaimed: boolean;
}

export const Rewards = () => {
  const rewards: RewardsItem[] = [
    {
      collateralType: 'SNX',
      amount: 20,
      earnings: 200,
      frequency: 'every day',
      lifetimeEarned: 2000,
      hasClaimed: false,
    },
    {
      collateralType: 'OP',
      amount: 60,
      earnings: 2000,
      frequency: 'every day',
      lifetimeEarned: 100000,
      hasClaimed: true,
    },
    {
      collateralType: 'WTF',
      amount: 600,
      earnings: 1002,
      frequency: 'every week',
      lifetimeEarned: 0,
      hasClaimed: false,
    },
  ];

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
            {rewards.map((item) => (
              <RewardsRow
                key={item.collateralType}
                collateralType={item.collateralType}
                amount={item.amount}
                frequency={item.frequency}
                earnings={item.earnings}
                lifetimeEarned={item.lifetimeEarned}
                hasClaimed={item.hasClaimed}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </BorderBox>
  );
};
