import { Box, Divider, Flex, Skeleton, Text } from '@chakra-ui/react';
import { useVaultsData, VaultsDataType } from '@snx-v3/useVaultsData';
import React, { FC } from 'react';
import Wei, { wei } from '@synthetixio/wei';
import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v3/formatters';
import { useParams } from '@snx-v3/useParams';
import { BorderBox } from '@snx-v3/BorderBox';
import { CollateralIcon } from '@snx-v3/icons';
import { useCollateralPrices } from '@snx-v3/useCollateralPrices';
import { useApr } from '@snx-v3/useApr';
import { Tooltip } from '@snx-v3/Tooltip';

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
  collateralPriceByAddress?: Record<string, Wei | undefined>;
  apr?: number;
  isAprLoading?: boolean;
}> = ({ vaultsData, collateralPriceByAddress, apr, isAprLoading }) => {
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
              {formatNumberToUsd(totalCollateral.value.toNumber())}
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
              {formatNumberToUsd(totalDebt.toNumber())}
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
                {`${apr ? apr?.toFixed(2) : '-'}%`}
              </Text>
            </Tooltip>
          )}
        </Flex>
      </BorderBox>
      <Flex flexDirection="column" justifyContent="space-between">
        {!vaultsData || !collateralPriceByAddress ? (
          <Box>
            <Skeleton mt={4} w="full" height={24} />
            <Skeleton mt={2} w="full" height={24} />
          </Box>
        ) : (
          <>
            <Divider mt={6} mb={4} />
            {vaultsData.map((vaultCollateral) => {
              const price = collateralPriceByAddress?.[vaultCollateral.collateralType.tokenAddress];
              return (
                <React.Fragment key={vaultCollateral.collateralType.tokenAddress}>
                  <Box
                    display="flex"
                    px={4}
                    mb={2}
                    flexDirection="column"
                    borderBottom="1px"
                    borderColor="gray.900"
                    _last={{ borderBottom: 'none' }}
                    data-testid="pool collateral"
                    data-collateral={vaultCollateral.collateralType.symbol}
                  >
                    <Flex color="white" display="flex" gap={1} alignItems="center">
                      <CollateralIcon
                        width="30px"
                        height="30px"
                        fill="#0B0B22"
                        color="#00D1FF"
                        symbol={vaultCollateral.collateralType.symbol}
                      />
                      <Text fontWeight={700} fontSize="xl">
                        {vaultCollateral.collateralType.displaySymbol}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="400"
                        data-testid="collateral price"
                      >
                        {price ? formatNumberToUsd(price.toNumber()) : '-'}
                      </Text>
                    </Flex>
                    <Flex gap={2} justifyContent="space-between">
                      <Flex flexBasis="50%" flexDirection="column">
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
                          {formatNumberToUsd(vaultCollateral.collateral.value.toNumber())}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          fontWeight="400"
                          data-testid="collateral amount"
                        >
                          {formatNumber(vaultCollateral.collateral.amount.toNumber())}{' '}
                          {vaultCollateral.collateralType.displaySymbol}
                        </Text>
                      </Flex>
                      <Flex flexBasis="50%" flexDirection="column">
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
                          {formatNumberToUsd(vaultCollateral.debt.toNumber())}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          fontWeight="400"
                          data-testid="collateral cratio"
                        >
                          VAULT C-RATIO:{' '}
                          {vaultCollateral.debt.eq(0)
                            ? '-'
                            : formatPercent(
                                vaultCollateral.collateral.value
                                  .div(vaultCollateral.debt)
                                  .toNumber(),
                                { maximumFractionDigits: 0 }
                              )}
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
  const params = useParams();

  const { data: vaultsData } = useVaultsData(params.poolId ? parseFloat(params.poolId) : undefined);
  const { data: collateralPriceByAddress } = useCollateralPrices();
  const { data: aprData, isLoading: isAprLoading } = useApr();

  return (
    <CollateralSectionUi
      vaultsData={vaultsData}
      collateralPriceByAddress={collateralPriceByAddress}
      apr={aprData?.combinedApr}
      isAprLoading={isAprLoading}
    />
  );
};
