import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Collapse,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useIsConnected, useNetwork } from '@snx-v3/useBlockchain';
import { useEthBalance } from '@snx-v3/useEthBalance';
import {
  CollateralTypeSelector,
  CollateralTypeSelectorProps,
} from '@snx-v3/CollateralTypeSelector';
import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { generatePath, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { Wei, wei } from '@synthetixio/wei';
import { PercentBadges } from '@snx-v3/PercentBadges';
import { Amount } from '@snx-v3/Amount';
import { useParams } from '@snx-v3/useParams';
import { DepositModal, DepositModalProps } from '@snx-v3/DepositModal';
import { CollateralIcon } from '@snx-v3/icons';
import { NumberInput } from '@snx-v3/NumberInput';
import { AccountCollateralType, useAccountSpecificCollateral } from '@snx-v3/useAccountCollateral';
import { useTransferableSynthetix } from '@snx-v3/useTransferableSynthetix';
import { CollateralAlert } from '../../CollateralAlert';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useConnectWallet } from '@web3-onboard/react';
import { BASE_USDC, isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

export function DepositFormUi({
  collateralType,
  accountCollateral,
  ethBalance,
  snxBalance,
  isConnected,
  openConnectModal,
  staticCollateral,
  poolId,
  navigate,
  DepositModal,
  CollateralTypeSelector,
  tokenBalance,
}: {
  accountCollateral?: AccountCollateralType;
  staticCollateral?: boolean;
  openConnectModal: (() => void) | undefined;
  isConnected: boolean;
  collateralType?: CollateralType;
  snxBalance?: {
    transferable: Wei;
    collateral?: Wei;
  };
  ethBalance?: Wei;
  poolId?: string;
  navigate: NavigateFunction;
  DepositModal: DepositModalProps;
  CollateralTypeSelector: CollateralTypeSelectorProps;
  tokenBalance?: Wei;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputAmount, setInputAmount] = useState(wei(0));
  const [amount, setAmount] = useState(wei(0));
  const [activeBadge, setActiveBadge] = useState(0);
  const location = useLocation();

  const combinedTokenBalance = useMemo(() => {
    if (collateralType?.symbol === 'SNX') {
      return snxBalance?.transferable;
    }
    if (collateralType?.symbol !== 'WETH') {
      return tokenBalance;
    }
    if (!tokenBalance || !ethBalance) {
      return undefined;
    }
    return tokenBalance.add(ethBalance);
  }, [collateralType?.symbol, tokenBalance, ethBalance, snxBalance?.transferable]);

  const [isOpenDeposit, setIsOpenDeposit] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (!form.reportValidity()) {
        return;
      }
      setAmount(wei(inputAmount));
      setIsOpenDeposit(true);
    },
    [inputAmount]
  );

  const onChangeCollateral = useCallback(
    (collateralSymbol: string) => {
      if (!poolId) {
        return;
      }
      if (`${collateralType?.symbol}`.toLowerCase() === `${collateralSymbol}`.toLowerCase()) {
        return;
      }
      setActiveBadge(0);
      setAmount(wei(0));
      setInputAmount(wei(0));
      inputRef.current?.focus();
      navigate({
        pathname: generatePath('/deposit/:collateralSymbol/:poolId', {
          poolId: poolId,
          collateralSymbol,
        }),
        search: location.search,
      });
    },
    [location.search, navigate, collateralType?.symbol, poolId]
  );

  if (!isConnected && openConnectModal) {
    return (
      <Flex flexGrow={1} alignItems="flex-end">
        <Button width="100%" size="md" px="8" onClick={openConnectModal}>
          Connect Wallet
        </Button>
      </Flex>
    );
  }

  if (!poolId || !collateralType) {
    return null;
  }

  return (
    <>
      <Box as="form" bg="navy.900" mb="8" onSubmit={onSubmit}>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2}>
          <Flex justifyContent="space-between">
            <Flex alignItems="center">
              {staticCollateral ? (
                <>
                  <CollateralIcon
                    fill="#0B0B22"
                    color="#00D1FF"
                    symbol={collateralType.symbol}
                    width="24px"
                    height="24px"
                  />
                  <Text fontWeight="600" mx="2">
                    {collateralType.displaySymbol}
                  </Text>
                </>
              ) : (
                <CollateralTypeSelector
                  collateralSymbol={collateralType.symbol}
                  onChange={onChangeCollateral}
                />
              )}
            </Flex>
            <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
              <NumberInput
                value={inputAmount}
                onChange={(value) => {
                  setActiveBadge(0);
                  setInputAmount(value);
                }}
                InputProps={{
                  'data-testid': 'deposit amount input',
                }}
                min={collateralType.minDelegationD18}
                max={combinedTokenBalance}
              />
              <Flex
                flexDirection="column"
                alignItems="flex-end"
                fontSize="xs"
                color="whiteAlpha.700"
              >
                {accountCollateral && accountCollateral?.availableCollateral.gt(0) ? (
                  <Link onClick={() => setInputAmount(accountCollateral?.availableCollateral)}>
                    <Amount
                      prefix={`Available ${collateralType.symbol} Collateral: `}
                      value={accountCollateral?.availableCollateral}
                    />
                  </Link>
                ) : null}
                <Link
                  onClick={() => {
                    if (!tokenBalance || !snxBalance) {
                      return;
                    }
                    const max =
                      collateralType.symbol === 'SNX' ? snxBalance.transferable : tokenBalance;

                    setInputAmount(max);
                  }}
                >
                  <Amount
                    prefix={`${collateralType.symbol} Wallet Balance: `}
                    value={
                      collateralType.symbol === 'SNX' ? snxBalance?.transferable : tokenBalance
                    }
                  />
                </Link>
                {collateralType?.symbol === 'WETH' ? (
                  <Flex
                    gap="1"
                    cursor="pointer"
                    onClick={() => {
                      if (!ethBalance) {
                        return;
                      }
                      setInputAmount(ethBalance);
                    }}
                  >
                    <Text>ETH Wallet Balance:</Text>
                    <Amount value={ethBalance} />
                  </Flex>
                ) : null}
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
                setInputAmount(wei(0));
                setActiveBadge(0);
                return;
              }
              setActiveBadge(badgeNum);
              if (badgeNum === 1) {
                // Make sure we're not left with dust
                setInputAmount(combinedTokenBalance);
              } else {
                setInputAmount(combinedTokenBalance.mul(badgeNum));
              }
            }}
            activeBadge={activeBadge}
          />
          <Collapse
            in={inputAmount.gt(0) && inputAmount.lt(collateralType.minDelegationD18)}
            animateOpacity
          >
            <Alert mt={2} status="info">
              <AlertIcon />
              <AlertDescription>
                You need to deposit{' '}
                <Amount
                  value={collateralType.minDelegationD18}
                  suffix={` ${collateralType.symbol}`}
                />{' '}
                minimum
              </AlertDescription>
            </Alert>
          </Collapse>
        </Box>
        <Button mt={4} size="md" px="8" type="submit" w="full" data-testid="deposit collateral">
          Deposit Collateral
        </Button>
      </Box>
      {snxBalance?.collateral &&
        snxBalance?.collateral.gt(0) &&
        collateralType.symbol === 'SNX' && <CollateralAlert tokenBalance={snxBalance.collateral} />}
      {amount.gt(0) ? (
        <DepositModal
          availableCollateral={accountCollateral?.availableCollateral || wei(0)}
          currentCollateral={wei(0)}
          collateralChange={amount}
          isOpen={isOpenDeposit}
          onClose={() => setIsOpenDeposit(false)}
        />
      ) : null}
    </>
  );
}

export const DepositForm = (props: { staticCollateral?: boolean }) => {
  const [_, connect] = useConnectWallet();
  const navigate = useNavigate();
  const isConnected = useIsConnected();
  const params = useParams();
  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const { network } = useNetwork();
  const ethBalance = useEthBalance();
  const transferrable = useTransferableSynthetix();
  const { data: accountCollateral } = useAccountSpecificCollateral(
    params.accountId,
    collateralType?.tokenAddress
  );
  const { data: tokenBalance } = useTokenBalance(
    isBaseAndromeda(network?.id, network?.preset) ? BASE_USDC : collateralType?.tokenAddress
  );

  return (
    <DepositFormUi
      staticCollateral={props.staticCollateral}
      isConnected={isConnected}
      openConnectModal={() => connect()}
      collateralType={collateralType}
      accountCollateral={accountCollateral}
      tokenBalance={tokenBalance}
      snxBalance={transferrable.data}
      ethBalance={ethBalance.data}
      poolId={params.poolId}
      navigate={navigate}
      DepositModal={DepositModal}
      CollateralTypeSelector={CollateralTypeSelector}
    />
  );
};
