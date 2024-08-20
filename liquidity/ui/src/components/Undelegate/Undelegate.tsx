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
import React, { FC, useCallback, useContext, useMemo } from 'react';
import { useParams } from '@snx-v3/useParams';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useNetwork } from '@snx-v3/useBlockchain';
import { TokenIcon } from '../TokenIcon';
import { useTokenPrice } from '../../../../lib/useTokenPrice';
import { ZEROWEI } from '../../utils/constants';
import { CRatioChangeStat } from '../CRatioBar/CRatioChangeStat';
import { ChangeStat } from '../Manage';
import { currency } from '@snx-v3/format';
import { TransactionSummary } from '../TransactionSummary/TransactionSummary';
import { useWithdrawTimer } from '../../../../lib/useWithdrawTimer';
import { useAccountSpecificCollateral } from '@snx-v3/useAccountCollateral';
import { useSystemToken } from '@snx-v3/useSystemToken';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const UndelegateUi: FC<{
  collateralChange: Wei;
  currentCollateral?: Wei;
  minDelegation?: Wei;
  currentDebt?: Wei;
  max?: Wei;
  collateralPrice?: Wei;
  displaySymbol: string;
  symbol: string;
  setCollateralChange: (val: Wei) => void;
  isAnyMarketLocked?: boolean;
  isLoadingRequiredData: boolean;
  isBase: boolean;
  accountId: string | undefined;
  maxWithdrawable?: Wei;
  navigate: (action: string) => void;
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
  isBase,
  currentDebt,
  collateralPrice,
  accountId,
  maxWithdrawable,
  navigate,
}) => {
  const price = useTokenPrice(symbol);

  const onMaxClick = useCallback(() => {
    if (!max) {
      return;
    }
    setCollateralChange(max.mul(-1));
  }, [max, setCollateralChange]);

  const { minutes, hours, isRunning } = useWithdrawTimer(accountId);

  const leftoverCollateral = currentCollateral?.add(collateralChange) || wei(0);
  const isValidLeftover =
    leftoverCollateral.gte(minDelegation || wei(0)) || leftoverCollateral.eq(0);

  const isInputDisabled = isAnyMarketLocked === true;
  const overAvailableBalance = collateralChange.abs().gt(max);
  const isSubmitDisabled =
    isLoadingRequiredData ||
    isAnyMarketLocked === true ||
    collateralChange.gte(0) ||
    !isValidLeftover ||
    overAvailableBalance;

  const txSummaryItems = useMemo(() => {
    const items = [
      {
        label: 'Locked ' + symbol,
        value: (
          <ChangeStat
            value={currentCollateral || ZEROWEI}
            newValue={leftoverCollateral}
            formatFn={(val: Wei) => currency(val)}
            hasChanges={collateralChange.abs().gt(0)}
            size="sm"
          />
        ),
      },
    ];

    if (isBase) {
      return items;
    }

    return [
      ...items,
      {
        label: 'C-ratio',
        value: (
          <CRatioChangeStat
            currentCollateral={currentCollateral}
            currentDebt={currentDebt}
            collateralChange={collateralChange}
            collateralPrice={collateralPrice}
            debtChange={ZEROWEI}
            size="sm"
          />
        ),
      },
    ];
  }, [
    collateralChange,
    collateralPrice,
    currentCollateral,
    currentDebt,
    isBase,
    leftoverCollateral,
    symbol,
  ]);

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
            <Amount value={max} data-testid="available to unlock" />
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
        <Flex flexDir="column" flexGrow={1}>
          <NumberInput
            InputProps={{
              isDisabled: isInputDisabled,
              isRequired: true,
              'data-testid': 'undelegate amount input',
              'data-max': max?.toString(),
              type: 'number',
              min: 0,
            }}
            value={collateralChange.abs()}
            onChange={(val) => setCollateralChange(val.mul(-1))}
            max={max}
            min={ZEROWEI}
          />
          <Flex fontSize="xs" color="whiteAlpha.700" alignSelf="flex-end" gap="1">
            {price.gt(0) && <Amount prefix="$" value={collateralChange.abs().mul(price)} />}
          </Flex>
        </Flex>
      </BorderBox>
      <Collapse in={isInputDisabled} animateOpacity>
        <Alert mb={6} status="warning">
          <AlertIcon />
          <Flex direction="column">
            <AlertTitle>Credit capacity reached</AlertTitle>
            <AlertDescription>
              One of the markets has reached its credit capacity and is currently in a locked state.
              You cannot unlock collateral from the pool at this time.
            </AlertDescription>
          </Flex>
        </Alert>
      </Collapse>

      <Collapse in={!isValidLeftover && !collateralChange.eq(0)} animateOpacity>
        <Alert mb={6} status="info">
          <AlertIcon />
          <Flex direction="column">
            <AlertTitle>
              The minimal locked amount is <Amount value={minDelegation} suffix={` ${symbol}`} />
            </AlertTitle>
            <AlertDescription>
              You can close your position by removing all the collateral.
            </AlertDescription>
          </Flex>
        </Alert>
      </Collapse>

      <Collapse in={collateralChange.abs().gt(0) && isValidLeftover && isRunning} animateOpacity>
        <Alert status="warning" mb="6">
          <AlertIcon />
          <Text>
            You will be able to withdraw assets in {hours}H{minutes}M. Any account activity will
            reset this timer to 24H.
          </Text>
        </Alert>
      </Collapse>

      <Collapse
        in={collateralChange.abs().gt(0) && isValidLeftover && !isRunning && maxWithdrawable?.gt(0)}
        animateOpacity
      >
        <Alert status="info" mb="6">
          <AlertIcon />
          <Text>
            You already have <Amount value={maxWithdrawable} suffix={` ${symbol}`} /> unlocked.
            &nbsp;
            <Text
              onClick={() => navigate('withdraw')}
              cursor="pointer"
              as="span"
              textDecoration="underline"
            >
              Withdraw
            </Text>{' '}
            before unlocking again as it will restart the 24h withdrawal timeout.
          </Text>
        </Alert>
      </Collapse>

      <Collapse in={collateralChange.abs().gt(0)} animateOpacity>
        <TransactionSummary mb={6} items={txSummaryItems} />
      </Collapse>

      <Button data-testid="undelegate submit" type="submit" isDisabled={isSubmitDisabled}>
        {collateralChange.gte(0) ? 'Enter Amount' : 'Unlock Collateral'}
      </Button>
    </Flex>
  );
};

