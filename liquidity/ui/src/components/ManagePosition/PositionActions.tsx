import { AccountCollateralWithSymbol } from '@snx-v3/useAccountCollateral';
import Wei from '@synthetixio/wei';
import { Step } from './ManagePosition';
import { Dispatch, SetStateAction } from 'react';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useBorrow } from '@snx-v3/useBorrow';
import { useRepay } from '@snx-v3/useRepay';
import { useRepayBaseAndromeda } from '@snx-v3/useRepayBaseAndromeda';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { useUndelegate } from '@snx-v3/useUndelegate';
import { Alert, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { ManageInputUi } from './ManageInputUi';
import { SignTransaction, Transaction } from './SignTransaction';
import { LiquidityPositionUpdated } from './LiquidityPositionUpdated';
import { InfoIcon } from '@chakra-ui/icons';
import { CheckIcon } from '@snx-v3/Multistep';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { ZEROWEI } from '../../utils/constants';
import { CreateLiquidiyAccount } from './CreateAccount';
import { useCreateAccount } from '@snx-v3/useAccounts';
import { LiquidityAccountCreated } from './AccountCreated';

export function PositionAction({
  tab,
  tabAction,
  liquidityPostion,
  walletBalance,
  accountBalance,
  availableCollateral,
  poolId,
  collateralAddress,
  collateralSymbol,
  accountId,
  setStep,
  step,
  USDCBalance,
  transactions,
}: {
  liquidityPostion?: LiquidityPosition;
  walletBalance: Wei;
  accountBalance: Wei;
  tab: number;
  tabAction: string | null;
  collateralSymbol: string;
  poolId?: string;
  availableCollateral?: AccountCollateralWithSymbol;
  collateralAddress?: string;
  accountId?: string;
  step: Step | undefined;
  setStep: Dispatch<SetStateAction<Step | undefined>>;
  USDCBalance?: Wei;
  transactions: Transaction[];
}) {
  const { network } = useNetwork();
  const [amount] = useRecoilState(amountState);
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const { exec: mintUSD, isLoading: mintUSDIsLoading } = useBorrow({
    accountId,
    debtChange: amount,
    collateralTypeAddress: collateralAddress,
    poolId,
  });

  const { exec: repay, isLoading: repayIsLoading } = useRepay({
    accountId,
    poolId,
    debtChange: amount,
    availableUSDCollateral: USDCBalance,
    collateralTypeAddress: collateralAddress,
  });

  const { exec: repayBaseAndromeda, isLoading: repayBaseAndromedaIsLoading } =
    useRepayBaseAndromeda({
      accountId,
      poolId,
      debtChange: amount,
      availableUSDCollateral: USDCBalance,
      collateralTypeAddress: collateralAddress,
    });

  const { exec: withdraw, isLoading: withdrawIsLoading } = useWithdraw({
    accountId,
    accountCollateral: availableCollateral,
    collateralTypeAddress: collateralAddress,
  });

  const { exec: undelegate, isLoading: undelegateIsLoading } = useUndelegate({
    accountId,
    poolId,
    collateralTypeAddress: collateralAddress,
    collateralChange: amount.mul(-1),
    currentCollateral: liquidityPostion?.collateralAmount || ZEROWEI,
  });

  const {
    mutation: { mutateAsync: createAccount, isPending: createAccountIsLoading },
    getTransactionCost: { data: accountTransactionCost },
  } = useCreateAccount();

  const tabIsZero = tab === 0;
  const stepIsUndefined = !step;

  const handleManageInputButtonClick = () => {
    if (tabIsZero && stepIsUndefined && !accountId) {
      setStep('createAccount');
    } else {
      setStep('signTransaction');
    }
  };

  const handleSignTransactionClick = async () => {
    try {
      if (tab === 1) {
        if (tabAction === 'claim') {
          await mintUSD();
          setStep('done');
        } else if (tabAction === 'repay') {
          try {
            isBase ? await repayBaseAndromeda() : await repay();

            setStep('done');
          } catch (error) {
            console.error(error);
          }
        }
        if (tabAction === 'remove') {
          await withdraw(amount.toBN());
        }
      } else if (tab === 2) {
        await undelegate();
        setStep('done');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (tabIsZero) {
    if (stepIsUndefined) {
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
            Open Liquidity Position
          </Heading>
          <Divider mb="6" />
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={walletBalance.add(accountBalance)}
            price={liquidityPostion?.collateralPrice || ZEROWEI}
            buttonText={!accountId ? 'Create Account 1/2' : 'Create Account 2/2'}
            inputSubline="Balance"
            title="Deposit Collateral"
            tooltip={
              <>
                <Text>Wallet Balance: {walletBalance.toNumber().toFixed(2)}</Text>
                <Text>Account Balance: {accountBalance.toNumber().toFixed(2)}</Text>
              </>
            }
            handleButtonClick={handleManageInputButtonClick}
          />
        </Flex>
      );
    }
    if (step === 'createAccount') {
      return (
        <CreateLiquidiyAccount
          createAccount={() => {
            createAccount().then(() => setStep('accountCreated'));
          }}
          createAccountIsLoading={createAccountIsLoading}
          createAccountTransactionCost={accountTransactionCost}
        />
      );
    }
    if (step === 'accountCreated') {
      return <LiquidityAccountCreated setStep={() => setStep('signTransaction')} />;
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
        />
      );
    }
    if (step === 'done') {
      return (
        <LiquidityPositionUpdated
          alertText="Position successfully Opened"
          header="Position successfully Opened"
          currentCRatio="Infinite"
          debt={liquidityPostion?.debt || ZEROWEI}
          subline="Your position has been successfully opened, read more about it in the Synthetix V3 Documentation."
        />
      );
    }
    if (tabAction === 'remove') {
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={isBase ? debt.abs() : availableCollateral?.availableCollateral}
            price={price}
            buttonText="Withdraw"
            inputSubline="Deposited"
            title="Remove Collateral"
            handleButtonClick={handleManageInputButtonClick}
          />
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            actionButtonClick={handleSignTransactionClick}
            buttonText="Execute Transaction"
            header="Manage Debt"
            transactions={[
              {
                loading: withdrawIsLoading,
                done: false,
                title: 'Withdraw',
                subline:
                  'This transaction will undelegate your position that you can claim in 24hrs.',
              },
            ]}
          />
        );
      } else if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            alertText="Collateral successfully Updated"
            header="Collateral successfully Updated"
            currentCRatio="Infinite"
            // TODO @dev
            debt={debt}
            subline="Your Collateral has been updated, read more baout in the Synthetix V3 Documentation"
          />
        );
      }
    }
    if ((tabAction = 'deposit')) {
      return <>Implement me</>;
    }
  }
  if (tab === 1) {
    if (tabAction === 'claim') {
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={debt.abs()}
            price={price}
            buttonText="Claim"
            inputSubline="Max Claim"
            title="Claim Profit"
            handleButtonClick={handleManageInputButtonClick}
          >
            {amount.gt(0) ? (
              <Alert colorScheme="cyan" rounded="base" my="2">
                <Flex rounded="full" mr="2">
                  <InfoIcon w="20px" h="20px" color="cyan.500" />
                </Flex>
                As a security precaution, claimed assets can only be withdrawn to your wallet after
                24 hs since your previous account activity.
              </Alert>
            ) : (
              <Alert colorScheme="green" rounded="base" my="2">
                <Flex bg="green.500" p="1" rounded="full" mr="2">
                  <CheckIcon w="12px" h="12px" color="green.900" />
                </Flex>
                Positive market performance has credited your position. Claim up to $
                {debt.abs().mul(price).toNumber().toFixed(2)} without accruing debt.
              </Alert>
            )}
          </ManageInputUi>
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            actionButtonClick={handleSignTransactionClick}
            buttonText="Execute Transaction"
            header="Manage Debt"
            transactions={[
              {
                loading: repayBaseAndromedaIsLoading || repayIsLoading,
                done: false,
                title: 'Minting snxUSD against your credit',
                subline:
                  'This transaction will mint snxUSD against your position that you can claim in 24hrs.',
              },
            ]}
          />
        );
      } else if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            alertText="Position successfully Opened"
            header="Position successfully Updated"
            currentCRatio="Infinite"
            debt={debt}
            subline="Your debt has been updated, read more baout in the Synthetix V3 Documentation"
          />
        );
      }
    }
    if (tabAction === 'repay') {
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={debt.abs()}
            price={price}
            buttonText="Repay"
            inputSubline="Debt"
            title="Repay"
            handleButtonClick={handleManageInputButtonClick}
          />
        );
      }
      if (step === 'signTransaction') {
        return (
          <SignTransaction
            actionButtonClick={handleSignTransactionClick}
            buttonText="Execute Transaction"
            header="Manage Debt"
            transactions={[
              {
                loading: mintUSDIsLoading,
                done: false,
                title: 'Repay your debt',
                subline: 'This will eventually swap your collateral to sUSDC and repay the debt.',
              },
            ]}
          />
        );
      } else if (step === 'done') {
        return (
          <LiquidityPositionUpdated
            alertText="Position successfully Opened"
            header="Position successfully Updated"
            currentCRatio="Infinite"
            debt={debt}
            subline="Your debt has been updated, read more baout in the Synthetix V3 Documentation"
          />
        );
      }
    }
  }
  if (tab === 2) {
    if (step === 'close') {
      return (
        <ManageInputUi
          collateralSymbol={collateralSymbol}
          collateral={currentCollateral}
          price={price}
          buttonText="Close Position"
          inputSubline="Deposited"
          title="Remove Collateral"
          handleButtonClick={handleManageInputButtonClick}
        />
      );
    } else if (step === 'signTransaction') {
      return (
        <SignTransaction
          actionButtonClick={handleSignTransactionClick}
          buttonText="Execute Transaction"
          header="Manage Debt"
          transactions={[
            {
              loading: undelegateIsLoading,
              done: false,
              title: 'Undelegate Collateral',
              subline: 'This will remove the collateral from the pool.',
            },
          ]}
        />
      );
    } else if (step === 'done') {
      return (
        <LiquidityPositionUpdated
          alertText="Position successfully Opened"
          header="Position successfully Updated"
          currentCRatio="Infinite"
          debt={debt}
          subline="Your debt has been updated, read more baout in the Synthetix V3 Documentation"
        />
      );
    }
  }
}
