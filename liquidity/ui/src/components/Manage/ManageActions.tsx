import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { wei } from '@synthetixio/wei';
import { FC, FormEvent, lazy, Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Borrow, Repay, Undelegate, Deposit, Claim } from '../';
import { z } from 'zod';
import { safeImport } from '@synthetixio/safe-import';
import { calculateCRatio } from '@snx-v3/calculations';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { COLLATERALACTIONS, DEBTACTIONS } from './actions';

const RepayModal = lazy(() => safeImport(() => import('@snx-v3/RepayModal')));
const BorrowModal = lazy(() => safeImport(() => import('@snx-v3/BorrowModal')));
const ClaimModal = lazy(() => safeImport(() => import('@snx-v3/ClaimModal')));
const DepositModal = lazy(() => safeImport(() => import('@snx-v3/DepositModal')));
const UndelegateModal = lazy(() => safeImport(() => import('@snx-v3/UndelegateModal')));

const validActions = ['borrow', 'deposit', 'repay', 'claim', 'undelegate'] as const;
const ManageActionSchema = z.enum(validActions);
type ManageAction = z.infer<typeof ManageActionSchema>;

const ManageActionUi: FC<{
  setActiveAction: (action: string) => void;
  manageAction?: ManageAction;
  onSubmit: (e: FormEvent) => void;
  liquidityPosition?: LiquidityPosition;
  network: Network | null;
}> = ({ setActiveAction, manageAction, onSubmit, liquidityPosition, network }) => {
  // const debt = Number(liquidityPosition?.debt?.toString());
  const isBase = isBaseAndromeda(network?.id, network?.preset);
  // const stablecoin = useStablecoin();

  const [tab, setTab] = useState('collateral');

  const debtActions = DEBTACTIONS.filter((action) => {
    if (action.title === 'Borrow' && isBase) return false;
    return true;
  });

  useEffect(() => {
    if (tab === 'collateral' && !COLLATERALACTIONS.find((aciton) => aciton.link === manageAction)) {
      setActiveAction(COLLATERALACTIONS[0].link);
    } else if (tab === 'debt' && !debtActions.find((aciton) => aciton.link === manageAction)) {
      setActiveAction(debtActions[0].link);
    }
  }, [debtActions, manageAction, setActiveAction, tab]);

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Tabs isFitted defaultIndex={tab === 'collateral' ? 0 : 1}>
        <TabList>
          <Tab
            color="white"
            data-cy="tab-button-collateral"
            fontWeight={700}
            onClick={() => {
              setTab('collateral');
            }}
          >
            Manage Collateral
          </Tab>
          <Tab
            color="white"
            fontWeight={700}
            data-cy="tab-button-debt"
            onClick={() => {
              setTab('debt');
            }}
          >
            Manage Debt
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px="0">
            <Flex flexDir="column">
              <Flex gap={4}>
                {COLLATERALACTIONS.map((action) => (
                  <Flex
                    h="84px"
                    justifyContent="center"
                    key={action.title.concat('-tab-actions')}
                    border="1px solid"
                    flexDir="column"
                    alignItems="center"
                    borderColor={manageAction === action.link ? 'cyan.500' : 'gray.900'}
                    rounded="base"
                    cursor="pointer"
                    data-cy={`collateral-action-${action.link}`}
                    onClick={() => setActiveAction(action.link)}
                    flex="1"
                  >
                    {action.icon(manageAction === action.link ? 'cyan' : 'white')}
                    <Text
                      fontSize="14px"
                      fontWeight={700}
                      mt="2"
                      color={manageAction === action.link ? 'cyan.500' : 'white'}
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
              <Flex gap={4}>
                {debtActions.map((action) => (
                  <Flex
                    flex="1"
                    h="84px"
                    justifyContent="center"
                    key={action.title.concat('-tab-actions')}
                    border="1px solid"
                    flexDir="column"
                    alignItems="center"
                    borderColor={manageAction === action.link ? 'cyan.500' : 'gray.900'}
                    rounded="base"
                    cursor="pointer"
                    data-cy={`debt-actions-${action.link}`}
                    onClick={() => setActiveAction(action.link)}
                  >
                    {action.icon(manageAction === action.link ? 'cyan' : 'white')}
                    <Text
                      fontSize="14px"
                      fontWeight={700}
                      mt="2"
                      color={manageAction === action.link ? 'cyan.500' : 'white'}
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

      <Flex direction="column" mt={2}>
        {manageAction === 'borrow' ? <Borrow liquidityPosition={liquidityPosition} /> : null}
        {manageAction === 'claim' ? <Claim liquidityPosition={liquidityPosition} /> : null}
        {manageAction === 'deposit' ? <Deposit liquidityPosition={liquidityPosition} /> : null}
        {manageAction === 'repay' ? <Repay liquidityPosition={liquidityPosition} /> : null}
        {manageAction === 'undelegate' ? (
          <Undelegate liquidityPosition={liquidityPosition} />
        ) : null}
      </Flex>
    </Box>
  );
};

export const ManageAction = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const params = useParams();
  const { network } = useNetwork();

  const navigate = useNavigate();
  const location = useLocation();

  const [txnModalOpen, setTxnModalOpen] = useState<ManageAction | null>(null);
  const { debtChange, collateralChange, setCollateralChange, setDebtChange } =
    useContext(ManagePositionContext);

  const { data: collateralType } = useCollateralType(params.collateralSymbol);
  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const { isValid } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice: liquidityPosition?.collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange,
    debtChange,
  });

  const parsedActionParam = ManageActionSchema.safeParse(params.manageAction);
  const parsedAction = parsedActionParam.success ? parsedActionParam.data : null;

  const isFormValid = isBase ? true : isValid;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (!form.reportValidity() || !isFormValid) {
        return;
      }
      setTxnModalOpen(parsedAction);
    },
    [isFormValid, parsedAction]
  );

  useEffect(() => {
    // This is just for initial state, if we have a manage action selected return
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('manageAction')) return;
    if (!liquidityPosition) return;
    if (!collateralType) return;

    const cRatio = calculateCRatio(liquidityPosition.debt, liquidityPosition.collateralValue);
    const canBorrow =
      !isBase && (liquidityPosition.debt.eq(0) || cRatio.gt(collateralType.issuanceRatioD18));

    if (canBorrow) {
      queryParams.set('manageAction', 'borrow');
      navigate({ pathname: location.pathname, search: queryParams.toString() }, { replace: true });
      return;
    }

    const cRatioIsCloseToLiqRatio = cRatio.mul(0.9).lt(collateralType.liquidationRatioD18);

    if (cRatioIsCloseToLiqRatio) {
      queryParams.set('manageAction', isBase ? 'deposit' : 'repay');
      navigate({ pathname: location.pathname, search: queryParams.toString() }, { replace: true });
      return;
    }

    queryParams.set('manageAction', 'deposit');
    navigate({ pathname: location.pathname, search: queryParams.toString() }, { replace: true });
  }, [collateralType, isBase, liquidityPosition, location.pathname, location.search, navigate]);

  return (
    <>
      {!txnModalOpen && (
        <ManageActionUi
          liquidityPosition={liquidityPosition}
          onSubmit={onSubmit}
          network={network}
          setActiveAction={(action) => {
            setCollateralChange(wei(0));
            setDebtChange(wei(0));
            const queryParams = new URLSearchParams(location.search);
            queryParams.set('manageAction', action);
            navigate(
              { pathname: location.pathname, search: queryParams.toString() },
              { replace: true }
            );
          }}
          manageAction={parsedAction || undefined}
        />
      )}
      <Suspense fallback={null}>
        {txnModalOpen === 'repay' ? (
          <RepayModal
            availableCollateral={liquidityPosition?.usdCollateral.availableCollateral}
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'repay'}
          />
        ) : null}
        {txnModalOpen === 'borrow' ? (
          <BorrowModal
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'borrow'}
          />
        ) : null}
        {txnModalOpen === 'claim' ? (
          <ClaimModal
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'claim'}
          />
        ) : null}
        {txnModalOpen === 'deposit' ? (
          <DepositModal
            availableCollateral={liquidityPosition?.accountCollateral.availableCollateral}
            currentCollateral={liquidityPosition?.collateralAmount ?? wei(0)}
            collateralChange={collateralChange}
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'deposit'}
          />
        ) : null}
        {txnModalOpen === 'undelegate' ? (
          <UndelegateModal
            liquidityPosition={liquidityPosition}
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'undelegate'}
          />
        ) : null}
      </Suspense>
    </>
  );
};
