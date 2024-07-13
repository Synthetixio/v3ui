import { Button, Divider, Text, useToast } from '@chakra-ui/react';
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
import { FC, useCallback, useContext, useEffect } from 'react';
import type { StateFrom } from 'xstate';
import { Events, ServiceNames, State, UndelegateMachine } from './UndelegateMachine';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { LiquidityPositionUpdated } from '../../ui/src/components/Manage/LiquidityPositionUpdated';

export const UndelegateModalUi: FC<{
  amount: Wei;
  isOpen: boolean;
  onClose: () => void;
  collateralType?: CollateralType;
  state: StateFrom<typeof UndelegateMachine>;
  error: { error: Error; step: string } | null;
  onSubmit: () => void;
}> = ({ amount, isOpen, onClose, collateralType, onSubmit, state, error }) => {
  const isProcessing = state.matches(State.undelegate);
  if (isOpen) {
    if (state.matches(State.success)) {
      return (
        <LiquidityPositionUpdated
          onClose={onSubmit}
          title="Collateral successfully Updated"
          subline={
            <>
              Your <b>Collateral</b> has been updated, read more about it in the Synthetix V3
              Documentation.
            </>
          }
          alertText={
            <>
              <b>Collateral</b> successfully Updated
            </>
          }
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
              <Amount value={amount} suffix={` ${collateralType?.symbol}`} /> will be unlocked from
              the pool.
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
          mt="4"
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
  const { collateralChange } = useContext(ManagePositionContext);
  const { network } = useNetwork();

  const queryClient = useQueryClient();

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const toast = useToast({ isClosable: true, duration: 9000 });

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

  const [state, send] = useMachine(UndelegateMachine, {
    context: {
      amount: collateralChange.abs(),
    },
    services: {
      [ServiceNames.undelegate]: async () => {
        try {
          if (isBaseAndromeda(network?.id, network?.preset)) {
            await undelegateBaseAndromeda();
          } else {
            await execUndelegate();
          }
          await queryClient.invalidateQueries({
            queryKey: [`${network?.id}-${network?.preset}`, 'LiquidityPosition'],
            exact: false,
          });
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

  return (
    <UndelegateModalUi
      amount={state.context.amount}
      isOpen={isOpen}
      onClose={onClose}
      collateralType={collateralType}
      state={state}
      error={state.context.error}
      onSubmit={onSubmit}
    />
  );
};
