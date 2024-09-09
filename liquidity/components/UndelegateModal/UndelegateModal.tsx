import { Button, Divider, Text, useToast, Link } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { ContractError } from '@snx-v3/ContractError';
import { isBaseAndromeda } from '@snx-v3/isBaseAndromeda';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { Multistep } from '@snx-v3/Multistep';
import { useNetwork } from '@snx-v3/useBlockchain';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useParams } from '@snx-v3/useParams';
import { useUndelegate } from '@snx-v3/useUndelegate';
import { useUndelegateBaseAndromeda } from '@snx-v3/useUndelegateBaseAndromeda';
import { Wei, wei } from '@synthetixio/wei';
import { useQueryClient } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { StateFrom } from 'xstate';
import { Events, ServiceNames, State, UndelegateMachine } from './UndelegateMachine';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { LiquidityPositionUpdated } from '../../ui/src/components/Manage/LiquidityPositionUpdated';
import { ZEROWEI } from '@snx-v3/constants';
import { ChangeStat } from '../../ui/src/components';
import { currency } from '@snx-v3/format';
import { CRatioChangeStat } from '../../ui/src/components/CRatioBar/CRatioChangeStat';
import { TransactionSummary } from '../../ui/src/components/TransactionSummary/TransactionSummary';

