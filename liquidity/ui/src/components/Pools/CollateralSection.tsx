import { Box, Button, Divider, Flex, Skeleton, Text } from '@chakra-ui/react';
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
import { formatEther } from 'ethers/lib/utils';
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
  network: Network | undefined;
  poolId: string | undefined;
}> = ({ vaultsData, collateralPrices, apr, isAprLoading, network, poolId }) => {
  const { network: currentNetwork, setNetwork } = useNetwork();
  const { connect } = useWallet();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const { collateral: totalCollateral, debt: totalDebt } = calculateVaultTotals(vaultsData);

  return (
    <BorderBox padding={4} bg="navy.700" flexDirection="column" data-testid="pool collateral types">
      <Text fontWeight={700} fontSize="xl">
        Pool Collateralization
      </Text>
      <BorderBox padding={4} mt={4} flexDirection="column">
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: 'row', md: 'column', lg: 'row' }}
        >
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
          {!vaultsData ? (
            <Skeleton w={16} h={6} />
          ) : (
            <Text fontWeight={700} fontSize="xl" color="white" data-testid="pool tvl">
              {formatNumberToUsd(totalCollateral.value.toNumber(), { maximumFractionDigits: 0 })}
            </Text>
          )}
        </Flex>
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: 'row', md: 'column', lg: 'row' }}
        >
          <Text
            display="flex"
            alignItems="center"
            fontWeight={700}
            fontSize="md"
            gap={1}
            color="white"
          >
            Total Debt
          </Text>
          {!vaultsData ? (
            <Skeleton mt={1} w={16} h={6} />
          ) : (
            <Text fontWeight={700} fontSize="xl" color="white" data-testid="pool total debt">
              {formatNumberToUsd(totalDebt.toNumber(), { maximumFractionDigits: 0 })}
            </Text>
          )}
        </Flex>
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: 'row', md: 'column', lg: 'row' }}
        >
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
          {isAprLoading ? (
            <Skeleton mt={1} w={16} h={6} />
          ) : (
            <Tooltip label="APR is a combination of past week pool performance and rewards.">
              <Text fontWeight={700} fontSize="xl" color="white">
                {`${
                  !!apr && apr.combinedApr > 0
                    ? `${network?.id === 42161 ? 'Up to ' : ''}${apr.combinedApr.toFixed(2)}`
                    : '-'
                }%`}
              </Text>
            </Tooltip>
          )}
        </Flex>
      </BorderBox>
      <Flex py={3} flexDirection="column" justifyContent="space-between">
        {!vaultsData || !collateralPrices ? (
          <Box>
            <Skeleton mt={4} w="full" height={24} />
            <Skeleton mt={2} w="full" height={24} />
          </Box>
        ) : (
          <>
            {vaultsData.map((vaultCollateral) => {
              const price = collateralPrices?.find(
                (item) => item.symbol === vaultCollateral.collateralType.symbol
              )?.price;

              const cRatio = calculateCRatio(
                vaultCollateral.debt,
                vaultCollateral.collateral.value
              );

              return (
                <React.Fragment key={vaultCollateral.collateralType.tokenAddress}>
                  <Divider my={4} />
                  <Box
                    display="flex"
                    px={4}
                    flexDirection="column"
                    borderColor="gray.900"
                    _last={{ borderBottom: 'none' }}
                    data-testid="pool collateral"
                    data-collateral={vaultCollateral.collateralType.symbol}
                  >
                    <Flex color="white" display="flex" gap={2} alignItems="center">
                      <TokenIcon symbol={vaultCollateral.collateralType.symbol} w={30} h={30} />
                      <Text fontWeight={700} fontSize="xl">
                        {vaultCollateral.collateralType.displaySymbol}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="400"
                        data-testid="collateral price"
                      >
                        {price
                          ? formatNumberToUsd(formatEther(price.toString()), {
                              maximumFractionDigits: 4,
                              minimumFractionDigits: 2,
                            })
                          : '-'}
                      </Text>
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
                        size="sm"
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
                    <Flex gap={2} justifyContent="space-between">
                      <Flex gap={1} flexBasis="50%" flexDirection="column">
                        <Text
                          mt={2}
                          fontSize="sm"
                          color="gray.500"
                          textTransform="uppercase"
                          whiteSpace="nowrap"
                        >
                          TVL
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight={700}
                          color="white"
                          data-testid="collateral value"
                        >
                          {formatNumberToUsd(vaultCollateral.collateral.value.toNumber(), {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          fontWeight="400"
                          data-testid="collateral amount"
                        >
                          {formatNumber(vaultCollateral.collateral.amount.toNumber(), {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}{' '}
                          {vaultCollateral.collateralType.displaySymbol}
                        </Text>
                      </Flex>
                      <Flex gap={1} flexBasis="50%" flexDirection="column">
                        <Text
                          mt={2}
                          fontSize="sm"
                          color="gray.500"
                          textTransform="uppercase"
                          whiteSpace="nowrap"
                        >
                          Debt
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight={700}
                          color="white"
                          data-testid="collateral debt"
                        >
                          {formatNumberToUsd(vaultCollateral.debt.toNumber(), {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          })}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          fontWeight="400"
                          data-testid="collateral cratio"
                        >
                          VAULT C-RATIO:{' '}
                          {cRatio.lte(0)
                            ? 'N/A'
                            : formatPercent(cRatio.toNumber(), { maximumFractionDigits: 0 })}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </React.Fragment>
              );
            })}
          </>
        )}
      </Flex>
    </BorderBox>
  );
};

export const CollateralSection = () => {
  const { poolId, networkId } = useParams();

  const network = NETWORKS.find((n) => n.id === Number(networkId));

  const { data: vaultsData } = useVaultsData(Number(poolId), network);
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
      network={network}
      poolId={poolId}
    />
  );
};
