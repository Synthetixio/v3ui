import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Button, Text, Divider, Heading, Fade, Tag } from '@chakra-ui/react';
import { Tooltip } from '@snx-v3/Tooltip';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ZEROWEI } from '../../../utils/constants';
import { Network, NetworkIcon, useNetwork } from '@snx-v3/useBlockchain';
import { compactInteger } from 'humanize-plus';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { CollateralIcon } from '@snx-v3/icons';
import { useMemo } from 'react';
import { wei } from '@synthetixio/wei';

export interface PoolCardProps {
  pool: {
    name: string;
    id: string;
  };
  network: Network;
  collaterals: string[];
  collateralTypes: {
    oracle_node_id: string;
    name: string;
    decimals: number;
    symbol: string;
    total_amount_deposited: string;
  }[];
  apr: {
    combinedApr: number;
    cumulativePnl: number;
  };
}

export const PoolCard = ({ pool, network, collaterals, apr, collateralTypes }: PoolCardProps) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const { network: currentNetwork, setNetwork } = useNetwork();

  const vaultTVL = collateralTypes.reduce((acc, type) => {
    const amount = wei(type.total_amount_deposited, type.decimals, true);
    return acc.add(amount);
  }, ZEROWEI);

  const isCollateralFiltered = useMemo(
    () =>
      collateralTypes?.some((collateralType) =>
        collaterals.length
          ? !!collaterals.find((collateral) => {
              if (
                isBaseAndromeda(network.id, network.preset) &&
                collateralType.symbol.toUpperCase() === 'SUSDC'
              ) {
                return collateral.toUpperCase() === 'USDC';
              }
              return collateral.toUpperCase() === collateralType.symbol.toUpperCase();
            })
          : true
      ),
    [collateralTypes, collaterals, network.id, network.preset]
  );

  if (!isCollateralFiltered) {
    return null;
  }

  return (
    <Fade in>
      <Flex
        flexDir="column"
        w="100%"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
        bg="navy.700"
        p="6"
        _hover={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`/pools/${pool.id}`);
        }}
      >
        <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={4}>
          <Flex>
            <Flex flexDir="column" gap={1}>
              <Heading fontSize="20px" fontWeight={700} color="white">
                {pool?.name}
              </Heading>
              <Flex alignItems="center" fontSize="12px" color="gray.500" gap={1} fontWeight="bold">
                <NetworkIcon size="14px" networkId={network.id} mr={1} />
                {network.label} Network
              </Flex>
            </Flex>
            {[1, 42161].includes(network.id) && (
              <Tag
                ml={2}
                mt="2px"
                size="sm"
                bg="purple.500"
                mr="auto"
                color="white"
                height="fit-content"
              >
                Borrow Interest-Free
              </Tag>
            )}
          </Flex>
          <Flex flexWrap="wrap">
            <Flex alignItems="center" mr={6} gap={2}>
              <Text fontSize="20px" fontWeight="bold" color="gray.500">
                TVL
              </Text>
              <Text
                fontWeight="bold"
                fontSize="20px"
                color="white"
                display="flex"
                alignItems="center"
                lineHeight="36px"
              >
                {(vaultTVL?.toNumber() && `$${compactInteger(vaultTVL.toNumber(), 1)}`) || '-'}
                <Tooltip
                  label={
                    <Flex flexDirection="column" alignItems="start">
                      <Text fontWeight="bold" fontSize="14px">
                        Total Value Locked:
                      </Text>
                      <Text textAlign="left" fontSize="14px">
                        Is the total amount of assets locked as collateral on this Pool.
                      </Text>
                      <Text fontSize="14px">Last 7 days Pool PNL * 52</Text>
                    </Flex>
                  }
                >
                  <InfoIcon ml={1} mb={0.5} w="10px" h="10px" />
                </Tooltip>
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Text fontSize="20px" fontWeight="bold" color="gray.500">
                APR
              </Text>
              <Text fontWeight="bold" fontSize="20px" color="white" lineHeight="36px">
                {apr.combinedApr > 0 ? apr.combinedApr.toFixed(2)?.concat('%') : '-'}
                {apr.combinedApr > 0 && (
                  <Tooltip
                    label={
                      <Flex flexDirection="column" alignItems="start">
                        <Text fontWeight="bold" fontSize="14px">
                          Annual Percentage Yield (APY):
                        </Text>
                        <Text textAlign="left" fontSize="14px">
                          Reflects the Pool PNL. It is calculated as an estimate derived from past
                          week historical PNL, extrapolated as a year average.
                        </Text>
                        <Text fontWeight="bold" mt={2} fontSize="14px">
                          Calculation
                        </Text>
                        <Text fontSize="14px">Last 7 days Pool PNL * 52</Text>
                      </Flex>
                    }
                  >
                    <InfoIcon ml={1} w="10px" h="10px" mb={0.5} />
                  </Tooltip>
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Divider mt="18px" mb="10px" />
        <Flex flexWrap="wrap" gap={6}>
          {collateralTypes?.map((type) => (
            <Flex alignItems="center" key={type.oracle_node_id} gap={4} mt={3}>
              <Flex alignItems="center">
                <CollateralIcon width="26px" height="26px" symbol={type.symbol} />
                <Flex flexDirection="column" ml={3} mr="auto">
                  <Text
                    fontSize="14px"
                    color="white"
                    fontWeight={700}
                    lineHeight="1.25rem"
                    fontFamily="heading"
                  >
                    {type.symbol}
                  </Text>
                  <Text fontSize="12px" color="gray.500" fontFamily="heading" lineHeight="1rem">
                    {type.symbol}
                  </Text>
                </Flex>
              </Flex>
              <Button
                size="sm"
                onClick={async (e) => {
                  try {
                    e.preventDefault();
                    if (currentNetwork?.id !== network.id) {
                      if (!(await setNetwork(network.id))) {
                        return;
                      }
                    }
                    queryParams.set('manageAction', 'deposit');
                    navigate({
                      pathname: `/positions/${type.symbol}/${pool.id}`,
                      search: queryParams.toString(),
                    });
                  } catch (error) {}
                }}
                variant="outline"
                colorScheme="gray"
                height="32px"
                py="10px"
                px="12px"
                whiteSpace="nowrap"
                borderRadius="4px"
                color="white"
                fontFamily="heading"
                fontWeight={700}
                fontSize="14px"
                lineHeight="20px"
              >
                Deposit
              </Button>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Fade>
  );
};
