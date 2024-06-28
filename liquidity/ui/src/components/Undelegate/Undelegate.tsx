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
import React, { FC, useContext } from 'react';
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
  const onMaxClick = React.useCallback(() => {
    if (!max) {
      return;
    }
    setCollateralChange(max.mul(-1));
  }, [max, setCollateralChange]);

  const leftoverCollateral = currentCollateral?.add(collateralChange) || wei(0);

  const isValidLeftover =
    leftoverCollateral.gt(minDelegation || wei(0)) || leftoverCollateral.eq(0);

  const isDisabled = isAnyMarketLocked === true;

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="2">
        Remove Collateral
      </Text>

      <BorderBox flexDirection="column" py={2} px={3} mb="4">
        <Flex flexDirection="row" justifyContent="space-between" width="100%">
          <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
            <TokenIcon symbol={symbol} />
            {displaySymbol}
          </Text>
          <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
            <NumberInput
              InputProps={{
                isDisabled,
                isRequired: true,
                'data-testid': 'undelegate amount input',
                'data-max': max?.toString(),
              }}
              value={collateralChange.abs()}
              onChange={(val) => setCollateralChange(val.mul(-1))}
              max={max}
            />
            <Flex flexDirection="column" alignItems="flex-end" fontSize="xs" color="whiteAlpha.700">
              <Flex
                gap="1"
                cursor={isDisabled ? 'not-allowed' : 'pointer'}
                onClick={isDisabled ? undefined : onMaxClick}
              >
                <Text display="flex" alignItems="center" gap={1}>
                  Max:
                </Text>
                <Amount
                  value={max}
                  data-testid="available to undelegate"
                  suffix={` ${displaySymbol}`}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Collapse in={isDisabled} animateOpacity>
          <Alert mt={2} status="warning">
            <AlertIcon />
            <Flex direction="column">
              <AlertTitle>Credit capacity reached</AlertTitle>
              <AlertDescription>
                One of the markets has reached its credit capacity and is currently in a locked
                state. You cannot remove collateral from the pool at this time.
              </AlertDescription>
            </Flex>
          </Alert>
        </Collapse>
      </BorderBox>
      <Collapse in={!isValidLeftover} animateOpacity>
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

      <Button
        data-testid="undelegate submit"
        type="submit"
        isDisabled={isLoadingRequiredData || isAnyMarketLocked === true || collateralChange.gte(0)}
      >
        {collateralChange.gte(0) ? 'Enter Amount' : 'Remove Collateral'}
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
