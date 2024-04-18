import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Wei from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { COLLATERALACTIONS, DEBTACTIONS } from './actions';
import { PositionAction } from './PositionActions';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { Transaction } from './SignTransaction';
import { useState } from 'react';

export type Step =
  | 'remove'
  | 'deposit'
  | 'signTransaction'
  | 'done'
  | 'firstDeposit'
  | 'close'
  | 'repay'
  | undefined;

export function ManagePosition({
  liquidityPostion,
  walletBalance,
  accountBalance,
  transactions,
  isBase,
  issuanceRatio,
}: {
  liquidityPostion?: LiquidityPosition;
  walletBalance?: Wei;
  accountBalance?: Wei;
  transactions: Transaction[];
  isBase: boolean;
  issuanceRatio?: Wei;
}) {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collateralSymbol, tab, tabAction, poolId, collateralAddress, step } = useParams();
  const [stepState, setStepState] = useState<Step>(step as Step);
  const tabParsed = tab ? Number(tab) : 0;
  const tabActionParsed = tabAction || 'deposit';
  const collateralSymbolParsed = collateralSymbol || '?';
  const setStep = (step?: Step, providedQueryParams?: URLSearchParams) => {
    const qParams = providedQueryParams || queryParams;
    if (!step) {
      qParams.delete('step');
    } else {
      qParams.set('step', step);
    }
    navigate({ pathname, search: qParams.toString() }, { replace: true });
    setStepState(step);
  };

  if (
    liquidityPostion?.accountCollateral.totalAssigned.eq(0) ||
    !liquidityPostion ||
    tabAction === 'close'
  ) {
    return (
      <PositionAction
        collateralSymbol={collateralSymbolParsed}
        liquidityPostion={liquidityPostion}
        setStep={setStep}
        step={stepState}
        tab={tabParsed}
        tabAction={tabActionParsed}
        walletBalance={walletBalance}
        accountBalance={accountBalance}
        transactions={transactions}
        poolId={poolId}
        collateralAddress={collateralAddress}
      />
    );
  }
  const shouldShowTabs = () => {
    if (!stepState) return true;
    if (stepState === 'signTransaction') return false;
    if (stepState === 'done') return false;
    if (stepState === 'deposit') return true;
    return false;
  };

  return (
    <Flex flexDir="column" alignItems="center" gap="4">
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
        {shouldShowTabs() && (
          <Tabs isFitted defaultIndex={tabParsed}>
            <TabList>
              <Tab
                color="white"
                fontWeight={700}
                onClick={() => {
                  queryParams.set('tab', '0');
                  queryParams.set('tabAction', 'deposit');
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
                data-cy="tab-button-debt"
                onClick={() => {
                  queryParams.set('tab', '1');
                  queryParams.set('tabAction', 'repay');
                  queryParams.delete('step');
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
                        data-cy={`collateral-action-${action.link}`}
                        onClick={() => {
                          queryParams.delete('step');
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
                    {DEBTACTIONS.filter((action) => {
                      if (action.title === 'Borrow' && isBase) return false;
                      return true;
                    }).map((action) => (
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
                        data-cy={`tab-actions-button-${action.link}`}
                        onClick={() => {
                          queryParams.delete('step');
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
          collateralSymbol={collateralSymbolParsed}
          liquidityPostion={liquidityPostion}
          setStep={setStep}
          step={stepState}
          tab={tabParsed}
          tabAction={tabActionParsed}
          walletBalance={walletBalance}
          accountBalance={accountBalance}
          transactions={transactions}
          collateralAddress={collateralAddress}
          poolId={poolId}
          issuanceRatio={issuanceRatio}
        />
      </Flex>
      {tabAction !== 'close' && (
        <Button
          variant="ghost"
          onClick={() => {
            queryParams.set('tabAction', 'close');
            setStep(undefined);
            navigate({ pathname, search: queryParams.toString() });
          }}
        >
          Close Position
        </Button>
      )}
    </Flex>
  );
}
