import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Collapse,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { validatePosition } from '@snx-v3/validatePosition';
import { usePoolConfiguration } from '@snx-v3/usePoolConfiguration';
import Wei, { wei } from '@synthetixio/wei';
import React, { FC, useCallback, useContext } from 'react';
import { useParams } from '@snx-v3/useParams';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { TokenIcon } from '../TokenIcon';

export const UndelegateUi: FC<{
  collateralChange: Wei;
  currentCollateral?: Wei;
  minDelegation?: Wei;
  currentDebt?: Wei;
  max?: Wei;
  displaySymbol: string;
  symbol: string;
  setCollateralChange: (val: Wei) => void;
  isAnyMarketLocked?: boolean;
  isLoadingRequiredData: boolean;
}> = ({
  collateralChange,
  setCollateralChange,
  max,
  displaySymbol,
  symbol,
  currentCollateral,
  minDelegation,
  isLoadingRequiredData,
  isAnyMarketLocked,
}) => {
  const onMaxClick = useCallback(() => {
    if (!max) {
      return;
    }
    setCollateralChange(max.mul(-1));
  }, [max, setCollateralChange]);

  const leftoverCollateral = currentCollateral?.add(collateralChange) || wei(0);

  const isValidLeftover =
    leftoverCollateral.gt(minDelegation || wei(0)) || leftoverCollateral.eq(0);

  const showMinWithdrawable = collateralChange.abs().lt(minDelegation) && !collateralChange.eq(0);

  const isInputDisabled = isAnyMarketLocked === true;
  const isFormDisabled =
    showMinWithdrawable ||
    isLoadingRequiredData ||
    isAnyMarketLocked === true ||
    collateralChange.gte(0) ||
    !isValidLeftover;

  return (
    <Flex flexDirection="column">
      <Text color="gray./50" fontSize="sm" fontWeight="700" mb="3">
        Unlock Collateral
      </Text>

      <BorderBox display="flex" p={3} mb="6">
        <Flex alignItems="flex-start" flexDir="column" gap="1">
          <BorderBox display="flex" py={1.5} px={2.5}>
            <Text display="flex" gap={2} alignItems="center" fontWeight="600">
              <TokenIcon symbol={symbol} width={16} height={16} />
              {displaySymbol}
            </Text>
          </BorderBox>

          <Flex gap="1" fontSize="12px">
            <Text display="flex" alignItems="center" gap={1}>
              Locked:
            </Text>
            <Amount value={max} data-testid="available to undelegate" />
            {max?.gt(0) && (
              <Text
                as="span"
                cursor="pointer"
                onClick={onMaxClick}
                color="cyan.500"
                fontWeight={700}
              >
                Max
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex flexGrow={1}>
          <NumberInput
            InputProps={{
              isDisabled: isInputDisabled,
              isRequired: true,
              'data-testid': 'undelegate amount input',
              'data-max': max?.toString(),
              type: 'number',
            }}
            value={collateralChange.abs()}
            onChange={(val) => setCollateralChange(val.mul(-1))}
            max={max}
          />
        </Flex>
        <Collapse in={isInputDisabled} animateOpacity>
          <Alert mt={2} status="warning">
            <AlertIcon />
            <Flex direction="column">
              <AlertTitle>Credit capacity reached</AlertTitle>
              <AlertDescription>
                One of the markets has reached its credit capacity and is currently in a locked
                state. You cannot unlock collateral from the pool at this time.
              </AlertDescription>
            </Flex>
          </Alert>
        </Collapse>
      </BorderBox>
      <Collapse in={showMinWithdrawable} animateOpacity>
        <Alert mt={2} mb={4} status="info">
          <AlertIcon />
          <Flex direction="column">
            <AlertTitle>
              The minimal delegated amount is <Amount value={minDelegation} suffix={` ${symbol}`} />
            </AlertTitle>
            <AlertDescription>
              You can close your position by removing all the collateral.
            </AlertDescription>
          </Flex>
        </Alert>
      </Collapse>
      <Collapse
        in={isValidLeftover && !showMinWithdrawable && !collateralChange.eq(0)}
        animateOpacity
      >
        <Alert status="warning" mb="4">
          <AlertIcon />
          <Text>This action will reset the withdrawal waiting period to 24 hours </Text>
        </Alert>
      </Collapse>
      <Button data-testid="undelegate submit" type="submit" isDisabled={isFormDisabled}>
        {collateralChange.gte(0) ? 'Enter Amount' : 'Unlock Collateral'}
      </Button>
    </Flex>
  );
};

export const Undelegate = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { collateralChange, debtChange, setCollateralChange } = useContext(ManagePositionContext);
  const params = useParams();
  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const poolConfiguration = usePoolConfiguration(params.poolId);
  const { network } = useNetwork();

  if (!collateralType) return null;
  const collateralPrice = liquidityPosition?.collateralPrice;
  const { newDebt } = validatePosition({
    issuanceRatioD18: collateralType.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });
  // To get the max withdrawable collateral we look at the new debt and the issuance ratio.
  // This gives us the amount in dollar. We then divide by the collateral price.
  // To avoid the transaction failing due to small price deviations, we also apply a 2% buffer by multiplying with 0.98

  function maxUndelegate() {
    if (!liquidityPosition || !collateralType) return undefined;
    const { collateralAmount, collateralValue } = liquidityPosition;

    if (isBaseAndromeda(network?.id, network?.preset)) {
      return collateralAmount;
    }

    // if debt is negative it's actually credit, which means we can undelegate all collateral
    if (newDebt.lte(0)) return collateralAmount;

    const minCollateralRequired = newDebt.mul(collateralType.issuanceRatioD18);

    if (collateralValue.lt(minCollateralRequired))
      // If you're below issuance ratio, you can't withdraw anything
      return wei(0);

    const maxWithdrawable = collateralValue.sub(minCollateralRequired).mul(0.98);

    return Wei.min(collateralAmount, maxWithdrawable);
  }
  const max = maxUndelegate();

  return (
    <UndelegateUi
      displaySymbol={collateralType.displaySymbol}
      symbol={collateralType.symbol}
      minDelegation={collateralType.minDelegationD18}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
      currentCollateral={liquidityPosition?.collateralAmount}
      currentDebt={liquidityPosition?.debt}
      max={max}
      isLoadingRequiredData={poolConfiguration.isLoading || !max}
      isAnyMarketLocked={poolConfiguration.data?.isAnyMarketLocked}
    />
  );
};
