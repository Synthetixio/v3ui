import {
  Alert,
  Button,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { useBorrow } from '@snx-v3/useBorrow';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { InfoIcon } from '@chakra-ui/icons';
import { CheckIcon } from '@snx-v3/Multistep';
import { SignTransaction } from './SignTransaction';
import { LiquidityPositionUpdated } from './LiquidityPositionUpdated';
import { COLLATERALACTIONS, DEBTACTIONS } from './actions';
import { useRepayBaseAndromeda } from '@snx-v3/useRepayBaseAndromeda';
import { useRepay } from '@snx-v3/useRepay';
import { useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';

function ManageInputUi({
  collateralSymbol,
  collateral,
  price,
  title,
  inputSubline,
  buttonText,
  handleButtonClick,
  children,
}: {
  collateralSymbol: string;
  collateral: Wei;
  price: Wei;
  title: string;
  inputSubline: string;
  buttonText: string;
  handleButtonClick: () => void;
  children?: ReactNode;
}) {
  const [amount, setAmount] = useRecoilState(amountState);
  return (
    <Flex flexDir="column" gap="3">
      <Text fontSize="14px" fontWeight={700} color="white">
        {title}
      </Text>
      <Flex border="1px solid" borderColor="gray.900" rounded="base" justifyContent="space-between">
        <Flex p="2" flexDir="column" gap="1" w="100%">
          <TokenIcon symbol={collateralSymbol} />
          <Text fontSize="12px" display="flex" color="gray.500">
            {inputSubline}:&nbsp;
            {collateral.toNumber().toFixed(2)}
            <Text
              color="cyan.500"
              fontSize="12px"
              fontWeight={700}
              ml="2"
              cursor="pointer"
              onClick={() => {
                setAmount(collateral);
                const node = document.getElementById('input-deposit') as HTMLInputElement;
                node.value = collateral.toNumber().toFixed(2);
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
              setAmount(new Wei(e.target.value ? e.target.value : 0, collateral.p));
            }}
          />
          <Text fontSize="12px" color="gray.500">
            ${amount.mul(price).toNumber().toFixed(2)}
          </Text>
        </Flex>
      </Flex>
      {children}
      <Button onClick={() => handleButtonClick()}>{buttonText}</Button>
    </Flex>
  );
}

function PositionAction({
  tab,
  tabAction,
  price,
  collateralSymbol,
  collateralAmount = new Wei(0),
  debt,
  poolId,
  collateralAddress,
  accountId,
  setStep,
  step,
  USDCBalance,
}: {
  tab: number;
  tabAction: string | null;
  price: Wei;
  collateralSymbol: string;
  debt: Wei;
  poolId?: string;
  collateralAmount?: Wei;
  collateralAddress?: string;
  accountId?: string;
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
  USDCBalance?: Wei;
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

  const handleManageInputButtonClick = () => {
    setStep('signTransaction');
  };

  const handleSignTransactionClick = async () => {
    if (tabAction === 'claim') {
      try {
        await mintUSD();
        setStep('done');
      } catch (error) {
        console.error(error);
      }
    } else if (tabAction === 'repay') {
      try {
        isBase ? await repayBaseAndromeda() : await repay();

        setStep('done');
      } catch (error) {
        console.error(error);
      }
    }
  };
  if (tab === 0) {
    if (tabAction === 'remove')
      if (!step) {
        return (
          <ManageInputUi
            collateralSymbol={collateralSymbol}
            collateral={isBase ? debt.abs() : collateralAmount}
            price={price}
            buttonText="Withdraw"
            inputSubline="Deposited"
            title="Remove Collateral"
            handleButtonClick={handleManageInputButtonClick}
          >
            {amount.gt(0) && (
              <Alert colorScheme="cyan" rounded="base" my="2">
                <Flex rounded="full" mr="2">
                  <InfoIcon w="20px" h="20px" color="cyan.500" />
                </Flex>
                As a security precaution, claimed assets can only be withdrawn to your wallet after
                24 hs since your previous account activity.
              </Alert>
            )}
          </ManageInputUi>
        );
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
}

export function ManagePosition({ debt, price }: { debt: Wei; price: Wei }) {
  const [step, setStep] = useState('');
  const [queryParams] = useSearchParams();
  const { collateralSymbol, tab, tabAction, collateralAddress, poolId, accountId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabParsed = tab ? Number(tab) : 0;
  const { data: liqudityPosition } = useLiquidityPosition({
    accountId,
    poolId,
    tokenAddress: collateralAddress,
  });

  return (
    <Flex
      rounded="base"
      border="1px solid"
      borderColor="gray.900"
      p="6"
      bg="navy.700"
      flexDir="column"
      minW="512px"
      h="fit-content"
    >
      {!step && (
        <Tabs isFitted defaultIndex={tabParsed}>
          <TabList>
            <Tab
              color="white"
              fontWeight={700}
              onClick={() => {
                queryParams.set('tab', '0');
                navigate({
                  pathname,
                  search: queryParams.toString(),
                });
              }}
            >
              Manage Collateral
            </Tab>
            <Tab
              color="white"
              fontWeight={700}
              onClick={() => {
                queryParams.set('tab', '1');
                navigate({
                  pathname,
                  search: queryParams.toString(),
                });
              }}
            >
              Manage Debt
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex flexDir="column">
                <Flex justifyContent="space-between">
                  {COLLATERALACTIONS.map((action) => (
                    <Flex
                      w="135px"
                      h="84px"
                      justifyContent="center"
                      key={action.title.concat('-tab-actions')}
                      border="1px solid"
                      flexDir="column"
                      alignItems="center"
                      borderColor={tabAction === action.link ? 'cyan.500' : 'gray.900'}
                      rounded="base"
                      cursor="pointer"
                      onClick={() => {
                        queryParams.set('tabAction', action.link);
                        navigate({
                          pathname,
                          search: queryParams.toString(),
                        });
                      }}
                    >
                      {action.icon(tabAction === action.link ? 'cyan' : 'white')}
                      <Text
                        fontSize="14px"
                        fontWeight={700}
                        mt="2"
                        color={tabAction === action.link ? 'cyan.500' : 'white'}
                      >
                        {action.title}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel px="0">
              <Flex flexDir="column">
                <Flex justifyContent="space-between">
                  {DEBTACTIONS.map((action) => (
                    <Flex
                      w="135px"
                      h="84px"
                      justifyContent="center"
                      key={action.title.concat('-tab-actions')}
                      border="1px solid"
                      flexDir="column"
                      alignItems="center"
                      borderColor={tabAction === action.link ? 'cyan.500' : 'gray.900'}
                      rounded="base"
                      cursor="pointer"
                      onClick={() => {
                        queryParams.set('tabAction', action.link);
                        navigate({
                          pathname,
                          search: queryParams.toString(),
                        });
                      }}
                    >
                      {action.icon(tabAction === action.link ? 'cyan' : 'white')}
                      <Text
                        fontSize="14px"
                        fontWeight={700}
                        mt="2"
                        color={tabAction === action.link ? 'cyan.500' : 'white'}
                      >
                        {action.title}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
      <PositionAction
        tab={tabParsed}
        tabAction={tabAction || 'repay'}
        debt={debt}
        collateralSymbol={collateralSymbol || 'USDC'}
        price={price}
        accountId={accountId}
        collateralAddress={collateralAddress}
        poolId={poolId}
        setStep={setStep}
        step={step}
        collateralAmount={liqudityPosition?.collateralAmount}
      />
    </Flex>
  );
}
