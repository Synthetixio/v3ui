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
import { AccountCollateralType } from '@snx-v3/useAccountCollateral';
import { useTransferableSynthetix } from '@snx-v3/useTransferableSynthetix';
import { CollateralAlert } from '../../components/CollateralAlert';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useNetwork } from '@snx-v3/useBlockchain';
import { getUSDCAddress, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

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
}> = ({
  accountCollateral,
  collateralChange,
  setCollateralChange,
  displaySymbol,
  symbol,
  tokenBalance,
  ethBalance,
  snxBalance,
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

  const maxAmount = useMemo(() => {
    return combinedTokenBalance?.add(accountCollateral.availableCollateral.toString());
  }, [accountCollateral.availableCollateral, combinedTokenBalance]);

  return (
    <Flex flexDirection="column">
      <Text fontSize="md" fontWeight="700" mb="0.5">
        Add {displaySymbol}
      </Text>
      <Text fontSize="sm" color="gray.400" mb="4">
        Provide additional collateral to this position.
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
                  'data-max': maxAmount?.toString(),
                }}
                value={collateralChange}
                onChange={(value) => {
                  setActiveBadge(0);
                  setCollateralChange(value);
                }}
                max={maxAmount}
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
                    <Text>Available {symbol} Collateral:</Text>
                    <Amount value={accountCollateral?.availableCollateral} />
                  </Flex>
                ) : null}
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
          disabled={maxAmount ? maxAmount.eq(0) : false}
          onBadgePress={(badgeNum) => {
            if (!maxAmount) {
              return;
            }
            if (activeBadge === badgeNum) {
              setCollateralChange(wei(0));
              setActiveBadge(0);
              return;
            }
            setActiveBadge(badgeNum);
            setCollateralChange(maxAmount.mul(badgeNum));
          }}
          activeBadge={activeBadge}
        />
      </BorderBox>
      {snxBalance?.collateral && snxBalance?.collateral.gt(0) && symbol === 'SNX' && (
        <CollateralAlert tokenBalance={snxBalance.collateral} />
      )}
      {/* TODO Hook for this */}
      {/* <Alert colorScheme="blue" rounded="base" m="2" my="4">
        <InfoIcon w="24px" h="24px" color="cyan.500" mr="2" />
        <Text>
          Market Caps have been reached, you cannot add collateral for now. Keep an eye on{' '}
          <Link href="https://sips.synthetix.io/all-sccp/" rel="noopener" color="cyan.500">
            new announcements{' '}
          </Link>
          for the next market cap increase.
        </Text>
      </Alert> */}
      <Button
        disabled={combinedTokenBalance === undefined}
        data-testid="deposit submit"
        type="submit"
      >
        Add {displaySymbol}
      </Button>
    </Flex>
  );
};

export const Deposit = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const { collateralChange, setCollateralChange } = useContext(ManagePositionContext);
  const { network } = useNetwork();
  const params = useParams();

  const { data: collateralType } = useCollateralType(params.collateralSymbol);
  const { data: transferrableSnx } = useTransferableSynthetix();

  const { data: tokenBalance } = useTokenBalance(
    isBaseAndromeda(network?.id, network?.preset)
      ? getUSDCAddress(network?.id)
      : collateralType?.tokenAddress
  );

  const { data: ethBalance } = useEthBalance();

  if (!collateralType || !liquidityPosition?.accountCollateral) return null;

  return (
    <DepositUi
      accountCollateral={liquidityPosition.accountCollateral}
      displaySymbol={collateralType.displaySymbol}
      tokenBalance={tokenBalance}
      snxBalance={transferrableSnx}
      ethBalance={ethBalance}
      symbol={collateralType.symbol}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
    />
  );
};
