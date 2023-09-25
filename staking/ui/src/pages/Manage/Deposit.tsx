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
import { AccountCollateralType, useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useTransferableSynthetix } from '@snx-v3/useTransferableSynthetix';
import { CollateralAlert } from '../../components/CollateralAlert';

export const DepositUi: FC<{
  accountCollateral: AccountCollateralType;
  collateralChange: Wei;
  ethBalance?: Wei;
  tokenBalance?: {
    transferable: Wei;
    collateral?: Wei;
  };
  displaySymbol: string;
  symbol: string;
  setCollateralChange: (val: Wei) => void;
}> = ({
  accountCollateral,
  collateralChange,
  setCollateralChange,
  displaySymbol,
  symbol,
  tokenBalance,
  ethBalance,
}) => {
  const [activeBadge, setActiveBadge] = useState(0);
  const combinedTokenBalance = useMemo(() => {
    if (symbol !== 'WETH') {
      return tokenBalance?.transferable;
    }
    if (!tokenBalance || !ethBalance) {
      return undefined;
    }
    return tokenBalance.transferable.add(ethBalance);
  }, [symbol, tokenBalance, ethBalance]);

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="0.5">
        Add {displaySymbol}
      </Text>
      <Text fontSize="sm" color="gray.400" mb="4">
        Provide additional collateral to this position. This will increase the position’s C-Ratio.
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
              />
              <Flex
                flexDirection="column"
                alignItems="flex-end"
                fontSize="xs"
                color="whiteAlpha.700"
              >
                {accountCollateral.availableCollateral.gt(0) ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => setCollateralChange(accountCollateral.availableCollateral)}
                  >
                    <Text>Available {accountCollateral.symbol} Collateral:</Text>
                    <Amount value={accountCollateral?.availableCollateral} />
                  </Flex>
                ) : null}
                <Flex
                  gap="1"
                  cursor="pointer"
                  onClick={() => {
                    if (!tokenBalance) {
                      return;
                    }
                    setCollateralChange(tokenBalance.transferable);
                  }}
                >
                  <Text>{symbol} Balance:</Text>
                  <Amount value={tokenBalance?.transferable} />
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
      {tokenBalance?.collateral && tokenBalance?.collateral.gt(0) && symbol === 'SNX' && (
        <CollateralAlert mt={2} mb={6} tokenBalance={tokenBalance.collateral} />
      )}
      <Button data-testid="deposit submit" type="submit">
        Add {displaySymbol}
      </Button>
    </Flex>
  );
};

export const Deposit = () => {
  const { collateralChange, setCollateralChange } = useContext(ManagePositionContext);
  const params = useParams();

  const { data: collateralType } = useCollateralType(params.collateralSymbol);
  const { data: tokenBalance } = useTransferableSynthetix();
  const { data: ethBalance } = useEthBalance();

  const accountCollaterals = useAccountCollateral({ accountId: params.accountId });
  const accountCollateral = accountCollaterals.data?.find(
    (coll) => coll.tokenAddress === collateralType?.tokenAddress
  );

  if (!collateralType || !accountCollateral) return null;

  return (
    <DepositUi
      accountCollateral={accountCollateral}
      displaySymbol={collateralType.displaySymbol}
      tokenBalance={tokenBalance}
      ethBalance={ethBalance}
      symbol={collateralType.symbol}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
    />
  );
};
