import { Button, Flex, Text } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { CollateralIcon } from '@snx-v3/icons';
import { Action, ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { PercentBadges } from '@snx-v3/PercentBadges';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useEthBalance } from '@snx-v3/useEthBalance';
import Wei, { wei } from '@synthetixio/wei';
import { Dispatch, FC, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AccountCollateralType, useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useV2Synthetix } from '@snx-v3/useV2Synthetix';

export const DepositUi: FC<{
  accountCollateral: AccountCollateralType;
  collateralChange: Wei;
  ethBalance?: Wei;
  tokenBalance?: Wei;
  displaySymbol: string;
  symbol: string;
  dispatch: Dispatch<Action>;
}> = ({
  accountCollateral,
  collateralChange,
  dispatch,
  displaySymbol,
  symbol,
  tokenBalance,
  ethBalance,
}) => {
  const [activeBadge, setActiveBadge] = useState(0);

  const combinedTokenBalance = useMemo(() => {
    if (symbol !== 'WETH') {
      return tokenBalance;
    }
    if (!tokenBalance || !ethBalance) {
      return undefined;
    }
    return tokenBalance.add(ethBalance);
  }, [symbol, tokenBalance, ethBalance]);

  return (
    <Flex flexDirection="column" gap={2}>
      <Text fontSize="md" fontWeight="700">
        Delegate {displaySymbol}
      </Text>
      <Text fontSize="sm" color="gray.400">
        Take an interest-free loan against your collateral. This increases your debt and decreases
        your C-Ratio.
      </Text>
      <BorderBox display="flex" py={1} px={2} flexDirection="column">
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
                  dispatch({ type: 'setCollateralChange', payload: value });
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
                    onClick={() =>
                      dispatch({
                        type: 'setCollateralChange',
                        payload: accountCollateral.availableCollateral,
                      })
                    }
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
                    dispatch({ type: 'setCollateralChange', payload: tokenBalance });
                  }}
                >
                  <Text>{symbol} Balance:</Text>
                  <Amount value={tokenBalance} />
                </Flex>
                {symbol === 'WETH' ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => {
                      if (!ethBalance) {
                        return;
                      }
                      dispatch({ type: 'setCollateralChange', payload: ethBalance });
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
              dispatch({ type: 'setCollateralChange', payload: wei(0) });
              setActiveBadge(0);
              return;
            }
            setActiveBadge(badgeNum);
            dispatch({ type: 'setCollateralChange', payload: combinedTokenBalance.mul(badgeNum) });
          }}
          activeBadge={activeBadge}
        />
      </BorderBox>
      <Button data-testid="deposit submit" type="submit">
        Delegate {displaySymbol}
      </Button>
    </Flex>
  );
};

export const Deposit = () => {
  const { collateralChange, dispatch } = useContext(ManagePositionContext);

  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const { data: tokenBalance } = useV2Synthetix();
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
      dispatch={dispatch}
      collateralChange={collateralChange}
    />
  );
};
