import {
  Box,
  Divider,
  Flex,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
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
import { Withdraw } from '../Withdraw/Withdraw';

const RepayModal = lazy(() => safeImport(() => import('@snx-v3/RepayModal')));
const BorrowModal = lazy(() => safeImport(() => import('@snx-v3/BorrowModal')));
const ClaimModal = lazy(() => safeImport(() => import('@snx-v3/ClaimModal')));
const DepositModal = lazy(() => safeImport(() => import('@snx-v3/DepositModal')));
const UndelegateModal = lazy(() => safeImport(() => import('@snx-v3/UndelegateModal')));
const WithdrawModal = lazy(() => safeImport(() => import('@snx-v3/WithdrawModal')));

const validActions = [
  'borrow',
  'deposit',
  'repay',
  'claim',
  'undelegate',
  'withdraw',
  'withdraw-debt',
] as const;
const ManageActionSchema = z.enum(validActions);
type ManageAction = z.infer<typeof ManageActionSchema>;

const getInitialTab = (manageAction?: ManageAction) => {
  if (!manageAction || COLLATERALACTIONS.find((aciton) => aciton.link === manageAction)) {
    return 'collateral';
  }

  return 'debt';
};

const ManageActionUi: FC<{
  setActiveAction: (action: string) => void;
  manageAction?: ManageAction;
  onSubmit: (e: FormEvent) => void;
  liquidityPosition?: LiquidityPosition;
  network: Network | null;
}> = ({ setActiveAction, manageAction, onSubmit, liquidityPosition, network }) => {
  // const debt = Number(liquidityPosition?.debt?.toString());
  const isBase = isBaseAndromeda(network?.id, network?.preset);

  const [tab, setTab] = useState(getInitialTab(manageAction));
  const debtActions = DEBTACTIONS(isBase);

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
            color={tab === 'collateral' ? 'white' : 'gray.500'}
            data-cy="tab-button-collateral"
            fontWeight={700}
            fontSize={['12px', '16px']}
            onClick={() => {
              setTab('collateral');
            }}
          >
            Manage Collateral
          </Tab>
          <Tab
            color={tab === 'debt' ? 'white' : 'gray.500'}
            fontWeight={700}
            fontSize={['12px', '16px']}
            data-cy="tab-button-debt"
            onClick={() => {
              setTab('debt');
            }}
          >
            {`Manage ${isBase ? 'PnL' : 'Debt'}`}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <Flex flexDir={['column', 'row']} gap={4}>
              {COLLATERALACTIONS.map((action) => (
                <Flex
                  h="84px"
                  minH={['90px', '84px']}
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
                  minWidth={['100%', 'auto']}
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
          </TabPanel>
          <TabPanel px="0">
            <Flex flexDir={['column', 'row']} gap={4}>
              {debtActions.map((action) => (
                <Flex
                  flex="1"
                  h="84px"
                  minH={['90px', '84px']}
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
                  minWidth={['100%', 'auto']}
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
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex direction="column">
        {manageAction === 'borrow' ? <Borrow liquidityPosition={liquidityPosition} /> : null}
        {manageAction === 'claim' ? <Claim liquidityPosition={liquidityPosition} /> : null}
        {manageAction === 'withdraw' ? <Withdraw liquidityPosition={liquidityPosition} /> : null}
        {manageAction === 'withdraw-debt' ? (
          <Withdraw liquidityPosition={liquidityPosition} isDebtWithdrawal />
        ) : null}
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
  const { debtChange, collateralChange, setCollateralChange, setDebtChange, setWithdrawAmount } =
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

  console.log('Manage Actions');

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

    if (queryParams.get('manageAction')) {
      return;
    }
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
      <Suspense
        fallback={
          <Flex gap={4} flexDirection="column">
            <Skeleton maxW="232px" width="100%" height="20px" />
            <Divider my={4} />
            <Skeleton width="100%" height="20px" />
            <Skeleton width="100%" height="20px" />
          </Flex>
        }
      >
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
            liquidityPosition={liquidityPosition}
          />
        ) : null}
        {txnModalOpen === 'deposit' ? (
          <DepositModal
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'deposit'}
            liquidityPosition={liquidityPosition}
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
        {txnModalOpen === 'withdraw' ? (
          <WithdrawModal
            liquidityPosition={liquidityPosition}
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setWithdrawAmount(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'withdraw'}
            account
          />
        ) : null}
        {txnModalOpen === 'withdraw-debt' ? (
          <WithdrawModal
            liquidityPosition={liquidityPosition}
            onClose={() => {
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setWithdrawAmount(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'withdraw-debt'}
            account
            isDebtWithdrawal
          />
        ) : null}
      </Suspense>
    </>
  );
};
