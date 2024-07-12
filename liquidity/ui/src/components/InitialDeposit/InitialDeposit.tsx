import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Collapse,
  Divider,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { BorderBox } from '@snx-v3/BorderBox';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { NumberInput } from '@snx-v3/NumberInput';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useEthBalance } from '@snx-v3/useEthBalance';
import Wei from '@synthetixio/wei';
import { FC, useContext, useMemo, useState } from 'react';
import { useParams } from '@snx-v3/useParams';
import { useTransferableSynthetix } from '@snx-v3/useTransferableSynthetix';
import { CollateralAlert, TokenIcon } from '..';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useGetUSDTokens } from '@snx-v3/useGetUSDTokens';
import { WithdrawIncrease } from '@snx-v3/WithdrawIncrease';
import { formatNumber } from '@snx-v3/formatters';
import { ArrowBackIcon } from '@chakra-ui/icons';

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
  minDelegation: Wei;
}> = ({
  collateralChange,
  setCollateralChange,
  displaySymbol,
  symbol,
  tokenBalance,
  ethBalance,
  snxBalance,
  onSubmit,
  minDelegation,
}) => {
  const [step, setStep] = useState(0);
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
      <Text color="gray.50" fontSize="20px" fontWeight={700}>
        {step > 0 && <ArrowBackIcon cursor="pointer" onClick={() => setStep(0)} mr={2} />}
        Open Liquidity Position
      </Text>

      <Divider my={5} bg="gray.900" />

      {step === 0 && (
        <>
          <Text color="gray.50" fontSize="sm" fontWeight="700" mb={2}>
            Deposit & Lock Collateral
          </Text>

          <BorderBox display="flex" flexDirection="column" p={3} mb="6">
            <Flex alignItems="center">
              <Flex flexDir="column">
                <BorderBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={1.5}
                  px={2.5}
                >
                  <Text display="flex" gap={2} alignItems="center" fontWeight="600">
                    <TokenIcon symbol={symbol} width={16} height={16} />
                    {displaySymbol}
                  </Text>
                </BorderBox>
                <Text fontSize="12px">
                  Balance: <Amount value={combinedTokenBalance} />
                  <Text
                    as="span"
                    cursor="pointer"
                    onClick={() => {
                      if (!combinedTokenBalance) {
                        return;
                      }
                      setCollateralChange(combinedTokenBalance);
                    }}
                    color="cyan.500"
                    fontWeight={700}
                  >
                    &nbsp; Max
                  </Text>
                </Text>
              </Flex>

              <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
                <Flex flexDirection="column" justifyContent="flex-end" flexGrow={1}>
                  <NumberInput
                    InputProps={{
                      'data-testid': 'deposit amount input',
                      'data-max': combinedTokenBalance?.toString(),
                    }}
                    value={collateralChange}
                    onChange={(value) => {
                      setCollateralChange(value);
                    }}
                    max={combinedTokenBalance}
                    dataTestId="deposit-number-input"
                  />
                </Flex>
              </Flex>
            </Flex>
          </BorderBox>
          {snxBalance?.collateral && snxBalance?.collateral.gt(0) && symbol === 'SNX' && (
            <CollateralAlert tokenBalance={snxBalance.collateral} />
          )}
          {collateralChange.gt(0) && <WithdrawIncrease />}

          <Collapse
            in={collateralChange.gt(0) && collateralChange.lt(minDelegation)}
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
            onClick={() => {
              setStep(1);
            }}
            isDisabled={
              collateralChange.lte(0) ||
              combinedTokenBalance === undefined ||
              collateralChange.lt(minDelegation)
            }
          >
            {collateralChange.lte(0) ? 'Enter Amount' : 'Deposit & Lock'}
          </Button>
        </>
      )}

      {step === 1 && (
        <>
          <Text>
            In order to open a position on Synthetix Liquidity, you need an Account. It’s a one time
            action needed that you won’t have to reproduce for the next positions. Accounts are
            represented as ERC-721 compliant tokens (NFTs). Read more in the Synthetix V3
            Documentation.
          </Text>
          <br />
          <UnorderedList>
            <ListItem>Transferable like any NFT</ListItem>
            <br />
            <ListItem>Improve security by delegating permissions</ListItem>
            <br />
            <ListItem>Simplify collaborative liquidity positions management</ListItem>
          </UnorderedList>

          <Button
            onClick={() => {
              onSubmit();
              setStep(0);
            }}
            mt={8}
          >
            Accept & Continue
          </Button>
        </>
      )}
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
      minDelegation={collateralType.minDelegationD18}
      setCollateralChange={setCollateralChange}
      collateralChange={collateralChange}
      onSubmit={submit}
    />
  );
};
