import { FC, useContext } from 'react';
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { currency } from '@snx-v3/format';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import Wei, { wei } from '@synthetixio/wei';
import { ArrowForwardIcon, InfoIcon } from '@chakra-ui/icons';
import { calculateCRatio } from '@snx-v3/calculations';
import { constants } from 'ethers';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useApr } from '@snx-v3/useApr';
import { Tooltip } from '@snx-v3/Tooltip';

const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  dataTestId?: string;
  formatFn: (val: Wei) => string;
}> = ({ formatFn, value, newValue, hasChanges, dataTestId }) => {
  return (
    <Flex
      gap={4}
      color="gray.50"
      fontSize="2xl"
      fontWeight="800"
      alignItems="center"
      lineHeight="32px"
    >
      <Text data-cy={dataTestId}>{formatFn(value)}</Text>
      {hasChanges && !value.eq(newValue) ? (
        <>
          <ArrowForwardIcon />
          <Text>{formatFn(newValue)}</Text>
        </>
      ) : null}
    </Flex>
  );
};

export const ManageStatsUi: FC<{
  liquidityPosition?: LiquidityPosition;
  collateralType?: CollateralType;
  newCratio: Wei;
  newCollateralAmount: Wei;
  newDebt: Wei;
  cRatio: Wei;
  collateralValue: Wei;
  hasChanges: boolean;
  aprData?: number;
}> = ({
  liquidityPosition,
  collateralType,
  collateralValue,
  cRatio,
  newCollateralAmount,
  newCratio,
  newDebt,
  hasChanges,
  aprData,
}) => {
  const { network } = useNetwork();

  return (
    <Flex direction="column">
      {isBaseAndromeda(network?.id, network?.preset) && (
        <BorderBox
          py={4}
          px={6}
          flexDirection="row"
          bg="navy.700"
          justifyContent="space-between"
          mb={4}
        >
          <Flex flexDirection="column" justifyContent="space-between" width="100%">
            <Flex alignItems="center" mb="4px">
              <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
                APR
              </Text>
              <Tooltip
                label="APR is a combination of past week pool performance and rewards."
                textAlign="start"
                py={2}
                px={3}
              >
                <Flex
                  height="12px"
                  width="12px"
                  ml="4px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <InfoIcon color="white" height="9px" width="9px" />
                </Flex>
              </Tooltip>
            </Flex>
            <Flex width="100%">
              {aprData ? (
                <Flex
                  gap={1}
                  color="gray.50"
                  fontSize="2xl"
                  fontWeight="800"
                  alignItems="center"
                  lineHeight="32px"
                >
                  <Text>{aprData.toFixed(2)}%</Text>
                </Flex>
              ) : (
                <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
              )}
            </Flex>
          </Flex>
        </BorderBox>
      )}
      <BorderBox py={4} px={6} flexDirection="column" bg="navy.700" mb={4}>
        <Flex alignItems="center" mb="4px">
          <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
            COLLATERAL
          </Text>
          <Tooltip
            label="Your total amount of collateral locked in this pool."
            textAlign="start"
            py={2}
            px={3}
          >
            <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
              <InfoIcon color="white" height="9px" width="9px" />
            </Flex>
          </Tooltip>
        </Flex>
        {liquidityPosition && collateralType ? (
          <>
            <Flex justifyContent="space-between" alignItems="center">
              <ChangeStat
                value={liquidityPosition.collateralAmount}
                newValue={newCollateralAmount}
                formatFn={(val: Wei) => `${currency(val)} ${collateralType.displaySymbol}`}
                hasChanges={hasChanges}
              />
              <Text
                fontWeight="400"
                color="gray.500"
                fontSize="md"
                fontFamily="heading"
                lineHeight="24px"
                data-cy="manage-stats-collateral-value"
              >
                {currency(liquidityPosition.collateralValue, {
                  currency: 'USD',
                  style: 'currency',
                })}
              </Text>
            </Flex>
            <Text fontWeight="400" color="gray.500" fontSize="xs">
              Current Value:{' '}
              {currency(collateralValue, {
                currency: 'USD',
                style: 'currency',
              })}
            </Text>
          </>
        ) : (
          <Skeleton width="100%">Lorem ipsum (this wont be displayed) </Skeleton>
        )}
      </BorderBox>
      <BorderBox
        py={4}
        px={6}
        flexDirection="row"
        bg="navy.700"
        justifyContent="space-between"
        mb={4}
      >
        <Flex flexDirection="column" justifyContent="space-between" width="100%">
          <Flex alignItems="center" mb="4px">
            <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
              DEBT
            </Text>
            <Tooltip label="Your minted debt balance." textAlign="start" py={2} px={3}>
              <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
                <InfoIcon color="white" height="9px" width="9px" />
              </Flex>
            </Tooltip>
          </Flex>
          <Flex width="100%">
            {liquidityPosition && collateralType ? (
              <ChangeStat
                value={liquidityPosition.debt}
                newValue={newDebt}
                formatFn={(val: Wei) =>
                  currency(val, {
                    currency: 'USD',
                    style: 'currency',
                    maximumFractionDigits: 8,
                  })
                }
                hasChanges={hasChanges}
                dataTestId="manage-stats-debt-value"
              />
            ) : (
              <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
            )}
          </Flex>
        </Flex>
      </BorderBox>
      {!isBaseAndromeda(network?.id, network?.preset) && (
        <BorderBox py={4} px={6} flexDirection="column" bg="navy.700" my={0} mb={4}>
          <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px" mb="4px">
            C-RATIO
          </Text>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            data-testid="manage stats collateral"
          >
            {liquidityPosition && collateralType ? (
              <>
                <ChangeStat
                  // TODO, need a function to burn to target so dust debt not left over
                  value={cRatio.lt(0.01) || cRatio.gt(50000) ? wei(0) : cRatio}
                  newValue={newCratio}
                  formatFn={(val: Wei) =>
                    currency(val, {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }
                  hasChanges={hasChanges}
                />
                <Text
                  fontWeight="400"
                  color="gray.500"
                  fontSize="md"
                  fontFamily="heading"
                  lineHeight="24px"
                >
                  {collateralType.issuanceRatioD18.eq(constants.MaxUint256)
                    ? 'N/A'
                    : `Minimum ${currency(collateralType.issuanceRatioD18, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                </Text>
              </>
            ) : (
              <Skeleton width="100%">Lorem ipsum (this wont be displayed) </Skeleton>
            )}
          </Flex>
        </BorderBox>
      )}
    </Flex>
  );
};

export const ManageStats = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const params = useParams();
  const { network } = useNetwork();
  const { debtChange, collateralChange } = useContext(ManagePositionContext);

  const baseCompatibleSymbol =
    isBaseAndromeda(network?.id, network?.preset) && params.collateralSymbol === 'USDC'
      ? 'sUSDC'
      : params.collateralSymbol;

  const { data: collateralType } = useCollateralType(baseCompatibleSymbol);

  const { data: aprData } = useApr();

  const collateralValue = liquidityPosition?.collateralValue || wei(0);

  const cRatio = calculateCRatio(liquidityPosition?.debt || wei(0), collateralValue);

  const { newCRatio, newCollateralAmount, newDebt, hasChanges } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice: liquidityPosition?.collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  const baseCompatibleCollateralType =
    isBaseAndromeda(network?.id, network?.preset) && params.collateralSymbol === 'USDC'
      ? {
          ...collateralType,
          name: 'USD Coin',
          symbol: 'USDC',
          displaySymbol: 'USDC',
          depositingEnabled: collateralType?.depositingEnabled || false,
          issuanceRatioD18: collateralType?.issuanceRatioD18 || wei(0),
          liquidationRatioD18: collateralType?.liquidationRatioD18 || wei(0),
          liquidationRewardD18: collateralType?.liquidationRewardD18 || wei(0),
          oracleNodeId: collateralType?.oracleNodeId || '',
          tokenAddress: collateralType?.tokenAddress || '',
          minDelegationD18: collateralType?.minDelegationD18 || wei(0),
        }
      : collateralType;

  return (
    <ManageStatsUi
      hasChanges={hasChanges}
      newCratio={newCRatio}
      newDebt={newDebt}
      newCollateralAmount={newCollateralAmount}
      liquidityPosition={liquidityPosition}
      collateralType={baseCompatibleCollateralType}
      cRatio={cRatio}
      collateralValue={collateralValue}
      aprData={aprData?.combinedApr}
    />
  );
};
