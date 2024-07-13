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
import Wei, { wei } from '@synthetixio/wei';
import { FC, useContext, useMemo } from 'react';
import { useParams } from '@snx-v3/useParams';
import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { useTransferableSynthetix } from '@snx-v3/useTransferableSynthetix';
import { CollateralAlert, TokenIcon } from '../';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';
import { formatNumber } from '@snx-v3/formatters';

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
}) => {
  const combinedTokenBalance = useMemo(() => {
    if (symbol === 'SNX') {
      return snxBalance?.transferable;
    }
    if (symbol !== 'WETH') {
      return tokenBalance;
    }
    if (!tokenBalance || !ethBalance) {
      return undefined;
    }
    return tokenBalance.add(ethBalance);
  }, [symbol, tokenBalance, ethBalance, snxBalance?.transferable]);

  const maxAmount = useMemo(() => {
    return combinedTokenBalance?.add(accountCollateral.availableCollateral.toString());
  }, [accountCollateral.availableCollateral, combinedTokenBalance]);

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
                alignItems="flex-end"
                fontSize="xs"
                color="whiteAlpha.700"
              >
                {accountCollateral.availableCollateral.gt(0) ? (
                  <Flex>
                    <Text>Unlocked Balance:</Text>
                    <Amount value={accountCollateral?.availableCollateral} />
                  </Flex>
                ) : null}
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
                &nbsp; Max
              </Text>
            </Text>
          </Tooltip>
        </Flex>
        <Flex flexGrow={1}>
          <NumberInput
            InputProps={{
              'data-testid': 'deposit amount input',
              'data-max': maxAmount?.toString(),
            }}
            value={collateralChange}
            onChange={(value) => {
              setCollateralChange(value);
            }}
            max={maxAmount}
            dataTestId="deposit-number-input"
          />
        </Flex>
      </BorderBox>
      {snxBalance?.collateral && snxBalance?.collateral.gt(0) && symbol === 'SNX' && (
        <CollateralAlert tokenBalance={snxBalance.collateral} />
      )}
      {collateralChange.gt(0) && <WithdrawIncrease />}

      <Collapse
        in={collateralChange.gt(0) && collateralChange.add(currentCollateral).lt(minDelegation)}
        animateOpacity
      >
        <Alert mb={4} status="error">
          <AlertIcon />
          <AlertDescription>
            Your deposit must be {formatNumber(minDelegation.toString())} {symbol} or higher
          </AlertDescription>
        </Alert>
      </Collapse>

      <Button
        data-testid="deposit submit"
        data-cy="deposit-submit-button"
        type="submit"
        isDisabled={
          collateralChange.lte(0) ||
          combinedTokenBalance === undefined ||
          collateralChange.add(currentCollateral).lt(minDelegation)
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
  const { data: usdTokens } = useGetUSDTokens();
  const { data: collateralType } = useCollateralType(collateralSymbol);
  const { data: transferrableSnx } = useTransferableSynthetix();

  const { data: tokenBalance } = useTokenBalance(
    isBaseAndromeda(network?.id, network?.preset) ? usdTokens?.USDC : collateralType?.tokenAddress
  );

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
      currentCollateral={liquidityPosition?.collateralAmount ?? wei(0)}
    />
  );
};
