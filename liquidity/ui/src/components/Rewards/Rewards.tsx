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
} from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { RewardsRow } from './RewardsRow';
import { RewardsType } from '@snx-v3/useRewards';
import { RewardsLoading } from './RewardsLoading';
import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@snx-v3/Tooltip';

interface RewardsDistributorsInterface extends FlexProps {
  rewards?: RewardsType;
  isLoading: boolean;
  readOnly?: boolean;
}

export const Rewards = ({
  rewards,
  isLoading,
  readOnly = false,
  ...props
}: RewardsDistributorsInterface) => {
  const hasRewards = rewards && rewards.length > 0;

  return (
    <BorderBox bg="navy.700" py={4} px={4} flexDir="column" {...props}>
      <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs" mb="8px">
        REWARDS
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
                Active Rewards
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
          {isLoading ? (
            <RewardsLoading />
          ) : hasRewards ? (
            <Tbody>
              {rewards?.map((item) => (
                <RewardsRow
                  key={item.address}
                  symbol={item.symbol}
                  claimableAmount={item.claimableAmount.toNumber()}
                  frequency={item.duration}
                  lifetimeClaimed={item.lifetimeClaimed}
                  hasClaimed={item.lifetimeClaimed > 0}
                  address={item.distributorAddress}
                  readOnly={readOnly}
                  total={item.total}
                />
              ))}
            </Tbody>
          ) : (
            <Fade in>
              <Flex mt="20px" mb="8px" justifyContent="center">
                <Text color="gray.500" fontFamily="heading" lineHeight="4" fontSize="xs">
                  No Rewards Available
                </Text>
              </Flex>
            </Fade>
          )}
        </Table>
      </TableContainer>
    </BorderBox>
  );
};
