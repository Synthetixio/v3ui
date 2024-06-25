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
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useApr } from '@snx-v3/useApr';
import { Tooltip } from '@snx-v3/Tooltip';
import { CRatioBar } from '../CRatioBar/CRatioBar';
import { PnlStats } from './PnlStats';
import { DebtStats } from './DebtStats';

export const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  dataTestId?: string;
  formatFn: (val: Wei) => string;
  withColor?: boolean;
}> = ({ formatFn, value, newValue, hasChanges, dataTestId, withColor }) => {
  return (
    <Flex
      gap={1.5}
      color="white"
      fontSize="20px"
      fontWeight="800"
      alignItems="center"
      lineHeight="32px"
    >
      <Text
        data-cy={dataTestId}
        color={withColor && value.gt(0) ? 'green.700' : value.lt(0) ? 'red.700' : 'gray.50'}
      >
        {formatFn(value)}
      </Text>
      {hasChanges && !value.eq(newValue) ? (
        <>
          <ArrowForwardIcon />
          <Text
            color={
              withColor && newValue.gt(0) ? 'green.700' : newValue.lt(0) ? 'red.700' : 'gray.50'
            }
          >
            {formatFn(newValue)}
          </Text>
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
}) => {
  const { network } = useNetwork();

  return (
    <Flex direction="column" gap={4}>
      <Flex direction="row" gap={4}>
        {/* {isBaseAndromeda(network?.id, network?.preset) && (
        <BorderBox
          py={4}
          px={6}
          flexDirection="row"
          bg="navy.700"
          justifyContent="space-between"
          flex={1}
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
                  <Text>{!!aprData ? aprData.toFixed(2) : '-'}%</Text>
                </Flex>
              ) : (
                <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
              )}
            </Flex>
          </Flex>
        </BorderBox>
      )} */}
        <BorderBox flex="1" p={4} flexDirection="column" bg="navy.700">
          <Flex alignItems="center" mb="4px">
            <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
              Collateral
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
                  dataTestId="manage stats collateral"
                />
              </Flex>
              <Text fontWeight="400" color="white" fontSize="16px">
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
        {isBaseAndromeda(network?.id, network?.preset) && (
          <PnlStats
            liquidityPosition={liquidityPosition}
            collateralType={collateralType}
            newDebt={newDebt}
            hasChanges={hasChanges}
          />
        )}
        {!isBaseAndromeda(network?.id, network?.preset) && (
          <DebtStats
            liquidityPosition={liquidityPosition}
            collateralType={collateralType}
            newDebt={newDebt}
            hasChanges={hasChanges}
          />
        )}
      </Flex>
      {!isBaseAndromeda(network?.id, network?.preset) && (
        <BorderBox py={4} px={6} flexDirection="column" bg="navy.700">
          <CRatioBar
            hasChanges={hasChanges}
            currentCRatioPercentage={cRatio.toNumber() * 100}
            liquidationCratioPercentage={
              (collateralType?.liquidationRatioD18?.toNumber() || 0) * 100
            }
            newCratioPercentage={newCratio.toNumber() * 100}
            targetCratioPercentage={(collateralType?.issuanceRatioD18.toNumber() || 0) * 100}
            isLoading={false}
          />
        </BorderBox>
      )}
    </Flex>
  );
};

export const ManageStats = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { collateralSymbol } = useParams();
  const { debtChange, collateralChange } = useContext(ManagePositionContext);

  const { data: collateralType } = useCollateralType(collateralSymbol);

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

  return (
    <ManageStatsUi
      hasChanges={hasChanges}
      newCratio={newCRatio}
      newDebt={newDebt}
      newCollateralAmount={newCollateralAmount}
      liquidityPosition={liquidityPosition}
      collateralType={collateralType}
      cRatio={cRatio}
      collateralValue={collateralValue}
      aprData={aprData?.combinedApr}
    />
  );
};
