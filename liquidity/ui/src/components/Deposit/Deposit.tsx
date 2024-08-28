import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Collapse,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useEthBalance } from '@snx-v3/useEthBalance';
import Wei from '@synthetixio/wei';
import { FC, useContext, useMemo } from 'react';
import { useParams } from '@snx-v3/useParams';
import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { useTransferableSynthetix } from '@snx-v3/useTransferableSynthetix';
import { ChangeStat, CollateralAlert, TokenIcon } from '../';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useNetwork } from '@snx-v3/useBlockchain';
import { getSpotMarketId, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useGetWrapperToken } from '@snx-v3/useGetUSDTokens';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';
import { formatNumber } from '@snx-v3/formatters';
import { ZEROWEI } from '../../utils/constants';
import { useTokenPrice } from '../../../../lib/useTokenPrice';
import { TransactionSummary } from '../TransactionSummary/TransactionSummary';
import { currency } from '@snx-v3/format';
import { CRatioChangeStat } from '../CRatioBar/CRatioChangeStat';

export const DepositUi: FC<{
  accountCollateral: AccountCollateralType;
  collateralChange: Wei;
  ethBalance?: Wei;
  snxBalance?: {
    transferable: Wei;
    collateral?: Wei;
  };
  tokenBalance?: Wei;
  displaySymbol: string;
  symbol: string;
  setCollateralChange: (val: Wei) => void;
  minDelegation: Wei;
  currentCollateral: Wei;
  currentDebt: Wei;
  collateralPrice: Wei;
  isBase: boolean;
}> = ({
  accountCollateral,
  collateralChange,
  setCollateralChange,
  displaySymbol,
  symbol,
  tokenBalance,
  ethBalance,
  snxBalance,
  minDelegation,
  currentCollateral,
  currentDebt,
  collateralPrice,
  isBase,
}) => {
  const price = useTokenPrice(symbol);

  const combinedTokenBalance = useMemo(() => {
    if (symbol === 'SNX') {
      return snxBalance?.transferable || ZEROWEI;
    }
    if (symbol !== 'WETH') {
      return tokenBalance || ZEROWEI;
    }
    if (!tokenBalance || !ethBalance) {
      return ZEROWEI;
    }
    return tokenBalance.add(ethBalance);
  }, [symbol, tokenBalance, ethBalance, snxBalance?.transferable]);

  const maxAmount = useMemo(
    () => combinedTokenBalance?.add(accountCollateral.availableCollateral.toString()),
    [accountCollateral.availableCollateral, combinedTokenBalance]
  );

  const txSummaryItems = useMemo(() => {
    const items = [
      {
        label: 'Locked ' + symbol,
        value: (
          <ChangeStat
            value={currentCollateral}
            newValue={currentCollateral.add(collateralChange)}
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
  }, [collateralChange, collateralPrice, currentCollateral, currentDebt, isBase, symbol]);

  const overAvailableBalance = collateralChange.abs().gt(maxAmount);

  return (
    <Flex flexDirection="column">
      <Text color="gray./50" fontSize="sm" fontWeight="700" mb="3">
        Deposit & Lock Collateral
      </Text>
      <BorderBox display="flex" p={3} mb="6">
        <Flex alignItems="flex-start" flexDir="column" gap="1">
          <BorderBox display="flex" py={1.5} px={2.5}>
            <Text display="flex" gap={2} alignItems="center" fontWeight="600">
              <TokenIcon symbol={symbol} width={16} height={16} />
              {displaySymbol}
            </Text>
          </BorderBox>
          <Tooltip
            label={
              <Flex
                flexDirection="column"
                alignItems="flex-start"
                fontSize="xs"
                color="whiteAlpha.700"
              >
                <Flex gap="1">
                  <Text>Unlocked Balance:</Text>
                  <Amount value={accountCollateral?.availableCollateral} />
                </Flex>
                <Flex gap="1">
                  <Text>Wallet Balance:</Text>
                  <Amount value={symbol === 'SNX' ? snxBalance?.transferable : tokenBalance} />
                </Flex>
                {symbol === 'WETH' ? (
                  <Flex gap="1">
                    <Text>ETH Balance:</Text>
                    <Amount value={ethBalance} />
                  </Flex>
                ) : null}
              </Flex>
            }
          >
            <Text fontSize="12px">
              Balance: <Amount value={maxAmount} />
              {maxAmount?.gt(0) && (
                <Text
                  as="span"
                  cursor="pointer"
                  onClick={() => {
                    if (!maxAmount) {
                      return;
                    }
                    setCollateralChange(maxAmount);
                  }}
                  color="cyan.500"
                  fontWeight={700}
                >
                  &nbsp;Max
                </Text>
              )}
            </Text>
          </Tooltip>
        </Flex>
        <Flex flexDir="column" flexGrow={1}>
          <NumberInput
            InputProps={{
              'data-testid': 'deposit amount input',
              'data-max': maxAmount?.toString(),
              min: 0,
            }}
            value={collateralChange}
            onChange={(value) => {
              setCollateralChange(value);
            }}
            max={maxAmount}
            min={ZEROWEI}
            dataTestId="deposit-number-input"
          />
          <Flex fontSize="xs" color="whiteAlpha.700" alignSelf="flex-end" gap="1">
            {price.gt(0) && <Amount prefix="$" value={collateralChange.abs().mul(price)} />}
          </Flex>
        </Flex>
      </BorderBox>
      {snxBalance?.collateral && snxBalance?.collateral.gt(0) && symbol === 'SNX' && (
        <CollateralAlert mb="6" tokenBalance={snxBalance.collateral} />
      )}
      <Collapse in={collateralChange.gt(0) && !overAvailableBalance} animateOpacity>
        <WithdrawIncrease />
      </Collapse>

      <Collapse
        in={collateralChange.gt(0) && collateralChange.add(currentCollateral).lt(minDelegation)}
        animateOpacity
      >
        <Alert mb={6} status="error" borderRadius="6px">
          <AlertIcon />
          <AlertDescription>
            Your deposit must be {formatNumber(minDelegation.toString())} {symbol} or higher
          </AlertDescription>
        </Alert>
      </Collapse>
      <Collapse in={overAvailableBalance} animateOpacity>
        <Alert mb={6} status="error" borderRadius="6px">
          <AlertIcon />
          <AlertDescription>
            You cannot Deposit & Lock more Collateral than your Balance amount
          </AlertDescription>
        </Alert>
      </Collapse>

      <Collapse
        in={
          collateralChange.abs().gt(0) &&
          !overAvailableBalance &&
          collateralChange.add(currentCollateral).gte(minDelegation)
        }
        animateOpacity
      >
        <TransactionSummary mb={6} items={txSummaryItems} />
      </Collapse>
      <Button
        data-testid="deposit submit"
        data-cy="deposit-submit-button"
        type="submit"
        isDisabled={
          collateralChange.lte(0) ||
          combinedTokenBalance === undefined ||
          collateralChange.add(currentCollateral).lt(minDelegation) ||
          overAvailableBalance
        }
      >
        {collateralChange.lte(0) ? 'Enter Amount' : 'Deposit & Lock Collateral'}
      </Button>
    </Flex>
  );
};

export const Deposit = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { collateralChange, setCollateralChange } = useContext(ManagePositionContext);
  const { network } = useNetwork();

  const { collateralSymbol } = useParams();

  const { data: collateralType } = useCollateralType(collateralSymbol);
  const { data: transferrableSnx } = useTransferableSynthetix();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { data: wrapperToken } = useGetWrapperToken(getSpotMarketId(collateralSymbol));

  // TODO: This will need refactoring
  const balanceAddress = isBase ? wrapperToken : collateralType?.tokenAddress;

  const { data: tokenBalance } = useTokenBalance(balanceAddress);

  const { data: ethBalance } = useEthBalance();

  if (!collateralType || !liquidityPosition?.accountCollateral) {
    return null;
  }

  return (
    <DepositUi
      accountCollateral={liquidityPosition.accountCollateral}
      displaySymbol={collateralType?.displaySymbol || ''}
      tokenBalance={tokenBalance}
      snxBalance={transferrableSnx}
      ethBalance={ethBalance}
      symbol={collateralType?.symbol || ''}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
      minDelegation={collateralType.minDelegationD18}
      currentCollateral={liquidityPosition?.collateralAmount ?? ZEROWEI}
      currentDebt={liquidityPosition?.debt ?? ZEROWEI}
      collateralPrice={liquidityPosition?.collateralPrice ?? ZEROWEI}
      isBase={isBase}
    />
  );
};