export const UndelegateModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: StateFrom<typeof UndelegateMachine>;
  error: { error: Error; step: string } | null;
  onSubmit: () => void;
  txSummary?: ReactNode;
}> = ({ txSummary, amount, isOpen, onClose, collateralType, onSubmit, state, error }) => {
  const isProcessing = state.matches(State.undelegate);
  if (isOpen) {
    if (state.matches(State.success)) {
      return (
        <LiquidityPositionUpdated
          onClose={onSubmit}
          title="Collateral successfully Updated"
          subline={
            <>
              Your <b>Collateral</b> has been updated, read more about it in the{' '}
              <Link
                href="https://docs.synthetix.io/v/synthetix-v3-user-documentation"
                target="_blank"
                color="cyan.500"
              >
                Synthetix V3 Documentation
              </Link>
            </>
          }
          alertText={
            <>
              <b>Collateral</b> successfully Updated
            </>
          }
          summary={txSummary}
        />
      );
    }

    return (
      <div>
        <Text color="gray.50" fontSize="20px" fontWeight={700}>
          <ArrowBackIcon cursor="pointer" onClick={onClose} mr={2} />
          Manage Collateral
        </Text>
        <Divider my={4} />
        <Multistep
          step={1}
          title="Unlock collateral"
          subtitle={
            <Text as="div">
              <Amount value={amount} suffix={` ${collateralType?.displaySymbol}`} /> will be
              unlocked from the pool.
            </Text>
          }
          status={{
            failed: Boolean(error?.step === State.undelegate),
            disabled: amount.eq(0),
            success: state.matches(State.success),
            loading: state.matches(State.undelegate) && !error,
          }}
        />

        <Button
          isDisabled={isProcessing}
          onClick={onSubmit}
          width="100%"
          mt="6"
          data-testid="undelegate confirm button"
        >
          {(() => {
            switch (true) {
              case Boolean(error):
                return 'Retry';
              case isProcessing:
                return 'Processing...';
              case state.matches(State.success):
                return 'Continue';
              default:
                return 'Execute Transaction';
            }
          })()}
        </Button>
      </div>
    );
  }
};
export type UndelegateModalProps = FC<{
  isOpen: boolean;
  onClose: () => void;
  liquidityPosition?: LiquidityPosition;
}>;
export const UndelegateModal: UndelegateModalProps = ({ onClose, isOpen, liquidityPosition }) => {
  const params = useParams();
  const { collateralChange, setCollateralChange } = useContext(ManagePositionContext);
  const { network } = useNetwork();

  const queryClient = useQueryClient();

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const toast = useToast({ isClosable: true, duration: 9000 });

  const [txSummary, setTxSummary] = useState({
    currentCollateral: ZEROWEI,
    collateralChange: ZEROWEI,
    currentDebt: ZEROWEI,
  });

  const currentCollateral = liquidityPosition?.collateralAmount || wei(0);

  const { exec: execUndelegate } = useUndelegate({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: liquidityPosition?.tokenAddress,
    collateralChange,
    currentCollateral: currentCollateral,
  });
  const { exec: undelegateBaseAndromeda } = useUndelegateBaseAndromeda({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: liquidityPosition?.tokenAddress,
    collateralChange,
    currentCollateral: currentCollateral,
    liquidityPosition,
  });

  const { data: CoreProxy } = useCoreProxy();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);

  const isBase = isBaseAndromeda(network?.id, network?.preset);
  const [state, send] = useMachine(UndelegateMachine, {
    context: {
      amount: collateralChange.abs(),
    },
    services: {
      [ServiceNames.undelegate]: async () => {
        try {
          setTxSummary({
            currentCollateral,
            currentDebt: liquidityPosition?.debt || ZEROWEI,
            collateralChange,
          });

          if (isBase) {
            await undelegateBaseAndromeda();
          } else {
            await execUndelegate();
          }

          queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPositions'],
          });
          queryClient.invalidateQueries({
            queryKey: [
              `${network?.id}-${network?.preset}`,
              'AccountCollateralUnlockDate',
              { accountId: params.accountId },
            ],
          });

          setCollateralChange(ZEROWEI);
        } catch (error: any) {
          const contractError = errorParserCoreProxy(error);
          if (contractError) {
            console.error(new Error(contractError.name), contractError);
          }
          toast.closeAll();
          toast({
            title: 'Unlock collateral failed',
            description: contractError ? (
              <ContractError contractError={contractError} />
            ) : (
              'Please try again.'
            ),
            status: 'error',
            variant: 'left-accent',
          });
          throw Error('Unlock collateral failed', { cause: error });
        }
      },
    },
  });

  const collateralChangeString = collateralChange.toString();

  useEffect(() => {
    send(Events.SET_AMOUNT, { amount: wei(collateralChangeString).abs() });
  }, [collateralChangeString, send]);

  useEffect(() => {
    send(Events.SET_COLLATERAL_SYMBOL, { symbol: wei(collateralChangeString).abs() });
  }, [collateralChangeString, send]);

  const onSubmit = useCallback(async () => {
    if (state.matches(State.success)) {
      send(Events.RESET);
      onClose();
      return;
    }
    if (state.context.error) {
      send(Events.RETRY);
      return;
    }
    send(Events.RUN);
  }, [onClose, send, state]);

  const txSummaryItems = useMemo(() => {
    const items = [
      {
        label: 'Locked ' + collateralType?.displaySymbol,
        value: (
          <ChangeStat
            value={txSummary.currentCollateral}
            newValue={txSummary.currentCollateral.add(txSummary.collateralChange)}
            formatFn={(val: Wei) => currency(val)}
            hasChanges={txSummary.collateralChange.abs().gt(0)}
            size="sm"
          />
        ),
      },
    ];

    if (isBase) {
      return items;
    }

    return [
      ...items,
      {
        label: 'C-ratio',
        value: (
          <CRatioChangeStat
            currentCollateral={txSummary.currentCollateral}
            currentDebt={txSummary.currentDebt}
            collateralChange={txSummary.collateralChange}
            collateralPrice={liquidityPosition?.collateralPrice ?? ZEROWEI}
            debtChange={ZEROWEI}
            size="sm"
          />
        ),
      },
    ];
  }, [
    collateralType?.displaySymbol,
    isBase,
    liquidityPosition?.collateralPrice,
    txSummary.collateralChange,
    txSummary.currentCollateral,
    txSummary.currentDebt,
  ]);

  return (
    <UndelegateModalUi
      amount={state.context.amount}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      state={state}
      error={state.context.error}
      onSubmit={onSubmit}
      txSummary={<TransactionSummary items={txSummaryItems} />}
    />
  );
};
