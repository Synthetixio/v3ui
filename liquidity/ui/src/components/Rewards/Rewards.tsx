import { InfoIcon } from '@chakra-ui/icons';
import {
  Fade,
  Flex,
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
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { useRewards } from '@snx-v3/useRewards';
import { RewardsLoading } from './RewardsLoading';
import { RewardsRow } from './RewardsRow';

export const Rewards = ({ ...props }: FlexProps) => {
  const { accountId, collateralSymbol, poolId } = useParams();
  const { data: collateralType } = useCollateralType(collateralSymbol);
  const { isLoading, data: rewards } = useRewards(poolId, collateralType?.tokenAddress, accountId);

  const hasRewards = rewards && rewards.length > 0;

  return (
    <BorderBox bg="navy.700" py={4} px={4} flexDir="column" {...props}>
      <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs" mb="8px">
        Rewards
      </Text>

      {!isLoading && !hasRewards ? (
        <Fade in>
          <Flex mt="20px" mb="8px" justifyContent="center">
            <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs">
              No Rewards Available
            </Text>
          </Flex>
        </Fade>
      ) : null}

      {hasRewards ? (
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
            {isLoading && !rewards?.length ? <RewardsLoading /> : null}
            {rewards?.length ? (
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
            ) : null}
          </Table>
        </TableContainer>
      ) : null}
    </BorderBox>
  );
};
