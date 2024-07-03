import {
  Button,
  Table,
  Fade,
  Flex,
  Skeleton,
  TableContainer,
  Text,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from '@chakra-ui/react';
import { useVaultsData, VaultsDataType } from '@snx-v3/useVaultsData';
import React, { FC, useMemo } from 'react';
import { wei } from '@synthetixio/wei';
import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v3/formatters';
import { useParams } from '@snx-v3/useParams';
import { BorderBox } from '@snx-v3/BorderBox';
import { useApr } from '@snx-v3/useApr';
import { Tooltip } from '@snx-v3/Tooltip';
import {
  ARBITRUM,
  BASE_ANDROMEDA,
  NETWORKS,
  Network,
  useNetwork,
  useWallet,
} from '@snx-v3/useBlockchain';
import { useOfflinePrices } from '@snx-v3/useCollateralPriceUpdates';
import { BigNumberish } from 'ethers';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TokenIcon } from '../TokenIcon';
import { CollateralType, useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { calculateCRatio } from '@snx-v3/calculations';

export const calculateVaultTotals = (vaultsData: VaultsDataType) => {
  const zeroValues = { collateral: { value: wei(0), amount: wei(0) }, debt: wei(0) };
  if (!vaultsData) return zeroValues;

  return vaultsData.reduce((acc, { collateral, debt }) => {
    acc.collateral = {
      value: acc.collateral.value.add(collateral.value),
      amount: acc.collateral.amount.add(collateral.amount),
    };
    acc.debt = acc.debt.add(debt);
    return acc;
  }, zeroValues);
};

export const CollateralSectionUi: FC<{
  vaultsData: VaultsDataType;
  collateralPrices?: { symbol: string; price: BigNumberish }[];
  apr?: {
    combinedApr: number;
    cumulativePnl: number;
    collateralAprs: any[];
  };
  isAprLoading?: boolean;
  isVaultsLoading?: boolean;
  network: Network | undefined;
  poolId: string | undefined;
}> = ({ vaultsData, apr, isAprLoading, isVaultsLoading, network, poolId }) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const { network: currentNetwork, setNetwork } = useNetwork();
  const { connect } = useWallet();

  const { collateral: totalCollateral, debt: totalDebt } = calculateVaultTotals(vaultsData);

  const isInTotalProfit = totalDebt.lt(0);

  return (
    <Flex
      bg="navy.700"
      borderWidth="1px"
      borderColor="gray.900"
      borderRadius="base"
      padding={6}
      flexDirection="column"
      data-testid="pool collateral types"
    >
      <Text fontWeight={700} fontSize="xl">
        Pool Collateralization
      </Text>
      <BorderBox padding={4} mt={4} flexDirection="column">
        {/* Total TVL */}
        <Flex justifyContent="space-between" mb={2}>
          <Text
            display="flex"
            alignItems="center"
            fontWeight={700}
            fontSize="md"
            gap={1}
            color="white"
          >
            Total TVL
          </Text>
          <Skeleton
            startColor="whiteAlpha.500"
            endColor="whiteAlpha.200"
            borderRadius={4}
            isLoaded={Boolean(!isVaultsLoading && vaultsData)}
            placeholder="$147,654,901.78"
            width="163px"
            height="26px"
          >
            <Fade in>
              <Text
                fontWeight={700}
                fontSize="xl"
                color="white"
                data-testid="pool tvl"
                textAlign="end"
              >
                {formatNumberToUsd(totalCollateral.value.toNumber(), { maximumFractionDigits: 0 })}
              </Text>
            </Fade>
          </Skeleton>
        </Flex>
        {/* Total Debt */}
        <Flex justifyContent="space-between" mb={2}>
          <Text
            display="flex"
            alignItems="center"
            fontWeight={700}
            fontSize="md"
            gap={1}
            color="white"
          >
            Total Debt/Profit
          </Text>
          <Skeleton
            startColor="whiteAlpha.500"
            endColor="whiteAlpha.200"
            borderRadius={4}
            isLoaded={Boolean(!isVaultsLoading && vaultsData)}
            placeholder="$147,654,901.78"
            width="163px"
            height="26px"
          >
            <Fade in>
              <Text
                fontWeight={700}
                fontSize="xl"
                data-testid="pool total debt"
                textAlign="end"
                color={isInTotalProfit ? 'green.500' : 'white'}
              >
                {isInTotalProfit ? '+' : '-'}
                {formatNumberToUsd(totalDebt.abs().toNumber(), { maximumFractionDigits: 0 })}
              </Text>
            </Fade>
          </Skeleton>
        </Flex>
        {/* APR */}
        <Flex justifyContent="space-between">
          <Text
            display="flex"
            alignItems="center"
            fontWeight={700}
            fontSize="md"
            gap={1}
            color="white"
          >
            APR
          </Text>
          <Skeleton
            startColor="whiteAlpha.500"
            endColor="whiteAlpha.200"
            borderRadius={4}
            isLoaded={!isAprLoading}
            width="163px"
            height="26px"
          >
            <Fade in>
              <Tooltip label="APR is a combination of past week pool performance and rewards.">
                <Text fontWeight={700} fontSize="xl" color="white" textAlign="end">
                  {network?.id === ARBITRUM.id ? 'Up to ' : ''}
                  {formatApr(apr?.combinedApr, network?.id)}
                </Text>
              </Tooltip>
            </Fade>
          </Skeleton>
        </Flex>
      </BorderBox>
      <TableContainer
        maxW="100%"
        mt={4}
        borderRadius="5px"
        sx={{
          borderCollapse: 'separate !important',
          borderSpacing: 0,
        }}
      >
        <Table>
          <Thead>
            <Tr>
              <Th
                borderBottom="none"
                fontFamily="heading"
                fontSize="12px"
                fontWeight={700}
                lineHeight="16px"
                letterSpacing={0.6}
                color="gray.600"
                textTransform="none"
              >
                Asset
              </Th>
              <Th
                borderBottom="none"
                fontFamily="heading"
                fontSize="12px"
                fontWeight={700}
                lineHeight="16px"
                letterSpacing={0.6}
                color="gray.600"
                textTransform="none"
              >
                TVL
              </Th>
              <Th
                borderBottom="none"
                fontFamily="heading"
                fontSize="12px"
                fontWeight={700}
                lineHeight="16px"
                letterSpacing={0.6}
                color="gray.600"
                textTransform="none"
              >
                Debt/Profit
              </Th>
              <Th
                borderBottom="none"
                fontFamily="heading"
                fontSize="12px"
                fontWeight={700}
                lineHeight="16px"
                letterSpacing={0.6}
                color="gray.600"
                textTransform="none"
              >
                APR
              </Th>
              <Th
                borderBottom="none"
                fontFamily="heading"
                fontSize="12px"
                fontWeight={700}
                lineHeight="16px"
                letterSpacing={0.6}
                color="gray.600"
                textTransform="none"
              >
                {' '}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {(isAprLoading || isVaultsLoading || !vaultsData) && (
              <React.Fragment>
                {[1, 2, 3].map((index) => (
                  <Tr
                    key={index}
                    textAlign="left"
                    borderBottomColor="gray.900"
                    borderBottomWidth="1px"
                  >
                    <Th borderBottom="none">
                      <Skeleton height="26px" width="92px" />
                    </Th>
                    <Th borderBottom="none">
                      <Skeleton height="26px" width="92px" />
                    </Th>
                    <Th borderBottom="none">
                      <Skeleton height="26px" width="92px" />
                    </Th>
                    <Th borderBottom="none">
                      <Skeleton height="26px" width="92px" />
                    </Th>
                    <Th borderBottom="none">
                      <Skeleton height="26px" width="92px" />
                    </Th>
                  </Tr>
                ))}
              </React.Fragment>
            )}
            {vaultsData?.map((vaultCollateral, i) => {
              // Calculate c-ratio
              const cRatio = calculateCRatio(
                vaultCollateral.debt,
                vaultCollateral.collateral.value
              );

              const collateralApr = apr?.collateralAprs.find(
                (a) =>
                  a.collateralType.toLowerCase() ===
                  vaultCollateral.collateralType.tokenAddress.toLowerCase()
              );

              const { apr28d, apr28dRewards, apr28dPnl } = collateralApr || {
                apr28d: 0,
                apr28dRewards: 0,
                apr28dPnl: 0,
              };

              const isInProfit = vaultCollateral.debt.lt(0);

              const borderTopWidth = i === 0 ? '1px' : '0px';

              return (
                <Tr
                  key={vaultCollateral.collateralType.tokenAddress}
                  borderTopWidth={borderTopWidth}
                  borderTopColor="gray.900"
                  borderBottomWidth="1px"
                  borderBottomColor="gray.900"
                >
                  <Td borderBottom="none" py={1}>
                    <Fade in>
                      <Flex alignItems="center" gap={2}>
                        <TokenIcon symbol={vaultCollateral.collateralType.symbol} w={30} h={30} />
                        <Flex>
                          <Flex direction="column">
                            <Text fontWeight={700} lineHeight="20px" fontSize="14px" color="white">
                              {vaultCollateral.collateralType.displaySymbol}
                            </Text>
                            <Text
                              fontFamily="heading"
                              fontSize="12px"
                              lineHeight="16px"
                              color="gray.500"
                            >
                              {vaultCollateral.collateralType.name}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Fade>
                  </Td>
                  <Td borderBottom="none">
                    <Fade in>
                      <Flex direction="column">
                        <Text
                          fontSize="14px"
                          fontWeight={500}
                          color="white"
                          lineHeight="20px"
                          fontFamily="heading"
                          data-testid="collateral value"
                        >
                          {formatNumberToUsd(vaultCollateral.collateral.value.toNumber(), {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}
                        </Text>
                        <Text
                          fontSize="12px"
                          color="gray.500"
                          lineHeight="16px"
                          fontFamily="heading"
                          data-testid="collateral value"
                        >
                          {formatNumber(vaultCollateral.collateral.amount.toNumber(), {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}{' '}
                          {vaultCollateral.collateralType.symbol}
                        </Text>
                      </Flex>
                    </Fade>
                  </Td>
                  <Td borderBottom="none">
                    <Fade in>
                      <Tooltip
                        label={
                          isInProfit
                            ? `This vault has a profit of ${formatNumberToUsd(
                                vaultCollateral.debt.abs().toNumber(),
                                {
                                  maximumFractionDigits: 0,
                                  minimumFractionDigits: 0,
                                }
                              )}`
                            : ''
                        }
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="14px"
                            fontWeight={700}
                            color={isInProfit ? 'green.500' : 'white'}
                            data-testid="collateral debt"
                          >
                            {isInProfit ? '+' : '-'}
                            {formatNumberToUsd(vaultCollateral.debt.abs().toNumber(), {
                              maximumFractionDigits: 0,
                              minimumFractionDigits: 0,
                            })}
                          </Text>
                          <Text
                            fontFamily="heading"
                            fontSize="12px"
                            lineHeight="14px"
                            color="gray.500"
                          >
                            C-ratio {cRatio.lte(0) ? 'N/A' : formatPercent(cRatio.toNumber())}
                          </Text>
                        </Flex>
                      </Tooltip>
                    </Fade>
                  </Td>
                  <Td borderBottom="none">
                    <Fade in>
                      <Tooltip
                        label={
                          <Flex direction="column">
                            <Flex justifyContent="space-between">
                              <Text mr={2}>Total APR:</Text>
                              <Text>{formatApr(apr28d * 100, network?.id)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                              <Text mr={2}>Performance:</Text>
                              <Text>{formatApr(apr28dPnl * 100, network?.id)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                              <Text mr={2}>Rewards: </Text>
                              <Text>{formatApr(apr28dRewards * 100, network?.id)}</Text>
                            </Flex>
                          </Flex>
                        }
                      >
                        <Text
                          fontSize="md"
                          fontWeight={700}
                          color="white"
                          data-testid="collateral apr"
                        >
                          {formatApr(apr28d * 100, network?.id)}
                        </Text>
                      </Tooltip>
                    </Fade>
                  </Td>
                  <Td borderBottom="none" textAlign="end">
                    <Fade in>
                      <Button
                        onClick={async (e) => {
                          try {
                            e.stopPropagation();

                            if (!currentNetwork) {
                              connect();
                              return;
                            }

                            if (network && currentNetwork.id !== network.id) {
                              if (!(await setNetwork(network.id))) {
                                return;
                              }
                            }

                            queryParams.set('manageAction', 'deposit');
                            navigate({
                              pathname: `/positions/${vaultCollateral.collateralType.symbol}/${poolId}`,
                              search: queryParams.toString(),
                            });
                          } catch (error) {}
                        }}
                        height="32px"
                        py="10px"
                        px="12px"
                        whiteSpace="nowrap"
                        borderRadius="4px"
                        fontFamily="heading"
                        fontWeight={700}
                        fontSize="14px"
                        lineHeight="20px"
                      >
                        Deposit
                      </Button>
                    </Fade>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export const CollateralSection = () => {
  const { poolId, networkId } = useParams();

  const network = NETWORKS.find((n) => n.id === Number(networkId));

  const { data: vaultsData, isLoading: isVaultsLoading } = useVaultsData(Number(poolId), network);
  const { data: aprData, isLoading: isAprLoading } = useApr(network);

  const { data: BaseCollateralTypes } = useCollateralTypes(false, BASE_ANDROMEDA);
  const { data: ArbitrumCollateralTypes } = useCollateralTypes(false, ARBITRUM);

  const allCollaterals: CollateralType[] = useMemo(() => {
    if (!BaseCollateralTypes || !ArbitrumCollateralTypes) {
      return [];
    }

    return BaseCollateralTypes.concat(ArbitrumCollateralTypes);
  }, [ArbitrumCollateralTypes, BaseCollateralTypes]);

  const { data: collateralPrices } = useOfflinePrices(
    allCollaterals.map((item) => ({
      id: item.tokenAddress,
      oracleId: item.oracleNodeId,
      symbol: item.symbol,
    }))
  );

  return (
    <CollateralSectionUi
      vaultsData={vaultsData}
      collateralPrices={collateralPrices}
      apr={aprData}
      isAprLoading={isAprLoading}
      isVaultsLoading={isVaultsLoading}
      network={network}
      poolId={poolId}
    />
  );
};

function formatApr(apr?: number, networkId?: number) {
  if (!networkId || !apr || apr <= 0) return '-';

  return `${apr.toFixed(2)}%`;
}
