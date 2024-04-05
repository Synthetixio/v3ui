import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Wei from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { useState } from 'react';
import { COLLATERALACTIONS, DEBTACTIONS } from './actions';
import { AccountCollateralWithSymbol } from '@snx-v3/useAccountCollateral';
import { PositionAction } from './PositionActions';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { Transaction } from './SignTransaction';

export type Step =
  | 'remove'
  | 'signTransaction'
  | 'done'
  | 'firstDeposit'
  | 'close'
  | 'repay'
  | 'createAccount'
  | 'accountCreated';

export function ManagePosition({
  liquidityPostion,
  walletBalance,
  accountBalance,
  availableCollateral,
  transactions,
}: {
  liquidityPostion?: LiquidityPosition;
  walletBalance: Wei;
  accountBalance: Wei;
  availableCollateral?: AccountCollateralWithSymbol;
  transactions: Transaction[];
}) {
  const [step, setStep] = useState<Step | undefined>(undefined);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collateralSymbol, tab, tabAction, collateralAddress, poolId, accountId } = useParams();
  const tabParsed = tab ? Number(tab) : 0;
  const tabActionParsed = tabAction || 'deposit';
  const collateralSymbolParsed = collateralSymbol || '?';

  if (liquidityPostion?.debt.eq(0) || !liquidityPostion) {
    return (
      <PositionAction
        collateralSymbol={collateralSymbolParsed}
        liquidityPostion={liquidityPostion}
        setStep={setStep}
        step={step}
        tab={tabParsed}
        tabAction={tabActionParsed}
        accountId={accountId}
        walletBalance={walletBalance}
        accountBalance={accountBalance}
        transactions={transactions}
      />
    );
  }

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
          tabAction={tabActionParsed}
          debt={liquidityPostion?.debt || new Wei(0)}
          collateralSymbol={collateralSymbol || 'USDC'}
          price={liquidityPostion?.collateralPrice || new Wei(0)}
          accountId={accountId}
          collateralAddress={collateralAddress}
          poolId={poolId}
          setStep={setStep}
          step={step}
          availableCollateral={availableCollateral}
          currentCollateral={liquidityPostion?.collateralAmount || new Wei(0)}
        />
      </Flex>
      {tabParsed !== 2 && (
        <Button
          variant="ghost"
          onClick={() => {
            queryParams.set('tab', '2');
            setStep('close');
            navigate({ pathname, search: queryParams.toString() });
          }}
        >
          Close Position
        </Button>
      )}
    </Flex>
  );
}
