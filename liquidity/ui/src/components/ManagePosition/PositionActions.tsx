import Wei from '@synthetixio/wei';
import { Step } from './ManagePosition';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { Alert, Divider, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { ManageInputUi } from './ManageInputUi';
import { SignTransaction, Transaction } from './SignTransaction';
import { LiquidityPositionUpdated } from './LiquidityPositionUpdated';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { ONEWEI, ZEROWEI } from '../../utils/constants';
import { TokenIcon } from '../TokenIcon';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { InfoIcon } from '@chakra-ui/icons';
import { useQueryClient } from '@tanstack/react-query';

export function PositionAction({
  tab,
  tabAction,
  liquidityPostion,
  walletBalance,
  accountBalance,
  poolId = '',
  collateralAddress = '',
  collateralSymbol,
  setStep,
  step,
  transactions,
  issuanceRatio,
}: {
  liquidityPostion?: LiquidityPosition;
  walletBalance?: Wei;
  accountBalance?: Wei;
  tab: number;
  tabAction: string | null;
  collateralSymbol: string;
  poolId?: string;
  collateralAddress?: string;
  step: Step | undefined;
  setStep: (step?: Step, providedQueryParams?: URLSearchParams) => void;
  transactions: Transaction[];
  issuanceRatio?: Wei;
}) {
  const { network } = useNetwork();
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const [amountToDeposit] = useRecoilState(amountState);
  const queryClient = useQueryClient();
  if (tabAction === 'close') {
    if (!step) {
      return (
        <Flex
          flexDir="column"
          rounded="base"
          border="1px solid"
          borderColor="gray.900"
          p="6"
          bg="navy.700"
          h="fit-content"
        >
          <Heading fontSize="20px" mb="6">
            Close Position
          </Heading>
          <Divider mb="6" />
          <Text fontSize="14px" fontWeight={700} color="white">
            Claim Profit Or Repay
          </Text>

          <Flex
            border="1px solid"
            borderColor="gray.900"
            rounded="base"
            justifyContent="space-between"
            bg="navy.900"
            mb="2"
          >
            <Flex p="2" flexDir="column" gap="1" w="100%">
              <TokenIcon symbol={collateralSymbol} />
              <Text fontSize="12px" display="flex" color="gray.500">
                Max Claim Or Repay :&nbsp;
                {liquidityPostion?.debt.toNumber().toFixed(2)}
                <Text color="gray.900" fontSize="12px" fontWeight={700} ml="2" cursor="not-allowed">
                  Max
                </Text>
              </Text>
            </Flex>
            <Flex p="2" flexDir="column" alignItems="end" justifyContent="end">
              <Input
                variant="unstyled"
                placeholder="00.00"
                textAlign="end"
                fontSize="24px"
                color="white"
                type="number"
                overflow="scroll"
                fontWeight={700}
                isDisabled={true}
                value={liquidityPostion?.debt.toNumber()}
              />
              <Text fontSize="12px" color="gray.500">
                $
                {liquidityPostion?.debt
                  .toNumber()
                  .toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </Text>
            </Flex>
          </Flex>

          <ManageInputUi
            inputIsDisabled={true}
            collateralSymbol={collateralSymbol}
            collateral={liquidityPostion?.collateralAmount}
            price={liquidityPostion?.collateralPrice || ZEROWEI}
            buttonText="Remove Collateral"
            inputSubline="Balance"
            title="Remove Collateral"
            handleButtonClick={() => setStep('signTransaction')}
          />
        </Flex>
      );
    }
    if (step === 'signTransaction') {
      return (
        <SignTransaction
          buttonText="Execute Transactions"
          actionButtonClick={async () => {
            for (let i = 0; i <= transactions.length; i++) {
              if (!transactions[i].done) {
                if (typeof transactions[i].arg !== 'undefined') {
                  await transactions[i].exec(transactions[i].arg);
                } else {
                  await transactions[i].exec();
                }
                if (i === transactions.length - 1) setStep('done');
                break;
              }
            }
          }}
          header="Open Liquidity Position"
          transactions={transactions}
          isFirstDeposit={!liquidityPostion}
        />
      );
    }
    if (step === 'done') {
      return (
        <LiquidityPositionUpdated
          setStep={setStep}
          alertText="Position successfully Closed"
          header="Position successfully Closed"
          currentCRatio="0"
          debt={liquidityPostion?.debt || ZEROWEI}
          subline="Closed"
          poolId={poolId}
          collateralAddress={collateralAddress}
          collateralSymbol={collateralSymbol}
          isBase={isBase}
        />
      );
    }
  }

  if (tab === 0) {
    if (tabAction === 'remove') {
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={liquidityPostion?.collateralAmount}
            price={liquidityPostion?.collateralPrice || ZEROWEI}
            buttonText="Remove Collateral"
            inputSubline="Balance"
            title="Remove Collateral"
            handleButtonClick={() => setStep('signTransaction')}
          />
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            buttonText="Execute Transactions"
            actionButtonClick={async () => {
              for (let i = 0; i <= transactions.length; i++) {
                if (!transactions[i].done) {
                  if (typeof transactions[i].arg !== 'undefined') {
                    await transactions[i].exec(transactions[i].arg);
                  } else {
                    await transactions[i].exec();
                  }
                  if (i === transactions.length - 1) setStep('done');
                  break;
                }
              }
            }}
            header="Open Liquidity Position"
            transactions={transactions}
            isFirstDeposit={!liquidityPostion}
          />
        );
      }
      if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            setStep={setStep}
            alertText="Position successfully Opened"
            header="Position successfully Opened"
            currentCRatio="Infinite"
            debt={liquidityPostion?.debt || ZEROWEI}
            subline="Your position has been successfully opened, read more about it in the Synthetix V3 Documentation."
            poolId={poolId}
            collateralAddress={collateralAddress}
            collateralSymbol={collateralSymbol}
            isBase={isBase}
          />
        );
      }
    }
    if (tabAction === 'firstDeposit' || tabAction === 'deposit') {
      if (step === 'deposit') {
        return tabAction === 'firstDeposit' ? (
          <Flex
            flexDir="column"
            rounded="base"
            border="1px solid"
            borderColor="gray.900"
            p="6"
            bg="navy.700"
            h="fit-content"
          >
            <Heading fontSize="20px" mb="6">
              Open Liquidity Position
            </Heading>
            <Divider mb="6" />
            <ManageInputUi
              collateralSymbol={collateralSymbol}
              collateral={walletBalance?.add(accountBalance)}
              price={liquidityPostion?.collateralPrice || ZEROWEI}
              buttonText="Sign Transaction"
              inputSubline="Balance"
              title="Deposit Collateral"
              tooltip={
                <>
                  <Text>Wallet Balance: {walletBalance?.toNumber().toFixed(2)}</Text>
                  <Text>Account Balance: {accountBalance?.toNumber().toFixed(2)}</Text>
                </>
              }
              handleButtonClick={() => setStep('signTransaction')}
            >
              {amountToDeposit.gt(0) && (
                <Alert colorScheme="blue" rounded="base">
                  <InfoIcon w="20px" h="20px" color="cyan.500" mr="4" />
                  This action will incur timeout for withdrawing collateral
                </Alert>
              )}
            </ManageInputUi>
          </Flex>
        ) : (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={walletBalance?.add(accountBalance)}
            price={liquidityPostion?.collateralPrice || ZEROWEI}
            buttonText="Deposit"
            inputSubline="Balance"
            title="Deposit Collateral"
            tooltip={
              <>
                <Text>Wallet Balance: {walletBalance?.toNumber().toFixed(2)}</Text>
                <Text>Account Balance: {accountBalance?.toNumber().toFixed(2)}</Text>
              </>
            }
            handleButtonClick={() => setStep('signTransaction')}
          />
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            buttonText="Execute Transactions"
            actionButtonClick={async () => {
              for (let i = 0; i < transactions.length; i++) {
                if (!transactions[i].done) {
                  if (typeof transactions[i].arg !== 'undefined') {
                    await transactions[i].exec(transactions[i].arg);
                  } else {
                    await transactions[i].exec();
                  }
                  if (i === transactions.length - 1) setStep('done');
                  break;
                }
              }
            }}
            header="Open Liquidity Position"
            transactions={transactions}
            isFirstDeposit={true}
          />
        );
      }
      if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            setStep={setStep}
            alertText="Position successfully Opened"
            header="Position successfully Opened"
            currentCRatio="Infinite"
            debt={liquidityPostion?.debt || ZEROWEI}
            subline="Your position has been successfully opened, read more about it in the Synthetix V3 Documentation."
            poolId={poolId}
            collateralAddress={collateralAddress}
            collateralSymbol={collateralSymbol}
            isBase={isBase}
          />
        );
      }
    }
  }
  if (tab === 1) {
    if (tabAction === 'repay') {
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={liquidityPostion?.debt.abs()}
            price={liquidityPostion?.collateralPrice || ZEROWEI}
            buttonText="Repay"
            inputSubline="Debt"
            title="Repay Debt"
            handleButtonClick={() => setStep('signTransaction')}
          />
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            buttonText="Execute Transactions"
            actionButtonClick={async () => {
              for (let i = 0; i <= transactions.length; i++) {
                if (!transactions[i].done) {
                  if (typeof transactions[i].arg !== 'undefined') {
                    await transactions[i].exec(transactions[i].arg);
                  } else {
                    await transactions[i].exec();
                  }
                  if (i === transactions.length - 1) setStep('done');
                  break;
                }
              }
            }}
            header="Open Liquidity Position"
            transactions={transactions}
            isFirstDeposit={!liquidityPostion}
          />
        );
      }
      if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            setStep={setStep}
            alertText="Position successfully Opened"
            header="Position successfully Opened"
            currentCRatio="Infinite"
            debt={liquidityPostion?.debt || ZEROWEI}
            subline="Your position has been successfully opened, read more about it in the Synthetix V3 Documentation."
            poolId={poolId}
            collateralAddress={collateralAddress}
            collateralSymbol={collateralSymbol}
            isBase={isBase}
          />
        );
      }
    }
    if (tabAction === 'claim') {
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={liquidityPostion?.debt.abs()}
            price={liquidityPostion?.collateralPrice || ZEROWEI}
            buttonText="Claim"
            inputSubline="Claim"
            title="Claim Debt"
            handleButtonClick={() => setStep('signTransaction')}
          />
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            buttonText="Execute Transactions"
            actionButtonClick={async () => {
              for (let i = 0; i <= transactions.length; i++) {
                if (!transactions[i].done) {
                  if (typeof transactions[i].arg !== 'undefined') {
                    await transactions[i].exec(transactions[i].arg);
                  } else {
                    await transactions[i].exec();
                  }
                  if (i === transactions.length - 1) setStep('done');
                  break;
                }
              }
            }}
            header="Open Liquidity Position"
            transactions={transactions}
            isFirstDeposit={!liquidityPostion}
          />
        );
      }
      if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            setStep={setStep}
            alertText="Position successfully Opened"
            header="Position successfully Opened"
            currentCRatio="Infinite"
            debt={liquidityPostion?.debt || ZEROWEI}
            subline="Your position has been successfully opened, read more about it in the Synthetix V3 Documentation."
            poolId={poolId}
            collateralAddress={collateralAddress}
            collateralSymbol={collateralSymbol}
            isBase={isBase}
          />
        );
      }
    }
    if (tabAction === 'borrow') {
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol="sUSD"
            collateral={liquidityPostion?.collateralValue.div(issuanceRatio || ONEWEI)}
            price={ONEWEI}
            buttonText="Borrow"
            inputSubline="Max Borrow"
            title="Borrow"
            handleButtonClick={() => setStep('signTransaction')}
          />
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            buttonText="Execute Transactions"
            actionButtonClick={async () => {
              for (let i = 0; i <= transactions.length; i++) {
                if (!transactions[i].done) {
                  if (typeof transactions[i].arg !== 'undefined') {
                    await transactions[i].exec(transactions[i].arg);
                  } else {
                    await transactions[i].exec();
                  }
                  if (i === transactions.length - 1) {
                    setStep('done');
                    queryClient.clear();
                  }
                  break;
                }
              }
            }}
            header="Open Liquidity Position"
            transactions={transactions}
            isFirstDeposit={!liquidityPostion}
          />
        );
      }
      if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            setStep={setStep}
            alertText="Position successfully Opened"
            header="Position successfully Opened"
            currentCRatio="Infinite"
            debt={liquidityPostion?.debt || ZEROWEI}
            subline="Your position has been successfully opened, read more about it in the Synthetix V3 Documentation."
            poolId={poolId}
            collateralAddress={collateralAddress}
            collateralSymbol={collateralSymbol}
            isBase={isBase}
          />
        );
      }
    }
  }
}
