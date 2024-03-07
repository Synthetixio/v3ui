import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { BorrowIcon, DollarCircle } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { wei } from '@synthetixio/wei';
import {
  FC,
  FormEvent,
  lazy,
  PropsWithChildren,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Borrow } from './Borrow';
import { Repay } from './Repay';
import { Undelegate } from './Undelegate';
import { Deposit } from './Deposit';
import { z } from 'zod';
import { safeImport } from '@synthetixio/safe-import';
import { calculateCRatio } from '@snx-v3/calculations';
import { Network, useNetwork } from '@snx-v3/useBlockchain';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';

const RepayModal = lazy(() => safeImport(() => import('@snx-v3/RepayModal')));
const BorrowModal = lazy(() => safeImport(() => import('@snx-v3/BorrowModal')));
const DepositModal = lazy(() => safeImport(() => import('@snx-v3/DepositModal')));
const UndelegateModal = lazy(() => safeImport(() => import('@snx-v3/UndelegateModal')));

const validActions = ['borrow', 'deposit', 'repay', 'undelegate'] as const;
const ManageActionSchema = z.enum(validActions);
type ManageAction = z.infer<typeof ManageActionSchema>;

const ActionButton: FC<
  PropsWithChildren<{
    onClick?: (action: ManageAction) => void;
    action: ManageAction;
    activeAction?: string;
    disabled?: boolean;
  }>
> = ({ children, action, activeAction, onClick, disabled }) => (
  <BorderBox
    as={Button}
    fontWeight="700"
    fontSize="md"
    color="gray.50"
    bg="navy.900"
    _hover={{
      bg: 'unset',
    }}
    _active={{
      bg: 'unset',
    }}
    cursor={disabled ? 'not-allowed' : 'pointer'}
    data-testid="manage action"
    data-action={action}
    data-active={action === activeAction ? 'true' : undefined}
    onClick={() => !disabled && onClick?.(action)}
    py={2}
    width="50%"
    textAlign="center"
    opacity={disabled ? '50%' : '100%'}
  >
    {children}
  </BorderBox>
);

const Action: FC<{ manageAction: ManageAction; liquidityPosition?: LiquidityPosition }> = ({
  manageAction,
  liquidityPosition,
}) => {
  switch (manageAction) {
    case 'borrow':
      return <Borrow liquidityPosition={liquidityPosition} />;
    case 'deposit':
      return <Deposit liquidityPosition={liquidityPosition} />;
    case 'repay':
      return <Repay liquidityPosition={liquidityPosition} />;
    case 'undelegate':
      return <Undelegate liquidityPosition={liquidityPosition} />;

    default:
      return null;
  }
};

const ManageActionUi: FC<{
  setActiveAction: (action: ManageAction) => void;
  manageAction?: ManageAction;
  onSubmit: (e: FormEvent) => void;
  liquidityPosition?: LiquidityPosition;
  network: Network | null;
}> = ({ setActiveAction, manageAction, onSubmit, liquidityPosition, network }) => {
  return (
    <Box as="form" onSubmit={onSubmit}>
      <Flex mt={2} gap={2}>
        <ActionButton onClick={setActiveAction} action="deposit" activeAction={manageAction}>
          <ArrowDownIcon w="15px" h="15px" mr={1} /> Add Collateral
        </ActionButton>
        <ActionButton onClick={setActiveAction} action="repay" activeAction={manageAction}>
          <DollarCircle mr={1} /> Repay snxUSD
        </ActionButton>
      </Flex>
      <Flex mt={2} gap={2}>
        <ActionButton onClick={setActiveAction} action="undelegate" activeAction={manageAction}>
          <ArrowUpIcon w="15px" h="15px" mr={1} /> Remove Collateral
        </ActionButton>
        {isBaseAndromeda(network?.id, network?.preset) ? (
          <ActionButton disabled action="borrow">
            Claim isn&apos;t available
          </ActionButton>
        ) : (
          <ActionButton onClick={setActiveAction} action="borrow" activeAction={manageAction}>
            <BorrowIcon mr={1} /> Borrow snxUSD
          </ActionButton>
        )}
      </Flex>
      {manageAction ? (
        <Flex direction="column" mt={6}>
          <Action manageAction={manageAction} liquidityPosition={liquidityPosition} />
        </Flex>
      ) : null}
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

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (!form.reportValidity() || !isValid) {
        return;
      }
      setTxnModalOpen(parsedAction);
    },
    [isValid, parsedAction]
  );

  useEffect(() => {
    // This is just for initial state, if we have a manage action selected return
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.get('manageAction')) return;
    if (!liquidityPosition) return;
    if (!collateralType) return;

    const cRatio = calculateCRatio(liquidityPosition.debt, liquidityPosition.collateralValue);
    const canBorrow = liquidityPosition.debt.eq(0) || cRatio.gt(collateralType.issuanceRatioD18);

    if (canBorrow) {
      queryParams.set('manageAction', 'borrow');
      navigate({ pathname: location.pathname, search: queryParams.toString() }, { replace: true });
      return;
    }

    const cRatioIsCloseToLiqRatio = cRatio.mul(0.9).lt(collateralType.liquidationRatioD18);

    if (cRatioIsCloseToLiqRatio) {
      queryParams.set('manageAction', 'repay');
      navigate({ pathname: location.pathname, search: queryParams.toString() }, { replace: true });
      return;
    }

    queryParams.set('manageAction', 'deposit');
    navigate({ pathname: location.pathname, search: queryParams.toString() }, { replace: true });
  }, [collateralType, liquidityPosition, location.pathname, location.search, navigate]);

  return (
    <>
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
