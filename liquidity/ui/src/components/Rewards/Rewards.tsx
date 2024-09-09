import { InfoIcon } from '@chakra-ui/icons';
import {
  Fade,
  Flex,
  Td,
  FlexProps,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { Tooltip } from '@snx-v3/Tooltip';
import { useParams } from '@snx-v3/useParams';
import { useRewards } from '@snx-v3/useRewards';
import { RewardsLoading } from './RewardsLoading';
import { RewardsRow } from './RewardsRow';

export const Rewards = ({ ...props }: FlexProps) => {
  const { accountId, collateralSymbol, poolId } = useParams();
  const { isPending, data: rewards } = useRewards({ poolId, collateralSymbol, accountId });

  return (
    <BorderBox bg="navy.700" py={4} px={4} flexDir="column" {...props}>
      <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs" mb="8px">
        Rewards
      </Text>

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
                Rewards type
                <Tooltip label="Total rewards active for the Pool">
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
          <Tbody>
            {isPending ? <RewardsLoading /> : null}
            {!isPending && rewards && rewards.length > 0
              ? rewards?.map((item) => (
                  <RewardsRow
                    key={item.address}
                    symbol={item.symbol}
                    claimableAmount={item.claimableAmount.toNumber()}
                    lifetimeClaimed={item.lifetimeClaimed}
                    address={item.distributorAddress}
                  />
                ))
              : null}
            {!isPending && rewards && rewards.length === 0 ? (
              <Td display="flex" alignItems="left" px={4} border="none" w="100%">
                <Text color="gray.500" fontFamily="heading" fontSize="xs">
                  No Rewards Available
                </Text>
              </Td>
            ) : null}
          </Tbody>
        </Table>
      </TableContainer>
    </BorderBox>
  );
};
