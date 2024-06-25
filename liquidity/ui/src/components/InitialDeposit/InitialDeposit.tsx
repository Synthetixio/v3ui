import { Button, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { CollateralIcon } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { PercentBadges } from '@snx-v3/PercentBadges';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useEthBalance } from '@snx-v3/useEthBalance';
import Wei, { wei } from '@synthetixio/wei';
import { FC, useContext, useMemo, useState } from 'react';
import { useParams } from '@snx-v3/useParams';
import { useTransferableSynthetix } from '@snx-v3/useTransferableSynthetix';
import { CollateralAlert } from '..';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';

export const InitialDepositUi: FC<{
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
  onSubmit: () => void;
}> = ({
  collateralChange,
  setCollateralChange,
  displaySymbol,
  symbol,
  tokenBalance,
  ethBalance,
  snxBalance,
  onSubmit,
}) => {
  const [activeBadge, setActiveBadge] = useState(0);

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

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="2">
        Deposit Collateral
      </Text>
      <BorderBox display="flex" flexDirection="column" py={2} px={3} mb="4">
        <Flex>
          <Text display="flex" gap={2} alignItems="center" fontWeight="600" mx="2">
            <CollateralIcon symbol={symbol} />
            {displaySymbol}
          </Text>
          <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
            <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
              <NumberInput
                InputProps={{
                  'data-testid': 'deposit amount input',
                  'data-max': combinedTokenBalance?.toString(),
                }}
                value={collateralChange}
                onChange={(value) => {
                  setActiveBadge(0);
                  setCollateralChange(value);
                }}
                max={combinedTokenBalance}
                dataTestId="deposit-number-input"
              />
              <Flex
                flexDirection="column"
                alignItems="flex-end"
                fontSize="xs"
                color="whiteAlpha.700"
              >
                <Flex
                  gap="1"
                  cursor="pointer"
                  onClick={() => {
                    const amount = symbol === 'SNX' ? snxBalance?.transferable : tokenBalance;
                    if (!amount) {
                      return;
                    }

                    setCollateralChange(amount);
                  }}
                >
                  <Text>{symbol} Balance:</Text>
                  <Amount value={symbol === 'SNX' ? snxBalance?.transferable : tokenBalance} />
                </Flex>
                {symbol === 'WETH' ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => {
                      if (!ethBalance) {
                        return;
                      }
                      setCollateralChange(ethBalance);
                    }}
                  >
                    <Text>ETH Balance:</Text>
                    <Amount value={ethBalance} />
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <PercentBadges
          disabled={combinedTokenBalance ? combinedTokenBalance.eq(0) : false}
          onBadgePress={(badgeNum) => {
            if (!combinedTokenBalance) {
              return;
            }
            if (activeBadge === badgeNum) {
              setCollateralChange(wei(0));
              setActiveBadge(0);
              return;
            }
            setActiveBadge(badgeNum);
            setCollateralChange(combinedTokenBalance.mul(badgeNum));
          }}
          activeBadge={activeBadge}
        />
      </BorderBox>
      {snxBalance?.collateral && snxBalance?.collateral.gt(0) && symbol === 'SNX' && (
        <CollateralAlert tokenBalance={snxBalance.collateral} />
      )}
      {collateralChange.gt(0) && <WithdrawIncrease />}

      <Button
        data-testid="deposit submit"
        data-cy="deposit-submit-button"
        onClick={() => {
          onSubmit();
        }}
        isDisabled={collateralChange.lte(0) || combinedTokenBalance === undefined}
      >
        {collateralChange.lte(0) ? 'Enter Amount' : 'Deposit Collateral'}
      </Button>
    </Flex>
  );
};

export const InitialDeposit: FC<{ submit: () => void }> = ({ submit }) => {
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

  if (!collateralType) return null;

  return (
    <InitialDepositUi
      displaySymbol={collateralType?.displaySymbol || ''}
      tokenBalance={tokenBalance}
      snxBalance={transferrableSnx}
      ethBalance={ethBalance}
      symbol={collateralType?.symbol || ''}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
      onSubmit={submit}
    />
  );
};
