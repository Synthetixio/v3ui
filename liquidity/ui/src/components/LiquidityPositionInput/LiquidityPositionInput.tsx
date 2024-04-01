import { InfoIcon } from '@chakra-ui/icons';
import {
  Alert,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  ListItem,
  Spinner,
  Text,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { TransactionSteps } from '../../pages/Deposit';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { SignTransaction } from '../ManagePosition';
import { LiquidityPositionUpdated } from '../ManagePosition';

function OpenLiquidityPosition({
  collateralSymbol,
  deposited,
  currentCollateral,
  walletDeposited,
  price,
  currentCRatio,
  setCurrentStep,
  userHasAccount,
}: {
  collateralSymbol: string;
  deposited: Wei;
  currentCollateral: Wei;
  walletDeposited: Wei;
  price: Wei;
  currentCRatio: string;
  setCurrentStep: Dispatch<SetStateAction<TransactionSteps>>;
  userHasAccount: boolean;
}) {
  const [amountToDeposit, setAmountToDeposit] = useRecoilState(amountState);
  return (
    <>
      <Text fontSize="14px" color="gray.50">
        Deposit Collateral{' '}
        <Tooltip label="TODO" p="3">
          <InfoIcon w="12px" h="12px" />
        </Tooltip>
      </Text>
      <Flex border="1px solid" borderColor="gray.900" rounded="base" justifyContent="space-between">
        <Flex p="2" flexDir="column" gap="1" w="100%">
          <TokenIcon symbol={collateralSymbol} />
          <Text fontSize="12px" display="flex" color="gray.500">
            <Tooltip
              label={
                <>
                  <Text>Account Available: {deposited.toNumber().toFixed(2)}</Text>
                  <Text>Wallet Balance: {walletDeposited.toNumber().toFixed(2)}</Text>
                </>
              }
            >
              Balance:&nbsp;
            </Tooltip>
            {deposited.add(walletDeposited).toNumber().toFixed(2)}
            <Text
              color="cyan.500"
              fontSize="12px"
              fontWeight={700}
              ml="2"
              cursor="pointer"
              onClick={() => {
                const sumedUp = deposited.add(walletDeposited);
                setAmountToDeposit(sumedUp);
                const node = document.getElementById('input-deposit') as HTMLInputElement;
                node.value = sumedUp.toNumber().toFixed(2);
              }}
            >
              Max
            </Text>
          </Text>
        </Flex>
        <Flex p="2" flexDir="column" alignItems="end" justifyContent="end">
          <Input
            id="input-deposit"
            variant="unstyled"
            placeholder="00.00"
            textAlign="end"
            fontSize="24px"
            color="white"
            type="number"
            overflow="scroll"
            fontWeight={700}
            onChange={(e) => {
              setAmountToDeposit(new Wei(e.target.value ? e.target.value : 0, deposited.p));
            }}
          />
          <Text fontSize="12px" color="gray.500">
            ${amountToDeposit.mul(price).toNumber().toFixed(2)}
          </Text>
        </Flex>
      </Flex>
      {!amountToDeposit.eq(0) && (
        <>
          <Alert colorScheme="blue" rounded="base">
            <Flex alignItems="center" gap="3">
              <InfoIcon w="20px" h="20px" color="cyan.500" />
              <Text color="white" fontSize="16px">
                This action will incur timeout for withdrawing collateral
              </Text>
            </Flex>
          </Alert>
          <Flex w="100%" p="3" bg="gray.900" flexDir="column">
            <Flex justifyContent="space-between">
              <Text color="white" fontWeight={700} fontSize="12px">
                Total {collateralSymbol}
              </Text>
              <Text color="white" fontWeight={700} fontSize="12px">
                {currentCollateral.toNumber().toFixed(2)} &rarr;
                {currentCollateral.add(amountToDeposit).toNumber().toFixed(2)}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="white" fontWeight={700} fontSize="12px">
                C-ratio
              </Text>
              <Text color="white" fontWeight={700} fontSize="12px">
                {currentCRatio === '0.0' ? 'N/A' : currentCRatio} &rarr; Infinite
              </Text>
            </Flex>
          </Flex>
        </>
      )}
      <Button
        isDisabled={amountToDeposit.eq(0)}
        onClick={() => {
          if (userHasAccount) setCurrentStep('signTransactions');
          else setCurrentStep('createAccount');
        }}
      >
        {amountToDeposit.eq(0)
          ? 'Enter Amount'
          : userHasAccount
            ? 'Create Liquidity Position'
            : 'Create Account 1/2'}
      </Button>
    </>
  );
}

function CreateLiquidiyAccount({
  createAccountTransactionCost,
  createAccountIsLoading,
  createAccount,
}: {
  createAccountTransactionCost: string | undefined;
  createAccountIsLoading: boolean;
  createAccount: () => void;
}) {
  return (
    <Flex flexDir="column" gap="6" alignItems="center">
      <Heading color="gray.50" fontSize="20px">
        Create Liquidity Account
      </Heading>
      <Divider />
      <Text color="white" fontSize="14px">
        In order to open a position on Synthetix Liquidity, you need an Account. It’s a one time
        action needed that you won’t have to reproduce for the next positions. Accounts are
        represented as ERC-721 compliant tokens (NFTs). Read more in the Synthetix V3 Documentation.
        <UnorderedList>
          <ListItem my="2">Transferable like any NFT</ListItem>
          <ListItem my="2">Improve security by delegating permissions</ListItem>
          <ListItem my="2">Simplify collaborative liquidity positions management</ListItem>
        </UnorderedList>
      </Text>
      <Flex w="100%" p="3" bg="gray.900" justifyContent="space-between">
        <Text color="white" fontWeight={700} fontSize="12px">
          Transaction Fee
        </Text>
        <Text color="white" fontWeight={700} fontSize="12px">
          ${createAccountTransactionCost}
        </Text>
      </Flex>
      {createAccountIsLoading ? (
        <Spinner colorScheme="cyan" />
      ) : (
        <Button onClick={createAccount} w="100%">
          Create Account
        </Button>
      )}
    </Flex>
  );
}

function LiquidityAccountCreated({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<TransactionSteps>>;
}) {
  const [, setAmountToDeposit] = useRecoilState(amountState);
  useEffect(() => {
    // reset amount so after reopening we dont have old state
    setAmountToDeposit(new Wei(0));
    // eslint-disable-next-line
  }, []);
  return (
    <Flex flexDir="column" gap="6">
      <Heading color="gray.50" fontSize="20px">
        Create Liquidity Account
      </Heading>
      <Divider />
      <Text color="white" fontSize="14px">
        Your account position has been successfully created, read more about it in the Synthetix V3
        Documentation.
      </Text>
      <Alert colorScheme="green" rounded="base">
        Account successfully Created
      </Alert>
      <Button onClick={() => setCurrentStep('signTransactions')}>Continue</Button>
    </Flex>
  );
}

export function LiquidityPositionInput({
  collateralSymbol,
  balance,
  price,
  userHasAccount,
  currentCRatio,
  currentCollateral = new Wei(0),
  signTransaction,
  depositIsLoading,
  approveIsLoading,
  requireApprove,
  createAccount,
  createAccountIsLoading,
  createAccountTransactionCost,
  currentStep,
  setCurrentStep,
}: {
  collateralSymbol: string;
  balance: { deposited: Wei; wallet: Wei };
  price: Wei;
  userHasAccount: boolean;
  currentCRatio: string;
  currentCollateral?: Wei;
  signTransaction: (action: string) => void;
  depositIsLoading: boolean;
  approveIsLoading: boolean;
  requireApprove: boolean;
  createAccount: () => void;
  createAccountIsLoading: boolean;
  createAccountTransactionCost?: string;
  currentStep: TransactionSteps;
  setCurrentStep: Dispatch<SetStateAction<TransactionSteps>>;
}) {
  return (
    <Flex
      flexDir="column"
      bg="navy.700"
      border="1px solid"
      borderColor="gray.900"
      rounded="base"
      w="100%"
      p="6"
      gap="6"
    >
      {currentStep === 'positionCreated' && (
        <LiquidityPositionUpdated
          currentCRatio={currentCRatio}
          debt={currentCollateral}
          header="Position successfully Opened"
          subline="Your position has been successfully opened, read more about it in the Synthetix V3 Documentation."
          alertText="Position successfully Opened"
        />
      )}
      {currentStep === 'openPosition' && (
        <OpenLiquidityPosition
          currentCollateral={currentCollateral}
          collateralSymbol={collateralSymbol}
          walletDeposited={balance.wallet}
          deposited={balance.deposited}
          userHasAccount={userHasAccount}
          currentCRatio={currentCRatio}
          price={price}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 'signTransactions' && (
        <SignTransaction
          header="Open Liquidity Position"
          transactions={[
            {
              done: requireApprove,
              loading: approveIsLoading,
              title: `Approve ${collateralSymbol} transfer`,
              subline: `You must approve your ${collateralSymbol} transfer before depositing.`,
            },
            {
              done: true,
              loading: depositIsLoading,
              title: `Delegate ${collateralSymbol}`,
              subline: `This step will transfer your ${collateralSymbol} to Synthetix as well as delegating to the selected Pool.`,
            },
          ]}
          actionButtonClick={(action) => signTransaction(action)}
          buttonText="Execute Transaction"
        />
      )}
      {currentStep === 'accountCreated' && (
        <LiquidityAccountCreated setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 'createAccount' && (
        <CreateLiquidiyAccount
          createAccount={createAccount}
          createAccountIsLoading={createAccountIsLoading}
          createAccountTransactionCost={createAccountTransactionCost}
        />
      )}
    </Flex>
  );
}
