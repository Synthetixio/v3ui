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
import { CollateralIcon } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { validatePosition } from '@snx-v3/validatePosition';
import { usePoolConfiguration } from '@snx-v3/usePoolConfiguration';
import Wei, { wei } from '@synthetixio/wei';
import React, { FC, useContext } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

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
}> = ({
  collateralChange,
  setCollateralChange,
  max,
  displaySymbol,
  symbol,
  currentCollateral,
  minDelegation,
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
      <Text fontSize="md" fontWeight="700" mb="0.5">
        Remove {displaySymbol}
      </Text>
      <Text fontSize="sm" color="gray.400" mb="4">
        Removing collateral from this position will transfer it to the account’s Available
        Collateral balance for withdrawal. Collateral may only be removed if the resulting C-Ratio
        is above the Issuance C-Ratio.
      </Text>

      <BorderBox flexDirection="column" py={2} px={3} mb="4">
        <Flex flexDirection="row" justifyContent="space-between" width="100%">
          <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
            <CollateralIcon symbol={symbol} />
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

        <Collapse in={!isValidLeftover} animateOpacity>
          <Alert mt={2} status="info">
            <AlertIcon />
            <Flex direction="column">
              <AlertTitle>
                The minimal delegated amount is{' '}
                <Amount value={minDelegation} suffix={` ${symbol}`} />
              </AlertTitle>
              <AlertDescription>
                You can close your position by removing all the collateral.
              </AlertDescription>
            </Flex>
          </Alert>
        </Collapse>
      </BorderBox>

      <Button
        data-testid="undelegate submit"
        type="submit"
        isDisabled={!max || isAnyMarketLocked === true}
      >
        Remove {displaySymbol}
      </Button>
    </Flex>
  );
};
export const Undelegate = () => {
  const { collateralChange, debtChange, setCollateralChange } = useContext(ManagePositionContext);
  const params = useParams();
  const { search } = useLocation();

  console.log('Params', params, 'Search', search);

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  console.log(
    'Pool id',
    params.poolId,
    'Account id',
    params.accountId,
    'Collateral address',
    collateralType?.tokenAddress
  );

  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });

  console.log('collateralType', collateralType);

  const poolConfiguration = usePoolConfiguration(params.poolId);

  if (!collateralType) return null;

  const { newDebt } = validatePosition({
    issuanceRatioD18: collateralType.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralValue: liquidityPosition?.collateralValue,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });
  // To get the max withdrawable collateral we look at the new debt and the issuance ratio.
  // This gives us the amount in dollar. We then divide by the collateral price.
  // To avoid the transaction failing due to small price deviations, we also apply a 2% buffer by multiplying with 0.98
  const maxCollateral = newDebt.eq(0)
    ? liquidityPosition?.collateralAmount
    : newDebt.mul(collateralType.issuanceRatioD18).div(collateralType.price).mul(0.98);

  console.log('Liquidity Position', liquidityPosition);
  console.log('Max collateral', maxCollateral);
  return (
    <UndelegateUi
      displaySymbol={collateralType.displaySymbol}
      symbol={collateralType.symbol}
      minDelegation={collateralType.minDelegationD18}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
      currentCollateral={liquidityPosition?.collateralAmount}
      currentDebt={liquidityPosition?.debt}
      max={maxCollateral}
      isAnyMarketLocked={poolConfiguration.data?.isAnyMarketLocked}
    />
  );
};