export const Undelegate = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { collateralChange, debtChange, setCollateralChange } = useContext(ManagePositionContext);
  const { poolId, accountId, collateralSymbol } = useParams();
  const { data: collateralType } = useCollateralType(collateralSymbol);

  const poolConfiguration = usePoolConfiguration(poolId);
  const { network } = useNetwork();

  const collateralPrice = liquidityPosition?.collateralPrice;

  const { newDebt } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: systemToken } = useSystemToken();
  const { data: systemTokenBalance } = useAccountSpecificCollateral(
    accountId,
    systemToken?.address
  );

  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const handleNavigate = (actions: string) => {
    queryParams.set('manageAction', actions);
    navigate({
      pathname: `/positions/${collateralType?.symbol}/${poolId}`,
      search: queryParams.toString(),
    });
  };

  const maxWithdrawable = useMemo(() => {
    if (isBase) {
      return (liquidityPosition?.accountCollateral.availableCollateral || ZEROWEI).add(
        systemTokenBalance?.availableCollateral || ZEROWEI
      );
    }
    return liquidityPosition?.accountCollateral.availableCollateral || ZEROWEI;
  }, [
    isBase,
    liquidityPosition?.accountCollateral.availableCollateral,
    systemTokenBalance?.availableCollateral,
  ]);

  // To get the max withdrawable collateral we look at the new debt and the issuance ratio.
  // This gives us the amount in dollar. We then divide by the collateral price.
  // To avoid the transaction failing due to small price deviations, we also apply a 2% buffer by multiplying with 0.98
  const max = (() => {
    if (!liquidityPosition || !collateralType) {
      return undefined;
    }
    const { collateralAmount, collateralValue } = liquidityPosition;

    if (isBase) {
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
  })();

  if (!collateralType) {
    return null;
  }

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
      isBase={isBase}
      collateralPrice={liquidityPosition?.collateralPrice}
      accountId={accountId}
      maxWithdrawable={maxWithdrawable}
      navigate={handleNavigate}
    />
  );
};
